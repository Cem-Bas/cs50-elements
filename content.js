// CS50 Elements Content Script
// Handles element selection, highlighting, and information extraction

let isSelecting = false;
let highlightedElement = null;
let overlayElement = null;

// Create highlight overlay element
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'cs50-element-overlay';
    overlay.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 2147483647;
        background: rgba(0, 122, 204, 0.3);
        border: 2px solid #007acc;
        transition: all 0.1s ease;
        display: none;
    `;
    document.body.appendChild(overlay);
    return overlay;
}

// Initialize overlay on page load
if (document.body) {
    overlayElement = createOverlay();
}

// Get element's XPath
function getXPath(element) {
    if (!element) return '';

    if (element.id) {
        return `//*[@id="${element.id}"]`;
    }

    const parts = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
        let index = 0;
        let sibling = element.previousSibling;

        while (sibling) {
            if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
                index++;
            }
            sibling = sibling.previousSibling;
        }

        const tagName = element.nodeName.toLowerCase();
        const part = index > 0 ? `${tagName}[${index + 1}]` : tagName;
        parts.unshift(part);

        element = element.parentNode;
    }

    return parts.length ? `/${parts.join('/')}` : '';
}

// Get optimal CSS selector for element
function getCSSSelector(element) {
    if (!element) return '';

    // If element has ID, use it
    if (element.id) {
        return `#${element.id}`;
    }

    const path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
        let selector = element.nodeName.toLowerCase();

        // Add ID if available
        if (element.id) {
            selector = `#${element.id}`;
            path.unshift(selector);
            break;
        }
        // Add classes if available
        else if (element.className && typeof element.className === 'string') {
            const classes = element.className.trim().split(/\s+/).filter(c => c);
            if (classes.length > 0) {
                selector += '.' + classes.join('.');
            }
        }

        // Add nth-child if necessary
        if (element.parentNode) {
            const siblings = Array.from(element.parentNode.children).filter(
                e => e.nodeName === element.nodeName
            );
            if (siblings.length > 1) {
                const index = siblings.indexOf(element) + 1;
                selector += `:nth-child(${index})`;
            }
        }

        path.unshift(selector);
        element = element.parentNode;
    }

    return path.join(' > ');
}

// Get computed styles for element
function getComputedStyles(element) {
    const styles = window.getComputedStyle(element);
    const importantStyles = [
        'display', 'position', 'width', 'height',
        'margin', 'padding', 'border',
        'color', 'background-color', 'font-size',
        'font-family', 'font-weight', 'line-height',
        'text-align', 'z-index', 'opacity',
        'overflow', 'visibility'
    ];

    const result = {};
    importantStyles.forEach(style => {
        const value = styles.getPropertyValue(style);
        if (value && value !== 'none' && value !== 'normal' && value !== '0px' && value !== 'auto') {
            result[style] = value;
        }
    });

    return result;
}

// Get element attributes
function getAttributes(element) {
    const attrs = {};
    if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            attrs[attr.name] = attr.value;
        }
    }
    return attrs;
}

// Get element information
function getElementInfo(element) {
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyles(element);
    const attributes = getAttributes(element);

    // Get text content (limit to 500 characters)
    let textContent = element.textContent || '';
    textContent = textContent.trim().substring(0, 500);
    if (textContent.length === 500) {
        textContent += '...';
    }

    return {
        tagName: element.tagName.toLowerCase(),
        id: element.id || '',
        className: element.className || '',
        xpath: getXPath(element),
        cssSelector: getCSSSelector(element),
        dimensions: {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        },
        position: {
            top: Math.round(rect.top + window.scrollY),
            left: Math.round(rect.left + window.scrollX)
        },
        styles: styles,
        attributes: attributes,
        textContent: textContent
    };
}

// Highlight element with overlay
function highlightElement(element) {
    if (!overlayElement) {
        overlayElement = createOverlay();
    }

    const rect = element.getBoundingClientRect();
    overlayElement.style.top = `${rect.top}px`;
    overlayElement.style.left = `${rect.left}px`;
    overlayElement.style.width = `${rect.width}px`;
    overlayElement.style.height = `${rect.height}px`;
    overlayElement.style.display = 'block';
}

// Remove highlight
function removeHighlight() {
    if (overlayElement) {
        overlayElement.style.display = 'none';
    }
}

// Handle mouse move during selection
function handleMouseMove(e) {
    if (!isSelecting) return;

    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (element && element !== highlightedElement && element.id !== 'cs50-element-overlay') {
        highlightedElement = element;
        highlightElement(element);
    }
}

// Handle click during selection
function handleClick(e) {
    if (!isSelecting) return;

    e.preventDefault();
    e.stopPropagation();

    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (element && element.id !== 'cs50-element-overlay') {
        const elementInfo = getElementInfo(element);

        // Send element info back to popup
        chrome.runtime.sendMessage({
            action: 'elementSelected',
            data: elementInfo
        });

        // Stop selection mode
        stopSelection();
    }

    return false;
}

// Handle escape key
function handleKeyDown(e) {
    if (e.key === 'Escape' && isSelecting) {
        stopSelection();
        chrome.runtime.sendMessage({
            action: 'selectionCanceled'
        });
    }
}

// Start element selection
function startSelection() {
    isSelecting = true;
    document.body.style.cursor = 'crosshair';

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown, true);

    // Prevent default link behavior during selection
    document.addEventListener('click', preventDefaultClick, true);
}

// Stop element selection
function stopSelection() {
    isSelecting = false;
    document.body.style.cursor = 'default';
    removeHighlight();

    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown, true);

    // Remove prevent default after a delay
    setTimeout(() => {
        document.removeEventListener('click', preventDefaultClick, true);
    }, 100);
}

// Prevent default click behavior
function preventDefaultClick(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startSelection') {
        startSelection();
        sendResponse({ status: 'started' });
    } else if (request.action === 'stopSelection') {
        stopSelection();
        sendResponse({ status: 'stopped' });
    }
    return true;
});
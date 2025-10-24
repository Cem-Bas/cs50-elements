// CS50 Elements Popup Script
// Handles UI interactions and communication with content script
// Developed by cem-bas with assistance from Claude AI (Anthropic)

let isScanning = false;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeButtons();
    initializeCopyButtons();
    setupMessageListener();

    // Check if we have selected element data waiting
    chrome.runtime.sendMessage({ action: 'getSelectedElement' }, (response) => {
        if (response && response.data) {
            displayElementInfo(response.data);
        }
    });
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update active tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Button functionality
function initializeButtons() {
    const scanBtn = document.getElementById('scanBtn');
    const clearBtn = document.getElementById('clearBtn');

    scanBtn.addEventListener('click', toggleScanning);
    clearBtn.addEventListener('click', clearElementInfo);
}

// Toggle scanning mode
async function toggleScanning() {
    const scanBtn = document.getElementById('scanBtn');

    if (!isScanning) {
        // Start scanning
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Check if this is a restricted URL
        if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') ||
            tab.url.startsWith('edge://') || tab.url.startsWith('about:')) {
            showError('Cannot inspect elements on browser internal pages. Please navigate to a regular website.');
            return;
        }

        // First, inject the content script and CSS if not already present
        try {
            // Inject CSS
            await chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ['content-styles.css']
            });

            // Inject JavaScript
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            // Small delay to ensure script is loaded
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            // Script might already be injected, continue
            console.log('Script might already be injected:', error);
        }

        // Now send the message to start selection
        chrome.tabs.sendMessage(tab.id, { action: 'startSelection' }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error starting selection:', chrome.runtime.lastError);
                showError('Could not start element selection. Please try again.');
                return;
            }

            isScanning = true;
            scanBtn.classList.add('active');
            scanBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                </svg>
                Stop Scanning
            `;

            // Close popup to allow element selection on page
            setTimeout(() => {
                window.close();
            }, 100);
        });
    } else {
        // Stop scanning
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.tabs.sendMessage(tab.id, { action: 'stopSelection' }, () => {
            isScanning = false;
            scanBtn.classList.remove('active');
            scanBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                Start Scanning
            `;
        });
    }
}

// Clear element info
function clearElementInfo() {
    document.querySelector('.placeholder').style.display = 'block';
    document.querySelector('.info-details').classList.add('hidden');

    // Clear all values
    document.getElementById('tagName').textContent = '';
    document.getElementById('elementId').textContent = '';
    document.getElementById('elementClasses').textContent = '';
    document.getElementById('xpath').textContent = '';
    document.getElementById('cssSelector').textContent = '';
    document.getElementById('dimensions').textContent = '';
    document.getElementById('position').textContent = '';
    document.getElementById('computedStyles').innerHTML = '';
    document.getElementById('attributes').innerHTML = '';
    document.getElementById('textContent').textContent = '';
}

// Display element information
function displayElementInfo(data) {
    // Hide placeholder and show details
    document.querySelector('.placeholder').style.display = 'none';
    document.querySelector('.info-details').classList.remove('hidden');

    // Update element tag info
    document.getElementById('tagName').textContent = data.tagName;

    if (data.id) {
        document.getElementById('elementId').textContent = data.id;
        document.getElementById('elementId').style.display = 'inline';
    } else {
        document.getElementById('elementId').style.display = 'none';
    }

    if (data.className) {
        const classes = data.className.split(' ').filter(c => c).join(' ');
        document.getElementById('elementClasses').textContent = classes;
        document.getElementById('elementClasses').style.display = 'inline';
    } else {
        document.getElementById('elementClasses').style.display = 'none';
    }

    // Update selectors
    document.getElementById('xpath').textContent = data.xpath;
    document.getElementById('cssSelector').textContent = data.cssSelector;

    // Update dimensions and position
    document.getElementById('dimensions').textContent =
        `${data.dimensions.width}px × ${data.dimensions.height}px`;
    document.getElementById('position').textContent =
        `top: ${data.position.top}px, left: ${data.position.left}px`;

    // Update computed styles
    const stylesContainer = document.getElementById('computedStyles');
    stylesContainer.innerHTML = '';

    if (data.styles && Object.keys(data.styles).length > 0) {
        Object.entries(data.styles).forEach(([name, value]) => {
            const styleItem = document.createElement('div');
            styleItem.className = 'style-item';
            styleItem.innerHTML = `
                <span class="style-name">${name}:</span>
                <span class="style-value">${value}</span>
            `;
            stylesContainer.appendChild(styleItem);
        });
    } else {
        stylesContainer.innerHTML = '<div style="color: #6a6a6a;">No computed styles</div>';
    }

    // Update attributes
    const attributesContainer = document.getElementById('attributes');
    attributesContainer.innerHTML = '';

    if (data.attributes && Object.keys(data.attributes).length > 0) {
        Object.entries(data.attributes).forEach(([name, value]) => {
            const attrItem = document.createElement('div');
            attrItem.className = 'attr-item';
            attrItem.innerHTML = `
                <span class="attr-name">${name}:</span>
                <span class="attr-value">${value}</span>
            `;
            attributesContainer.appendChild(attrItem);
        });
    } else {
        attributesContainer.innerHTML = '<div style="color: #6a6a6a;">No attributes</div>';
    }

    // Update text content
    const textContentEl = document.getElementById('textContent');
    if (data.textContent && data.textContent.trim()) {
        textContentEl.textContent = data.textContent;
    } else {
        textContentEl.innerHTML = '<span style="color: #6a6a6a;">No text content</span>';
    }

    // Store data for copy functionality
    window.elementData = data;
}

// Initialize copy buttons
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const field = button.getAttribute('data-copy');
            copyToClipboard(field, button);
        });
    });
}

// Copy to clipboard
async function copyToClipboard(field, button) {
    if (!window.elementData) return;

    const value = window.elementData[field];
    if (!value) return;

    try {
        await navigator.clipboard.writeText(value);

        // Show success feedback
        button.classList.add('copied');
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;

        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalHTML;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        showError('Failed to copy to clipboard');
    }
}

// Show error message
function showError(message) {
    const placeholder = document.querySelector('.placeholder');
    placeholder.textContent = message;
    placeholder.style.color = '#f48771';

    setTimeout(() => {
        placeholder.textContent = 'Click "Start Scanning" and select an element to inspect';
        placeholder.style.color = '#6a6a6a';
    }, 3000);
}

// Setup message listener for element selection
function setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'elementSelected') {
            displayElementInfo(request.data);

            // Reset scan button
            const scanBtn = document.getElementById('scanBtn');
            isScanning = false;
            scanBtn.classList.remove('active');
            scanBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                Start Scanning
            `;
        } else if (request.action === 'selectionCanceled') {
            // Reset scan button
            const scanBtn = document.getElementById('scanBtn');
            isScanning = false;
            scanBtn.classList.remove('active');
            scanBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                Start Scanning
            `;
        }
    });
}

// Check if we're already in scanning mode when popup opens
// We no longer check on load since content script is injected on demand
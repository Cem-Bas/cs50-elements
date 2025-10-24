// CS50 Elements Background Script
// Handles communication between content script and popup
// Developed by cem-bas with assistance from Claude AI (Anthropic)

let selectedElementData = null;

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'elementSelected') {
        // Store the selected element data
        selectedElementData = request.data;

        // Try to open the popup to display the element data
        // Note: chrome.action.openPopup() requires Chrome 99+
        if (chrome.action && chrome.action.openPopup) {
            chrome.action.openPopup().then(() => {
                console.log('Popup opened to display element data');
            }).catch((err) => {
                console.log('Could not open popup:', err);
                // As fallback, show a badge to notify user
                chrome.action.setBadgeText({ text: '!' });
                chrome.action.setBadgeBackgroundColor({ color: '#007acc' });
                setTimeout(() => {
                    chrome.action.setBadgeText({ text: '' });
                }, 3000);
            });
        } else {
            // Fallback for older Chrome versions - show badge
            chrome.action.setBadgeText({ text: '!' });
            chrome.action.setBadgeBackgroundColor({ color: '#007acc' });
            setTimeout(() => {
                chrome.action.setBadgeText({ text: '' });
            }, 3000);
        }

        sendResponse({ status: 'received' });
    } else if (request.action === 'getSelectedElement') {
        // Send stored element data to popup
        const data = selectedElementData;
        selectedElementData = null; // Clear after sending
        sendResponse({ data: data });
    } else if (request.action === 'selectionCanceled') {
        // Clear any stored data
        selectedElementData = null;

        // Forward cancellation to popup
        chrome.runtime.sendMessage({
            action: 'selectionCanceled'
        }).catch(() => {
            console.log('Popup not available');
        });

        sendResponse({ status: 'canceled' });
    }

    return true; // Keep the message channel open for async response
});
// CS50 Elements Background Script
// Handles communication between content script and popup
// Developed by cem-bas with assistance from Claude AI (Anthropic)

let selectedElementData = null;

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'elementSelected') {
        // Store the selected element data
        selectedElementData = request.data;

        // Forward the message to all extension pages (including popup)
        chrome.runtime.sendMessage({
            action: 'elementSelected',
            data: request.data
        }).catch(() => {
            // Popup might not be open yet, store for later retrieval
            console.log('Popup not available, data stored for later');
        });

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
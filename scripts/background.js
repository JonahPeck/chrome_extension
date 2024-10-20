chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractState') {
        console.log('Extracted state from content script:', message.state);
    }
});

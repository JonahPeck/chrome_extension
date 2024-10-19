

document.getElementById('extractDataButton').addEventListener('click', () => {
    // Send a message to the content script to extract data
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractStateText
        });
    });
});

// Function that will be injected into the Salesforce page
function extractStateText() {
    const element = document.querySelector('lightning-formatted-text');
    
    if (element) {
        const stateText = element.textContent;
        console.log('State:', stateText);

        // Display state in the popup
        chrome.runtime.sendMessage({ action: 'showState', state: stateText });
    } else {
        console.log('Element not found');
    }
}

// Listen for the extracted state message
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'showState') {
        document.getElementById('stateOutput').textContent = `State: ${message.state}`;
    }
});

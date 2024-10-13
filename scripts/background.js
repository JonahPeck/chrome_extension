let currentTabId = null;
let isTracking = false;

chrome.tabs.onActivated.addListener(activeInfo => {
    if (isTracking && currentTabId !== activeInfo.tabId) {
        chrome.runtime.sendMessage({action: "pauseTimer"});
    }

    currentTabId = activeInfo.tabId;

    chrome.runtime.sendMessage({action: "resumeTimer"});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === currentTabId && changeInfo.status === 'complete') {
        chrome.runtime.sendMessage({ action: "resumeTimer"});
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTraacking") {
        isTracking = true;
    }
});
//notes
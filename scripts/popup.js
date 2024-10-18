chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const activeTabId = tabs[0].id;

    chrome.scritping.executeScript({
        target: {tabId: activeTabId},
        function: () => {
            const headline = document.querySelector('h1')?.innerText || 'No Headline found';
            return headline;
        }
    }, (result) => {
        document.getElementById('headline').innerText = result[0].result;
    });
});
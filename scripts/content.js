const getHeadline = () => {

    const headline = document.querySelector('h1');

    return headline ? headline.innerText: "No headline found";
    
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getHeadLine') {
        const headline = getHeadline();
        sendResponse({ headline });
    }
});
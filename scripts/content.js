
window.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('lightnight-formatted-text');

    if (element) {
        const stateText = element.textContent;
        console.log("State:", stateText);

        chrome.runtime.sendMessage({action: "extractState", state: stateText});
    } else {
        console.log("Element not found!");
    }
});
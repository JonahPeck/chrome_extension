window.addEventListener('DOMContentLoaded', () => {
    const slotElement = document.querySelector('slot');

    if (slotElement) {
        const formattedTextElement = slotElement.querySelector('lightning-formatted-text');

        if (formattedTextElement) {
            const stateText = formattedTextElement.textContent.trim();
            console.log("State found:", stateText);

            // Send a message to the Chrome extension with the extracted state
            chrome.runtime.sendMessage({ action: "extractState", state: stateText });
        } else {
            console.log("Formatted text element not found!");
        }
    } else {
        console.log("Slot element not found!");
    }
});

//need to code baby
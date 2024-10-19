document.getElementById('scrapeBtn').addEventListener('click', function() {
    // Query the currently active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Execute the following script on the active tab
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            // Function to extract the food director's name from the webpage
            function: () => {
                // Try to find an <h1> element on the page
                const foodDirector = document.querySelector('h1')?.innerText || 'No data found';
                console.log(foodDirector);
                return foodDirector;
            }
        }, (results) => {
            // Handle the results returned from the executed script
            if (results && results[0]) {
                document.getElementById('output').innerText = results[0].result;
            } else {
                document.getElementById('output').innerText = 'No results found';
            }
        });
    });
});

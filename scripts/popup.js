let timer = null;
let totalSeconds = 0;
let isTimerRunning = false;

// Start button logic
document.getElementById('startButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "startTracking" });
    startTimer();
});

// Stop button logic
document.getElementById('stopButton').addEventListener('click', () => {
    stopTimer();
});

// Reset button logic
document.getElementById('resetButton').addEventListener('click', () => {
    resetTimer();
});

// Start timer function
const startTimer = () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(() => {
            totalSeconds++;
            document.getElementById('timer').innerText = formatTime(totalSeconds);
        }, 1000);
    }
};

// Stop timer function
const stopTimer = () => {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
    }
};

// Reset timer function
const resetTimer = () => {
    stopTimer();
    totalSeconds = 0;
    document.getElementById('timer').innerText = formatTime(totalSeconds);
};

// Time formatting function (hh:mm:ss)
const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Handling messages from background or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pauseTimer") {
        stopTimer();
    } else if (message.action === "resumeTimer") {
        startTimer();
    }
});

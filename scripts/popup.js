let timer = null;
let totalSeconds = 0;
let isTimerRunning = false;

document.getElementById('startButton').addEventListener('click', ()=>{
    chrome.runtime.sendMessage({action: "startTracking"});
    startTimer();
});

document.getElementById('stopButton').addEventListener('click', () =>{
    stopTimer();
});

const startTimer = () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(() => {
            totalSeconds++;
            document.getElementById('timer').innerText = formatTime(totalSeconds);
        }, 1000);
    }
};

const stopTimer = () => {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
    }
};

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) /60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "pauseTimer") {
        stopTimer();
    } else if (message.action == "resumeTimer") {
        startTimer();
    }
});
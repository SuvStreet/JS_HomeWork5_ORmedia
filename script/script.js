let m = 0,
    s = 0,
    ms = 0;
let cM = 0,
    cS = 0,
    cMs = 0;
let timer;
let cTimer;
let counter = 1;

let stopwatchEl = document.querySelector(".stopwath");
let timeCircleEl = document.getElementById("timeCircle");
let hederCircleEl = document.getElementById("hederCircle");
let lapsContainer = document.querySelector(".laps");
let btnStart = document.querySelector("#start");
let btnPause = document.querySelector("#pause");
let btnStop = document.querySelector("#stop");
let btnRestart = document.querySelector("#restart");
let btnLap = document.querySelector("#lap");
let btnResetLaps = document.querySelector("#resetLaps");

btnStart.addEventListener("click", start);

function start() {
    if (!timer) {
        timer = setInterval(run, 10);
    }
    if (!cTimer) {
        cTimer = setInterval(run, 10);
    }
    btnStart.textContent = "Начать";
}

function run() {
    stopwatchEl.innerHTML = getTimer();
    timeCircleEl.innerHTML = getTimerCircle();
    ms++;
    cMs++;
    if (ms == 100) {
        ms = 0;
        s++;
    }
    if (s == 60) {
        s = 0;
        m++;
    }
    if (cMs == 100) {
        cMs = 0;
        cS++;
    }
    if (cS == 60) {
        cS = 0;
        cM++;
    }
}

btnPause.addEventListener("click", pause);

function pause() {
    stopTimer();
    btnStart.textContent = "Продолжить";
}

// убираем дубликат кода
function stopTimer() {
    clearInterval(timer); // останавливаем таймер
    timer = false;
    clearInterval(cTimer);
    cTimer = false;
}

btnStop.addEventListener("click", stop);

function stop() {
    stopTimer();
    m = 0;
    s = 0;
    ms = 0;
    cM = 0;
    cS = 0;
    cMs = 0;
    counter = 1;
    stopwatchEl.innerHTML = getTimer();
    timeCircleEl.innerHTML = getTimerCircle();
    timeCircleEl.style.opacity = "0";
    hederCircleEl.style.opacity = "0";
    lapsContainer.innerHTML = "";
}

btnRestart.addEventListener("click", restart);

function restart() {
    stop();
    start();
}

btnLap.addEventListener("click", lap);

function lap() {
    if (cTimer) {
        timeCircleEl.style.opacity = "1";
        hederCircleEl.style.opacity = "1";
        let li = document.createElement("li");
        li.innerHTML =
            "<span>" +
            (counter < 10 ? "0" + counter : counter) +
            "</span>" +
            getTimerCircle() +
            getTimer();
        lapsContainer.appendChild(li);

        counter++;
        clearInterval(cTimer);
        cTimer = false;
        cM = 0;
        cS = 0;
        cMs = 0;
        timeCircleEl.innerHTML = getTimerCircle();
        start();
    }
}

btnResetLaps.addEventListener("click", resetLaps);

function resetLaps() {
    lapsContainer.innerHTML = "";
    counter = 1;
    timeCircleEl.style.opacity = "0";
    hederCircleEl.style.opacity = "0";
}

function getTimer() {
    return (
        "<span>" +
        (m < 10 ? "0" + m : m) +
        ":" +
        (s < 10 ? "0" + s : s) +
        "." +
        (ms < 10 ? "0" + ms : ms) +
        "</span>"
    );
}

function getTimerCircle() {
    return (
        "<span>" +
        (cM < 10 ? "0" + cM : cM) +
        ":" +
        (cS < 10 ? "0" + cS : cS) +
        "." +
        (cMs < 10 ? "0" + cMs : cMs) +
        "</span>"
    );
}

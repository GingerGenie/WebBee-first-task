let name = '';
let listChildren = document.getElementById('display-timer').children;
const timerPieces = {};
for (let i = 0; i < listChildren.length ;i += 2) {
    name = listChildren[i].className.slice(listChildren[i].className.search('__')+2, listChildren[i].className.length);
    timerPieces[name] = listChildren[i];
}

function startTimer (time) {
    time.seconds.textContent < 9 ? 
        time.seconds.textContent = '0' + (+time.seconds.textContent + 1) : 
        time.seconds.textContent = +time.seconds.textContent + 1;

    if (time.seconds.textContent === "60") {
        time.seconds.textContent = '00';
        time.minutes.textContent < 9 ? 
            time.minutes.textContent = '0' + (+time.minutes.textContent + 1) : 
            time.minutes.textContent = +time.minutes.textContent + 1;
    }

    if (time.minutes.textContent === "60") {
        time.minutes.textContent = '00';
        time.hour.textContent < 9 ? 
            time.hour.textContent = '0' + (+time.hour.textContent + 1) : 
            time.hour.textContent = +time.hour.textContent + 1;
    }

    setTimeout(() => startTimer(time), 1000);
}

export {startTimer, timerPieces}
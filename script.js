import {initMap} from './yandex-map.js';

const linkMap = document.getElementById('link-of-map');
const linkAct = document.getElementById('link-of-activity');
const linkTimer = document.getElementById('link-of-timer');

let name = '';
let listChildren = document.getElementById('display-timer').children;
const timerPieces = {};
for (let i = 0; i < listChildren.length ;i += 2) {
    name = listChildren[i].className.slice(listChildren[i].className.search('__')+2, listChildren[i].className.length);
    timerPieces[name] = listChildren[i];
}

let active;
let fl = true;

function startTimer (time) {
    time.seconds.textContent < 10 ? 
        time.seconds.textContent = '0' + (+time.seconds.textContent + 1) : 
        time.seconds.textContent = +time.seconds.textContent + 1;

    if (time.seconds.textContent === "60") {
        time.seconds.textContent = '00';
        time.minutes.textContent < 10 ? 
            time.minutes.textContent = '0' + (+time.minutes.textContent + 1) : 
            time.minutes.textContent = +time.minutes.textContent + 1;
    }

    if (time.minutes.textContent === "60") {
        time.minutes.textContent = '00';
        time.hour.textContent < 10 ? 
            time.hour.textContent = '0' + (+time.hour.textContent + 1) : 
            time.hour.textContent = +time.hour.textContent + 1;
    }

    setTimeout(() => startTimer(time), 1000);
}

addEventListener('DOMContentLoaded', (e) => {
    const link = window.location.href;
    const query = link.slice(link.search('#')+1, link.length);
    if (!active && (query !== window.location.href)) {
        
        if (query=='map') {
            initMap();
            linkMap.classList.add('active-link');
            active = linkMap;
            fl = false;
        }
        else if (query=='activity') {
            linkAct.classList.add('active-link');
            active = linkAct;
        }
        else if (query=='time') {
            linkTimer.classList.add('active-link');
            active = linkTimer;
        }
        else {
            window.location.href = window.location.href.replace(/[#]\w+/, '')
        }
    }
    startTimer(timerPieces);
})

linkMap.addEventListener('click', function (e) {
    if (fl) {
        initMap();
    }
}, {once: true})

linkAct.addEventListener('click', (e) => {
    active?.classList.remove('active-link');
    linkAct.classList.add('active-link');
    active = linkAct;
})
addEventListener('', (e) => e.preventDefault())

linkMap.addEventListener('click', () => {
    active?.classList.remove('active-link');
    linkMap.classList.add('active-link');
    active = linkMap;
})

linkTimer.addEventListener('click', () => {
    active?.classList.remove('active-link');
    linkTimer.classList.add('active-link');
    active = linkTimer;
})
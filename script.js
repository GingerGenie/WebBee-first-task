import { initMap } from './yandex-map.js';
import { startTimer } from './timer.js';

let active = null; // Активная ссылка. Нужна, чтобы при новой ссылки удалить старую
let fl = true;
let mainFl = true;
const link = window.location.href;
const query = link.slice(link.search('#')+1, link.length); // Находит fragment в URL

const classOfMainCont = document.querySelector('.container-main').classList;

function activeButton (mainFlag, link, activeLink) {
    if (mainFlag) {
        classOfMainCont.add('display-none');
        mainFlag = false;
    }
    activeLink?.classList.remove('active-link');
    link.classList.add('active-link');
    activeLink = link;

    setTimeout(() => window.scrollTo(0,0), 0)

    return [mainFlag, activeLink];
}

const linkMap = document.getElementById('link-of-map');
const linkAct = document.getElementById('link-of-activity');
const linkTimer = document.getElementById('link-of-timer');
const linkBack = document.getElementById('link-back');

linkBack.addEventListener('click', () => {
    active?.classList.remove('active-link');
    active = null;
    classOfMainCont.remove('display-none');
    mainFl = true;
})

linkAct.addEventListener('click', (e) => {
    [mainFl, active] = activeButton(mainFl, linkAct, active);
})
addEventListener('', (e) => e.preventDefault())

linkMap.addEventListener('click', () => {
    [mainFl, active] = activeButton(mainFl, linkMap, active);
})

linkTimer.addEventListener('click', () => {
    [mainFl, active] = activeButton(mainFl, linkTimer, active);
})

// Ивент запускается при загрузки сайта. Начинает таймер и правильно выделяет ссылку
addEventListener('DOMContentLoaded', (e) => {
    startTimer();
    if (!active && (query !== window.location.href)) {
        classOfMainCont.add('display-none');
        if (query=='map') {
            initMap();
            setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000);
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
})

// Вызывается ТОЛЬКО при первом посещении карты. Начинает загрузку
linkMap.addEventListener('click', function (e) { 
    if (fl) {
        initMap();
    }
    setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
}, {once: true})
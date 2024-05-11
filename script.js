import {initMap} from './yandex-map.js';
import { startTimer, timerPieces } from './timer.js';

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
    startTimer(timerPieces);
})

// Вызывается ТОЛЬКО при первом посещении карты. Начинает загрузку
linkMap.addEventListener('click', function (e) { 
    if (fl) {
        initMap();
    }
    setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
}, {once: true})

//Меню для профиля
const profileButton = document.querySelector('.navigation__links__minor__profile');
const profileMenu = document.querySelector('.navigation__profile-menu');
let profileFl = false;

profileButton.addEventListener('click', () => {
    attention.remove(); // удаляет заметку о рабочей кнопке
}, {once: true})

profileButton.addEventListener('click', () => {
    if (!profileFl) {
        profileMenu.classList.add('display-view')
        profileFl = true;
        profileButton.classList.add('active-link-profile');
    }
    else {
        profileMenu.classList.remove('display-view')
        profileFl = false;
        profileButton.classList.remove('active-link-profile');
    }
})

// Меню бургер для мобилок
const burgerButton = document.querySelector('.mobile-navigation__info__burger-menu');
const burgerMenu = document.querySelector('.wrap-for-mobile-burger');
const yandexMap = document.getElementById('yandexmap'); // карта исчезает т.к. есть коллизии у меню и картой
let burgerFl = false;

burgerButton.addEventListener('click', () => {
    if (!burgerFl) {
        burgerButton.setAttribute('disabled', true);
        yandexMap.style.display = 'none';
        burgerMenu.style.display = 'flex';
        burgerMenu.style.animationName = 'burger-animation';
        burgerFl = true;
        setTimeout(() => burgerButton.removeAttribute("disabled"), 1000);
    }
    else {
        burgerButton.setAttribute('disabled', true);
        burgerMenu.style.animationName = 'burger-animation-reverse';
        setTimeout(() => {
            yandexMap.style.display = 'block';
            burgerMenu.style.display = 'none';
            burgerButton.removeAttribute("disabled");
        }, 900)
        burgerFl = false;
    }
})
import { initMap } from './js/yandex-map.js';
import { startTimer, getTimer, getResetButton } from './js/timer.js';
import objPages from './js/pages.js';

startTimer();

const root = document.getElementById('root');
const activeButtons = document.querySelectorAll('.active-button');
let classActiveButton = null;
let disabledButton = null;

for (let button of activeButtons) { // создает ивент для каждой кликабельной ссылки
    button.addEventListener('click', (e) => {
        e.preventDefault();

        if (disabledButton === button) return;
        button.classList.add('active-link');
        disabledButton = button;
        classActiveButton?.classList.remove('active-link');
        classActiveButton = button;
        
        const link = button.getAttribute('href');
        window.history.pushState({}, '','https://gingergenie.github.io/WebBee-first-task' + link);

        root.innerHTML = objPages[link];
    })
}

activeButtons[1].addEventListener('click', function () { // ивент запуска карты
    setTimeout(initMap, 200)
    setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
})

activeButtons[2].addEventListener('click', () => { // ивент отображения таймера
    setTimeout(() => {
        getTimer()
        getResetButton();
    }, 200);
})

addEventListener('DOMContentLoaded', () => {
    let fragment = window.location.href;
    if (fragment[fragment.length-1] === '/') fragment = fragment.slice(0, -1);
    fragment = fragment.slice(
        fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) === -1 ? 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) : 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/)+1
        , fragment.length);
    if (fragment === '' || fragment == "WebBee-first-task") {
        fragment = 'activity';
        window.history.pushState({}, '', 'https://gingergenie.github.io/WebBee-first-task/activity');
    }
    else if (fragment === 'map') {
        setTimeout(initMap, 50)
        setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
    }
    else if (fragment === 'timer') {
        setTimeout(() => {
            getTimer();
            getResetButton();
        }, 50);
    }

    const needButton = document.querySelector(`[href="/${fragment}"]`);
    classActiveButton?.classList.remove('active-link');
    needButton.classList.add('active-link');
    disabledButton = needButton;
    classActiveButton = needButton;

    root.innerHTML = objPages[fragment];
    window.history.pushState({}, '', 'https://gingergenie.github.io/WebBee-first-task/' + fragment);
})

addEventListener('popstate', () => {
    let fragment = window.location.href;
    if (fragment[fragment.length-1] === "WebBee-first-task") history.go(-1);

    fragment = fragment.slice(
        fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) === -1 ? 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) : 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/)+1
        , fragment.length);

    if (fragment === '' || fragment == window.location.host) {
        fragment = 'activity';
    }
    else if (fragment === 'map') {
        setTimeout(initMap, 50)
        setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
    }
    else if (fragment === 'timer') {
        setTimeout(() => {
            getTimer();
            getResetButton();
        }, 50);
    }

    const needButton = document.querySelector(`[href="/${fragment}"]`);
    classActiveButton?.classList.remove('active-link');
    needButton.classList.add('active-link');
    disabledButton = needButton;
    classActiveButton = needButton;

    root.innerHTML = objPages[fragment];
})

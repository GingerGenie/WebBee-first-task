import { initMap } from './js/yandex-map.js';
import { startTimer, getResetButton } from './js/timer.js';
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
        
        let link = button.getAttribute('href');
        window.history.pushState({}, '','https://' + 'gingergenie.github.io/WebBee-first-task' + link);

        link = link.slice(1)
        root.innerHTML = objPages[link]['html'];
    })
}

activeButtons[1].addEventListener('click', function () { // ивент запуска карты
    initMap();
    setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000);
})

function timerFunc () { // ивент отображения таймера
    const {seconds, minutes, hours} = objPages['timer']['state'];
    const listTimerChildren = document.querySelectorAll('#display-timer div');
    listTimerChildren[0].textContent = hours || '00';
    listTimerChildren[1].textContent = minutes || '00';
    listTimerChildren[2].textContent = seconds || '00';
    getResetButton();
    window.requestAnimationFrame(timerFunc);
}

activeButtons[2].addEventListener('click', timerFunc)

addEventListener('DOMContentLoaded', () => {
    let fragment = window.location.href;
    if (fragment[fragment.length-1] === '/') fragment = fragment.slice(0, -1);
    fragment = fragment.slice(
        fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) === -1 ? 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) : 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/)+1
        , fragment.length);

    if (fragment === '' || fragment == "WebBee-first-task") { // WebBee-first-task
        fragment = 'activity';
        window.location = 'https://gingergenie.github.io/WebBee-first-task' + '/activity';
        root.innerHTML = objPages[fragment]['html'];
    }

    if (fragment === 'map') {
        initMap();
        setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000);
    }
    if (fragment === 'timer') {
        timerFunc();
    }

    const needButton = document.querySelector(`[href="/${fragment}"]`);
    classActiveButton?.classList.remove('active-link');
    needButton.classList.add('active-link');
    disabledButton = needButton;
    classActiveButton = needButton;
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

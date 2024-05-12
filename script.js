import { initMap } from './js/yandex-map.js';
import { startTimer, getTimer } from './js/timer.js';

startTimer();

const root = document.getElementById('root');
const activeButtons = document.querySelectorAll('.active-button');

for (let button of activeButtons) { // создает ивент для каждой кликабельной ссылки
    button.addEventListener('click', async (e) => {
        const link = button.dataset.redirect;
        e.preventDefault();

        window.history.pushState({}, '', link);
        const response = await fetch(link + '/' + link + '.txt');
        const textOfHTML = await response.text();
        root.innerHTML = textOfHTML;
    })
}

activeButtons[1].addEventListener('click', function () { // ивент запуска карты
    setTimeout(initMap, 50)
    setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
})

activeButtons[2].addEventListener('click', () => { // ивент отображения таймера
    setTimeout(getTimer, 50);
})

addEventListener('DOMContentLoaded', async () => {
    let fragment = window.location.href.slice(
        window.location.href.search('#') === -1 ? window.location.href.search('#') : window.location.href.search('#')+1
        , window.location.href.length);
    
    if (fragment === '/') {
        fragment = 'activity';
    }
    else if (fragment === 'map') {
        setTimeout(initMap, 50)
        setTimeout(() => document.getElementById('lazy-loading').classList.add('display-none'),10000)
    }
    const response = await fetch('/' + fragment + '/' + fragment + '.txt');
    const textOfHTML = await response.text();
    root.innerHTML = textOfHTML;
    window.history.pushState({}, '', fragment);
})
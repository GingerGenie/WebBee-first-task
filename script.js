import { startTimer } from './js/timer.js';
import objPages from './js/pages.js';

startTimer();

const root = document.getElementById('root');
const activeButtons = document.querySelectorAll('.active-button');

for (let button of activeButtons) { // создает ивент для каждой кликабельной ссылки
    button.addEventListener('click', (e) => {
        e.preventDefault();

        if (objPages.disabledButton === button) return;
        button.classList.add('active-link');
        objPages.disabledButton = button;
        objPages.classActiveButton?.classList.remove('active-link');
        objPages.classActiveButton = button;
        
        let link = button.getAttribute('href');
        window.history.pushState({}, '','https://' + 'gingergenie.github.io/WebBee-first-task' + link);

        link = link.slice(1)
        root.innerHTML = objPages[link]['html'];
        objPages[link]['state']['init']();
    })
}
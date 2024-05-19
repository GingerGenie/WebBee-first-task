import objPages from './js/pages.js';

const root = document.getElementById('root');

function initPage(dispatch) {
    let fragment = window.location.href;
    const regExp = new RegExp('[\/](?![:0-9A-Za-z#_.-]*[\/])');

    if (fragment[fragment.length-1] === '/') fragment = fragment.slice(0, -1);
    fragment = fragment.slice(
        fragment.search(regExp) === -1 ? 
            fragment.search(regExp) : 
            fragment.search(regExp)+1
        , fragment.length);

    if (fragment === '' || fragment == "WebBee-first-task") {
        switch (dispatch) {
            case 'openPage':
                fragment = 'activity';
                window.location = 'https://gingergenie.github.io/WebBee-first-task' + '/activity';
                root.innerHTML = objPages[fragment]['html'];
                break;
            case 'popstate':
                history.back();
                break;
        }
    }
    if (dispatch === 'popstate') root.innerHTML = objPages[fragment]['html']
    objPages[fragment]['state']['init']();

    const needButton = document.querySelector(`[href="/${fragment}"]`);
    objPages.disabledButton?.classList.remove('active-link');
    needButton.classList.add('active-link');
    objPages.disabledButton = needButton;
}

addEventListener('DOMContentLoaded', () => initPage('openPage'))
addEventListener('popstate', () => initPage('popstate'))

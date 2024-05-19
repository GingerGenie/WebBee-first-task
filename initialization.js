import objPages from './js/pages.js';

const root = document.getElementById('root');

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
        window.location = 'https://gingergenie.github.io/WebBee-first-task' + '/activity';
        root.innerHTML = objPages[fragment]['html'];
    }
    else {
        objPages[fragment]['state']['init']();
    }

    const needButton = document.querySelector(`[href="/${fragment}"]`);
    needButton.classList.add('active-link');
    objPages.disabledButton = needButton;
})


addEventListener('popstate', () => {
    let fragment = window.location.href;
    if (fragment[fragment.length-1] === '/') fragment = fragment.slice(0, -1);
    fragment = fragment.slice(
        fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) === -1 ? 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/) : 
            fragment.search(/[\/](?![:0-9A-Za-z#_.-]*[\/])/)+1
        , fragment.length);

    if (fragment === '' || fragment == "127.0.0.1:5500") {
        history.back();
    }
    else {
        root.innerHTML = objPages[fragment]['html'];
        objPages[fragment]['state']['init']();
    }

    const needButton = document.querySelector(`[href="/${fragment}"]`);
    objPages.disabledButton?.classList.remove('active-link');
    needButton.classList.add('active-link');
    objPages.disabledButton = needButton;
})

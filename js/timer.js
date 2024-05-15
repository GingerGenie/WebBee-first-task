import objPages from './pages.js';

let start = performance.now();
export function startTimer () {
    let dif = (performance.now() - start) / 1000 | 0;
    objPages['timer']['state']['seconds'] = dif % 60 <= 9 ?
        '0' + (dif % 60) : 
        dif % 60;

    if (objPages['timer']['state']['seconds'] === 59) 
        objPages['timer']['state']['minutes'] = (dif+1)/60 % 60 <= 9 ?
            '0' + ((dif+1)/60 % 60) :
            (dif+1)/60 % 60;

    if (objPages['timer']['state']['minutes'] === 59) 
        objPages['timer']['state']['hours'] = (dif+1)/3600 <= 9 ?
            '0' + ((dif+1)/3600) :
            (dif+1)/3600;

    window.requestAnimationFrame(startTimer);
}

export function getResetButton() {
    document.getElementById('reset-button').addEventListener('click', () => {
        start = performance.now();
        objPages['timer']['state']['seconds'] = 0;
        objPages['timer']['state']['minutes'] = 0;
        objPages['timer']['state']['hours'] = 0;
    })
}

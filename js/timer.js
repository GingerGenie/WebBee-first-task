import objPages from './pages.js';

let start = performance.now();
let check = 0;
export function startTimer () {
    let dif = (performance.now() - start) / 1000 | 0;
    if (check != dif) {
        check += 1;
        
        objPages['timer']['state']['seconds'] = dif % 60 <= 9 ?
            '0' + (dif % 60) : 
            dif % 60;
    
        objPages['timer']['state']['minutes'] = dif/60 % 60 <= 9 ?
            '0' + ((dif/60 % 60) | 0) :
            dif/60 % 60;
    
        objPages['timer']['state']['hours'] = dif/3600 <= 9 ?
            '0' + ((dif/3600) | 0) :
            dif/3600;
    }

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

export function timerFunc () { // ивент отображения таймера
    const {seconds, minutes, hours} = objPages['timer']['state'];
    const listTimerChildren = document.querySelectorAll('#display-timer div');
    listTimerChildren[0].textContent = hours || '00';
    listTimerChildren[1].textContent = minutes || '00';
    listTimerChildren[2].textContent = seconds || '00';
    getResetButton();
    window.requestAnimationFrame(timerFunc);
}

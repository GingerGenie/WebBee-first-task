function plus (elem, time) {
    elem.textContent <= 9 ? 
        elem.textContent = '0' + (time) :
        elem.textContent = time;
}

const start = performance.now();
let dif = 0; let checker = 0;
let s = 0; let m = 0; let h = 0;
export function startTimer () {
    dif = (performance.now() - start) / 1000 | 0;
    if (checker !== dif) {
        checker += 1;
        s = dif % 60;
        m = dif/60 % 60;
        h = dif/3600 % 60;
    }
    window.requestAnimationFrame(startTimer);
}

export function getTimer() {
    const listChildren = document.querySelectorAll('#display-timer div');
    plus(listChildren[2], s | 0);
    plus(listChildren[1], m | 0);
    plus(listChildren[0], h | 0);
    window.requestAnimationFrame(getTimer);
}
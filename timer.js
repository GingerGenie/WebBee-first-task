let listChildren = document.querySelectorAll('#display-timer div');

function plus (elem, time) {
    elem.textContent < 9 ? 
        elem.textContent = '0' + (time) :
        elem.textContent = time;
}

let start = performance.now();
let dif = 0;
let checker = 0;
let minusSec = 0;
let minusMin = 0;
export function startTimer () {
    dif = (performance.now() - start) / 1000 | 0;
    if (checker !== dif) {
        checker = dif;
        plus(listChildren[2], dif - minusSec);

        if (listChildren[2].textContent === '60') {
            listChildren[2].textContent = '00';
            minusSec += 60;
            plus(listChildren[1], dif/60);
        };

        if (listChildren[1].textContent === '60') {
            listChildren[1].textContent = '00';
            minusMin += 60;
            plus(listChildren[0], dif/60)};
    }
    window.requestAnimationFrame(startTimer);
}
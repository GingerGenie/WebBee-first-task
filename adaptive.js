//Меню для профиля
const profileButton = document.querySelector('.navigation__links__minor__profile');
const profileMenu = document.querySelector('.navigation__profile-menu');
let profileFl = false;

profileButton.addEventListener('click', () => {
    attention.remove(); // удаляет заметку о рабочей кнопке
}, {once: true})

profileButton.addEventListener('click', () => {
    if (!profileFl) {
        profileMenu.classList.add('display-view')
        profileFl = true;
        profileButton.classList.add('active-link-profile');
    }
    else {
        profileMenu.classList.remove('display-view')
        profileFl = false;
        profileButton.classList.remove('active-link-profile');
    }
})

// Меню бургер для мобилок
const burgerButton = document.querySelector('.mobile-navigation__info__burger-menu');
const burgerMenu = document.querySelector('.wrap-for-mobile-burger');
//const yandexMap = document.getElementById('yandexmap'); // карта исчезает т.к. есть коллизии у меню и картой
let burgerFl = false;

burgerButton.addEventListener('click', () => {
    if (!burgerFl) {
        burgerButton.setAttribute('disabled', true);
        //yandexMap.style.display = 'none';
        burgerMenu.style.display = 'flex';
        burgerMenu.style.animationName = 'burger-animation';
        burgerFl = true;
        setTimeout(() => burgerButton.removeAttribute("disabled"), 1000);
    }
    else {
        burgerButton.setAttribute('disabled', true);
        burgerMenu.style.animationName = 'burger-animation-reverse';
        setTimeout(() => {
            //yandexMap.style.display = 'block';
            burgerMenu.style.display = 'none';
            burgerButton.removeAttribute("disabled");
        }, 900)
        burgerFl = false;
    }
})
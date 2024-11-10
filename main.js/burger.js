document.addEventListener('DOMContentLoaded', function () {
    const OPEN_CLASSNAME = "open";
    const navLinks = document.getElementById("nav-links");

    function toggleMenu() {
        if (navLinks.classList.contains(OPEN_CLASSNAME)) {
            navLinks.classList.remove(OPEN_CLASSNAME);
        } else {
            navLinks.classList.add(OPEN_CLASSNAME);
        }
    }

    // Прив'язка події click до елемента .header__menu після завантаження DOM
    const menuButton = document.querySelector('.header__menu');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    } else {
        console.error('Menu button not found');
    }
});

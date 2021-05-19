function toggleMenu() {
    let navigation = document.querySelector('.sideNav');
    let blackOverlay = document.querySelector('.black-overlay');
    navigation.classList.toggle('active');
    blackOverlay.classList.toggle('active');
}

document.getElementById("toggle").addEventListener("click", toggleMenu);


document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu__responsivo");
    const menuLinks = document.getElementById("menu__links");
    if (menuBtn && menuLinks) {
        menuBtn.addEventListener("click", function () {
            menuLinks.classList.toggle("active");
        });
    }
});
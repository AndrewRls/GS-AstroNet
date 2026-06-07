document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu__responsivo");
    const menuLinks = document.getElementById("menu__links");

    // Verifica se os elementos existem na tela para evitar erros no console
    if (menuBtn && menuLinks) {
        menuBtn.addEventListener("click", function () {
            menuLinks.classList.toggle("active");
        });
    }
});
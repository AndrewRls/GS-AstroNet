document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu__responsivo");
    const menuLinks = document.getElementById("menu__links");
    const links = document.querySelectorAll(".menu__links a");

    if (menuBtn && menuLinks) {
        // 1. Abre/Fecha ao clicar no botão hambúrguer ☰
        menuBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // Impede que o clique se espalhe para o documento
            menuLinks.classList.toggle("active");
        });

        // 2. Fecha o menu automaticamente ao clicar em qualquer link dele
        links.forEach(link => {
            link.addEventListener("click", function () {
                menuLinks.classList.remove("active");
            });
        });

        // 3. Fecha o menu se o usuário clicar em qualquer outro lugar da página
        document.addEventListener("click", function (event) {
            // Se o menu estiver aberto E o clique NÃO foi dentro do menu nem no botão
            if (menuLinks.classList.contains("active") && 
                !menuLinks.contains(event.target) && 
                event.target !== menuBtn) {
                menuLinks.classList.remove("active");
            }
        });
    }
});
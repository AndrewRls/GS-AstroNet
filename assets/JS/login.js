class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

function criarModal() {
    const modal = document.createElement("div");

    modal.id = "modal_mensagem";

    modal.innerHTML = `
        <div class="modal_conteudo">
            <h2 id="modal_titulo"></h2>
            <p id="modal_texto"></p>
            <button id="modal_botao">OK</button>
        </div>
    `;

    document.body.appendChild(modal);

    const botao = document.querySelector("#modal_botao");

    botao.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

function mostrarModal(titulo, mensagem, redirecionar = null) {
    const modal = document.querySelector("#modal_mensagem");
    const modalTitulo = document.querySelector("#modal_titulo");
    const modalTexto = document.querySelector("#modal_texto");
    const modalBotao = document.querySelector("#modal_botao");

    modalTitulo.textContent = titulo;
    modalTexto.textContent = mensagem;

    modal.style.display = "flex";

    modalBotao.onclick = function () {
        modal.style.display = "none";

        if (redirecionar !== null) {
            window.location.href = redirecionar;
        }
    };
}

criarModal();

const formularioCadastro = document.querySelector("#form_cadastro");
const formularioLogin = document.querySelector("#form_login");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const email = document.querySelector("#email").value.trim();
        const senha = document.querySelector("#senha").value.trim();
        const confirmarSenha = document.querySelector("#confirmar_senha").value.trim();

        if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
            mostrarModal("Erro", "Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarModal("Erro", "As senhas não são iguais.");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const emailJaExiste = usuarios.some(function (usuario) {
            return usuario.email === email;
        });

        if (emailJaExiste) {
            mostrarModal("Erro", "Este e-mail já está cadastrado.");
            return;
        }

        const novoUsuario = new Usuario(nome, email, senha);

        usuarios.push(novoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mostrarModal("Sucesso", "Cadastro realizado com sucesso!", "./login.html");
    });
}

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const senha = document.querySelector("#senha").value.trim();

        if (email === "" || senha === "") {
            mostrarModal("Erro", "Preencha todos os campos.");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(function (usuario) {
            return usuario.email === email && usuario.senha === senha;
        });

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

            mostrarModal(
                "Login realizado",
                `Bem-vindo, ${usuarioEncontrado.nome}!`,
                "../index.html"
            );
        } else {
            mostrarModal("Erro", "E-mail ou senha incorretos.");
        }
    });
}

const correctUsername = "email@admin.com"; // Defina o usuário correto
const correctPassword = "senha123"; // Defina a senha correta

function login(e) {
    e.preventDefault();
    
    const username = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        sessionStorage.setItem('loggedIn', 'true'); // Define a sessão como ativa
        window.location.href = './admin/index.html';
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

window.onload = () => {
    document.getElementById('loginForm').addEventListener('submit', login); // Adiciona o evento de envio do formulário
};

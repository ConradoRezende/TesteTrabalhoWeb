function logout() {
    sessionStorage.removeItem('loggedIn'); // Remove a sessão
    window.location.href = "../index.html"; // Recarrega a página
}

window.onload = () => {
    if (sessionStorage.getItem('loggedIn') != 'true') {
        window.location.href = '../index.html';
    }
}
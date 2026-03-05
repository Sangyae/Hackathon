// Grab our panels and links from the HTML
const loginPanel = document.getElementById('login-panel');
const registerPanel = document.getElementById('register-panel');
const btnGoToRegister = document.getElementById('go-to-register');
const btnGoToLogin = document.getElementById('go-to-login');

// When "Create Account" is clicked...
btnGoToRegister.addEventListener('click', () => {
    loginPanel.classList.add('hidden');    // Hide login
    registerPanel.classList.remove('hidden'); // Show register
});

// When "Access System" is clicked...
btnGoToLogin.addEventListener('click', () => {
    registerPanel.classList.add('hidden'); // Hide register
    loginPanel.classList.remove('hidden');    // Show login
});
// Import Firebase auth
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Assuming auth is initialized in app.js, but for modularity, re-initialize or import
// For simplicity, assume global

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        window.location.href = '../index.html'; // Redirect to main page
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});
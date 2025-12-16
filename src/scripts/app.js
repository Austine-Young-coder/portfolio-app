// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCVQQrdshzGOhKxoz1iGVz12uRjeLjEd1M",
  authDomain: "portfolio-app-34af3.firebaseapp.com",
  projectId: "portfolio-app-34af3",
  storageBucket: "portfolio-app-34af3.firebasestorage.app",
  messagingSenderId: "474585113496",
  appId: "1:474585113496:web:4e4c80808227e6535d41ed",
  measurementId: "G-43T1TRMM9Q"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM elements
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

// Event listeners
loginBtn.addEventListener('click', () => {
    alert('Login button clicked!');
    window.location.href = '/src/pages/login.html';
});

signupBtn.addEventListener('click', () => {
    alert('Signup button clicked!');
    window.location.href = '/src/pages/signup.html';
});

// Load components
fetch('src/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

fetch('src/components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
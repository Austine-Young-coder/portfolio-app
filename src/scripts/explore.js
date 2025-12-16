// Import Firestore
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const portfoliosContainer = document.getElementById('portfolios');

async function loadPortfolios() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${user.username}</h5>
                    <p class="card-text">${user.bio || 'No bio'}</p>
                    <a href="profile.html?username=${user.username}" class="btn btn-primary">View Portfolio</a>
                </div>
            </div>
        `;
        portfoliosContainer.appendChild(col);
    });
}

loadPortfolios();

// Load header and footer
fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
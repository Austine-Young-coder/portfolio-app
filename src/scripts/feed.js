// Import Firestore
import { collection, addDoc, onSnapshot, orderBy, query, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

let currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        loadFeed();
    } else {
        window.location.href = 'login.html';
    }
});

function loadFeed() {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    onSnapshot(q, (querySnapshot) => {
        const feedDiv = document.getElementById('feed');
        feedDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postDiv = document.createElement('div');
            postDiv.className = 'card mb-3';
            postDiv.innerHTML = `
                <div class="card-body">
                    <h6 class="card-title">${post.username}</h6>
                    <p class="card-text">${post.content}</p>
                    <small class="text-muted">${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
                </div>
            `;
            feedDiv.appendChild(postDiv);
        });
    });
}

document.getElementById('post-btn').addEventListener('click', async () => {
    const content = document.getElementById('post-content').value;
    if (content) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const username = userDoc.data().username;
        await addDoc(collection(db, 'posts'), {
            username: username,
            content: content,
            timestamp: new Date()
        });
        document.getElementById('post-content').value = '';
    }
});

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
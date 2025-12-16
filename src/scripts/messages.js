// Import Firestore
import { collection, addDoc, onSnapshot, orderBy, query, where, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

let currentUser;
let currentUsername;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        currentUsername = userDoc.data().username;
        loadConversations();
    } else {
        window.location.href = 'login.html';
    }
});

function loadConversations() {
    // Load users for conversations
    const usersRef = collection(db, 'users');
    getDocs(usersRef).then((querySnapshot) => {
        const conversationsDiv = document.getElementById('conversations');
        conversationsDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            if (user.username !== currentUsername) {
                const convDiv = document.createElement('div');
                convDiv.className = 'p-2 border-bottom';
                convDiv.textContent = user.username;
                convDiv.addEventListener('click', () => selectChat(user.username, doc.id));
                conversationsDiv.appendChild(convDiv);
            }
        });
    });
}

function selectChat(username, userId) {
    currentChatUser = userId;
    document.getElementById('messages').innerHTML = '';
    loadMessages();
}

function loadMessages() {
    if (!currentChatUser) return;
    const q = query(collection(db, 'messages'), 
        where('from', 'in', [currentUser.uid, currentChatUser]),
        where('to', 'in', [currentUser.uid, currentChatUser]),
        orderBy('timestamp'));
    onSnapshot(q, (querySnapshot) => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const msg = doc.data();
            const msgDiv = document.createElement('div');
            msgDiv.className = msg.from === currentUser.uid ? 'text-end mb-2' : 'text-start mb-2';
            msgDiv.innerHTML = `<div class="d-inline-block p-2 bg-light rounded">${msg.text}</div>`;
            messagesDiv.appendChild(msgDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

document.getElementById('send-btn').addEventListener('click', async () => {
    const message = document.getElementById('message-input').value;
    if (message && currentChatUser) {
        await addDoc(collection(db, 'messages'), {
            from: currentUser.uid,
            to: currentChatUser,
            text: message,
            timestamp: new Date()
        });
        document.getElementById('message-input').value = '';
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
// Import Firestore and Storage
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { doc, updateDoc, getDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let currentUser;
let userData;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        userData = userDoc.data();
        loadSettings();
    } else {
        window.location.href = 'login.html';
    }
});

function loadSettings() {
    document.getElementById('bio').value = userData.bio || '';
    document.getElementById('template').value = userData.template || 'default';
    // Load skills, social, works if needed
}

document.getElementById('add-skill').addEventListener('click', () => {
    const category = document.getElementById('skill-category').value;
    const skills = document.getElementById('skill-list').value.split(',');
    if (!userData.skills) userData.skills = {};
    userData.skills[category] = skills.map(s => s.trim());
    alert('Skill added');
});

document.getElementById('add-social').addEventListener('click', () => {
    const platform = document.getElementById('social-platform').value;
    const url = document.getElementById('social-url').value;
    if (!userData.socialLinks) userData.socialLinks = {};
    userData.socialLinks[platform] = url;
    alert('Social link added');
});

document.getElementById('upload-pic').addEventListener('click', async () => {
    const picFile = document.getElementById('profile-pic').files[0];
    if (picFile) {
        const storageRef = ref(storage, `profiles/${currentUser.uid}/profile.jpg`);
        await uploadBytes(storageRef, picFile);
        const picUrl = await getDownloadURL(storageRef);
        userData.profilePic = picUrl;
        alert('Profile picture updated');
    }
});
    const title = document.getElementById('work-title').value;
    const description = document.getElementById('work-desc').value;
    const demo = document.getElementById('work-demo').value;
    const download = document.getElementById('work-download').value;
    const imageFile = document.getElementById('work-image').files[0];

    let imageUrl = '';
    if (imageFile) {
        const storageRef = ref(storage, `works/${currentUser.uid}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
    }

    const work = {
        title: title,
        description: description,
        demo: demo,
        download: download,
        image: imageUrl
    };
    if (!userData.works) userData.works = [];
    userData.works.push(work);
    alert('Work added');
    // Clear inputs
    document.getElementById('work-title').value = '';
    document.getElementById('work-desc').value = '';
    document.getElementById('work-demo').value = '';
    document.getElementById('work-download').value = '';
    document.getElementById('work-image').value = '';
});

document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    userData.bio = document.getElementById('bio').value;
    userData.template = document.getElementById('template').value;
    await updateDoc(doc(db, 'users', currentUser.uid), userData);
    alert('Settings saved!');
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
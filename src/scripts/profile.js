// Assume user is logged in, get user data from Firestore
import { doc, getDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

let profileUsername;

const urlParams = new URLSearchParams(window.location.search);
profileUsername = urlParams.get('username');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        let userData;
        if (!profileUsername) {
            // Own profile
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            userData = userDoc.data();
        } else {
            // Other user's profile
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', profileUsername));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                userData = querySnapshot.docs[0].data();
            } else {
                alert('User not found');
                return;
            }
        }

        document.getElementById('username').textContent = userData.username;
        document.getElementById('bio').textContent = userData.bio || 'No bio yet';

        // Profile picture
        const profileImg = document.querySelector('.card-img-top');
        profileImg.src = userData.profilePic || 'https://via.placeholder.com/300';

        // Social links
        const socialLinks = userData.socialLinks || {};
        const socialContainer = document.getElementById('social-links');
        Object.keys(socialLinks).forEach(platform => {
            const link = document.createElement('a');
            link.href = socialLinks[platform];
            link.textContent = platform;
            link.className = 'btn btn-sm btn-outline-secondary me-2';
            socialContainer.appendChild(link);
        });

        // Skills
        const skills = userData.skills || {};
        const skillsContainer = document.getElementById('skills');
        Object.keys(skills).forEach(category => {
            const catDiv = document.createElement('div');
            catDiv.innerHTML = `<h5>${category}</h5><p>${skills[category].join(', ')}</p>`;
            skillsContainer.appendChild(catDiv);
        });

        // Work samples
        const works = userData.works || [];
        const worksContainer = document.getElementById('work-samples');
        works.forEach(work => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-3';
            col.innerHTML = `
                <div class="card">
                    <img src="${work.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${work.title}">
                    <div class="card-body">
                        <h6>${work.title}</h6>
                        <p>${work.description}</p>
                        ${work.demo ? `<a href="${work.demo}" class="btn btn-primary btn-sm">Demo</a>` : ''}
                        ${work.download ? `<a href="${work.download}" class="btn btn-secondary btn-sm">Download</a>` : ''}
                    </div>
                </div>
            `;
            worksContainer.appendChild(col);
        });
    } else {
        window.location.href = 'login.html';
    }
});

// Event listeners
document.getElementById('message-btn').addEventListener('click', () => {
    // Open messaging modal or redirect
    alert('Messaging feature coming soon!');
});

document.getElementById('email-btn').addEventListener('click', () => {
    window.location.href = 'mailto:user@example.com'; // Replace with actual email
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
    const username = document.getElementById('username').textContent;
    const url = `${window.location.origin}/src/pages/profile.html?username=${username}`;
    navigator.clipboard.writeText(url);
    alert('Link copied!');
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
# Portfolio App

A social platform for freelancers to create and showcase their portfolios.

## Features

- User registration and login with unique usernames
- Portfolio creation with customizable templates
- Upload work samples with images, demo and download links
- Profile picture upload
- Skills categorization
- Social media integration
- Real-time messaging system
- Feed for posts and updates
- Shareable profile links (e.g., /profile.html?username=yourname)
- Explore other portfolios
- Offline support via Firebase

## Tech Stack

- Frontend: HTML, CSS, JavaScript, Bootstrap, SCSS
- Backend: Firebase (Auth, Firestore, Storage)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Add your Firebase config to `src/scripts/app.js`
4. Build styles: `npm run build-css`
5. Start development server: `npm start`

## Firebase Config

Replace the firebaseConfig in `src/scripts/app.js` with your project's config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Deployment

Deploy to Vercel: `npm run deploy`

Or to Firebase: `firebase deploy`

## License

MIT
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk--CEvROA8qJ6XNqPecUbODsvmIAW3NU",
  authDomain: "cvgenerator-a4229.firebaseapp.com",
  projectId: "cvgenerator-a4229",
  storageBucket: "cvgenerator-a4229.firebasestorage.app",
  messagingSenderId: "363790391279",
  appId: "1:363790391279:web:cf7be811b62c9db603081a"
};

// Google Drive API Configuration
const GOOGLE_CLIENT_ID = '363790391279-7949088rgubjpoqnc2aao4evuk5ofo8u.apps.googleusercontent.com';
const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/drive.appdata';

// Global variables for Firebase and Google
let auth = null;
let currentUser = null;
let isGoogleApiLoaded = false;

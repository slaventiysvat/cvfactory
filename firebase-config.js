// Firebase Configuration
// ⚠️ SECURITY NOTE: This API key is intentionally public for client-side Firebase web apps.
// Firebase API keys are safe to expose in client code because:
// 1. They only identify your Firebase project
// 2. Access to data is controlled by Firebase Security Rules (not the API key)
// 3. The key is restricted to specific domains in Google Cloud Console
//
// IMPORTANT: Ensure API key restrictions are configured in Google Cloud Console!
// See SECURITY.md for detailed setup instructions.
//
// Required restrictions:
// - HTTP referrers: https://slaventiysvat.github.io/*, http://localhost:*
// - API restrictions: Identity Toolkit API, Token Service API
//
const firebaseConfig = {
  apiKey: "AIzaSyAk--CEvROA8qJ6XNqPecUbODsvmIAW3NU",
  authDomain: "cvgenerator-a4229.firebaseapp.com",
  projectId: "cvgenerator-a4229",
  storageBucket: "cvgenerator-a4229.firebasestorage.app",
  messagingSenderId: "363790391279",
  appId: "1:363790391279:web:cf7be811b62c9db603081a"
};

// Global variables for Firebase
let auth = null;
let currentUser = null;

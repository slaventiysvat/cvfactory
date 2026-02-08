// Authentication Manager - handles Google Sign-in and Firebase Auth

// Initialize Firebase Auth
function initializeAuth() {
    try {
        const app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        
        // Listen for auth state changes
        auth.onAuthStateChanged(handleAuthStateChanged);
        
        console.log('Firebase Auth initialized');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
}

// Handle auth state changes
function handleAuthStateChanged(user) {
    currentUser = user;
    
    if (user) {
        console.log('User signed in:', user.email);
        showUserUI(user);
        // If token already exists, use it; otherwise wait for user click to request Drive access
        const existingToken = localStorage.getItem('googleAccessToken');
        if (existingToken) {
            initGoogleDrive();
        }
    } else {
        console.log('User signed out');
        showSignInUI();
    }
}

// Request Google Drive access using GIS token client (popup from user gesture)
function requestDriveAccess() {
    try {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
            prompt: 'consent',
            callback: (response) => {
                if (response.access_token) {
                    console.log('Drive access token received');
                    localStorage.setItem('googleAccessToken', response.access_token);
                    initGoogleDrive();
                } else {
                    console.error('No access token received');
                }
            },
            error_callback: (error) => {
                console.error('Drive access error:', error);
                console.log('Continuing without Drive sync');
            }
        });
        
        // Important: must be called directly from a user gesture (button click)
        client.requestAccessToken();
    } catch (error) {
        console.error('Error requesting Drive access:', error);
        console.log('Continuing without Drive sync');
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/drive.file');
        provider.addScope('https://www.googleapis.com/auth/drive.appdata');
        
        const result = await auth.signInWithPopup(provider);
        console.log('Signed in successfully:', result.user.email);
        
        // Get Google access token for Drive API
        const credential = result.credential;
        if (credential && credential.accessToken) {
            localStorage.setItem('googleAccessToken', credential.accessToken);
            console.log('Access token saved');
        } else {
            console.warn('No access token in credential');
        }
        
    } catch (error) {
        console.error('Sign-in error:', error);
        alert('Sign-in failed: ' + error.message);
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
        localStorage.removeItem('googleAccessToken');
        window.location.reload();
    } catch (error) {
        console.error('Sign-out error:', error);
    }
}

// Show sign-in UI
function showSignInUI() {
    const container = document.getElementById('auth-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="auth-box">
            <h2>Welcome to CV Factory</h2>
            <p>Sign in with your Google account to sync your resumes across all devices</p>
            <button class="btn-google-signin" onclick="signInWithGoogle()">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18">
                Sign in with Google
            </button>
        </div>
    `;
    
    // Hide main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'none';
}

// Show user UI
function showUserUI(user) {
    const container = document.getElementById('auth-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="user-info">
            <img src="${user.photoURL || 'https://via.placeholder.com/40'}" alt="Profile" class="user-avatar">
            <span class="user-email">${user.email}</span>
            <button class="btn-drive" onclick="requestDriveAccess()">Enable Drive Sync</button>
            <button class="btn-signout" onclick="signOut()">Sign Out</button>
        </div>
    `;
    
    // Show main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'block';
}

// Initialize when Firebase SDK is loaded
window.addEventListener('load', () => {
    // Wait for Firebase to be available
    const checkFirebase = setInterval(() => {
        if (typeof firebase !== 'undefined') {
            clearInterval(checkFirebase);
            initializeAuth();
        }
    }, 100);
});

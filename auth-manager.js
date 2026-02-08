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
        // Show sign-in UI even if there's an error
        setTimeout(() => {
            if (!currentUser) {
                showSignInUI();
            }
        }, 1000);
    }
}

// Handle auth state changes
function handleAuthStateChanged(user) {
    currentUser = user;
    
    console.log('Auth state changed, user:', user ? user.email : 'not signed in');
    
    if (user) {
        console.log('User signed in:', user.email);
        
        // Check if we're returning from Drive access redirect
        const pendingDriveAccess = sessionStorage.getItem('pendingDriveAccess');
        if (pendingDriveAccess) {
            sessionStorage.removeItem('pendingDriveAccess');
            // Get token from Firebase user
            user.getIdToken(true).then(token => {
                console.log('Got fresh token after redirect');
                // Try to get access token from last sign-in
                const result = firebase.auth().getRedirectResult();
                return result;
            }).then(result => {
                if (result && result.credential && result.credential.accessToken) {
                    localStorage.setItem('googleAccessToken', result.credential.accessToken);
                    console.log('Access token saved from redirect');
                    initGoogleDrive().then(() => {
                        alert('Drive sync enabled successfully!');
                        showUserUI(user);
                    });
                } else {
                    showUserUI(user);
                }
            }).catch(error => {
                console.error('Error after redirect:', error);
                showUserUI(user);
            });
        } else {
            showUserUI(user);
            // If token already exists, use it
            const existingToken = localStorage.getItem('googleAccessToken');
            if (existingToken) {
                initGoogleDrive();
            }
        }
    } else {
        console.log('User signed out');
        showSignInUI();
    }
}

// Request Google Drive access using redirect flow (more reliable than popup)
function requestDriveAccess() {
    try {
        // Check if already has token and Drive is initialized
        const existingToken = localStorage.getItem('googleAccessToken');
        if (existingToken && typeof window.driveFileId !== 'undefined' && window.driveFileId) {
            console.log('Drive sync already enabled');
            alert('Drive sync is already enabled!');
            return;
        }
        
        console.log('Requesting Drive access through redirect...');
        
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        // Mark that we're requesting Drive access
        sessionStorage.setItem('pendingDriveAccess', 'true');
        
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/drive.file');
        provider.addScope('https://www.googleapis.com/auth/drive.appdata');
        provider.setCustomParameters({
            prompt: 'consent' // Force consent screen to get fresh token
        });
        
        // Use redirect instead of popup (more reliable)
        auth.signInWithRedirect(provider);
        
    } catch (error) {
        console.error('Error requesting Drive access:', error);
        sessionStorage.removeItem('pendingDriveAccess');
        
        // Hide loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
        
        alert('Error enabling Drive sync: ' + error.message);
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        // Don't request Drive scopes on initial sign-in, only when user clicks "Enable Drive Sync"
        
        const result = await auth.signInWithPopup(provider);
        console.log('Signed in successfully:', result.user.email);
        
        // Get Google access token for Drive API (if available)
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
    console.log('showSignInUI called');
    
    // Hide loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
    
    const container = document.getElementById('auth-container');
    console.log('Auth container found:', !!container);
    if (!container) {
        console.error('auth-container not found!');
        return;
    }
    
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
    
    console.log('Sign-in UI rendered');
    
    // Hide main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'none';
}

// Show user UI
function showUserUI(user) {
    // Hide loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
    
    const container = document.getElementById('auth-container');
    if (!container) return;
    
    // Check if Drive sync is enabled
    const hasToken = localStorage.getItem('googleAccessToken');
    const driveEnabled = hasToken && typeof window.driveFileId !== 'undefined' && window.driveFileId;
    
    const driveButton = driveEnabled 
        ? '<span class="drive-status" style="color: #4CAF50; font-weight: bold;">✓ Drive Sync Enabled</span>'
        : '<button class="btn-drive" onclick="requestDriveAccess()">Enable Drive Sync</button>';
    
    container.innerHTML = `
        <div class="user-info">
            <img src="${user.photoURL || 'https://via.placeholder.com/40'}" alt="Profile" class="user-avatar">
            <span class="user-email">${user.email}</span>
            ${driveButton}
            <button class="btn-signout" onclick="signOut()">Sign Out</button>
        </div>
    `;
    
    // Show main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'block';
}

// Initialize when Firebase SDK is loaded
window.addEventListener('load', () => {
    console.log('Page loaded, checking for Firebase...');
    
    let firebaseCheckAttempts = 0;
    const maxAttempts = 50; // 5 seconds max (50 * 100ms)
    
    // Fallback timeout - show sign-in UI if nothing happens in 3 seconds
    const fallbackTimeout = setTimeout(() => {
        console.log('Fallback timeout - showing sign-in UI');
        if (!currentUser) {
            showSignInUI();
        }
    }, 3000);
    
    // Wait for Firebase to be available
    const checkFirebase = setInterval(() => {
        firebaseCheckAttempts++;
        
        if (typeof firebase !== 'undefined') {
            clearInterval(checkFirebase);
            console.log('Firebase SDK loaded, initializing auth...');
            
            initializeAuth();
            
            // Check for redirect result (e.g., after Drive access request)
            firebase.auth().getRedirectResult()
                .then((result) => {
                    if (result && result.credential && result.credential.accessToken) {
                        console.log('Got access token from redirect result');
                        localStorage.setItem('googleAccessToken', result.credential.accessToken);
                    }
                    // Clear fallback timeout since auth is working
                    clearTimeout(fallbackTimeout);
                })
                .catch((error) => {
                    if (error.code !== 'auth/no-redirect-result') {
                        console.error('Redirect result error:', error);
                    }
                    // Clear fallback timeout
                    clearTimeout(fallbackTimeout);
                });
        } else if (firebaseCheckAttempts >= maxAttempts) {
            clearInterval(checkFirebase);
            console.error('Firebase SDK failed to load after 5 seconds');
            showSignInUI();
        }
                });
        }
    }, 100);
});

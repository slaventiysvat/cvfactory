// Google Drive Sync Manager - handles syncing resumes with Google Drive
// Uses direct REST API calls instead of gapi client library

const DRIVE_FILE_NAME = 'cv-factory-resumes.json';
let driveFileId = null;

// Initialize Google Drive API
async function initGoogleDrive() {
    try {
        const token = localStorage.getItem('googleAccessToken');
        if (!token) {
            console.warn('No access token available, skipping Drive sync');
            return;
        }
        
        // Get or create Drive file
        await initDriveFile();
        
        // Sync resumes from Drive
        await syncFromDrive();
        
        console.log('Google Drive initialized');
    } catch (error) {
        console.error('Error initializing Google Drive:', error);
        console.log('Continuing without Drive sync - data will be local only');
    }
}

// Initialize Drive file (get existing or create new)
async function initDriveFile() {
    try {
        const token = localStorage.getItem('googleAccessToken');
        
        // Search for existing file
        const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${DRIVE_FILE_NAME}'&fields=files(id,name)`;
        const searchResponse = await fetch(searchUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!searchResponse.ok) {
            throw new Error(`Search failed: ${searchResponse.status}`);
        }
        
        const searchData = await searchResponse.json();
        
        if (searchData.files && searchData.files.length > 0) {
            driveFileId = searchData.files[0].id;
            console.log('Found existing Drive file:', driveFileId);
        } else {
            // Create new file
            const fileMetadata = {
                name: DRIVE_FILE_NAME,
                mimeType: 'application/json'
            };
            
            const createResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fileMetadata)
            });
            
            if (!createResponse.ok) {
                throw new Error(`Create failed: ${createResponse.status}`);
            }
            
            const createData = await createResponse.json();
            driveFileId = createData.id;
            console.log('Created new Drive file:', driveFileId);
            
            // Initialize with empty array
            await saveToDrive([]);
        }
    } catch (error) {
        console.error('Error initializing Drive file:', error);
        throw error;
    }
}

// Sync resumes from Google Drive
async function syncFromDrive() {
    try {
        if (!driveFileId) {
            console.warn('No Drive file ID');
            return;
        }
        
        const token = localStorage.getItem('googleAccessToken');
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${driveFileId}?alt=media`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }
        
        const text = await response.text();
        let resumes = [];
        
        try {
            resumes = text ? JSON.parse(text) : [];
        } catch (e) {
            console.warn('Drive file empty or invalid:', e);
            resumes = [];
        }
        
        // Save to localStorage as cache
        localStorage.setItem('allResumes', JSON.stringify(resumes));
        
        console.log('Synced from Drive:', resumes.length, 'resumes');
        
        // Render if on index page
        if (typeof renderResumeCards === 'function') {
            renderResumeCards();
        }
        
        return resumes;
    } catch (error) {
        console.error('Error syncing from Drive:', error);
        // Fallback to localStorage
        return loadAllResumes();
    }
}

// Save resumes to Google Drive
async function saveToDrive(resumes) {
    try {
        if (!driveFileId) {
            console.warn('No Drive file ID, cannot save');
            return false;
        }
        
        const token = localStorage.getItem('googleAccessToken');
        const content = JSON.stringify(resumes, null, 2);
        
        const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${driveFileId}?uploadType=media`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: content
        });
        
        if (response.ok) {
            console.log('Saved to Drive successfully');
            // Also save to localStorage as cache
            localStorage.setItem('allResumes', JSON.stringify(resumes));
            return true;
        } else {
            const error = await response.text();
            console.error('Failed to save to Drive:', response.status, error);
            return false;
        }
    } catch (error) {
        console.error('Error saving to Drive:', error);
        // Fallback: save to localStorage only
        localStorage.setItem('allResumes', JSON.stringify(resumes));
        return false;
    }
}

// Override save functions to sync with Drive
const originalSaveAllResumes = window.saveAllResumes;
window.saveAllResumes = function(resumes) {
    // Save to localStorage immediately (cache)
    if (originalSaveAllResumes) {
        originalSaveAllResumes(resumes);
    } else {
        localStorage.setItem('allResumes', JSON.stringify(resumes));
    }
    
    // Sync to Drive (async)
    if (currentUser && driveFileId) {
        saveToDrive(resumes).catch(err => {
            console.error('Background sync to Drive failed:', err);
        });
    }
};

// Override load to sync from Drive first
const originalLoadAllResumes = window.loadAllResumes;
window.loadAllResumes = function() {
    // If user is signed in and Drive is ready, sync from Drive
    if (currentUser && driveFileId) {
        // Return cached data immediately, sync in background
        const cached = originalLoadAllResumes ? originalLoadAllResumes() : JSON.parse(localStorage.getItem('allResumes') || '[]');
        syncFromDrive().catch(err => console.error('Background sync error:', err));
        return cached;
    }
    
    // Otherwise use localStorage
    return originalLoadAllResumes ? originalLoadAllResumes() : JSON.parse(localStorage.getItem('allResumes') || '[]');
};

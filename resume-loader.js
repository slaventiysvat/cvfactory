// Resume Loader - handles loading resume data by ID from URL

// Get resume ID from URL parameter
function getResumeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Get current resume ID (used throughout the app)
function getCurrentResumeId() {
    return getResumeIdFromURL() || 'default';
}

// Load all resumes from localStorage
function loadAllResumes() {
    const data = localStorage.getItem('allResumes');
    if (!data) {
        return [];
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Error loading resumes:', e);
        return [];
    }
}

// Save all resumes to localStorage
function saveAllResumes(resumes) {
    localStorage.setItem('allResumes', JSON.stringify(resumes));
}

// Load specific resume by ID
function loadResumeById(id) {
    const resumes = loadAllResumes();
    return resumes.find(r => r.id === id);
}

// Save specific resume
function saveResumeData(id, data) {
    const resumes = loadAllResumes();
    const index = resumes.findIndex(r => r.id === id);
    
    if (index >= 0) {
        // Update existing
        resumes[index] = { ...resumes[index], ...data, id: id };
    } else {
        // Create new
        resumes.push({ id: id, ...data });
    }
    
    saveAllResumes(resumes);
}

// Initialize resume page with data
function initializeResumePage() {
    const resumeId = getCurrentResumeId();
    let resumeData = loadResumeById(resumeId);
    
    // If resume doesn't exist, redirect to home
    if (!resumeData && resumeId !== 'default') {
        window.location.href = 'index.html';
        return;
    }
    
    // If no resume data, this is legacy or first load - use default
    if (!resumeData) {
        return;
    }
    
    // Update page title
    document.getElementById('page-title').textContent = `Resume - ${resumeData.name}`;
    
    // Load contact data
    if (resumeData.contact) {
        loadContactFromData(resumeData.contact);
    }
    
    // Load photo
    if (resumeData.photo) {
        const photo = document.querySelector('.photo');
        const preview = document.getElementById('photo-preview');
        if (photo) photo.src = resumeData.photo;
        if (preview) preview.src = resumeData.photo;
    }
    
    // Load photo visibility
    if (resumeData.photoVisible !== undefined) {
        const photoContainer = document.querySelector('.photo-container');
        if (!resumeData.photoVisible && photoContainer) {
            photoContainer.style.display = 'none';
        }
    }
    
    // Load theme
    if (resumeData.theme) {
        const page = document.querySelector('.resume-page');
        if (page) {
            page.className = `resume-page ${resumeData.theme} ${resumeData.langMode || 'lang-mode-both'}`;
        }
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.value = resumeData.theme.replace('theme-', '');
        }
    }
    
    // Load language mode
    if (resumeData.langMode) {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            const mode = resumeData.langMode.replace('lang-mode-', '');
            langSelect.value = mode;
        }
    }
    
    // Load sections
    if (resumeData.sections) {
        loadSectionsFromData(resumeData.sections);
    }
}

// Load contact data into DOM
function loadContactFromData(contact) {
    const fields = ['name', 'age', 'city', 'phone', 'whatsapp', 'email'];
    fields.forEach(field => {
        const element = document.getElementById(`contact-${field}`);
        if (element && contact[field]) {
            element.textContent = contact[field];
        }
        
        // Also update form fields
        const editElement = document.getElementById(`edit-${field}`);
        if (editElement && contact[field]) {
            editElement.value = contact[field];
        }
    });
    
    // Update QR code (if function exists)
    if (typeof updateQRCode === 'function') {
        updateQRCode();
    }
}

// Load sections data into DOM
function loadSectionsFromData(sections) {
    // Profile
    if (sections.profile) {
        const profileDe = document.querySelector('.profile-text.lang-de');
        const profileEn = document.querySelector('.profile-text.lang-en');
        if (profileDe) profileDe.textContent = sections.profile.de || '';
        if (profileEn) profileEn.textContent = sections.profile.en || '';
    }
    
    // Skills
    if (sections.skills) {
        loadListSection('.skills-list.lang-de', sections.skills.de || []);
        loadListSection('.skills-list.lang-en', sections.skills.en || []);
    }
    
    // Languages
    if (sections.languages) {
        loadListSection('.languages-list.lang-de', sections.languages.de || []);
        loadListSection('.languages-list.lang-en', sections.languages.en || []);
    }
    
    // Hobbies
    if (sections.hobbies) {
        loadListSection('.hobbies-list.lang-de', sections.hobbies.de || []);
        loadListSection('.hobbies-list.lang-en', sections.hobbies.en || []);
    }
    
    // Experience
    if (sections.experience_items) {
        loadExperienceItems(sections.experience_items);
    }
}

// Load list section (skills, languages, hobbies)
function loadListSection(selector, items) {
    const ul = document.querySelector(selector);
    if (!ul) return;
    
    ul.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

// Load experience items
function loadExperienceItems(items) {
    const containerDe = document.querySelector('.lang-de .experience-container');
    const containerEn = document.querySelector('.lang-en .experience-container');
    
    if (containerDe) {
        containerDe.innerHTML = items.map(item => `
            <div class="experience-item">
                <div class="item-header">
                    <h3>${item.title_de || ''}</h3>
                    <span class="item-date">${item.date || ''}</span>
                </div>
                <p class="item-description">${item.description_de || ''}</p>
            </div>
        `).join('');
    }
    
    if (containerEn) {
        containerEn.innerHTML = items.map(item => `
            <div class="experience-item">
                <div class="item-header">
                    <h3>${item.title_en || ''}</h3>
                    <span class="item-date">${item.date || ''}</span>
                </div>
                <p class="item-description">${item.description_en || ''}</p>
            </div>
        `).join('');
    }
}

// Override save functions to save to current resume
const originalSaveContact = window.saveContactInfo;
window.saveContactInfo = function() {
    if (originalSaveContact) {
        originalSaveContact();
    }
    
    // Save to current resume
    const resumeId = getCurrentResumeId();
    const contact = {
        name: document.getElementById('edit-name').value,
        age: document.getElementById('edit-age').value,
        city: document.getElementById('edit-city').value,
        phone: document.getElementById('edit-phone').value,
        whatsapp: document.getElementById('edit-whatsapp').value,
        email: document.getElementById('edit-email').value
    };
    
    saveResumeData(resumeId, { contact });
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResumePage);
} else {
    initializeResumePage();
}

// Helper function to save current resume data
window.saveCurrentResumeData = function(updates) {
    const resumeId = getCurrentResumeId();
    if (!resumeId || resumeId === 'default') return; // Don't save for legacy mode
    
    saveResumeData(resumeId, updates);
};

// Helper function to get current resume data
window.getCurrentResumeData = function() {
    const resumeId = getCurrentResumeId();
    if (!resumeId || resumeId === 'default') return null;
    
    return loadResumeById(resumeId);
};

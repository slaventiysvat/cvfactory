// ============================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================
let CONTACT = {
    name: 'Your Name',
    age: 29,
    city: 'Vienna',
    phone: '+43 XXX XXX XXXX',
    whatsapp: '+43 XXX XXX XXXX',
    email: 'email@example.com'
};

// Load contact from localStorage if exists
function loadContactFromStorage() {
    const savedContact = localStorage.getItem('resumeContact');
    if (savedContact) {
        try {
            CONTACT = JSON.parse(savedContact);
            console.log('Loaded contact from storage:', CONTACT);
        } catch (e) {
            console.error('Error loading contact:', e);
        }
    }
    
    // Load photo if exists
    loadPhotoFromStorage();
}

// Load photo from localStorage
function loadPhotoFromStorage() {
    const savedPhoto = localStorage.getItem('resumePhoto');
    if (savedPhoto && savedPhoto !== 'false' && savedPhoto.startsWith('data:image')) {
        updatePhotoDisplay(savedPhoto);
    }
}

// Save photo to localStorage
function savePhotoToStorage(photoData) {
    // Check if we're using the new resume system
    if (window.saveCurrentResumeData) {
        window.saveCurrentResumeData({ photo: photoData });
    } else {
        // Legacy mode
        localStorage.setItem('resumePhoto', photoData);
    }
    console.log('Photo saved to storage');
}

// Update photo display on all resume pages
function updatePhotoDisplay(photoSrc) {
    const photoElements = document.querySelectorAll('.photo');
    photoElements.forEach(photo => {
        photo.src = photoSrc;
    });
}

// Save contact to localStorage
function saveContactToStorage() {
    // Check if we're using the new resume system
    if (window.saveCurrentResumeData) {
        window.saveCurrentResumeData({ contact: CONTACT });
    } else {
        // Legacy mode
        localStorage.setItem('resumeContact', JSON.stringify(CONTACT));
    }
    console.log('Contact saved to storage');
}

// Load contact on startup
loadContactFromStorage();

// ============================================
// SECTION CONTENT MANAGEMENT
// ============================================
let SECTION_DATA = {
    profile_de: '',
    profile_en: '',
    skills_de: [],
    skills_en: [],
    languages_de: [],
    languages_en: [],
    hobbies_de: [],
    hobbies_en: [],
    experience_items: []
};

// Load section data from localStorage
function loadSectionData() {
    // Check if we're using the new resume system
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id');
    
    // For new resume system, sections are already loaded by resume-loader.js
    if (resumeId) {
        console.log('Using new resume system, sections loaded by resume-loader');
        return;
    }
    
    // Legacy mode: load from old localStorage key
    const saved = localStorage.getItem('resumeSections');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(SECTION_DATA, parsed);
            console.log('Loaded section data from storage');
            applySectionData();
        } catch (e) {
            console.error('Error loading section data:', e);
        }
    } else {
        // First time - load from page
        const profileDe = document.querySelector('.profile-text.lang-de');
        const profileEn = document.querySelector('.profile-text.lang-en');
        if (profileDe) SECTION_DATA.profile_de = profileDe.textContent.trim();
        if (profileEn) SECTION_DATA.profile_en = profileEn.textContent.trim();
        
        const skillsDe = document.querySelectorAll('.skills-list.lang-de li');
        const skillsEn = document.querySelectorAll('.skills-list.lang-en li');
        SECTION_DATA.skills_de = Array.from(skillsDe).map(li => li.textContent.trim());
        SECTION_DATA.skills_en = Array.from(skillsEn).map(li => li.textContent.trim());
        
        const langsDe = document.querySelectorAll('.languages-list.lang-de li');
        const langsEn = document.querySelectorAll('.languages-list.lang-en li');
        SECTION_DATA.languages_de = Array.from(langsDe).map(li => li.textContent.trim());
        SECTION_DATA.languages_en = Array.from(langsEn).map(li => li.textContent.trim());
        
        const hobbiesDe = document.querySelectorAll('.hobbies-list.lang-de li');
        const hobbiesEn = document.querySelectorAll('.hobbies-list.lang-en li');
        SECTION_DATA.hobbies_de = Array.from(hobbiesDe).map(li => li.textContent.trim());
        SECTION_DATA.hobbies_en = Array.from(hobbiesEn).map(li => li.textContent.trim());
        
        // Load experience items from page
        const experienceItemsDe = document.querySelectorAll('.lang-de .experience-item');
        SECTION_DATA.experience_items = Array.from(experienceItemsDe).map(item => {
            const titleDe = item.querySelector('h3')?.textContent.trim() || '';
            const date = item.querySelector('.item-date')?.textContent.trim() || '';
            const descDe = item.querySelector('.item-description')?.textContent.trim() || '';
            return { title_de: titleDe, title_en: '', date: date, description_de: descDe, description_en: '' };
        });
        
        // Match with English versions
        const experienceItemsEn = document.querySelectorAll('.lang-en .experience-item');
        experienceItemsEn.forEach((item, index) => {
            if (SECTION_DATA.experience_items[index]) {
                SECTION_DATA.experience_items[index].title_en = item.querySelector('h3')?.textContent.trim() || '';
                SECTION_DATA.experience_items[index].description_en = item.querySelector('.item-description')?.textContent.trim() || '';
            }
        });
        
        // Save initial data
        saveSectionData();
    }
}

// Save section data to localStorage
function saveSectionData() {
    // Check if we're using the new resume system
    if (window.saveCurrentResumeData) {
        window.saveCurrentResumeData({ 
            sections: {
                profile: {
                    de: SECTION_DATA.profile_de,
                    en: SECTION_DATA.profile_en
                },
                experience_items: SECTION_DATA.experience_items,
                skills: {
                    de: SECTION_DATA.skills_de,
                    en: SECTION_DATA.skills_en
                },
                languages: {
                    de: SECTION_DATA.languages_de,
                    en: SECTION_DATA.languages_en
                },
                hobbies: {
                    de: SECTION_DATA.hobbies_de,
                    en: SECTION_DATA.hobbies_en
                }
            }
        });
    } else {
        // Legacy mode
        localStorage.setItem('resumeSections', JSON.stringify(SECTION_DATA));
    }
    console.log('Section data saved');
}

// Apply section data to page
function applySectionData() {
    // Update Profile
    const profileDe = document.querySelector('.profile-text.lang-de');
    const profileEn = document.querySelector('.profile-text.lang-en');
    if (profileDe && SECTION_DATA.profile_de) profileDe.textContent = SECTION_DATA.profile_de;
    if (profileEn && SECTION_DATA.profile_en) profileEn.textContent = SECTION_DATA.profile_en;
    
    // Update Skills
    const skillsDe = document.querySelector('.skills-list.lang-de');
    const skillsEn = document.querySelector('.skills-list.lang-en');
    if (skillsDe && SECTION_DATA.skills_de) {
        skillsDe.innerHTML = SECTION_DATA.skills_de.map(skill => `<li>${skill}</li>`).join('');
    }
    if (skillsEn && SECTION_DATA.skills_en) {
        skillsEn.innerHTML = SECTION_DATA.skills_en.map(skill => `<li>${skill}</li>`).join('');
    }
    
    // Update Languages
    const langsDe = document.querySelector('.languages-list.lang-de');
    const langsEn = document.querySelector('.languages-list.lang-en');
    if (langsDe && SECTION_DATA.languages_de) {
        langsDe.innerHTML = SECTION_DATA.languages_de.map(lang => `<li>${lang}</li>`).join('');
    }
    if (langsEn && SECTION_DATA.languages_en) {
        langsEn.innerHTML = SECTION_DATA.languages_en.map(lang => `<li>${lang}</li>`).join('');
    }
    
    // Update Hobbies
    const hobbiesDe = document.querySelector('.hobbies-list.lang-de');
    const hobbiesEn = document.querySelector('.hobbies-list.lang-en');
    if (hobbiesDe && SECTION_DATA.hobbies_de) {
        hobbiesDe.innerHTML = SECTION_DATA.hobbies_de.map(hobby => `<li>${hobby}</li>`).join('');
    }
    if (hobbiesEn && SECTION_DATA.hobbies_en) {
        hobbiesEn.innerHTML = SECTION_DATA.hobbies_en.map(hobby => `<li>${hobby}</li>`).join('');
    }
}

// ============================================
// QR CODE - Uses simple SVG pattern
// ============================================
function generateQRCode(text, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create a simple QR code placeholder with contact info
    const vCardText = text.substring(0, 50) + '...'; // Short preview
    
    container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 33 33">
            <rect width="33" height="33" fill="#ffffff"/>
            
            <!-- Top-left finder pattern -->
            <rect x="0" y="0" width="9" height="9" fill="#000000"/>
            <rect x="1" y="1" width="7" height="7" fill="#ffffff"/>
            <rect x="2" y="2" width="5" height="5" fill="#000000"/>
            <rect x="3" y="3" width="3" height="3" fill="#ffffff"/>
            <rect x="4" y="4" width="1" height="1" fill="#000000"/>
            
            <!-- Top-right finder pattern -->
            <rect x="24" y="0" width="9" height="9" fill="#000000"/>
            <rect x="25" y="1" width="7" height="7" fill="#ffffff"/>
            <rect x="26" y="2" width="5" height="5" fill="#000000"/>
            <rect x="27" y="3" width="3" height="3" fill="#ffffff"/>
            <rect x="28" y="4" width="1" height="1" fill="#000000"/>
            
            <!-- Bottom-left finder pattern -->
            <rect x="0" y="24" width="9" height="9" fill="#000000"/>
            <rect x="1" y="25" width="7" height="7" fill="#ffffff"/>
            <rect x="2" y="26" width="5" height="5" fill="#000000"/>
            <rect x="3" y="27" width="3" height="3" fill="#ffffff"/>
            <rect x="4" y="28" width="1" height="1" fill="#000000"/>
            
            <!-- Timing patterns -->
            <rect x="8" y="6" width="1" height="1" fill="#000000"/>
            <rect x="10" y="6" width="1" height="1" fill="#000000"/>
            <rect x="12" y="6" width="1" height="1" fill="#000000"/>
            <rect x="14" y="6" width="1" height="1" fill="#000000"/>
            <rect x="16" y="6" width="1" height="1" fill="#000000"/>
            <rect x="18" y="6" width="1" height="1" fill="#000000"/>
            <rect x="20" y="6" width="1" height="1" fill="#000000"/>
            <rect x="22" y="6" width="1" height="1" fill="#000000"/>
            
            <rect x="6" y="8" width="1" height="1" fill="#000000"/>
            <rect x="6" y="10" width="1" height="1" fill="#000000"/>
            <rect x="6" y="12" width="1" height="1" fill="#000000"/>
            <rect x="6" y="14" width="1" height="1" fill="#000000"/>
            <rect x="6" y="16" width="1" height="1" fill="#000000"/>
            <rect x="6" y="18" width="1" height="1" fill="#000000"/>
            <rect x="6" y="20" width="1" height="1" fill="#000000"/>
            <rect x="6" y="22" width="1" height="1" fill="#000000"/>
            
            <!-- Data pattern (simplified representation) -->
            <rect x="10" y="10" width="1" height="1" fill="#000000"/>
            <rect x="11" y="10" width="1" height="1" fill="#000000"/>
            <rect x="12" y="10" width="1" height="1" fill="#000000"/>
            <rect x="13" y="10" width="1" height="1" fill="#000000"/>
            <rect x="10" y="11" width="1" height="1" fill="#000000"/>
            <rect x="13" y="11" width="1" height="1" fill="#000000"/>
            <rect x="10" y="12" width="1" height="1" fill="#000000"/>
            <rect x="11" y="12" width="1" height="1" fill="#000000"/>
            <rect x="12" y="12" width="1" height="1" fill="#000000"/>
            <rect x="13" y="12" width="1" height="1" fill="#000000"/>
            
            <rect x="15" y="15" width="8" height="8" fill="#000000"/>
            <rect x="16" y="16" width="6" height="6" fill="#ffffff"/>
            <rect x="17" y="17" width="4" height="4" fill="#000000"/>
            <rect x="18" y="18" width="2" height="2" fill="#ffffff"/>
            
            <!-- More data patterns -->
            <rect x="10" y="15" width="1" height="1" fill="#000000"/>
            <rect x="11" y="16" width="1" height="1" fill="#000000"/>
            <rect x="12" y="17" width="1" height="1" fill="#000000"/>
            <rect x="10" y="18" width="1" height="1" fill="#000000"/>
            <rect x="11" y="19" width="1" height="1" fill="#000000"/>
            <rect x="12" y="20" width="1" height="1" fill="#000000"/>
            <rect x="10" y="21" width="1" height="1" fill="#000000"/>
            <rect x="11" y="22" width="1" height="1" fill="#000000"/>
            
            <rect x="24" y="10" width="1" height="1" fill="#000000"/>
            <rect x="25" y="11" width="1" height="1" fill="#000000"/>
            <rect x="26" y="12" width="1" height="1" fill="#000000"/>
            <rect x="27" y="13" width="1" height="1" fill="#000000"/>
            <rect x="28" y="14" width="1" height="1" fill="#000000"/>
            <rect x="29" y="15" width="1" height="1" fill="#000000"/>
            
            <!-- Format info -->
            <rect x="8" y="8" width="1" height="1" fill="#000000"/>
            <rect x="24" y="24" width="1" height="1" fill="#000000"/>
        </svg>
    `;
}

// ============================================
// VCARD GENERATOR
// ============================================
function generateVCard(contact) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phone}
TEL;TYPE=WHATSAPP:${contact.whatsapp}
EMAIL:${contact.email}
ADR;TYPE=HOME:;;${contact.city};;;Austria;
END:VCARD`;
}

// ============================================
// RESUME FUNCTIONALITY
// ============================================
function initResume() {
    try {
        // Generate QR Code with vCard
        const vCard = generateVCard(CONTACT);
        generateQRCode(vCard, 'qr-code');
        
        // Populate contact information
        const elements = {
            'contact-name': CONTACT.name,
            'contact-age': CONTACT.age,
            'contact-city': CONTACT.city,
            'contact-phone': CONTACT.phone,
            'contact-whatsapp': CONTACT.whatsapp,
            'contact-email': CONTACT.email
        };
        
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
        
        // Load saved preferences
        loadPreferences();
        
        // Load section data
        loadSectionData();
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Resume initialized successfully');
    } catch (error) {
        console.error('Error initializing resume:', error);
    }
}

function loadPreferences() {
    // Check if we're using the new resume system
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id');
    
    // For new resume system, preferences are already loaded by resume-loader.js
    if (resumeId) {
        console.log('Using new resume system, preferences loaded by resume-loader');
        return;
    }
    
    // Legacy mode: load from old localStorage keys
    const theme = localStorage.getItem('resumeTheme') || 'clean';
    const langMode = localStorage.getItem('resumeLangMode') || 'both';
    const photoVisible = localStorage.getItem('resumePhotoVisible');
    
    console.log('Loading preferences (legacy mode):', { theme, langMode, photoVisible });
    
    setTheme(theme);
    setLanguageMode(langMode);
    setPhotoVisibility(photoVisible !== 'false');
}

function setupEventListeners() {
    // Theme toggle
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            setTheme(e.target.value);
            // Save to appropriate location
            if (window.saveCurrentResumeData) {
                window.saveCurrentResumeData({ theme: `theme-${e.target.value}` });
            } else {
                localStorage.setItem('resumeTheme', e.target.value);
            }
        });
    }
    
    // Language toggle
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguageMode(e.target.value);
            // Save to appropriate location
            if (window.saveCurrentResumeData) {
                window.saveCurrentResumeData({ langMode: `lang-mode-${e.target.value}` });
            } else {
                localStorage.setItem('resumeLangMode', e.target.value);
            }
        });
    }
    
    // Photo toggle
    const photoToggle = document.getElementById('photo-toggle');
    if (photoToggle) {
        photoToggle.addEventListener('click', () => {
            const resumePage = document.querySelector('.resume-page');
            const isHidden = resumePage.classList.contains('photo-hidden');
            setPhotoVisibility(!isHidden);
            // Save to appropriate location
            if (window.saveCurrentResumeData) {
                window.saveCurrentResumeData({ photoVisible: !isHidden });
            } else {
                localStorage.setItem('resumePhotoVisible', !isHidden);
            }
        });
    }
    
    // PDF export
    const pdfBtn = document.getElementById('export-pdf');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Edit contact button
    const editBtn = document.getElementById('edit-contact');
    if (editBtn) {
        editBtn.addEventListener('click', openEditModal);
    }
    
    // Close modal
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', closeEditModal);
    }
    
    // Save contact form
    const saveContactBtn = document.getElementById('save-contact');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', saveContact);
    }
    
    // Close modal on outside click
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEditModal();
            }
        });
    }
    
    // Photo upload handler
    const photoInput = document.getElementById('photo-upload');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
    
    // Remove photo button
    const removePhotoBtn = document.getElementById('remove-photo');
    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', removePhoto);
    }
    
    // Section edit buttons
    setupSectionEditButtons();
}

function setupSectionEditButtons() {
    // Profile edit
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => openSectionModal('profile'));
    }
    
    // Skills edit
    const editSkillsBtn = document.getElementById('edit-skills-btn');
    if (editSkillsBtn) {
        editSkillsBtn.addEventListener('click', () => openSectionModal('skills'));
    }
    
    // Languages edit
    const editLanguagesBtn = document.getElementById('edit-languages-btn');
    if (editLanguagesBtn) {
        editLanguagesBtn.addEventListener('click', () => openSectionModal('languages'));
    }
    
    // Hobbies edit
    const editHobbiesBtn = document.getElementById('edit-hobbies-btn');
    if (editHobbiesBtn) {
        editHobbiesBtn.addEventListener('click', () => openSectionModal('hobbies'));
    }
    
    // Experience edit
    const editExperienceBtn = document.getElementById('edit-experience-btn');
    if (editExperienceBtn) {
        editExperienceBtn.addEventListener('click', () => openSectionModal('experience'));
    }
    
    // Close section modal
    const closeSectionModal = document.getElementById('close-section-modal');
    if (closeSectionModal) {
        closeSectionModal.addEventListener('click', closeSectionEditModal);
    }
    
    // Save section
    const saveSectionBtn = document.getElementById('save-section');
    if (saveSectionBtn) {
        saveSectionBtn.addEventListener('click', saveSectionContent);
    }
}

function setTheme(theme) {
    const resumePage = document.querySelector('.resume-page');
    const themeSelect = document.getElementById('theme-select');
    
    console.log('Setting theme to:', theme);
    
    if (resumePage) {
        resumePage.classList.remove('theme-clean', 'theme-elegant');
        resumePage.classList.add(`theme-${theme}`);
        console.log('Resume page classes:', resumePage.className);
    }
    
    if (themeSelect) {
        themeSelect.value = theme;
    }
}

function setLanguageMode(mode) {
    const resumePage = document.querySelector('.resume-page');
    const langSelect = document.getElementById('lang-select');
    
    console.log('Setting language mode to:', mode);
    
    if (resumePage) {
        resumePage.classList.remove('lang-mode-de', 'lang-mode-en', 'lang-mode-both');
        resumePage.classList.add(`lang-mode-${mode}`);
        console.log('Resume page classes:', resumePage.className);
    }
    
    if (langSelect) {
        langSelect.value = mode;
    }
}

function setPhotoVisibility(visible) {
    const resumePage = document.querySelector('.resume-page');
    const photoToggle = document.getElementById('photo-toggle');
    
    if (resumePage) {
        if (visible) {
            resumePage.classList.remove('photo-hidden');
        } else {
            resumePage.classList.add('photo-hidden');
        }
    }
    
    if (photoToggle) {
        photoToggle.textContent = visible ? 'Hide Photo' : 'Show Photo';
    }
}

// ============================================
// EDIT CONTACT MODAL
// ============================================
function openEditModal() {
    const modal = document.getElementById('edit-modal');
    if (!modal) return;
    
    // Populate form with current values
    document.getElementById('edit-name').value = CONTACT.name;
    document.getElementById('edit-age').value = CONTACT.age;
    document.getElementById('edit-city').value = CONTACT.city;
    document.getElementById('edit-phone').value = CONTACT.phone;
    document.getElementById('edit-whatsapp').value = CONTACT.whatsapp;
    document.getElementById('edit-email').value = CONTACT.email;
    
    // Update photo preview
    const savedPhoto = localStorage.getItem('resumePhoto');
    const photoPreview = document.getElementById('photo-preview');
    if (savedPhoto && photoPreview) {
        photoPreview.src = savedPhoto;
        photoPreview.style.display = 'block';
    }
    
    modal.style.display = 'flex';
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, etc.)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const photoData = e.target.result;
        
        // Update preview in modal
        const photoPreview = document.getElementById('photo-preview');
        if (photoPreview) {
            photoPreview.src = photoData;
            photoPreview.style.display = 'block';
        }
        
        // Save to localStorage
        savePhotoToStorage(photoData);
        
        // Update photo on page immediately
        updatePhotoDisplay(photoData);
        
        console.log('Photo uploaded successfully');
    };
    
    reader.readAsDataURL(file);
}

function removePhoto() {
    if (confirm('Are you sure you want to remove the photo?')) {
        // Remove from localStorage
        localStorage.removeItem('resumePhoto');
        
        // Reset to placeholder
        const placeholderSrc = 'assets/photo-placeholder.svg';
        updatePhotoDisplay(placeholderSrc);
        
        // Update preview in modal
        const photoPreview = document.getElementById('photo-preview');
        if (photoPreview) {
            photoPreview.src = placeholderSrc;
        }
        
        // Clear file input
        const photoInput = document.getElementById('photo-upload');
        if (photoInput) {
            photoInput.value = '';
        }
        
        console.log('Photo removed');
    }
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function saveContact() {
    // Get values from form
    CONTACT.name = document.getElementById('edit-name').value;
    CONTACT.age = parseInt(document.getElementById('edit-age').value) || 29;
    CONTACT.city = document.getElementById('edit-city').value;
    CONTACT.phone = document.getElementById('edit-phone').value;
    CONTACT.whatsapp = document.getElementById('edit-whatsapp').value;
    CONTACT.email = document.getElementById('edit-email').value;
    
    // Save to localStorage
    saveContactToStorage();
    
    // Update all fields on page
    updateContactFields();
    
    // Regenerate QR code
    const vCard = generateVCard(CONTACT);
    generateQRCode(vCard, 'qr-code');
    
    // Close modal
    closeEditModal();
    
    console.log('Contact updated:', CONTACT);
}

function updateContactFields() {
    const elements = {
        'contact-name': CONTACT.name,
        'contact-age': CONTACT.age,
        'contact-city': CONTACT.city,
        'contact-phone': CONTACT.phone,
        'contact-whatsapp': CONTACT.whatsapp,
        'contact-email': CONTACT.email
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResume);
} else {
    initResume();
}

// ============================================
// SECTION EDITING
// ============================================

let currentEditSection = null;

function openSectionModal(sectionName) {
    currentEditSection = sectionName;
    const modal = document.getElementById('section-edit-modal');
    const modalTitle = document.getElementById('section-modal-title');
    const formContainer = document.getElementById('section-form-container');
    
    if (!modal || !modalTitle || !formContainer) return;
    
    // Set title
    const titles = {
        profile: 'Edit Profile / Profil bearbeiten',
        skills: 'Edit Skills / Fähigkeiten bearbeiten',
        languages: 'Edit Languages / Sprachen bearbeiten',
        hobbies: 'Edit Hobbies / Hobbys bearbeiten',
        experience: 'Edit Work Experience / Berufserfahrung bearbeiten'
    };
    modalTitle.textContent = titles[sectionName] || 'Edit Section';
    
    // Clear form
    formContainer.innerHTML = '';
    
    // Create form based on section type
    if (sectionName === 'profile') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="section-de">German Text / Deutscher Text:</label>
                <textarea id="section-de" class="form-control" rows="4">${SECTION_DATA.profile_de || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="section-en">English Text / Englischer Text:</label>
                <textarea id="section-en" class="form-control" rows="4">${SECTION_DATA.profile_en || ''}</textarea>
            </div>
        `;
    } else if (sectionName === 'skills') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="section-de">German Skills (one per line) / Deutsche Fähigkeiten (eine pro Zeile):</label>
                <textarea id="section-de" class="form-control" rows="6">${SECTION_DATA.skills_de ? SECTION_DATA.skills_de.join('\n') : ''}</textarea>
            </div>
            <div class="form-group">
                <label for="section-en">English Skills (one per line) / Englische Fähigkeiten (eine pro Zeile):</label>
                <textarea id="section-en" class="form-control" rows="6">${SECTION_DATA.skills_en ? SECTION_DATA.skills_en.join('\n') : ''}</textarea>
            </div>
        `;
    } else if (sectionName === 'languages') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="section-de">German Languages (one per line) / Deutsche Sprachen (eine pro Zeile):</label>
                <textarea id="section-de" class="form-control" rows="4">${SECTION_DATA.languages_de ? SECTION_DATA.languages_de.join('\n') : ''}</textarea>
            </div>
            <div class="form-group">
                <label for="section-en">English Languages (one per line) / Englische Sprachen (eine pro Zeile):</label>
                <textarea id="section-en" class="form-control" rows="4">${SECTION_DATA.languages_en ? SECTION_DATA.languages_en.join('\n') : ''}</textarea>
            </div>
        `;
    } else if (sectionName === 'hobbies') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="section-de">German Hobbies (one per line) / Deutsche Hobbys (eine pro Zeile):</label>
                <textarea id="section-de" class="form-control" rows="4">${SECTION_DATA.hobbies_de ? SECTION_DATA.hobbies_de.join('\n') : ''}</textarea>
            </div>
            <div class="form-group">
                <label for="section-en">English Hobbies (one per line) / Englische Hobbys (eine pro Zeile):</label>
                <textarea id="section-en" class="form-control" rows="4">${SECTION_DATA.hobbies_en ? SECTION_DATA.hobbies_en.join('\n') : ''}</textarea>
            </div>
        `;
    } else if (sectionName === 'experience') {
        // Experience editing with multiple items
        let html = '<div id="experience-items-container">';
        
        if (SECTION_DATA.experience_items && SECTION_DATA.experience_items.length > 0) {
            SECTION_DATA.experience_items.forEach((item, index) => {
                html += createExperienceItemForm(item, index);
            });
        } else {
            html += createExperienceItemForm({title_de: '', title_en: '', date: '', description_de: '', description_en: ''}, 0);
        }
        
        html += '</div>';
        html += '<button type="button" class="btn-add-experience" onclick="addExperienceItem()">+ Add Experience Item</button>';
        
        formContainer.innerHTML = html;
    }
    
    modal.classList.add('active');
}

function createExperienceItemForm(item, index) {
    return `
        <div class="experience-item-form" data-index="${index}">
            <div class="experience-item-header">
                <h4>Experience Item ${index + 1}</h4>
                <button type="button" class="btn-remove-item" onclick="removeExperienceItem(${index})">✕</button>
            </div>
            <div class="form-group">
                <label>Job Title (German):</label>
                <input type="text" class="exp-title-de" value="${item.title_de || ''}" placeholder="z.B. Hotelreinigung">
            </div>
            <div class="form-group">
                <label>Job Title (English):</label>
                <input type="text" class="exp-title-en" value="${item.title_en || ''}" placeholder="e.g. Hotel Cleaner">
            </div>
            <div class="form-group">
                <label>Date / Period:</label>
                <input type="text" class="exp-date" value="${item.date || ''}" placeholder="2024–2025 (4 Monate)">
            </div>
            <div class="form-group">
                <label>Description (German):</label>
                <textarea class="exp-desc-de" rows="3" placeholder="Beschreibung der Aufgaben...">${item.description_de || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Description (English):</label>
                <textarea class="exp-desc-en" rows="3" placeholder="Description of tasks...">${item.description_en || ''}</textarea>
            </div>
        </div>
    `;
}

window.addExperienceItem = function() {
    const container = document.getElementById('experience-items-container');
    if (!container) return;
    
    const index = container.children.length;
    const newItemHtml = createExperienceItemForm({title_de: '', title_en: '', date: '', description_de: '', description_en: ''}, index);
    container.insertAdjacentHTML('beforeend', newItemHtml);
};

window.removeExperienceItem = function(index) {
    const item = document.querySelector(`.experience-item-form[data-index="${index}"]`);
    if (item) {
        item.remove();
        // Re-index remaining items
        document.querySelectorAll('.experience-item-form').forEach((form, newIndex) => {
            form.setAttribute('data-index', newIndex);
            const header = form.querySelector('h4');
            if (header) header.textContent = `Experience Item ${newIndex + 1}`;
        });
    };
    
    modal.classList.add('active');
}

function closeSectionEditModal() {
    const modal = document.getElementById('section-edit-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentEditSection = null;
}

function saveSectionContent() {
    if (!currentEditSection) return;
    
    const deText = document.getElementById('section-de')?.value || '';
    const enText = document.getElementById('section-en')?.value || '';
    
    // Save based on section type
    if (currentEditSection === 'profile') {
        SECTION_DATA.profile_de = deText;
        SECTION_DATA.profile_en = enText;
        
        // Update on page
        const profileDe = document.querySelector('.profile-text.lang-de');
        const profileEn = document.querySelector('.profile-text.lang-en');
        if (profileDe) profileDe.textContent = deText;
        if (profileEn) profileEn.textContent = enText;
        
    } else if (currentEditSection === 'skills') {
        SECTION_DATA.skills_de = deText.split('\n').filter(line => line.trim());
        SECTION_DATA.skills_en = enText.split('\n').filter(line => line.trim());
        
        // Update on page
        const skillsDe = document.querySelector('.skills-list.lang-de');
        const skillsEn = document.querySelector('.skills-list.lang-en');
        if (skillsDe) {
            skillsDe.innerHTML = SECTION_DATA.skills_de.map(skill => `<li>${skill}</li>`).join('');
        }
        if (skillsEn) {
            skillsEn.innerHTML = SECTION_DATA.skills_en.map(skill => `<li>${skill}</li>`).join('');
        }
        
    } else if (currentEditSection === 'languages') {
        SECTION_DATA.languages_de = deText.split('\n').filter(line => line.trim());
        SECTION_DATA.languages_en = enText.split('\n').filter(line => line.trim());
        
        // Update on page
        const langsDe = document.querySelector('.languages-list.lang-de');
        const langsEn = document.querySelector('.languages-list.lang-en');
        if (langsDe) {
            langsDe.innerHTML = SECTION_DATA.languages_de.map(lang => `<li>${lang}</li>`).join('');
        }
        if (langsEn) {
            langsEn.innerHTML = SECTION_DATA.languages_en.map(lang => `<li>${lang}</li>`).join('');
        }
        
    } else if (currentEditSection === 'hobbies') {
        SECTION_DATA.hobbies_de = deText.split('\n').filter(line => line.trim());
        SECTION_DATA.hobbies_en = enText.split('\n').filter(line => line.trim());
        
        // Update on page
        const hobbiesDe = document.querySelector('.hobbies-list.lang-de');
        const hobbiesEn = document.querySelector('.hobbies-list.lang-en');
        if (hobbiesDe) {
            hobbiesDe.innerHTML = SECTION_DATA.hobbies_de.map(hobby => `<li>${hobby}</li>`).join('');
        }
        if (hobbiesEn) {
            hobbiesEn.innerHTML = SECTION_DATA.hobbies_en.map(hobby => `<li>${hobby}</li>`).join('');
        }
        
    } else if (currentEditSection === 'experience') {
        // Collect all experience items from form
        const items = [];
        document.querySelectorAll('.experience-item-form').forEach(form => {
            const titleDe = form.querySelector('.exp-title-de')?.value.trim() || '';
            const titleEn = form.querySelector('.exp-title-en')?.value.trim() || '';
            const date = form.querySelector('.exp-date')?.value.trim() || '';
            const descDe = form.querySelector('.exp-desc-de')?.value.trim() || '';
            const descEn = form.querySelector('.exp-desc-en')?.value.trim() || '';
            
            if (titleDe || titleEn) { // Only add if at least one title is filled
                items.push({
                    title_de: titleDe,
                    title_en: titleEn,
                    date: date,
                    description_de: descDe,
                    description_en: descEn
                });
            }
        });
        
        SECTION_DATA.experience_items = items;
        
        // Update on page
        updateExperienceOnPage();
    }
    
    // Save to localStorage
    saveSectionData();
    
    // Close modal
    closeSectionEditModal();
}

function updateExperienceOnPage() {
    const expContainerDe = document.querySelector('.lang-de .experience-container');
    const expContainerEn = document.querySelector('.lang-en .experience-container');
    
    if (!expContainerDe || !expContainerEn) return;
    
    // Clear existing items
    expContainerDe.innerHTML = '';
    expContainerEn.innerHTML = '';
    
    // Add new items
    SECTION_DATA.experience_items.forEach(item => {
        // German version
        const itemDe = `
            <div class="experience-item">
                <div class="item-header">
                    <h3>${item.title_de}</h3>
                    <span class="item-date">${item.date}</span>
                </div>
                <p class="item-description">${item.description_de}</p>
            </div>
        `;
        expContainerDe.insertAdjacentHTML('beforeend', itemDe);
        
        // English version
        const itemEn = `
            <div class="experience-item">
                <div class="item-header">
                    <h3>${item.title_en}</h3>
                    <span class="item-date">${item.date}</span>
                </div>
                <p class="item-description">${item.description_en}</p>
            </div>
        `;
        expContainerEn.insertAdjacentHTML('beforeend', itemEn);
    });
}

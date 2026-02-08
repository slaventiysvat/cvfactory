// Index Manager - handles resume list and creation

let selectedTemplateId = null;
let renameResumeId = null;

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

// Initialize legacy resumes if they don't exist
function initializeLegacyResumes() {
    // Don't auto-create legacy resumes anymore
    // User can start fresh or manually add legacy files if needed
    console.log('Resume system initialized');
}

// Render resume cards
function renderResumeCards() {
    const container = document.getElementById('resume-cards');
    if (!container) return;
    
    const resumes = loadAllResumes();
    
    if (resumes.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: white; padding: 40px;">
                <p style="font-size: 1.2rem;">No resumes yet. Click "Create New Resume" to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = resumes.map(resume => `
        <div class="card-wrapper">
            <a href="${resume.isLegacy ? resume.legacyFile : `resume.html?id=${resume.id}`}" class="card">
                <div class="card-icon">${resume.emoji}</div>
                <h2>${resume.name}</h2>
                <p>${getTemplateDescription(resume.template)}</p>
            </a>
            <div class="card-actions">
                <button onclick="renameResume('${resume.id}')" title="Rename">✏️</button>
                <button onclick="duplicateResume('${resume.id}')" title="Duplicate">📋</button>
                <button onclick="deleteResume('${resume.id}')" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Get template description
function getTemplateDescription(templateId) {
    const descriptions = {
        'dental-practice': 'Professional dental assistant experience',
        'nanny-childcare': 'Childcare and family support services',
        'cleaning-hotel': 'Cleaning and housekeeping services',
        'warehouse-packing': 'Warehouse and logistics work',
        'software-engineer': 'Full-stack software development',
        'dsp-engineer': 'Digital signal processing expertise',
        'uav-engineer': 'UAV and autonomous systems',
        'hotel-supervisor': 'Hotel management and supervision',
        'massage-master': 'Professional massage therapy'
    };
    return descriptions[templateId] || 'Professional resume';
}

// Open create modal
function openCreateModal() {
    const modal = document.getElementById('create-modal');
    if (!modal) return;
    
    // Load templates
    const templateGrid = document.getElementById('template-grid');
    if (templateGrid) {
        const templates = getAllTemplates();
        templateGrid.innerHTML = templates.map(t => `
            <div class="template-option" onclick="selectTemplate('${t.id}')">
                <span class="emoji">${t.emoji}</span>
                <div class="name">${t.name}</div>
            </div>
        `).join('');
    }
    
    // Reset form
    document.getElementById('resume-name').value = '';
    document.getElementById('resume-emoji').value = '';
    selectedTemplateId = null;
    
    modal.classList.add('active');
}

// Close create modal
function closeCreateModal() {
    const modal = document.getElementById('create-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Select template
function selectTemplate(templateId) {
    selectedTemplateId = templateId;
    
    // Visual feedback
    document.querySelectorAll('.template-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.closest('.template-option').classList.add('selected');
    
    // Auto-fill name if empty
    const nameInput = document.getElementById('resume-name');
    if (!nameInput.value) {
        const template = getTemplateData(templateId);
        nameInput.value = template.name;
    }
}

// Create new resume
function createResume() {
    if (!selectedTemplateId) {
        alert('Please select a template');
        return;
    }
    
    const name = document.getElementById('resume-name').value.trim();
    if (!name) {
        alert('Please enter a resume name');
        return;
    }
    
    const customEmoji = document.getElementById('resume-emoji').value.trim();
    const templateData = getTemplateData(selectedTemplateId);
    const emoji = customEmoji || templateData.emoji;
    
    // Generate unique ID
    const id = 'resume-' + Date.now();
    
    // Create resume object with EMPTY data (user will fill it)
    const newResume = {
        id: id,
        name: name,
        emoji: emoji,
        template: selectedTemplateId,
        theme: 'theme-clean',
        langMode: 'lang-mode-both',
        photoVisible: true,
        contact: {
            name: 'Your Name',
            age: '',
            city: '',
            phone: '',
            whatsapp: '',
            email: ''
        },
        sections: {
            profile: {
                de: '',
                en: ''
            },
            experience_items: [],
            skills: {
                de: [],
                en: []
            },
            languages: {
                de: [],
                en: []
            },
            hobbies: {
                de: [],
                en: []
            }
        }
    };
    
    // Save resume
    const resumes = loadAllResumes();
    resumes.push(newResume);
    saveAllResumes(resumes);
    
    // Close modal and redirect
    closeCreateModal();
    window.location.href = `resume.html?id=${id}`;
}

// Duplicate resume
function duplicateResume(id) {
    const resumes = loadAllResumes();
    const original = resumes.find(r => r.id === id);
    if (!original) return;
    
    const copy = JSON.parse(JSON.stringify(original));
    copy.id = 'resume-' + Date.now();
    copy.name = original.name + ' (Copy)';
    copy.isLegacy = false;
    delete copy.legacyFile;
    
    resumes.push(copy);
    saveAllResumes(resumes);
    
    renderResumeCards();
}

// Delete resume
function deleteResume(id) {
    if (!confirm('Are you sure you want to delete this resume?')) {
        return;
    }
    
    const resumes = loadAllResumes();
    const filtered = resumes.filter(r => r.id !== id);
    saveAllResumes(filtered);
    
    renderResumeCards();
}

// Rename resume
function renameResume(id) {
    renameResumeId = id;
    const resumes = loadAllResumes();
    const resume = resumes.find(r => r.id === id);
    if (!resume) return;
    
    const modal = document.getElementById('rename-modal');
    const input = document.getElementById('rename-input');
    if (!modal || !input) return;
    
    input.value = resume.name;
    modal.classList.add('active');
}

// Close rename modal
function closeRenameModal() {
    const modal = document.getElementById('rename-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    renameResumeId = null;
}

// Save rename
function saveRename() {
    if (!renameResumeId) return;
    
    const newName = document.getElementById('rename-input').value.trim();
    if (!newName) {
        alert('Please enter a name');
        return;
    }
    
    const resumes = loadAllResumes();
    const resume = resumes.find(r => r.id === renameResumeId);
    if (resume) {
        resume.name = newName;
        saveAllResumes(resumes);
        renderResumeCards();
    }
    
    closeRenameModal();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLegacyResumes();
    renderResumeCards();
    
    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

// Export all resumes to JSON file
function exportAllResumes() {
    const resumes = loadAllResumes();
    if (resumes.length === 0) {
        alert('No resumes to export');
        return;
    }
    
    const dataStr = JSON.stringify(resumes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Generate filename with date and time
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // 2026-01-28
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // 14-30-45
    const filename = `resumes-backup-${dateStr}-${timeStr}.json`;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    link.click();
    
    // Show success message
    alert(`Exported ${resumes.length} resume(s)!\n\nSave this file to:\n• Google Drive\n• Dropbox\n• iCloud\n\nTo restore later if Safari clears data.`);
}

// Import resumes from JSON file
function importResumes(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            
            if (!Array.isArray(imported)) {
                alert('Invalid backup file format');
                return;
            }
            
            // Ask user what to do
            const action = confirm(
                `Found ${imported.length} resume(s) in backup.\n\n` +
                `OK = Add to existing resumes\n` +
                `Cancel = Replace all resumes`
            );
            
            if (action) {
                // Add to existing
                const existing = loadAllResumes();
                const combined = [...existing];
                
                imported.forEach(imp => {
                    // Check if ID already exists
                    if (!combined.find(r => r.id === imp.id)) {
                        combined.push(imp);
                    }
                });
                
                saveAllResumes(combined);
                alert(`Added ${imported.length} resume(s)`);
            } else {
                // Replace all
                if (confirm('This will DELETE all current resumes. Continue?')) {
                    saveAllResumes(imported);
                    alert(`Restored ${imported.length} resume(s)`);
                }
            }
            
            renderResumeCards();
            event.target.value = ''; // Reset input
            
        } catch (err) {
            alert('Error reading backup file: ' + err.message);
        }
    };
    
    reader.readAsText(file);
}

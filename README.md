# Resume Portfolio - User Guide

## ⚠️ IMPORTANT: Security Setup Required

**Before using this application, you MUST configure API key restrictions!**

Google detected that your Firebase API key is publicly accessible. This is **normal for web apps**, but security restrictions are required.

### Quick Security Setup (5 minutes):

1. 📖 **Read**: [SECURITY_SETUP.md](SECURITY_SETUP.md) - Step-by-step instructions
2. 🔧 **Configure**: Add API key restrictions in Google Cloud Console
3. ✅ **Verify**: Test that sign-in still works after restrictions

**Why this is safe:** Firebase web API keys are designed to be public. Security is controlled by API restrictions and Firebase Security Rules, not by hiding the key.

---

## 📋 Overview

This is a static web-based resume portfolio with Firebase authentication and Google Drive sync:

**Features:**
- 🔐 Multi-user support with Google Sign-In
- ☁️ Cloud sync via Google Drive
- 📱 9 professional resume templates
- 🌍 Bilingual content (German A2 + English)
- 🎨 Multiple visual themes
- 📥 Export/Import functionality
- 📄 PDF generation
- 📱 Mobile-responsive design

**Live Demo:** https://slaventiysvat.github.io/cvfactory/

---

## 🚀 How to Run Locally

### Option 1: Open Directly (Simplest)
1. Navigate to the project folder: `d:\PROGRAMMING\СVForWife`
2. Double-click `index.html` to open it in your default browser
3. Click on any of the 3 resume cards to view that resume

### Option 2: Using a Local Server (Recommended)
If you have Python installed:

**Windows PowerShell:**
```powershell
cd "d:\PROGRAMMING\СVForWife"
python -m http.server 8000
```

Then open your browser and go to: `http://localhost:8000`

**Alternative with Node.js (if installed):**
```powershell
cd "d:\PROGRAMMING\СVForWife"
npx serve
```

---

## 📄 How to Export to PDF

### Method 1: Using Browser Print (Recommended)
1. Open any resume page (cleaning.html, dental.html, or nanny.html)
2. Click the **"💾 Save as PDF"** button in the toolbar
3. In the print dialog:
   - **Destination:** Select "Save as PDF" or "Microsoft Print to PDF"
   - **Paper size:** A4
   - **Margins:** Default
   - **Scale:** 100%
   - **Background graphics:** Enabled (to include colors)
4. Click "Save" and choose where to save the PDF

### Method 2: Manual Print (Chrome/Edge)
1. Open a resume page
2. Press `Ctrl + P` (Windows) or `Cmd + P` (Mac)
3. Follow the same settings as above
4. Save the PDF

**Important:** The toolbar and navigation buttons are automatically hidden in print mode!

---

## ⚙️ How to Customize Contact Information

### Step 1: Edit Contact Details
Open the file `script.js` and find the `CONTACT` object at the top:

```javascript
const CONTACT = {
    name: 'Your Name',           // ← Change this
    age: 29,                      // ← Change this
    city: 'Vienna',              // ← Change this
    phone: '+43 XXX XXX XXXX',   // ← Change this
    whatsapp: '+43 XXX XXX XXXX', // ← Change this
    email: 'email@example.com'   // ← Change this
};
```

**Replace the placeholder values with real data:**
- `name`: Full name (e.g., "Maria Schmidt")
- `age`: Current age (e.g., 29)
- `city`: City of residence (e.g., "Vienna" or "Wien")
- `phone`: Phone number with country code (e.g., "+43 664 123 4567")
- `whatsapp`: WhatsApp number (usually same as phone)
- `email`: Email address (e.g., "maria.schmidt@example.com")

### Step 2: Save the File
- Save `script.js` after making changes
- Refresh the browser (press `F5`) to see the updates
- The QR code will automatically update with the new contact information

---

## 🖼️ How to Add/Replace Photos

### Option 1: Add Your Photo
1. Prepare a photo file (JPG or PNG recommended)
2. Resize it to approximately **300x300 pixels** for best results
3. Save it in the `assets` folder with the name `photo.jpg` or `photo.png`
4. Open each resume HTML file (cleaning.html, dental.html, nanny.html)
5. Find this line in each file:
   ```html
   <img src="assets/photo-placeholder.svg" alt="Photo" class="photo">
   ```
6. Replace it with:
   ```html
   <img src="assets/photo.jpg" alt="Photo" class="photo">
   ```
   (Use `photo.png` if your photo is PNG format)

### Option 2: Use Different Photos for Each Resume
You can use different photos for each resume variant:
1. Save photos with different names:
   - `assets/photo-cleaning.jpg`
   - `assets/photo-dental.jpg`
   - `assets/photo-nanny.jpg`
2. Update each HTML file accordingly

### Photo Show/Hide Toggle
- The **"Show Photo" / "Hide Photo"** button in the toolbar controls photo visibility
- This setting is saved in the browser and persists between sessions
- The photo visibility also affects the PDF output (what you see is what prints)

---

## 🎨 How to Use Themes and Language Controls

### Theme Toggle (Clean/ATS vs Elegant)
- **Clean / ATS**: Simple, minimal design optimized for Applicant Tracking Systems
- **Elegant**: Professional design with nicer typography and subtle styling

To switch themes:
1. Use the **"Theme"** dropdown in the toolbar
2. Select "Clean / ATS" or "Elegant"
3. The theme applies immediately and is saved for your next visit

### Language Toggle (DE / EN / Both)
- **DE only**: Shows only German text
- **EN only**: Shows only English text
- **DE + EN**: Shows both languages (default)

To switch languages:
1. Use the **"Language"** dropdown in the toolbar
2. Select your preferred mode
3. The setting is saved automatically

**Important for PDF Export:**
- Before exporting to PDF, select the language mode you want in the final document
- If you need separate German and English PDFs, export twice with different settings

---

## 📁 Project Structure

```
СVForWife/
│
├── index.html          # Landing page with 3 resume cards
├── cleaning.html       # Cleaning/Hotel resume
├── dental.html         # Dental practice resume
├── nanny.html          # Nanny/childcare resume
│
├── styles.css          # All CSS styles (themes, print styles)
├── script.js           # JavaScript (QR code, contact info, toggles)
│
└── assets/
    └── photo-placeholder.svg  # Default placeholder image
```

---

## 🔧 Advanced Customization

### Changing Resume Content

To edit the text content of any resume:
1. Open the respective HTML file (cleaning.html, dental.html, or nanny.html)
2. Find the section you want to edit (Profile, Experience, Education, etc.)
3. Each section has two versions:
   - `<div class="lang-de">` - German content
   - `<div class="lang-en">` - English content
4. Edit the text inside these sections
5. Save the file and refresh the browser

**Example: Editing the Profile section in cleaning.html**
```html
<div class="lang-de">
    <h2>Profil</h2>
    <p>Your German text here...</p>
</div>
<div class="lang-en">
    <h2>Profile</h2>
    <p>Your English text here...</p>
</div>
```

### Adding More Experience Items
To add a new job to the experience section:

```html
<div class="experience-item">
    <div class="item-header">
        <h3>Job Title</h3>
        <span class="item-date">2023–2024</span>
    </div>
    <p class="item-description">
        Description of responsibilities and achievements...
    </p>
</div>
```

Copy this block inside the appropriate language section (`lang-de` or `lang-en`).

---

## 📱 QR Code Details

The QR code is automatically generated and contains a **vCard** with:
- Full name
- Phone number
- WhatsApp number
- Email address
- City and country

When someone scans the QR code with their phone:
- They can instantly save the contact to their phone
- All contact details are imported automatically

The QR code updates automatically when you change the `CONTACT` object in `script.js`.

---

## 🖨️ Print Tips

For best PDF quality:
1. **Always preview** before saving
2. Use **Chrome or Edge** browser (best print support)
3. Check that **"Background graphics"** is enabled
4. Ensure page **fits on one A4 page** - if not, you may need to reduce content
5. Set **margins to Default** (not minimum)
6. Make sure the **language mode is set correctly** before printing

### Troubleshooting Print Issues
- **QR code doesn't print**: Enable "Background graphics" in print settings
- **Colors look washed out**: Enable "Background graphics"
- **Content too small**: Check scale is set to 100%
- **Content split across pages**: Reduce content or adjust margins

---

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Google Chrome (Recommended)
- ✅ Microsoft Edge (Recommended)
- ✅ Mozilla Firefox
- ✅ Safari (macOS)

**Note:** For best PDF export results, use Chrome or Edge.

---

## 📝 Additional Notes

### Photo File Location
The project looks for photos in the `assets/` folder. Supported formats:
- `.jpg` / `.jpeg`
- `.png`
- `.svg`

### Responsive Design
The resumes are optimized for:
- **Desktop viewing** (full layout)
- **A4 print/PDF export** (210mm x 297mm)

### ATS-Friendly Design
Both themes are designed to be ATS (Applicant Tracking System) compatible:
- Clean HTML structure
- Proper heading hierarchy
- No complex graphics that might confuse ATS
- Clear section organization

### Data Privacy
- All data is stored locally in your browser
- No external services or tracking
- QR code is generated client-side (no data sent to servers)
- Safe to use with real personal information

---

## 🆘 Troubleshooting

### QR Code Not Showing
- **Problem**: QR code appears empty or shows an error
- **Solution**: Check that `script.js` is loaded correctly and the `CONTACT` object has valid data

### Photo Not Displaying
- **Problem**: Photo shows as broken image
- **Solution**: 
  1. Verify the photo file exists in the `assets/` folder
  2. Check the file path in the HTML matches the actual filename
  3. Ensure the file extension is correct (.jpg, .png, etc.)

### PDF Looks Different from Screen
- **Problem**: PDF export doesn't match what you see on screen
- **Solution**: 
  1. Enable "Background graphics" in print settings
  2. Set page size to A4
  3. Use Chrome or Edge browser
  4. Make sure scale is 100%

### Theme or Language Settings Not Saving
- **Problem**: Settings reset when you refresh
- **Solution**: Check that browser cookies/localStorage are enabled

### Page Too Long for One A4
- **Problem**: Resume content extends beyond one page
- **Solution**: 
  1. Reduce content slightly
  2. Adjust section spacing in `styles.css`
  3. Use smaller font sizes for less critical sections

---

## 📧 Quick Start Checklist

- [ ] Edit `script.js` with real contact information
- [ ] Add photo to `assets/` folder (if desired)
- [ ] Update photo path in all three HTML files
- [ ] Customize resume content in each HTML file
- [ ] Test each resume page in the browser
- [ ] Test PDF export for each resume
- [ ] Verify QR code scans correctly
- [ ] Check both themes (Clean and Elegant)
- [ ] Test all language modes (DE, EN, Both)

---

## 💡 Tips for Best Results

1. **Keep it on one page**: Recruiters prefer one-page resumes. Edit content to fit on a single A4 page.
2. **Use the Clean theme for ATS**: If submitting online, use the "Clean/ATS" theme.
3. **Test QR codes**: Scan the QR code with your phone to verify it works before sending.
4. **Print test**: Always do a print preview before final PDF export.
5. **Multiple versions**: Create different PDFs for different applications (language-specific, theme variations).
6. **Update regularly**: Keep contact information and experience up to date.

---

## 📞 Need Help?

If you encounter any issues:
1. Check this README thoroughly
2. Verify all file paths are correct
3. Make sure you're using a modern browser (Chrome/Edge recommended)
4. Clear browser cache and try again
5. Check browser console for error messages (Press F12)

---

**Last Updated:** January 2026

**Project Type:** Static HTML/CSS/JavaScript (No build tools required)

**License:** Free to use and modify for personal purposes

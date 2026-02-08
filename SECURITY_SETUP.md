⚠️ URGENT: Firebase API Key Security Setup Required
=================================================

Google detected that your Firebase API key is publicly accessible. This is NORMAL for web apps, 
but you MUST configure security restrictions immediately.

## 🚨 IMMEDIATE ACTIONS REQUIRED (Do these NOW!)

### Step 1: Add API Key Restrictions (5 minutes)

1. **Open Google Cloud Console:**
   https://console.cloud.google.com/apis/credentials?project=cvgenerator-a4229

2. **Find your API key** in the list:
   - Name: "Browser key (auto created by Firebase)"
   - Key string starts with: AIzaSyAk--...

3. **Click the EDIT button** (pencil icon)

4. **Under "Application restrictions":**
   - Select: ☑️ **HTTP referrers (web sites)**
   - Click "ADD AN ITEM"
   - Add these 3 referrers:
     ```
     https://slaventiysvat.github.io/*
     http://localhost:*
     http://127.0.0.1:*
     ```
   - Click "DONE"

5. **Under "API restrictions":**
   - Select: ☑️ **Restrict key**
   - Enable ONLY these APIs:
     - ✅ Identity Toolkit API
     - ✅ Token Service API
     - ✅ Firebase Installations API
     - ❌ Uncheck all others

6. **Click SAVE** at the bottom

### Step 2: Verify Restrictions Work (1 minute)

1. Open your website: https://slaventiysvat.github.io/cvfactory/
2. Try to sign in with Google
3. It should work normally
4. If it doesn't work, review restrictions and make sure you added the GitHub Pages domain

### Step 3: Monitor for Abuse (Optional)

1. Go to: https://console.cloud.google.com/apis/dashboard?project=cvgenerator-a4229
2. Check API usage graphs
3. If you see unusual spikes, investigate immediately

## ✅ Checklist

- [ ] Added HTTP referrer restrictions
- [ ] Added API restrictions (only required APIs enabled)
- [ ] Clicked SAVE in Google Cloud Console
- [ ] Tested sign-in on GitHub Pages (works)
- [ ] Tested that unauthorized domains are blocked

## 📚 Why This is Safe

Firebase API keys for web applications are designed to be public:
- ✅ They only identify your project, not authorize access
- ✅ Security is handled by Firebase Security Rules
- ✅ Restrictions prevent abuse from unauthorized domains
- ✅ This is documented by Google: https://firebase.google.com/docs/projects/api-keys

## 🔒 Best Practices

1. **Never** commit:
   - Service account keys (.json files)
   - Admin SDK credentials
   - Database connection strings with passwords

2. **Always** restrict:
   - API keys to specific domains
   - APIs to only what you need
   - Firebase Security Rules properly configured

3. **Monitor**:
   - API usage monthly
   - Authentication logs
   - Unusual activity

## ❓ Need Help?

If sign-in stops working after adding restrictions:
1. Check that you added https://slaventiysvat.github.io/* (with /*)
2. Make sure Identity Toolkit API is enabled in restrictions
3. Wait 1-2 minutes for changes to propagate
4. Clear browser cache and try again

---
Created: 2026-02-08
Updated: After completing restrictions setup

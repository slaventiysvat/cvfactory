# Security Configuration for CV Factory

## Firebase API Key Security

⚠️ **Important**: The Firebase API key in `firebase-config.js` is intentionally public for client-side web applications. This is normal and documented by Firebase.

However, you MUST configure API key restrictions in Google Cloud Console to prevent abuse.

## Required Steps to Secure API Key

### 1. Add API Key Restrictions

1. Go to [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials?project=cvgenerator-a4229)

2. Find your API key: `AIzaSyAk--CEvROA8qJ6XNqPecUbODsvmIAW3NU`

3. Click **Edit** (pencil icon)

4. Under **Application restrictions**, select:
   - **HTTP referrers (web sites)**
   
5. Add these referrers:
   ```
   https://slaventiysvat.github.io/*
   http://localhost:*
   http://127.0.0.1:*
   ```

6. Under **API restrictions**, select **Restrict key**

7. Select only these APIs (remove others):
   - Identity Toolkit API
   - Token Service API
   - Firebase Installation API  
   - Firebase App Check API

8. Click **Save**

### 2. Regenerate Compromised Key (IMPORTANT!)

Since the key was exposed publicly:

1. In [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials?project=cvgenerator-a4229)

2. Click the **three dots** next to your API key

3. Select **Regenerate key**

4. Copy the NEW key

5. Update `firebase-config.js` with the new key:
   ```javascript
   apiKey: "YOUR-NEW-API-KEY-HERE"
   ```

6. Commit and push the change

### 3. Enable Firebase App Check (Recommended)

1. Go to [Firebase Console - App Check](https://console.firebase.google.com/project/cvgenerator-a4229/appcheck)

2. Click **Get Started**

3. For web app, select **reCAPTCHA v3**

4. Register your domain: `slaventiysvat.github.io`

5. Add the App Check SDK to your code (optional for enhanced security)

### 4. Configure Firebase Security Rules

Ensure your Firebase Database and Storage have proper security rules configured.

## Why Firebase Keys Can Be Public

Firebase API keys for web apps are different from server API keys:
- They identify your Firebase project
- They don't grant access to data
- Access is controlled by Firebase Security Rules
- Restrictions prevent abuse from unauthorized domains

Source: [Firebase Documentation](https://firebase.google.com/docs/projects/api-keys)

## Regular Security Checks

- Review API usage in Google Cloud Console monthly
- Monitor Firebase Authentication usage
- Check for unusual activity in Firebase Console
- Keep API restrictions up to date

# Firebase Phone Authentication Setup Guide

## Error: "auth/invalid-app-credential"

This error occurs when Firebase phone authentication is not properly configured. Follow these steps to fix it:

### 1. Enable Phone Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Find **Phone** in the list and click on it
5. Toggle the **Enable** switch
6. Click **Save**

### 2. Authorize Your Domain

Firebase requires all domains where phone authentication is used to be authorized:

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your development domain (e.g., `localhost`)
3. Add your production domain(s)
4. Common domains to add:
   - `localhost`
   - `127.0.0.1`
   - Your production domain (e.g., `yourdomain.com`)
   - Any staging/development domains

### 3. Configure reCAPTCHA

Phone authentication uses reCAPTCHA to prevent abuse. For development:

1. In Firebase Console, go to **Authentication** → **Sign-in method** → **Phone**
2. Under **Phone numbers for testing**, add test phone numbers:
   - Format: `+1 650-555-3434` (use your country code)
   - Verification code: `123456` (or any 6-digit code you choose)

### 4. Check Firebase Configuration

Ensure your Firebase configuration includes the correct `authDomain`:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "your-project.firebaseapp.com", // Must match Firebase Console
  projectId: "your-project",
  // ... other config
}
```

### 5. Browser Requirements

- Phone authentication requires a secure context (HTTPS or localhost)
- Some browsers may block invisible reCAPTCHA in private/incognito mode
- Ensure pop-ups are not blocked if using visible reCAPTCHA

### 6. Quota Limits

Firebase has default quotas for phone authentication:
- Free tier: 10,000 SMS/month
- Check your usage in Firebase Console → **Authentication** → **Usage**

### 7. Testing Phone Authentication

For testing without sending real SMS:
1. Use test phone numbers configured in Firebase Console
2. These numbers won't consume your SMS quota
3. They work even without a valid phone service

### Common Issues and Solutions

1. **"reCAPTCHA Enterprise config" warning**: This is normal and can be ignored. Firebase falls back to reCAPTCHA v2.

2. **"invalid-app-credential" error**: 
   - Domain not authorized in Firebase Console
   - Phone authentication not enabled
   - Incorrect authDomain in Firebase config

3. **"quota-exceeded" error**: 
   - SMS quota limit reached
   - Use test phone numbers for development

4. **reCAPTCHA not showing**: 
   - Check that `recaptcha-container` div exists in your HTML
   - Ensure the container is visible (not hidden by CSS)

### Debug Checklist

- [ ] Phone authentication enabled in Firebase Console
- [ ] Domain authorized in Firebase Console
- [ ] Test phone numbers configured (for development)
- [ ] Firebase configuration has correct authDomain
- [ ] Using HTTPS or localhost for development
- [ ] reCAPTCHA container div exists in HTML
- [ ] No console errors about missing Firebase configuration
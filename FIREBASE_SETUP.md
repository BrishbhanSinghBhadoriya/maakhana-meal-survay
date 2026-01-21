# Firebase Setup Guide for MaaKhana Survey

Follow these steps to configure Firebase Google Authentication for your application.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `maakhana-survey` (or your preferred name)
4. Click **Continue**
5. Disable Google Analytics (optional, not needed for this project)
6. Click **Create project**
7. Wait for project creation, then click **Continue**

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `MaaKhana Survey Web`
3. **Do NOT** check "Also set up Firebase Hosting"
4. Click **Register app**
5. You'll see your Firebase configuration - **keep this page open**, you'll need these values

## Step 3: Enable Google Authentication

1. In the left sidebar, click **Build** → **Authentication**
2. Click **Get started**
3. Click on the **Sign-in method** tab
4. Click on **Google** in the providers list
5. Toggle the **Enable** switch to ON
6. Enter a **Project support email** (your email)
7. Click **Save**

## Step 4: Add Authorized Domain

1. Still in **Authentication** → **Sign-in method**
2. Scroll down to **Authorized domains**
3. `localhost` should already be there by default
4. If not, click **Add domain** and add `localhost`

## Step 5: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

**Where to find these values:**
- Go back to Firebase Console → Project Settings (gear icon) → General
- Scroll down to **Your apps** section
- You'll see all the configuration values under **SDK setup and configuration**
- Copy each value exactly as shown

## Step 6: Restart Development Server

1. Stop the current dev server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. Open `http://localhost:3000` in your browser

## Step 7: Test Authentication

1. You should see the login page (not the survey)
2. Click **"Sign in with Google"**
3. Select your Google account
4. You should be redirected to the survey page
5. Your name and profile picture should appear in the header
6. Click **Sign out** to test logout functionality

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that all environment variables in `.env.local` are set correctly
- Make sure you restarted the dev server after updating `.env.local`

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Add your domain (e.g., `localhost`)

### Google Sign-in popup doesn't appear
- Check browser popup blocker settings
- Try a different browser
- Make sure Google sign-in is enabled in Firebase Console

### Still seeing placeholder values in `.env.local`
- Make sure you replaced ALL the placeholder values with your actual Firebase config
- Double-check there are no extra spaces or quotes around the values

## Security Note

⚠️ **Important**: The `.env.local` file is already in `.gitignore` and will NOT be committed to Git. This keeps your Firebase credentials secure. Never commit this file to version control!

## Next Steps

Once authentication is working:
- Survey responses can be saved to Firebase Firestore (future enhancement)
- User preferences can be stored per user
- Admin dashboard can be created to view all responses

# Newsletter + Welcome Email Setup

## 1. Firebase (Free Backend)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → Create project (free tier)
2. Enable **Firestore Database**: Build → Firestore Database → Create database (production mode recommended)
3. Get **Service Account** credentials (NOT the Web app config — ignore `apiKey`, `authDomain`, `storageBucket`):
   - Click the **gear icon** ⚙️ (Project settings)
   - Open the **Service accounts** tab
   - Click **Generate new private key** → Download the JSON file
4. Open the downloaded JSON. It should contain `project_id`, `client_email`, and `private_key`. If you only see `apiKey`, `authDomain`, `storageBucket` — that's the Web app config; go back to **Project settings → Service accounts** and download the private key from there.
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` as literal `\n` in `.env.local`)

5. Firestore rules (optional, for security): Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /newsletter_signups/{email} {
      allow read, write: if request.auth != null; // Admin only via service account
    }
  }
}
```

The collection `newsletter_signups` is created automatically on first signup. Each document ID is the email (for uniqueness).

## 2. Hostinger Email (SMTP)

1. Log in to **Hostinger** → **Emails** → your domain `soulknower.com`
2. Create or use an email like `contact@soulknower.com`
3. Note the password (or set one)
4. Hostinger SMTP (outgoing):
   - **Host:** `smtp.hostinger.com`
   - **Port:** `465` (SSL)
   - **User:** `contact@soulknower.com`
   - **Pass:** your email password

## 3. Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in (from Firebase service account JSON):

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@soulknower.com
SMTP_PASS=your-email-password
FROM_EMAIL=contact@soulknower.com
```

**Important:** For `FIREBASE_PRIVATE_KEY`, wrap the whole value in quotes. Keep the `\n` characters as literal backslash-n (the code will convert them to real newlines).

## 4. View Signups

In Firebase Console → **Firestore Database** → `newsletter_signups` collection — each document is a subscriber (document ID = email).

## Abuse Protection (built-in)

- **Honeypot**: Hidden field catches basic bots (rejected if filled).
- **Rate limit**: Max 3 new signups per IP per hour. Stored in Firestore `rate_limits` collection.
- Duplicate emails are ignored without counting toward rate limit.

## Notes

- Welcome email is sent automatically when someone signs up
- If SMTP is not set, signups still save to Firestore (email just won't send)
- Duplicate emails are ignored gracefully (same doc ID = overwrite check)

# Bible Maps App — GitHub + Codemagic (PWA-ready)

This repository was prepared so you can upload it to GitHub and let Codemagic build a web (installable) version automatically.

## What I changed for PWA
- Added `public/manifest.json`
- Generated icons at `public/icons/icon-192x192.png` and `public/icons/icon-512x512.png`
- Added `next-pwa` to dependencies (so Codemagic will install it during build)
- Updated `next.config.mjs` to enable PWA support
- Added `<link rel="manifest">` and theme meta tag to `app/layout.tsx`

---
## If you have no coding experience — easiest path to publish:

### A) Prepare files on your computer
1. Download the zip file I prepared (link provided by the assistant).
2. Extract it to a folder on your computer (Windows: right-click -> Extract All).

### B) Create a GitHub repository and upload code (GUI way)
1. Go to https://github.com and sign in / create an account.
2. Click **+** → **New repository**.
3. Give it a name (example: `bible-maps-app`), keep it Public or Private, then click **Create repository**.
4. On the repo page, click **Add file → Upload files**.
5. In your file explorer, open the extracted folder, select all files and folders inside it (not the parent folder itself), and drag them onto the GitHub upload area.
6. Commit the changes at the bottom of the page (Create a commit) — this uploads the code.

**Note:** If the upload UI reaches limits or is slow, use GitHub Desktop (instructions below) — it’s easier for larger projects.

### C) (Alternative) Use GitHub Desktop (recommended for non-coders)
1. Install GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop and sign in with your GitHub account.
3. Choose **File → Add local repository → Add...** and select the extracted project folder.
4. Commit the current files and click **Publish repository** (choose to publish to your GitHub account).

### D) Set up Codemagic to build on each push
1. Create an account at https://codemagic.io/ and sign in with **GitHub** (authorize access).
2. In Codemagic, choose **Add application** → select the repository you just uploaded.
3. For build environment, choose **Linux** and Node (default is fine). Because this project uses `pnpm`, the simple safe pre-build command is:
   ```bash
   npm i -g pnpm
   pnpm install --frozen-lockfile
   ```
   and the build commands:
   ```bash
   pnpm build
   pnpm export
   ```
4. Set the artifact path to `out/**` so Codemagic will collect the static export.
5. Start the build. When finished, download the `out/` artifact — that's your static website.

### E) Deploy the site (host & make it live)
- Easiest: Connect the GitHub repo to **Vercel** (recommended for Next.js):
  1. Sign in at https://vercel.com with GitHub.
  2. Import the repository and deploy — Vercel detects Next.js automatically.
- Or deploy the `out/` folder to **Netlify**, **Firebase Hosting**, or any static host that uses HTTPS.

---
## If you want me to:
- Create a GitHub repo and push for you (I cannot do that without your GitHub credentials).
- Connect Codemagic to the repo and configure builds (I can guide you step-by-step while you do it).

Tell me which option you prefer and I will guide you through the exact next click-by-click steps.

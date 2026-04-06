# ◆ The Hollow Library

A digital spell shop built with React + Vite, deployed on Vercel, payments via Payhip.

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev
```

Open http://localhost:5173 to preview your shop.

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - The Hollow Library"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hollow-library.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `hollow-library` repository
4. Vercel auto-detects Vite — just click **"Deploy"**
5. Your site gets a temporary `xxx.vercel.app` URL

### Step 3: Add Your Custom Domain

**In Vercel:**
1. Go to your project → **Settings → Domains**
2. Type `wicca.siyenza.app` and click **Add**
3. Copy the CNAME target Vercel shows you

**In Cloudflare (DNS tab for siyenza.app):**
1. Click **Add Record**
2. Type: `CNAME` | Name: `wicca` | Target: `cname.vercel-dns.com`
3. Set proxy to **DNS only** (gray cloud) initially
4. Click **Save**

Your shop is now live at **https://wicca.siyenza.app**

### Step 4: Set Up Payhip (Get Paid)

1. Create a free account at [payhip.com](https://payhip.com)
2. Go to **Account → Settings → Payment Details**
3. Connect **Paystack** (for ZAR payouts to your SA bank)
4. Add each spell as a **Digital Download** product (upload PDFs)
5. Copy each product ID from its URL (e.g. `payhip.com/b/AbC1d` → `AbC1d`)
6. Open `src/App.jsx` and replace each `"XXXXX"` with the real product ID
7. Push to GitHub — Vercel auto-deploys!

## Adding More Subdomains Later

You can add more projects under siyenza.app anytime:
- `blog.siyenza.app` — your writing
- `siyenza.app` — main landing page
Just repeat the Vercel + Cloudflare CNAME steps for each.

## File Structure

```
hollow-library/
├── index.html          ← Entry HTML (loads Payhip script)
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
├── .gitignore
└── src/
    ├── main.jsx        ← React mount
    └── App.jsx         ← ✨ Your shop (edit spells here)
```

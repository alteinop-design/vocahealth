# VocaHealth — AI Voice Receptionist for Medical Clinics

A production-ready landing page for a medical clinic AI voice receptionist service.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

## Deploy to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub username:
   ```
   "homepage": "https://YOUR_USERNAME.github.io/vocahealth"
   ```

2. Create a GitHub repo and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vocahealth.git
   git branch -M main
   git push -u origin main
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Your site will be live at `https://YOUR_USERNAME.github.io/vocahealth`

## Project Structure

```
vocahealth/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── index.js            # React entry point
│   └── VocaHealth.jsx      # Main app component (all-in-one)
├── package.json
└── README.md
```

## Custom Domain (Optional)

To use a custom domain like `vocahealth.com`:

1. Create `public/CNAME` with your domain:
   ```
   vocahealth.com
   ```

2. In your domain registrar, add DNS records pointing to GitHub Pages:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `www` → `YOUR_USERNAME.github.io`

3. Redeploy: `npm run deploy`

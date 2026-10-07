# Chethan U - Portfolio Deployment & Publishing Guide

This guide details how to test, debug, and publish the portfolio website to free, production-grade hosting platforms.

---

## 1. Local Testing & Verification Checklist

Before publishing, verify all components on your local machine:
- [x] **Vertical Navigation Bar**: Left sidebar fixed on desktop (`>= 993px`), responsive drawer on mobile (`<= 992px`).
- [x] **Night / Dark Mode Toggle**: Detects OS default via CSS media queries (`prefers-color-scheme`) and persists user toggle in `localStorage`.
- [x] **Interactive Multi-Theme Pixel Switcher**: Instant switching between 4 curated color themes (Cyber Blue, Synthwave Purple, Matrix Green, Sunset Amber) with `localStorage` persistence.
- [x] **Pixel Art Aesthetic**: Consistent 8-bit badges, fonts (`Press Start 2P`), retro CRT monitor photo frame, and pixel drop shadows.
- [x] **Background Image**: Seamless fixed cyber background using `background image.jpeg`.
- [x] **Skills Progress Bars**: Visually engaging segmented pixel progress tracks with percentage labels.
- [x] **Interactive Milestones Timeline**: Chronological education and career path cards with smooth hover animations.
- [x] **Clickable Project Thumbnails**: Opens detailed architecture modal with technology specs and GitHub repository links.
- [x] **Video Showcase**: Responsive 16:9 player with tab switcher (YouTube embed & local video demo).
- [x] **AI Chat Interface**: Interactive simulated conversation with typing indicator, quick prompt chips, and placeholder for OpenAI/Gemini API integration.
- [x] **Contact Form**: High-contrast transmit button, validation, success alert, and placeholder for Resend API.
- [x] **Social Links in Footer**: Accessible pixel social icons for GitHub, LinkedIn, Email, and Phone.

---

## 2. Option A: Deploy to GitHub Pages (Recommended - 100% Free)

Since your project is a static site (HTML, CSS, JS, Images), GitHub Pages provides free hosting with global CDN:

### Steps:
1. Initialize Git in the project directory (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "feat: complete software engineer portfolio with pixel art aesthetic"
   ```
2. Create a new repository on your GitHub account (`https://github.com/new`), for example named `portfolio` or `chethan-portfolio`.
3. Link your remote repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Chethan22050/portfolio.git
   git push -u origin main
   ```
4. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages** (left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` directory.
   - Click **Save**.
5. Your portfolio will be live at:
   `https://chethan22050.github.io/portfolio/`

---

## 3. Option B: Deploy to Vercel (Instant Deploy with HTTPS)

1. Sign up or log in at [vercel.com](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository (`Chethan22050/portfolio`).
4. Keep the default settings (Framework Preset: *Other* / Root Directory: `./`).
5. Click **Deploy**.
6. Vercel automatically assigns a fast global HTTPS domain (e.g. `https://chethan-portfolio.vercel.app`).

---

## 4. Option C: Deploy to Netlify (Drag & Drop)

1. Log in to [netlify.com](https://www.netlify.com).
2. Go to **Sites** > **Add new site** > **Deploy manually**.
3. Drag and drop your entire `protfolio` folder into the Netlify drop zone.
4. Your website is instantly deployed with an active SSL certificate.

---

## 5. Connecting Live APIs (Optional Enhancements)

### A. Live AI Assistant (OpenAI / Gemini)
In `script.js`, locate the `handleUserMessage` function and uncomment the fetch block to point to a serverless backend function (e.g., Next.js API route or AWS Lambda) containing your OpenAI or Google Gemini API key.

### B. Live Contact Form Email Transmissions (Resend API)
In `script.js`, locate the `contactForm.addEventListener('submit', ...)` handler. You can connect it directly to [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com) for client-side zero-backend email delivery, or via [Resend](https://resend.com) with a serverless webhook.

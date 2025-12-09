<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1olzLkeF1wwmbSMqbtLm9sRkDhfcuiRK1

## Run Locally

**Prerequisites:**  Node.js 20.x (check `.nvmrc` for version)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` (for local dev with Netlify Functions):
   - Create `.env.local` in the repo root and add:
     ```
     GEMINI_API_KEY=sk-YOUR_GEMINI_API_KEY
     ```
   - To use Google Generative AI, obtain a key from [Google AI Studio](https://aistudio.google.com/apikey)
3. Run the app:
   ```bash
   npm run dev
   ```
   - This starts Vite dev server on `http://localhost:3000/`
   - The Netlify Functions are available at `/.netlify/functions/*` (they use `@google/genai` server-side with `GEMINI_API_KEY`)

## Deploy to Netlify

**Prerequisites:**
- GitHub repo pushed (this is the default for Netlify deploys)
- Netlify site connected to the repo

**Setup:**
1. In Netlify Site settings → Build & deploy → Environment, add environment variables:
   - `GEMINI_API_KEY`: your Google Generative AI API key (⚠️ **keep secret** — never expose in bundle)
   - `DATABASE_URL`: your Neon PostgreSQL connection string (if using database)
2. Commit and push to GitHub. Netlify will automatically build and deploy.

**Security Note:**
- The `GEMINI_API_KEY` is used **server-side only** in `netlify/functions/genai.ts` — it is never sent to the browser.
- Requests from the frontend (`generateImage`, `chat`) are proxied through Netlify Functions, keeping the API key secure.

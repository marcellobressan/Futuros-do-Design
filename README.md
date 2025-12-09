<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1olzLkeF1wwmbSMqbtLm9sRkDhfcuiRK1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in `.env.local` (for local dev) to your Gemini API key.
   - Example `.env.local` line: `VITE_GEMINI_API_KEY=sk-...`
   - In production (Netlify), set the environment variable `VITE_GEMINI_API_KEY` in Site settings → Build & deploy → Environment to make the key available at build time.
3. Run the app:
   `npm run dev`

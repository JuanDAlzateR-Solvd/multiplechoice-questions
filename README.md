# Architect Practice

A small, mobile-first personal study app for practicing concepts related to the Claude Certified Architect – Foundations exam. It uses plain HTML, CSS, and TypeScript with no backend, account, database, or AI API.

> This repository contains non-official sample questions created for this app. It does not contain official certification questions unless the user supplies material they are authorized to use.

## Setup and scripts

Requires a current Node.js release and [pnpm](https://pnpm.io/).

```sh
pnpm install
pnpm dev
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Type-check and create a static production build in `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm test` | Run unit tests once |
| `pnpm test:watch` | Run unit tests in watch mode |
| `pnpm test:e2e` | Run the Playwright Android-viewport test |

Install Playwright's Chromium browser once if needed:

```sh
pnpm exec playwright install chromium
```

## Question bank

Questions live in `public/questions.json`. The app validates the entire file before starting and displays actionable errors instead of silently crashing. Only questions whose `status` is `"reviewed"` appear in practice sessions.

```json
{
  "id": "unique-question-id",
  "status": "reviewed",
  "topic": "Tool use",
  "difficulty": "Foundational",
  "tags": ["tools"],
  "question": "What should the application validate?",
  "options": [
    { "id": "a", "text": "Tool arguments" },
    { "id": "b", "text": "Nothing" }
  ],
  "correctOptionId": "a",
  "explanation": "A general explanation shown after answering.",
  "optionExplanations": {
    "a": "Why this option is right.",
    "b": "Why this option is wrong."
  },
  "sourceReferences": ["An authorized reference or note"],
  "baseWeight": 1
}
```

To add a question, append an object with this shape, choose an ID not used elsewhere, provide an explanation for every option ID, and set a positive numeric `baseWeight`. Use `draft` while editing, then change the status to `reviewed` when it is ready. Valid statuses are `draft`, `reviewed`, and `retired`.

## Progress and selection

Progress stays only in the current browser's `localStorage`, under `architect-practice-progress-v1`. It includes counts, the last-seen time, up to 10 recent results per question, and the last five shown IDs. Clearing browser site data resets it.

Selection starts with each question's `baseWeight`, raises the topic weight as its recent error rate rises, and modestly favors less-seen questions. Weak-topic sessions amplify the error-rate factor. A topic with no history receives a neutral 35% default error rate. The selector excludes the last five IDs whenever at least one alternative exists, then falls back to the full reviewed pool when necessary. A session does not repeat a question.

## Testing and building

```sh
pnpm test
pnpm test:e2e
pnpm build
```

Unit tests cover validation, base weighting, recent-question avoidance/fallback, and weak-topic weighting. The Playwright test uses a Pixel 5 profile and verifies loading, an incorrect answer, correct-answer highlighting, option explanations, and persisted progress after reload.

## Static deployment

`pnpm build` produces a self-contained static site in `dist/`. Upload that directory to Netlify or Vercel, or publish it with GitHub Pages. Vite uses a relative asset base so project subpaths work without additional configuration. No server-side environment variables are required.

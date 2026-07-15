# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small, mobile-first personal study app for practicing concepts related to the Claude Certified Architect – Foundations exam. Plain HTML/CSS/TypeScript with no backend, database, auth, or server-side AI calls. The question bank contains non-official sample questions only.

This repository has a detailed `AGENTS.md` that is the primary source of project rules (technical constraints, question-data schema, core quiz behavior, progress-storage format, and the required change workflow). Read it before making non-trivial changes — this file only adds commands and architecture notes on top of it.

## Commands

```sh
pnpm install
pnpm dev            # Vite dev server
pnpm build          # tsc typecheck + vite build to dist/
pnpm preview        # preview the production build
pnpm test           # vitest run (unit tests, once)
pnpm test:watch     # vitest watch mode
pnpm test:e2e       # playwright, Pixel 5 viewport
```

Run a single unit test file: `pnpm exec vitest run tests/unit/selection.test.ts`.
Run a single Playwright test: `pnpm exec playwright test tests/e2e/quiz.spec.ts`.
If Playwright's browser is missing: `pnpm exec playwright install chromium`.

Before handing off any behavior change: `pnpm build`, then `pnpm test`, then `pnpm test:e2e` if the primary user flow changed. Report exact pass/fail results.

## Architecture

Data flow: `main.ts` fetches `public/questions.json` → `validateQuestions` (`src/questions/validation.ts`) checks the whole file up front and produces actionable errors instead of a silent failure or partial render → valid questions plus `loadProgress()` (`src/progress/progressStore.ts`) are handed to `createApp` (`src/ui/render.ts`), which owns all DOM rendering and event wiring.

- `src/types.ts` — shared `Question`, `ProgressData`, `SessionAnswer` types; the schema other modules assume.
- `src/questions/validation.ts` — validates the full question bank against the schema described in AGENTS.md before anything else runs.
- `src/questions/selection.ts` — pure weighted-selection logic. `questionWeight` combines `baseWeight`, topic error rate (from `progressStore`), and a novelty factor that decays with `timesShown`; weak-topic mode amplifies the error-rate term. `selectWeightedQuestion` excludes the last five shown IDs when an alternative exists. `buildSession` repeatedly draws without replacement until it hits the requested count or exhausts the pool.
- `src/progress/progressStore.ts` — reads/writes the `architect-practice-progress-v1` localStorage key and derives `topicErrorRate`. Treat stored data as potentially malformed (user-editable browser storage); preserve backward compatibility or version+migrate explicitly if the shape changes.
- `src/quiz/quizSession.ts` — pure state transitions for an in-progress session (`createSession`, `answerQuestion`, `nextQuestion`); no DOM or storage access, which is why it's cleanly unit-testable in isolation from `render.ts`.
- `src/ui/render.ts` — the only module that touches the DOM. Escapes question-bank content before inserting it as HTML (question data is semi-trusted, user-editable content).

Only `main.ts` and `render.ts` should ever touch the DOM or `fetch`; selection, progress math, and session transitions must stay pure functions so they remain testable without a browser (see `tests/unit/`). `tests/e2e/quiz.spec.ts` is the only place that exercises the real UI, storage, and reload persistence together, using a Pixel 5 profile.

Sample question data intentionally uses option `b` as the correct answer throughout — e2e assertions depend on this; don't change it incidentally.

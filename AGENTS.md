# AGENTS.md

## Project purpose

This repository contains a personal, mobile-first multiple-choice study app for concepts related to the Claude Certified Architect – Foundations exam.

It is a small personal study tool, not a production SaaS application. The app must remain understandable, maintainable, and comfortable to use from an Android phone.

The included question bank contains non-official sample questions. Never describe them as official certification questions. Only add official or third-party material when the user confirms they are authorized to use it.

## Technical constraints

- Use Vite and strict TypeScript.
- Use plain HTML, CSS, and TypeScript.
- Do not introduce React, Vue, Angular, Svelte, or another UI framework.
- Do not add a backend, database, authentication, or application-side AI API calls.
- Load the question bank from `public/questions.json`.
- Store personal progress in browser `localStorage`.
- Keep dependencies and abstractions minimal.
- Preserve the mobile-first design and accessible native controls.
- Use pnpm for all package-management and script commands.

## Repository structure

```text
index.html                    Vite entry document
public/questions.json         Editable question bank
src/main.ts                   App bootstrap and loading errors
src/styles.css                Mobile-first presentation
src/types.ts                  Shared data types
src/questions/validation.ts   Question-bank validation
src/questions/selection.ts    Weighted question selection
src/progress/progressStore.ts localStorage persistence and topic statistics
src/quiz/quizSession.ts       Pure quiz-session state transitions
src/ui/render.ts              Plain DOM rendering and event handling
tests/unit/                   Vitest unit tests
tests/e2e/                    Playwright Android-viewport tests
```

Avoid creating new layers unless they solve a concrete requirement that cannot fit cleanly into this structure.

## Core behavior

- Home offers Quick 5, Quick 10, practice by topic, and weak-topic practice.
- A quiz displays one question at a time and accepts exactly one answer.
- After answering, choices are locked and the UI displays correctness, the correct answer when needed, a general explanation, and an explanation for every option.
- Normal sessions use only questions with `status: "reviewed"`.
- Weighted selection considers topic error rate, `baseWeight`, and how often a question has been seen.
- Avoid the last five shown question IDs whenever an alternative exists.
- Weak-topic sessions increase the influence of recent topic error rates.
- A session does not repeat a question. If the reviewed pool is smaller than the requested session size, the session ends after exhausting the pool.
- Session summaries include totals, overall accuracy, and accuracy by topic.

## Question data rules

Every item in `public/questions.json` must provide:

- `id`: unique, non-empty string
- `status`: `draft`, `reviewed`, or `retired`
- `topic`: non-empty string
- `difficulty`: non-empty string
- `tags`: array of strings
- `question`: non-empty string
- `options`: non-empty array of unique `{ id, text }` objects
- `correctOptionId`: ID of an existing option
- `explanation`: non-empty general explanation
- `optionExplanations`: non-empty explanation for every option ID
- `sourceReferences`: array of strings
- `baseWeight`: finite number greater than zero

Update `src/questions/validation.ts` and its tests if the schema changes. Invalid data must produce an actionable UI error rather than a silent failure.

## Progress storage

Progress uses the `architect-practice-progress-v1` localStorage key. It tracks shown/correct/incorrect counts, last-seen timestamps, recent answers, and the last five shown IDs.

Treat persisted browser data as potentially malformed. Preserve backward compatibility or explicitly version and migrate storage when changing its shape.

## Commands

```sh
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm test:e2e
```

Use `pnpm exec playwright install chromium` if the local Playwright browser is missing.

## Change workflow

Before editing:

1. Inspect relevant source, tests, scripts, and current working-tree changes.
2. Preserve user changes and existing conventions.
3. Prefer small, reviewable edits over broad rewrites.

When changing behavior:

- Add or update focused Vitest coverage for validation, selection, progress, or session logic.
- Update the Playwright test when the primary user flow changes.
- Keep end-to-end assumptions deterministic. `tests/e2e/quiz.spec.ts` resolves the correct option dynamically by fetching `questions.json` and matching the displayed question, so it does not depend on any question's correct-option letter — new questions do not need to use a specific letter for e2e purposes.
- Update `README.md` when setup, scripts, schema, selection behavior, storage, or deployment guidance changes.

Before handing off:

1. Run `pnpm build`.
2. Run `pnpm test`.
3. Run `pnpm test:e2e` for user-flow changes.
4. Report exact pass/fail results and any known limitation.

## Design guidance

- Optimize first for a narrow Android viewport, then enhance wider screens.
- Maintain clear focus states, readable contrast, sufficiently large tap targets, and semantic buttons/headings.
- Escape question-bank content before inserting it through HTML templates.
- Keep feedback immediate and explanations easy to scan.
- Do not add production SaaS features, analytics, accounts, synchronization, or server infrastructure unless the user explicitly expands the scope.

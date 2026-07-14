---
name: create-certification-questions
description: Create, review, validate, and safely add original practice questions for this repository's Claude Certified Architect - Foundations study app. Use whenever the user asks to generate certification questions, fill question-bank coverage gaps, add questions to public/questions.json, or audit existing questions for ambiguity, duplication, sources, explanations, or schema compliance.
---

# Create Certification Questions

Create original, source-supported practice content for the Claude Certified Architect - Foundations study app. Align questions with published competencies without reproducing or claiming to reproduce protected exam content.

Treat `$ARGUMENTS` and the user's message as the request. Apply the repository instructions and workflow below throughout the task.

## Choose the mode

Determine the mode from the user's wording before doing work:

- **Generate and Add:** Generate, validate, and add questions to the live question bank only when the user clearly asks to add, append, insert, save, or update the bank.
- **Generate for Review:** Generate and validate questions, but do not modify repository files. Use this when the user asks to generate, draft, preview, or validate proposed questions without clearly requesting a file change.
- **Validate Existing Questions:** Review the requested, selected, or most recently added existing questions without generating replacements unless the user asks for fixes.

If file modification is ambiguous, use Generate for Review. State the chosen mode in the response.

## Read required context first

Do not draft questions until you have inspected the current repository state.

1. Read `AGENTS.md` and `CLAUDE.md` when present, plus any more specific repository instructions that apply.
2. Locate the maintained certification question guide. In this repository it is currently `docs/CLAUDE_CERTIFIED_ARCHITECT_QUESTION_GUIDE.md`; if that path changes, search case-insensitively for a similarly named guide rather than assuming it is absent.
3. Read the complete guide, especially its source hierarchy, verified blueprint, taxonomy, in/out-of-scope boundaries, question rules, schema mapping, quality checklist, source catalog, and verification gaps.
4. Locate the live bank. In this repository it is currently `public/questions.json`; confirm that application code still loads that path.
5. Read the complete bank and inspect representative questions relevant to the requested topic.
6. Inspect the actual schema and validation sources, including `src/types.ts`, `src/questions/validation.ts`, relevant tests, `package.json`, and any JSON Schema or validation scripts that now exist.
7. Inspect `git status` before editing. Preserve existing user changes and avoid unrelated files.

The maintained guide is the repository source of truth for exam scope and authoring quality. The actual TypeScript types, validator, and bank are the source of truth for the current application schema. If they conflict, do not guess or change the schema: explain the conflict and stop before writing.

## Resolve the request

Honor any supplied count, domain, topic, subtopic, difficulty, question type, learning objective, language, or source constraint.

When values are omitted:

- Default to a small, reviewable batch of 3 questions.
- Prefer concepts that are underrepresented in the existing bank and clearly map to the verified guide.
- Use a mix of Intermediate and Advanced scenario-based questions unless the current bank has a more urgent Foundational gap.
- Match the language and terminology of the existing bank.
- Use four options when that remains the bank convention, but infer the required option count from the actual schema and representative questions.
- Create single-best-answer questions because the current app stores one `correctOptionId`. Do not create multiple-response content unless the application schema is explicitly changed in a separate authorized task.

Do not invent an official distribution beyond published domain weights. A small batch does not need to reproduce those percentages exactly.

## Analyze existing coverage

Before generating or validating:

1. Count questions by fields that actually exist, such as `status`, `topic`, `difficulty`, and tags.
2. Map questions to official domains only when their content or metadata supports the mapping. Report unmappable items instead of inventing a domain label.
3. Identify underrepresented topics and difficulty levels.
4. Identify concepts already tested through substantially similar scenarios or distinctions.
5. Check correct-answer positions across the bank and the proposed batch.
6. Prefer genuine coverage gaps over superficial variations of existing questions.

Summarize the coverage decision briefly before presenting or adding generated questions.

## Research and source discipline

Use the guide's source hierarchy. Every answer must be supported by the maintained guide or a current authoritative source.

- Prefer current official Anthropic certification, Claude Platform, Claude Code, Agent SDK, and MCP documentation when web access is available.
- Open and inspect a source before claiming it was checked.
- Use direct first-party URLs in `sourceReferences`; never fabricate a URL or cite a search-results page.
- Reverify volatile commands, flags, feature names, limits, prices, model behavior, and beta details before relying on them.
- Separate verified facts from assumptions. Put answer-changing assumptions in the stem or explanation because the current schema has no dedicated assumptions field.
- If the guide is incomplete, outdated, ambiguous, or conflicts with current official documentation, prefer the current official source when it clearly resolves product behavior. Record the discrepancy.
- Stop and report uncertainty when it could change the correct answer, domain alignment, or schema-safe insertion.

Do not use third-party summaries as a source of truth. Never use exam dumps, candidate recollections, leaked material, protected course content, or memory of purported real questions.

## Generate original questions

For each proposed question:

1. Select one primary verified concept and learning objective.
2. Build an original architecture, implementation, evaluation, safety, troubleshooting, context-management, or trade-off scenario with only decision-relevant constraints.
3. Write a precise stem that supports exactly one best answer under stated assumptions.
4. Test applied understanding rather than obscure command trivia or vocabulary-only recall when a scenario can test the same objective.
5. Avoid trick wording, double negatives, unnecessary narrative, undocumented assumptions, and unstable model behavior.
6. Avoid universal claims where the correct choice depends on context.
7. Do not copy or lightly paraphrase examples or sample questions from the Exam Guide, official training, or the current bank.
8. Mark newly added questions `draft` unless the user explicitly requests a different supported status after review.

Generated content is non-official practice material. Never label it official, authentic, recalled, leaked, proprietary, identical to, or representative of a specific protected exam item.

## Design answer options

- Produce the exact option structure required by the current schema.
- Use plausible distractors based on specific misconceptions or weaker trade-offs.
- Keep options grammatically parallel, non-overlapping, and reasonably balanced in length and detail.
- Make every incorrect option wrong or weaker for an explainable reason tied to the scenario.
- Avoid absurd distractors, answer-pattern clues, and unsupported absolutes.
- Avoid "all of the above" and "none of the above" unless the maintained guide explicitly justifies them.
- Vary correct-option positions across the proposed batch and avoid worsening an existing concentration.

## Provide complete explanations and metadata

Populate every field required by the live schema. Under the current schema this includes:

- A unique non-empty `id` following the bank's established convention.
- A supported `status`.
- A focused `topic` and useful `tags` without adding unsupported fields.
- A difficulty label consistent with the guide's reasoning-depth definitions.
- A general explanation that teaches the decisive concept and applies it to the scenario.
- A separate `optionExplanations` entry for every option ID, stating precisely why it is best, weaker, or incorrect.
- Direct, actually checked `sourceReferences`.
- A finite positive `baseWeight` consistent with nearby questions; do not use weighting to encode unsupported exam importance.

Do not add `domain`, `subtopic`, `assumptions`, `lastVerified`, or any other field unless the current application schema has been explicitly updated to support it. Map authoring metadata into existing fields as directed by the maintained guide.

## Validate before writing

Review and internally revise every proposed item before modifying the bank. Confirm all of the following:

- The concept is within the verified exam scope and maps to one primary domain/objective.
- The best answer is supported by the guide or an authoritative source.
- Exactly one answer is best under the stated assumptions.
- All distractors are plausible, distinct, and specifically explainable.
- The stem and options are unambiguous and free of unintended clues.
- The general explanation teaches the concept and every option has an accurate explanation.
- The difficulty reflects reasoning depth rather than length or obscurity.
- The item makes no unsupported exam claim.
- Every claimed source, file, command, and result is real and was actually checked.
- The object conforms exactly to the current schema and formatting conventions.
- The ID is unique and option IDs/text are unique within the question.

Revise failures instead of adding them. If correctness or schema compliance cannot be established, exclude the item and report why.

## Check duplication

Compare proposed or selected items with the complete bank. Check for:

- Exact or near-duplicate stems.
- Reused IDs.
- The same scenario with names or numbers merely changed.
- The same underlying distinction tested with superficial rewording.
- Repeated or overlapping answer choices.
- Excessive concentration of correct answers in one option position.

Do not add low-value variations. Replace them with questions that cover a genuine gap.

## Write safely in Generate and Add mode

Only after content and schema validation:

1. Re-read `public/questions.json` immediately before editing so concurrent/user changes are preserved.
2. Append or insert only the validated new objects. Never replace or regenerate the full bank when additions were requested.
3. Preserve all existing questions, ordering conventions, indentation, and unrelated content.
4. Keep strict JSON: no comments, trailing commas, duplicate keys, or unsupported fields.
5. Reparse the complete JSON file after editing.
6. Re-run duplication and unique-ID checks on the complete result.
7. Run the repository's current validation, unit tests, and build commands that apply. Use pnpm for repository scripts.
8. If a failure was caused by a new question, fix that question. Do not change unrelated application code to force validation to pass.
9. Do not claim success for a command that was not run or did not pass.

For this repository, inspect `package.json` before relying on commands. The expected checks are JSON parsing, `pnpm test`, and `pnpm build`; run `pnpm test:e2e` when the change affects the primary user flow or when existing repository instructions require it.

## Generate for Review output

Do not edit files. Present a concise coverage note followed by each complete proposed question in the current JSON-compatible shape, plus any unresolved assumptions or source/version caveats. State that the content has not been added to `public/questions.json`.

## Validate Existing Questions output

Do not generate or edit unless requested. Report findings per question ID, prioritized by correctness risk:

- Scope/domain alignment.
- Answer support and uniqueness.
- Ambiguity or hidden assumptions.
- Distractor and explanation quality.
- Source validity/volatility.
- Schema and duplication issues.
- A concrete correction when safe to recommend.

If no material issues exist, say so and name the checks performed.

## Completion report

Report:

- The mode used and request resolved.
- Coverage gap or selection rationale.
- Question IDs generated, added, or reviewed.
- Files changed, or confirmation that none were changed.
- Sources checked and any assumptions or unresolved uncertainty.
- Validation commands actually run with exact pass/fail results.
- A reminder that generated questions are original non-official practice content.

## Invocation examples

- `/create-certification-questions Generate for Review: create 5 Intermediate questions about prompt engineering.`
- `/create-certification-questions Generate and Add: add 3 Advanced scenario questions for the least-covered verified exam domain.`
- `/create-certification-questions Generate for Review: create 5 tool-use questions and validate them without editing public/questions.json.`
- `/create-certification-questions Validate Existing Questions: review the last 10 questions for ambiguity, unsupported answers, and duplicate coverage.`
- `/create-certification-questions Generate and Add: create a balanced batch of 10 questions based on gaps in the current bank.`

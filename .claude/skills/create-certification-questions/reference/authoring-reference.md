# Authoring Quick Reference

A condensed cheat sheet for `create-certification-questions`. This is a fast on-ramp, not a
replacement for the maintained guide. It exists so the skill does not have to re-read the full
561-line guide on every invocation; still open the full guide before generating or reviewing
anything non-trivial.

**Primary source of truth:** `docs/CLAUDE_CERTIFIED_ARCHITECT_QUESTION_GUIDE.md`. It ranks sources,
lists verified exam facts, defines the taxonomy, and carries the authoritative schema notes. If
anything below conflicts with that file, the guide wins — update this cheat sheet instead of
trusting stale numbers here.

**Worked model:** [`example-questions.json`](example-questions.json) contains six original,
schema-valid, `status: "draft"` questions — one or two per domain — annotated with the objective
and misconception each one targets. Use it as a shape and tone reference, never as content to copy
into `public/questions.json` verbatim.

## How to use the exam guide

1. Read the guide's source hierarchy and treat the official Exam Guide / certification page as
   authoritative over this cheat sheet, the sample bank, or general product familiarity.
2. Pull the domain, objective, misconceptions, and suggested difficulty for the target concept from
   guide section 4 before drafting a scenario.
3. Check guide section 4's "Explicitly out of scope" list and section 14's unknowns before relying
   on any volatile detail (CLI flags, beta features, exact limits, command names).
4. When current official documentation conflicts with the guide, prefer the current official source
   only when it clearly resolves product behavior, and record the discrepancy — do not silently
   guess.
5. Never draw on exam dumps, recalled/leaked items, or unverifiable third-party summaries, even if
   the guide's own source hierarchy did not already rule them out for this query.

## Exam domains at a glance

| # | Domain | Weight | One-line focus |
| - | --- | ---: | --- |
| 1 | Agentic Architecture & Orchestration | 27% | Agent loops, `stop_reason` handling, coordinator/subagent decomposition, context handoff, resume vs. fresh session |
| 2 | Tool Design & MCP Integration | 18% | Tool contracts, error classification, least-privilege tool scoping, MCP scope/resources vs. tools, built-in tool selection |
| 3 | Claude Code Configuration & Workflows | 20% | `CLAUDE.md` scope, skills vs. always-on guidance, plan mode vs. direct execution, non-interactive CI usage, independent review |
| 4 | Prompt Engineering & Structured Output | 20% | Explicit acceptance criteria, few-shot placement, structured output vs. semantic correctness, retry vs. abstain, sync vs. batch |
| 5 | Context Management & Reliability | 15% | Preserving exact facts across summaries, escalation vs. guessing, failure propagation, segmented evaluation and calibration |

Weights are approximate proportions of the *official* 60-item exam, not a target distribution for a
small practice batch. See guide section 3-4 for the verified detail behind each row, including
misconceptions to test and suitable question formats.

## Question-quality requirements (non-negotiable)

- Maps to exactly one domain and one specific objective/concept.
- Tests one primary decision; secondary constraints may exist but must not create a second
  defensible answer.
- Exactly one best answer under the stated assumptions — re-check after writing distractors.
- Original scenario: no copied or lightly paraphrased Exam Guide sample items, official training
  content, or existing bank questions.
- Applied judgment over vocabulary-only recall whenever a short scenario can test the same concept.
- No trick wording, double negatives, hidden requirements, or irrelevant narrative.
- No dependence on undocumented behavior, unstable model-specific limits, or unverified facts.
- Difficulty reflects reasoning depth (see guide section 10), not sentence length or obscurity.
- Distractors are plausible and each wrong for one specific, explainable reason tied to the
  scenario — never absurd, never merely "not mentioned."
- Correct-option position varies across a batch; do not default every item to the same letter.

## Rules against unsupported or unofficial claims

- Never state or imply that a generated question is official, real, recalled, leaked, or
  representative of a specific protected exam item. Generated content is original, non-official
  practice material — say so in every completion report.
- Never invent exam objectives, domain names, weights, scoring details, question counts, policies,
  or product behavior not supported by the guide or a checked current official source.
- Distinguish **verified** facts (stated by an authoritative source), **interpretation**
  (conservative synthesis of verified material), and **assumption** (something the question stem
  must state explicitly because the schema has no dedicated assumptions field) — do not blur these
  together in an explanation.
- If the available source material cannot support a reliable single-best-answer question — the
  guide is silent, ambiguous, or the objective is explicitly out of scope — say so and stop instead
  of guessing or fabricating a plausible-sounding fact.
- Cite direct first-party URLs actually opened or already verified in the guide's source catalog
  (section 13). Never cite a search-results page or fabricate a URL.

## Expected question schema

Matches `src/types.ts` / `src/questions/validation.ts` exactly — do not add fields beyond this
shape:

```json
{
  "id": "unique-non-empty-id",
  "status": "draft",
  "topic": "Narrow concept name",
  "difficulty": "Foundational | Intermediate | Advanced",
  "tags": ["official-domain-slug", "subtopic-slug"],
  "question": "Original single-best-answer question stem",
  "options": [{ "id": "a", "text": "..." }, { "id": "b", "text": "..." }],
  "correctOptionId": "one of the option ids",
  "explanation": "General explanation teaching the decisive concept.",
  "optionExplanations": { "a": "Why a is right/wrong.", "b": "Why b is right/wrong." },
  "sourceReferences": ["https://... — direct first-party source"],
  "baseWeight": 1
}
```

Validation requirements: unique non-empty `id`; `status` is `draft`/`reviewed`/`retired`; `topic`,
`difficulty`, `question`, `explanation` non-empty strings; `tags`/`sourceReferences` are string
arrays; every option has a unique non-empty `id` and non-empty `text`; `correctOptionId` matches an
option; `optionExplanations` has a non-empty entry for every option id; `baseWeight` is a finite
number greater than zero. See guide section 12 for the full authoring notes, including which
metadata (domain, subtopic, assumptions, lastVerified) has no dedicated field yet and must be
folded into `topic`/`tags`/the stem instead.

# Claude Certified Architect - Foundations Practice-Question Guide

Last verified: **2026-07-14**

Certification guide version reviewed: **1.0, effective July 2026**

## 1. Purpose and Scope

This file is the maintained source of truth for AI agents that create original practice questions for this repository's Claude Certified Architect - Foundations study app. Read it together with `AGENTS.md`, the application schema in `src/types.ts`, the validator in `src/questions/validation.ts`, and the existing bank in `public/questions.json`.

This is a question-authoring guide, not an official Anthropic exam document. The repository's questions are non-official samples. Never describe a generated item as official, real, recalled, leaked, identical to, or representative of a specific protected exam item. Do not copy or lightly rewrite official sample questions. Create new scenarios that test the published competencies and reasoning patterns.

The labels used in this guide are:

- **Verified:** stated by an authoritative source listed below.
- **Interpretation:** a conservative synthesis of verified material, not a claim about an unpublished exam item.
- **Authoring recommendation:** a repository-specific rule for producing useful practice questions.
- **Unknown:** not confirmed from the available official sources.

When a current official source conflicts with this file, preserve the source URL, update the affected claim and its `lastVerified` date, and record the change. Never silently resolve a conflict with an assumption.

## 2. Source Hierarchy

Use sources in this order:

1. Official certification Exam Guide or competency outline.
2. Official Anthropic certification page.
3. Official Anthropic product and API documentation.
4. Publicly accessible official Anthropic Academy training material.
5. Repository-specific study notes and existing questions.
6. Clearly labeled inference or authoring recommendation.

Unsupported third-party material must not override an official source. Do not use exam dumps, recalled-question collections, leaked material, answer-key sites, or unverifiable summaries. Treat search snippets as discovery aids, not as substitutes for opening a source when direct access is available.

For volatile product behavior, verify the current documentation before writing a question. Prefer concepts and trade-offs that remain valid across model versions. Do not make a question depend on an undocumented default, a model alias that may move, or a fixed context-window size unless the current exam guide explicitly requires it.

## 3. Verified Exam Information

The official certification landing page and the repository's downloaded official Exam Guide agree on the following facts. The local guide is referenced as [Exam Guide v1.0](../questions/Claude%20Certified%20Architect%20Exam%20Guide.pdf); the live listing is the [official certification page](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification).

| Item | Verified information | Source |
| --- | --- | --- |
| Certification name | Claude Certified Architect - Foundations | Certification page; Exam Guide sections 1 and 3 |
| Exam code | CCAR-F | Exam Guide cover and section 3 |
| Purpose | Validates informed trade-off decisions when implementing real-world Claude solutions; the guide covers Claude Code, the Claude Agent SDK, the Claude API, and MCP | Exam Guide section 1 |
| Intended audience | Solution architects who design and implement production applications with Claude | Exam Guide section 2 |
| Recommended experience | The guide says the typical candidate has 6+ months of practical experience with Claude APIs, Agent SDK, Claude Code, and MCP | Exam Guide section 2 |
| Level | Foundations | Certification page |
| Number of items | 60 | Certification page; Exam Guide section 3 |
| Item format | Multiple-choice and multiple-response; each multiple-response item states how many responses to select | Certification page; Exam Guide section 3 |
| Exam structure | Four scenarios selected from a bank of six | Exam Guide sections 3 and 5 |
| Time limit | 120 minutes; the landing page also notes approximately 135 minutes of seat time | Certification page; Exam Guide section 3 |
| Passing score | 720 on a scaled range of 100-1,000 | Certification page; Exam Guide sections 3 and 10 |
| Language | English | Certification page |
| Price | USD 125 | Certification page; Exam Guide section 3 |
| Delivery | Online proctored or Pearson test center | Certification page; Exam Guide sections 3 and 11 |
| Registration/scheduling | Registration begins through the Anthropic Partner Academy; scheduling and delivery use Pearson VUE | Exam Guide section 11 |
| Result reporting | Pass/fail, scaled score, and percent correct by domain | Exam Guide sections 3 and 10 |
| Validity | 12 months from the date awarded | Certification page; Exam Guide sections 3 and 15 |
| On-time renewal | The guide describes a free, non-proctored renewal assessment through Anthropic Partner Academy; a lapsed credential requires the full exam | Exam Guide section 15 |
| Formal prerequisite | **Not confirmed from the available official sources.** The six-month statement describes the typical candidate, not a mandatory eligibility prerequisite. | Exam Guide section 2 |
| Additional available languages | **Not confirmed from the available official sources.** The official page lists English only. | Certification page |

### Official blueprint

| Domain | Weight |
| --- | ---: |
| Agentic Architecture & Orchestration | 27% |
| Tool Design & MCP Integration | 18% |
| Claude Code Configuration & Workflows | 20% |
| Prompt Engineering & Structured Output | 20% |
| Context Management & Reliability | 15% |

These are approximate proportions of scored items, not target percentages for every small practice set. Source: [official certification page](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification) and Exam Guide section 4.

## 4. Exam Domains and Topic Taxonomy

The domain names, weights, and objective coverage below are **verified** from Exam Guide sections 4, 6, and 17. Misconceptions, difficulty suggestions, and item formats are **authoring recommendations** derived from those objectives.

### Domain 1: Agentic Architecture & Orchestration (27%)

**Description:** Design agent loops, multi-agent coordination, deterministic workflow controls, task decomposition, and session-management strategies.

**Important concepts and skills**

- Drive client-tool loops from structured API state: inspect `stop_reason`, execute all requested tools, return matching `tool_result` blocks, and continue with complete conversation state.
- Distinguish model-driven tool selection from preconfigured decision trees and fixed prompt chains.
- Use coordinator-subagent patterns for decomposition, delegation, result aggregation, recovery, and controlled information flow.
- Pass subagent context explicitly and preserve content-to-source metadata across handoffs.
- Choose fixed sequential decomposition for predictable stages and adaptive decomposition for open-ended investigations.
- Use programmatic prerequisites and hooks when a business rule needs deterministic enforcement.
- Normalize heterogeneous tool results before downstream reasoning.
- Choose between resuming, forking, and starting fresh with a structured summary based on whether prior state remains valid.

**Common misconceptions to test**

- Treating assistant prose or a natural-language phrase as the reliable loop-termination signal.
- Assuming a subagent automatically receives the parent's full conversation or shares memory with other subagents.
- Sending every request through every specialist even when the coordinator can select only the needed roles.
- Treating prompt instructions as a hard security or compliance boundary.
- Resuming a session without disclosing that previously analyzed files or facts changed.
- Decomposing a broad investigation so narrowly that important coverage is lost.

**Typical decisions:** coordinator versus fixed pipeline; sequential versus parallel delegation; prompt guidance versus prerequisite gate/hook; local recovery versus coordinator escalation; resume versus fresh context; shared summary versus raw history.

**Suggested difficulty:** foundational for loop states and role boundaries; intermediate for decomposition and context handoff; advanced for failure recovery, enforcement, and competing orchestration designs.

**Suitable formats:** best architecture choice, identify the failed loop step, best next action, context-handoff design, enforcement choice, recovery strategy.

**Official sources:** Exam Guide Domain 1; [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works); [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls); [Claude Code subagents](https://code.claude.com/docs/en/sub-agents); [Claude Code hooks](https://code.claude.com/docs/en/hooks).

### Domain 2: Tool Design & MCP Integration (18%)

**Description:** Design clear tool contracts, return actionable failures, scope tools to agent roles, connect MCP servers, expose resources, and select appropriate built-in code tools.

**Important concepts and skills**

- Give each tool a distinct name and description covering purpose, when to use it, inputs, outputs, boundaries, and relevant edge cases.
- Split or consolidate tools according to whether their responsibilities and selection conditions are meaningfully distinct.
- Differentiate transient, validation, business, permission, and valid-empty-result outcomes; include retryability and useful recovery context.
- Restrict agents to role-relevant tools while allowing narrowly scoped cross-role tools when they eliminate a common coordination bottleneck.
- Understand `tool_choice` modes: automatic selection, requiring some tool, and forcing one named tool.
- Use project-scoped MCP configuration for team-shared servers and user scope for personal experiments; keep secrets out of committed configuration.
- Use MCP resources for discoverable context/catalogs and tools for actions or parameterized operations.
- Select Grep for content search, Glob for path matching, Read for inspection, Edit for targeted unique replacements, and Write for full-file creation/replacement when appropriate.

**Common misconceptions to test**

- Assuming schemas alone make overlapping tools easy to select.
- Returning the same generic error for timeouts, permission failures, policy rejection, and zero matches.
- Giving every agent every tool in the name of flexibility.
- Treating untrusted tool arguments as authorized application actions.
- Committing tokens directly to `.mcp.json`.
- Using Glob to search file contents or Grep solely to find filenames.

**Typical decisions:** refine a description versus rename/split a tool; tool versus resource; retry versus correct input versus escalate; project versus user MCP scope; specialist-only tools versus scoped shared capability; built-in tool selection.

**Suggested difficulty:** foundational for tools versus resources and built-in tool roles; intermediate for schema/description design and error classification; advanced for tool-distribution and recovery trade-offs.

**Suitable formats:** tool-interface critique, MCP configuration diagnosis, error-response design, least-privilege tool allocation, built-in tool choice, ambiguous-tool troubleshooting.

**Official sources:** Exam Guide Domain 2; [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview); [Tool troubleshooting](https://platform.claude.com/docs/en/agents-and-tools/tool-use/troubleshooting-tool-use); [MCP overview](https://platform.claude.com/docs/en/mcp); [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector); [Claude Code configuration](https://code.claude.com/docs/en/configuration).

### Domain 3: Claude Code Configuration & Workflows (20%)

**Description:** Configure persistent project guidance, path-specific rules, reusable workflows, safe planning, iterative development, and non-interactive CI usage.

**Important concepts and skills**

- Place personal instructions at user scope and team-shared instructions at project scope; use directory-level guidance for localized context.
- Keep `CLAUDE.md` focused and modularize with imports or `.claude/rules/`; use path frontmatter when rules apply only to matching files.
- Use skills for on-demand workflows and `CLAUDE.md` for concise, always-relevant project guidance.
- Isolate verbose or exploratory skill/subagent work when preserving the main context is valuable.
- Use plan mode for ambiguous, architectural, or multi-file work; use direct execution for clear, well-scoped changes.
- Improve results with concrete input/output examples, tests and failures, and targeted clarification/interview patterns.
- Run Claude Code non-interactively in CI with `-p`/`--print`; request machine-readable output when downstream automation must parse it.
- Use an independent review context when the goal is to challenge decisions made during generation.

**Common misconceptions to test**

- Putting team conventions only in a user-level file and expecting teammates to receive them.
- Treating `CLAUDE.md` as a deterministic permission or compliance control.
- Loading every specialized convention into every task.
- Using plan mode for a trivial, obvious one-line correction or direct execution for a broad migration with unresolved choices.
- Running `claude "prompt"` in CI and assuming it will exit without interactive input.
- Asking the same context that generated code to provide fully independent review.

**Typical decisions:** user/project/directory scope; always-on guidance versus skill; global versus path-scoped rule; plan versus direct execution; same-session refinement versus independent review; interactive versus print-mode CLI.

**Suggested difficulty:** foundational for configuration scopes and CLI mode; intermediate for path rules, skills, and iterative refinement; advanced for CI review architecture and context isolation.

**Suitable formats:** configuration-location choice, diagnose missing instructions, plan-mode decision, CI failure diagnosis, best refinement input, independent-review design.

**Official sources:** Exam Guide Domain 3; [Claude Code memory and `CLAUDE.md`](https://code.claude.com/docs/en/memory); [Claude Code feature overview](https://code.claude.com/docs/en/features-overview); [Claude Code CLI reference](https://code.claude.com/docs/en/cli-reference); [Claude Code permission modes](https://code.claude.com/docs/en/permission-modes).

### Domain 4: Prompt Engineering & Structured Output (20%)

**Description:** Define precise criteria, use targeted examples, generate schema-conformant output, validate semantics, recover from correctable failures, select batch processing appropriately, and design independent/multi-pass review.

**Important concepts and skills**

- Replace vague quality instructions with explicit inclusion, exclusion, and severity criteria.
- Use a small set of targeted few-shot examples to demonstrate format and judgment at ambiguous boundaries.
- Use structured outputs or strict tool schemas when consumers require valid shape; understand that syntactic conformance does not guarantee semantic truth.
- Model missing or ambiguous source data explicitly with nullable/optional fields or values such as `unclear`; do not force fabrication to satisfy a required field.
- On a correctable extraction failure, retry with the original evidence, failed output, and specific validation feedback.
- Do not retry when required evidence is absent; return uncertainty or route to review.
- Use Message Batches for latency-tolerant work and synchronous requests for blocking workflows; correlate batch results by `custom_id` rather than result order.
- Separate local per-file review from cross-file integration review when a single large pass dilutes attention.

**Common misconceptions to test**

- Believing instructions such as "be conservative" define actionable acceptance criteria.
- Adding many generic examples instead of a few examples at observed failure boundaries.
- Equating valid JSON or strict schema compliance with correct values.
- Making every extraction field required even when source documents may omit it.
- Retrying indefinitely when the source lacks the answer.
- Using asynchronous batches for a blocking pre-merge gate.
- Assuming results from a batch are returned in request order.

**Typical decisions:** explicit criteria versus generic confidence language; zero-shot versus few-shot; prose/JSON prompt versus structured output/tool schema; retry versus abstain/review; synchronous versus batch; one-pass versus independent multi-pass review.

**Suggested difficulty:** foundational for explicit prompts and schema roles; intermediate for few-shot selection, validation, and batch suitability; advanced for semantic recovery and multi-instance review trade-offs.

**Suitable formats:** prompt improvement, schema critique, extraction failure diagnosis, batch suitability, validation next step, review architecture.

**Official sources:** Exam Guide Domain 4; [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs); [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview); [Message Batches API](https://platform.claude.com/docs/en/api/messages/batches); [Console prompting tools](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools).

### Domain 5: Context Management & Reliability (15%)

**Description:** Preserve critical facts in long workflows, resolve ambiguity and escalation correctly, propagate useful failures, persist exploration state, calibrate human review, and maintain provenance across synthesis.

**Important concepts and skills**

- Keep critical identifiers, dates, amounts, statuses, constraints, and source mappings in structured state rather than allowing them to disappear into progressive summaries.
- Trim irrelevant fields from verbose tool results and organize long inputs with important summaries and explicit sections.
- Escalate on explicit human requests, policy gaps, and inability to make meaningful progress; clarify multiple matches instead of guessing.
- Do not use sentiment or uncalibrated self-confidence as the sole proxy for complexity.
- Propagate failure type, attempted action, partial results, and alternatives; distinguish access failure from a successful empty result.
- Use subagents and scratch/state artifacts to isolate verbose codebase exploration and enable recovery.
- Segment evaluation by field and document type; calibrate confidence against labeled data and sample high-confidence outputs for hidden errors.
- Preserve claim-source links, timestamps, conflict annotations, and coverage gaps throughout multi-source synthesis.

**Common misconceptions to test**

- Assuming a summary that preserves the gist necessarily preserves exact operational facts.
- Sending full raw tool payloads forever because more context is always better.
- Choosing one of several customer records heuristically.
- Treating a timeout and a valid empty search as equivalent.
- Trusting a high aggregate accuracy number without segment-level analysis.
- Selecting one of two credible conflicting values without preserving attribution and dates.

**Typical decisions:** raw history versus structured facts; trim versus retain context; clarify versus act; resolve versus escalate; retry locally versus propagate; aggregate accuracy versus stratified review; reconcile versus annotate conflicting evidence.

**Suggested difficulty:** foundational for ambiguity and error distinctions; intermediate for context/state patterns and escalation; advanced for calibration, provenance, and partial-failure synthesis.

**Suitable formats:** context-loss diagnosis, best escalation action, error-handoff design, human-review allocation, provenance repair, conflict handling.

**Official sources:** Exam Guide Domain 5; [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations); [Evaluation tool](https://platform.claude.com/docs/en/test-and-evaluate/eval-tool); [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works).

### Verified scenario families

The guide identifies six scenario families. Use them as broad settings, not as templates to reproduce official items:

1. Customer support resolution agent.
2. Code generation with Claude Code.
3. Multi-agent research system.
4. Developer productivity with Claude.
5. Claude Code in CI/CD.
6. Structured data extraction.

Original scenarios may use other settings when the tested decision maps directly to a published objective. Change names, industries, constraints, data, and failure details so the item is genuinely original.

## 5. Core Concepts Reference

These notes summarize the verified scope for question authors. They are not a replacement for current product documentation.

### Agent loops and stop reasons

- A client-defined tool call is a contract: Claude emits a `tool_use` block; application code validates and executes it; the application returns a matching `tool_result` in the next request.
- Continue the client-tool loop while the response requires tool execution. Handle other stop reasons explicitly; do not assume every non-`tool_use` outcome is a successful final answer.
- Keep the assistant tool-use content and conversation state needed for the next turn. Return results for every requested client tool, including parallel calls.
- Authorization, argument validation, idempotency, side-effect controls, and secret management remain application responsibilities.

### Orchestration and handoffs

- A coordinator should decompose the goal, select specialists, pass sufficient context, aggregate results, and decide whether gaps require more work.
- Subagent isolation reduces context pollution but creates an explicit handoff obligation. Pass goals, relevant facts, constraints, output contract, and provenance metadata.
- Parallel work is useful for independent subproblems. Sequential work is necessary when one result determines the next input. Adaptive loops suit discovery; fixed chains suit predictable stages.
- Deterministic prerequisites and policy limits belong in application logic or interception hooks, not only in natural-language instructions.

### Tool and MCP design

- Tool descriptions influence selection. Differentiate tools by **when** they should be used as well as what they do.
- A schema constrains shape; validation and permissions still protect execution. Treat model-produced arguments and external tool content as untrusted input.
- Error responses should help the agent choose among retrying, correcting input, selecting an alternative, asking the user, or escalating.
- MCP standardizes connections between AI applications and external tools/data. In exam-scope design questions, distinguish discoverable/read-oriented resources from action-oriented tools and choose configuration scope deliberately.

### Claude Code workflows

- `CLAUDE.md` supplies persistent behavioral/project context; it is not an enforcement mechanism. Permissions and hooks serve different control purposes.
- Use project scope for shared conventions, user scope for personal preferences, and path-scoped rules for conventions relevant only to matching files.
- Skills package reusable, on-demand knowledge or workflows. Subagents isolate work and context. Hooks react to lifecycle events and can enforce or automate deterministic checks.
- Plan mode supports exploration and architectural choice before mutation. Direct execution suits well-understood, bounded work.
- In automation, `claude -p`/`claude --print` runs non-interactively. Structured output flags help only when the resulting schema and semantics are also validated.

### Prompt design and structured output

- State the task, relevant context, success criteria, exclusions, and output contract. Use examples when they clarify format or an ambiguous decision boundary.
- Structured output guarantees should be evaluated separately from factual correctness. Validate totals, cross-field relationships, allowed business states, and grounding in source evidence.
- Permit missing/unclear values when the source may be incomplete. A schema that forces a value can turn absence into fabrication.
- Retry with precise feedback for correctable format or semantic errors. Missing evidence calls for abstention, clarification, retrieval, or human review rather than repeated generation.

### Context, grounding, and provenance

- Context is finite and relevance matters. Preserve a compact structured facts layer, trim noisy tool output, and summarize without dropping exact values that drive later decisions.
- Long-input reliability is not equivalent to mere fit within a context window. Organize evidence, use headings, and keep important summaries and source mappings easy to recover.
- For factual work, allow uncertainty, ground claims in supplied evidence, preserve citations, and verify critical claims. Conflicts should retain both values, their sources, and relevant dates until a justified resolution exists.
- Retrieval-augmented generation is relevant only at the level of selecting and grounding useful context. The guide explicitly excludes embedding-model and vector-database implementation details.

### Evaluation, reliability, and human review

- Define task-specific success criteria and maintain representative, versioned test cases including edge cases and observed failures.
- Compare changes on stable cases. Segment results by meaningful dimensions; a strong aggregate can hide a weak field or document class.
- Calibrate confidence thresholds with labeled outcomes. Continue sampling high-confidence outputs to detect drift or novel errors.
- Use human review for ambiguous/conflicting sources, low calibrated confidence, high-impact actions, policy gaps, or explicit escalation requests.

### Cost, latency, errors, and scale

- Match synchronous and asynchronous processing to workflow latency needs. Batches are appropriate for non-blocking work; blocking gates need predictable interactive completion.
- Retry only failures that are plausibly transient, use bounded backoff/jitter in implementation scenarios, and preserve identifiers so operations can be made idempotent where side effects matter.
- Report partial results and coverage gaps instead of converting partial failure into false success.
- The exam guide includes Message Batches trade-offs but explicitly excludes rate-limit, quota, API-pricing calculation, cloud-provider configuration, and performance-benchmark questions.

### Safety, privacy, and responsible architecture

- The verified scope emphasizes deterministic policy enforcement, least-privilege tool access, escalation, uncertainty, provenance, and human review.
- Never place secrets in prompts, tool descriptions, committed MCP configuration, question stems, or explanations.
- Do not expand the taxonomy into Constitutional AI, RLHF, internal model training, OAuth/key rotation, or general privacy-law trivia; the Exam Guide lists these or adjacent implementation details outside the tested scope.

### Explicitly out of scope

Do not author questions whose primary answer depends on:

- Fine-tuning or training Claude models.
- API authentication, billing, account administration, OAuth, or key rotation.
- Hosting/deploying MCP servers or container/network infrastructure.
- Claude's internal architecture, weights, training process, Constitutional AI, or RLHF.
- Embedding/vector-database implementation details.
- Computer use, browser/desktop automation, or vision/image analysis.
- Streaming/SSE implementation.
- Rate limits, quotas, pricing calculations, exact tokenization, or model benchmarks.
- Specific AWS, GCP, or Azure configuration.
- Prompt-caching implementation details beyond awareness that prompt caching exists.

Source: Exam Guide section 17. If a later official blueprint changes this list, update this section before generating affected questions.

## 6. Practice-Question Design Rules

Every question must:

1. Map to one primary verified domain and one specific published objective or concept.
2. Test one primary decision, even if the scenario contains realistic secondary constraints.
3. Be answerable from the cited source material and stated assumptions.
4. Use an original architecture, implementation, operations, or troubleshooting scenario.
5. Have exactly one clearly best answer for this app's current schema.
6. Include enough constraints to make the trade-off resolvable.
7. Prefer applied judgment over vocabulary-only recall when a concise scenario can test the concept.
8. Avoid tricks, double negatives, hidden requirements, and irrelevant narrative.
9. Avoid undocumented behavior, unstable model-specific limits, and facts that were not rechecked.
10. Use Anthropic-specific mechanisms when the objective is Anthropic-specific; do not replace the intended feature with vague vendor-neutral advice.
11. Qualify context-dependent recommendations. Words such as "always" and "never" require an actual invariant or explicit policy.
12. Be materially different in tested decision, scenario facts, and distractor logic from existing questions.

### A reliable authoring process

1. Select one domain task statement.
2. Write the evidence-backed learning objective in one sentence.
3. Choose a scenario with two or three decision-relevant constraints.
4. State the best action before drafting distractors.
5. Create distractors from identifiable misconceptions in this guide.
6. Check whether another option becomes correct under an unstated assumption; add the assumption or revise the options.
7. Write source-backed explanations and metadata.
8. Validate against the checklist in section 11 and the repository schema in section 12.

## 7. Multiple-Choice Option Rules

- Use plausible distractors that a partially prepared candidate might choose.
- Make every distractor wrong or weaker for one precise reason tied to the scenario.
- Keep grammar, tense, point of view, and abstraction level parallel.
- Keep lengths reasonably balanced. Do not make the correct answer the only qualified or detailed option.
- Avoid duplicate, nested, or substantially overlapping answers.
- Avoid absurd actions that no practitioner would consider.
- Avoid "all of the above" and "none of the above" unless a rare objective makes them indispensable.
- Avoid clues from absolute wording, terminology copied verbatim from the source, or a unique citation embedded in one option.
- Randomize correct-option positions across the overall bank. Do not preserve the current sample bank's all-`b` pattern when adding future content, except where an existing deterministic test explicitly requires unchanged fixtures.
- Confirm that changing one reasonable but unstated assumption would not create a second best answer.

The official exam includes multiple-response items, but the current app accepts exactly one answer and stores one `correctOptionId`. **Do not add multi-select questions to `public/questions.json` unless the user explicitly authorizes an application/schema change with validation and test updates.**

## 8. Explanation Requirements

For every question, author and retain:

- The correct option ID.
- A concise general explanation naming the decisive scenario facts and concept.
- A separate explanation for every option ID.
- The primary exam domain and narrower concept (represented through `topic` and `tags` in the current app).
- Difficulty.
- Direct official source references.
- Explicit assumptions when the answer depends on them.
- A last-verified date in the authoring record when the fact may change.

The general explanation should teach a reusable decision rule, not merely repeat the correct option. Each incorrect-option explanation must identify why that choice fails a stated constraint, misuses a feature, omits necessary handling, or is inferior to the best answer. Do not say only "incorrect" or "not recommended."

The app schema has no dedicated `assumptions`, `domain`, `subtopic`, or `lastVerified` fields. Until the schema is explicitly changed, put essential assumptions directly in the stem/explanation, use the official domain name in `tags`, use `topic` for the narrower concept, and include dated URLs in `sourceReferences` when volatility warrants it.

## 9. Question Types

Use patterns such as:

- **Best architecture choice:** "Given [constraints], which design best satisfies [goal]?"
- **Best next step:** "After [observed state], what should the architect do next?"
- **Troubleshooting:** "The system exhibits [symptoms]. Which cause or correction best fits?"
- **Security/safety decision:** "Which application control provides the required deterministic boundary?"
- **Prompt improvement:** "Which revision most directly fixes the observed false-positive or formatting failure?"
- **Tool-use configuration:** "Which description, schema, `tool_choice`, or permission boundary fits the requirement?"
- **Context-management strategy:** "Which state should be retained, trimmed, summarized, or handed off?"
- **Reliability trade-off:** "Which recovery/escalation design preserves useful partial progress without hiding failure?"
- **Cost/latency trade-off:** "Which workload is suitable for asynchronous batching?" Avoid pricing arithmetic.
- **Evaluation design:** "Which test set, segmentation, or calibration approach detects the stated risk?"
- **API integration:** "Which message/tool-result sequence correctly continues the workflow?"
- **Feature selection:** "Which Claude Code, Agent SDK, API, or MCP mechanism best matches the stated scope?"
- **Failure-cause identification:** "Which configuration or missing state most likely explains the behavior?"

These are non-official practice-item structures. Do not reproduce the official Exam Guide's sample stems, facts, option sets, or answer rationales.

## 10. Difficulty Guidelines

### Foundational

Tests direct understanding of one documented concept with little competing context. The candidate identifies a correct mechanism, scope, state, or distinction. Distractors represent clear but plausible confusions.

Examples of depth: Grep versus Glob; `tool_use` versus `end_turn`; project versus user configuration; valid empty result versus error.

### Intermediate

Requires applying one or two concepts to a realistic scenario. The candidate must use stated constraints to select a pattern and reject plausible alternatives.

Examples of depth: choose plan mode for a multi-file migration; choose an MCP resource versus tool; respond to a semantic validation error; preserve exact case facts while trimming verbose history.

### Advanced

Compares multiple credible designs or failure modes. The candidate must weigh reliability, observability, latency, context, enforcement, or review costs and recognize why the best answer fits this scenario rather than being universally superior.

Examples of depth: divide tools across coordinator/subagents while removing a latency bottleneck; decide retry/escalation behavior from structured partial failures; design independent and integration review passes; calibrate human review from segmented evidence.

Difficulty is about reasoning depth, not longer prose, obscure commands, or trickier wording.

## 11. Quality-Control Checklist

Before adding or reviewing a question, confirm:

- [ ] The primary topic is within the verified exam scope.
- [ ] The item maps to one official domain and a specific objective/concept.
- [ ] The best answer is supported by an authoritative source.
- [ ] There is exactly one best answer under the stated assumptions.
- [ ] Every distractor is plausible and wrong/weaker for a specific reason.
- [ ] Options are parallel, non-overlapping, and reasonably balanced.
- [ ] The wording is unambiguous and avoids unnecessary tricks.
- [ ] The explanation justifies every option.
- [ ] Any answer-changing assumptions are explicit.
- [ ] The difficulty label reflects reasoning depth.
- [ ] The item is materially different from existing questions.
- [ ] The content is original and does not reproduce or claim to reproduce official exam content.
- [ ] Direct source URLs are included in `sourceReferences`.
- [ ] Volatile facts, commands, flags, and links were checked against current official documentation.
- [ ] The question follows the live repository JSON schema.
- [ ] IDs and option text are unique, `baseWeight` is positive, and every option has an explanation.
- [ ] Draft content uses `status: "draft"` until it has been reviewed.

## 12. Recommended Question Data Schema

The application already has a required schema. Follow it exactly; do not add speculative fields to `public/questions.json` because the validator and TypeScript types intentionally define the supported contract.

```json
{
  "id": "unique-non-empty-id",
  "status": "draft",
  "topic": "Narrow concept name",
  "difficulty": "Intermediate",
  "tags": ["official-domain-slug", "subtopic-slug"],
  "question": "Original single-best-answer question stem",
  "options": [
    { "id": "a", "text": "Plausible option" },
    { "id": "b", "text": "Plausible option" },
    { "id": "c", "text": "Plausible option" },
    { "id": "d", "text": "Plausible option" }
  ],
  "correctOptionId": "a",
  "explanation": "Why this is the best answer under the stated constraints.",
  "optionExplanations": {
    "a": "Why option a is best.",
    "b": "Why option b is weaker or incorrect.",
    "c": "Why option c is weaker or incorrect.",
    "d": "Why option d is weaker or incorrect."
  },
  "sourceReferences": [
    "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview (verified YYYY-MM-DD)"
  ],
  "baseWeight": 1
}
```

Validation requirements from `src/questions/validation.ts`:

- `id` is a unique, non-empty string.
- `status` is `draft`, `reviewed`, or `retired`.
- `topic`, `difficulty`, `question`, and `explanation` are non-empty strings.
- `tags` and `sourceReferences` are arrays of strings.
- `options` is non-empty; every option has a unique non-empty `id` and non-empty `text`.
- `correctOptionId` matches an option.
- `optionExplanations` contains a non-empty explanation for every option.
- `baseWeight` is a finite number greater than zero.

### Authoring metadata not currently represented

For an external drafting worksheet, future agents may track `domain`, `subtopic`, `concept`, `assumptions`, `lastVerified`, and source-to-claim notes. Map them into current fields as described in section 8 before adding the item. Do not modify the application schema merely to store authoring metadata; schema changes require an explicit request plus coordinated type, validation, test, and compatibility work.

## 13. Source Catalog

All sources below are first-party Anthropic sources except the repository files, which are clearly identified. Accessed/verified **2026-07-14**.

| Source | Publisher | Supports | Access notes |
| --- | --- | --- | --- |
| [Claude Certified Architect - Foundations](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification) | Anthropic Partner Academy / Skilljar | Public exam summary, domains, weights, length, item count, English language, price, delivery, validity, passing score, preparation links | Direct page returned HTTP 403 to the research client; its current indexed official content was available. A local downloaded guide was also inspected. |
| [Exam Guide v1.0, effective July 2026](../questions/Claude%20Certified%20Architect%20Exam%20Guide.pdf) | Anthropic Certification Program | Purpose, audience, exam details, blueprint, task statements, scenarios, sample-item section, scoring, policies, renewal, in/out-of-scope lists | Repository snapshot; 39 pages. Text was extracted and pages 1, 3, and 4 were visually inspected. No stable direct download URL was exposed by the blocked landing page. Do not copy its sample questions. |
| [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | Anthropic | Tool contracts, execution location, `tool_choice`, strict tool use | Public documentation; volatile details should be rechecked. |
| [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works) | Anthropic | Agentic loop, `tool_use`, `tool_result`, stop reasons | Public documentation. |
| [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) | Anthropic | Result formatting, parallel calls, `is_error` behavior | Public documentation. |
| [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) | Anthropic | Schema-conformant JSON and strict tool use | Model support and syntax are volatile; always recheck. |
| [MCP overview](https://platform.claude.com/docs/en/mcp) | Anthropic | MCP purpose and Anthropic product integrations | Public documentation. |
| [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) | Anthropic | Messages API connection to remote MCP servers and scoped tool configuration | Beta/version and platform details are volatile; avoid testing them unless reverified and in scope. |
| [Claude Code memory and `CLAUDE.md`](https://code.claude.com/docs/en/memory) | Anthropic | Instruction scopes, project rules, on-demand subdirectory loading, behavioral versus enforced controls | Public documentation; current behavior may evolve. |
| [Claude Code feature overview](https://code.claude.com/docs/en/features-overview) | Anthropic | Choosing among `CLAUDE.md`, skills, MCP, subagents, and hooks | Public documentation. |
| [Claude Code CLI reference](https://code.claude.com/docs/en/cli-reference) | Anthropic | `-p`/`--print`, resume, permission mode, output formats | CLI flags are volatile; recheck before use in an item. |
| [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) | Anthropic | Isolated subagent configuration and tool/context scoping | Public documentation. |
| [Claude Code hooks](https://code.claude.com/docs/en/hooks) | Anthropic | Lifecycle interception and deterministic automation | Public documentation. |
| [Message Batches API](https://platform.claude.com/docs/en/api/messages/batches) | Anthropic | Asynchronous batches, 24-hour expiry/processing window, `custom_id` result correlation | Cost and service details are volatile; recheck before authoring. |
| [Console Evaluation Tool](https://platform.claude.com/docs/en/test-and-evaluate/eval-tool) | Anthropic | Test cases, comparisons, grading, and prompt version evaluation | Public documentation. |
| [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) | Anthropic | Uncertainty, grounding, source verification | Public documentation. |
| [`README.md`](../README.md), [`src/types.ts`](../src/types.ts), [`src/questions/validation.ts`](../src/questions/validation.ts), [`public/questions.json`](../public/questions.json) | This repository | App purpose, exact question schema/validation, current topic labels, non-official status | Repository-specific; cannot override official exam scope. |

## 14. Unknowns and Verification Gaps

- A formal eligibility prerequisite is **not confirmed from the available official sources**. The Exam Guide's "typically 6+ months" statement is candidate-profile guidance.
- Languages beyond English are **not confirmed from the available official sources**.
- Whether the four-scenario-from-six structure will remain unchanged in later exam forms is **not confirmed**; it is verified only for Exam Guide v1.0.
- A stable public direct URL for the PDF Exam Guide could not be confirmed because the certification page returned HTTP 403 to direct access. The repository snapshot was readable and visually verified.
- Public Anthropic Academy preparation-course content was listed on the certification page, but authenticated or enrollment-gated lesson content was not accessed. No claims in this guide depend on private lesson content.
- The exact registration eligibility rules for non-partners were not confirmed. Do not infer them from the Partner Academy branding.
- Exam retake, cancellation, identification, accommodations, appeals, and confidentiality policies exist in the Exam Guide, but they are operational policies rather than practice-question competencies and are not included in the authoring taxonomy.
- Product features, CLI flags, beta headers, model support, prices, and limits can change. The catalog records what was checked on 2026-07-14; future agents must verify volatile details anew.
- Exam Guide v1.0 describes subagent spawning with a `Task` tool and `allowedTools`, while the current Claude Code subagent documentation describes an `Agent` tool. This terminology/version mismatch was not resolved by the available official sources. Do not write command-name trivia from it; verify the current exam guide and product version, or test the stable architectural concept of explicit delegation and scoped tool access.
- Exact session-resume/fork syntax and the relationship between legacy custom commands and current skills are version-sensitive. Prefer the stable decisions (resume only when prior state remains valid; isolate reusable/on-demand workflows) unless current official sources agree on the exact syntax.
- The certification page's broad summary mentions model/deployment selection, cost, evaluation, and responsible deployment, while the detailed v1.0 blueprint narrows what is explicitly tested and lists several adjacent implementation topics out of scope. For question generation, the detailed blueprint and its in/out-of-scope lists take precedence.

## 15. Instructions for Future AI Agents

1. Read this guide before generating or reviewing questions.
2. Read `AGENTS.md` and inspect the current question schema, validator, tests, and existing bank.
3. Check the latest official certification guide and Anthropic documentation when web access is available.
4. Treat this file as a maintained reference, not immutable authority.
5. Update outdated facts only when an authoritative source supports the change; preserve the source URL and verification date.
6. Never invent exam details, domains, weights, scores, formats, policies, features, commands, or limits.
7. Never use, solicit, reproduce, or transform exam dumps, leaked items, or recalled protected questions.
8. Generate original practice questions aligned to published competencies, scenario reasoning, and appropriate difficulty - not replicas of official items.
9. Clearly separate verified facts, interpretations, and assumptions.
10. Never claim a page, command, file, or link was checked unless it was actually accessed.
11. Keep app questions single-best-answer under the current schema, even though the official exam also has multiple-response items.
12. Add new questions as `draft`, use direct first-party URLs, explain every option, run the repository's relevant validation/tests, and report exactly what passed or failed.

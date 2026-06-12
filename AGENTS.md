# AGENTS.md

# Project: ThoughtWeave

ThoughtWeave is a standalone desktop app prototype exploring adaptive interfaces for deep conversations.

The core hypothesis is that long-form conversations develop structure over time, such as branches, themes, reading paths, open questions, evidence chains, exploratory threads, decision points, and unresolved tensions.

Rather than forcing every conversation into a fixed linear chat interface, ThoughtWeave adapts the surrounding UX to the evolving structure of the conversation.

The conversation is the primary object.

The interface adapts to the conversation.

Before making changes, read:

- `docs/thoughtweave-product-brief.md`

That document contains the product intent, UX scenario, architecture direction, data model, layout-spec model, MVP stages, and acceptance criteria.

---

## Core Instruction

Build this project as a **safe, bounded, extensible prototype**.

ThoughtWeave explores promptable and adaptive conversation interfaces, but it must not generate or execute arbitrary UI code.

A model or planner may eventually generate a **validated layout specification**.

The app should render only known, trusted components from a component registry.

---

## Core Product Principle

The conversation is the primary object.

The interface should adapt to the structure and intent of the conversation.

The user should never lose:

- context
- reading position
- branch history
- conversational lineage
- pinned excerpts
- unresolved questions
- current thread of thought

Do not build:

- arbitrary generated HTML UI
- arbitrary generated JavaScript
- unsupported ChatGPT DOM scraping
- uncontrolled self-modifying interface behaviour
- UI that rearranges itself without user control

Prefer:

- mock data first
- TypeScript
- standalone Electron desktop app
- React renderer
- trusted component registry
- validated layout specs
- user-triggered layout changes
- preview/apply/revert for adaptive layouts
- stable chat surface with adaptive surrounding UX

---

## First MVP Goal

Create a standalone desktop app prototype showing a polished mock **Research Review Layout** for ThoughtWeave.

The first layout should include:

- Conversation Map
- Active Chat
- Pinned Context
- Reading Trail
- read/unread response sections
- branch-from-selection affordance
- resume-reading affordance

Use mock data.

Do not integrate ChatGPT yet.

Do not add model calls yet.

Do not scrape or embed third-party pages.

---

## Implementation Approach

When asked to plan:

1. Inspect the repository.
2. Read `docs/thoughtweave-product-brief.md`.
3. Produce a staged implementation plan.
4. Identify files to create or modify.
5. Identify build/run/test commands.
6. Identify risks and acceptance criteria.
7. Do not edit files unless explicitly asked.

When asked to build:

1. Implement the smallest coherent slice.
2. Keep the code clean and typed.
3. Avoid backend complexity unless requested.
4. Use mock data until the UX concept is working.
5. Report files changed, how to run, what works, what is mocked, and the next useful step.

---

## First Planning Prompt

Use this prompt to begin planning:

```text
Read AGENTS.md and docs/thoughtweave-product-brief.md, then inspect this repository.

I want to build the first prototype of ThoughtWeave, a standalone desktop app for adaptive interfaces around deep, long-form AI conversations.

Do not implement yet.

Please produce a staged plan for the first working prototype. The first prototype should open as a standalone desktop app showing a polished mock Research Review Layout with:
- Conversation Map
- Active Chat
- Pinned Context
- Reading Trail
- read/unread response sections
- branch-from-selection affordance
- resume-reading affordance

Focus on a small, safe, buildable implementation using mock data. Identify the files you would create or modify, the likely stack, risks, and the first acceptance tests.
```

---

## First Build Prompt

After the plan is acceptable, use this prompt:

```text
Implement Stage 1 and Stage 2 only.

Create a minimal standalone Electron app prototype for ThoughtWeave. It should open as its own desktop window and display a polished static Research Review Layout using mock data.

Do not add model calls yet.
Do not implement arbitrary generated UI.
Do not integrate ChatGPT yet.
Do not scrape or embed third-party pages.

After implementation, tell me:
- files created or changed
- how to run the app
- what is working
- what is still mocked
- the next smallest useful step
```

---

## Naming and Product Language

Use this product identity unless the user later renames it:

```text
ThoughtWeave
Adaptive interfaces for deep conversations
```

Use this short description:

```text
ThoughtWeave treats long-form conversations as evolving structures of thoughts, branches, contexts, questions, and reasoning paths. The interface adapts to support that structure.
```

Avoid describing the project merely as:

```text
a better ChatGPT client
```

or:

```text
a generic adaptive workspace
```

The project is about conversation-first adaptive UX.

---

## Codex Working Notes

When implementing:

- keep the first prototype visual and demonstrable
- prioritise the researcher scenario
- make the state model richer than `messages[]`
- preserve source relationships between excerpts, sections, and branches
- render only trusted components
- validate layout specs before rendering
- avoid premature model integration
- avoid hidden magic that changes UI unexpectedly
- keep the user's current conversational path visible and recoverable

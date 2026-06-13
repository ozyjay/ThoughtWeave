# AGENTS.md

# Project: ThoughtWeave

ThoughtWeave is an Apps SDK prototype exploring adaptive companion interfaces for deep ChatGPT conversations.

The core hypothesis is that long-form conversations develop structure over time, such as branches, themes, reading paths, open questions, evidence chains, exploratory threads, decision points, and unresolved tensions.

Rather than forcing every conversation into a fixed linear chat interface, ThoughtWeave renders companion UX that helps the user hold onto the evolving structure of the conversation.

The conversation is the primary object.

ThoughtWeave adapts around the conversation.

Before making changes, read:

- `docs/thoughtweave-product-brief.md`
- `apps/chatgpt-app/README.md` when touching the Apps SDK MVP
- `docs/thoughtweave-chatgpt-webview-selection-policy.md` or its successor when touching ChatGPT page content, WebViews, selection handoff, or capture behaviour

The product brief contains the current product intent, Apps SDK architecture direction, tool surface, UX model, MVP stages, and acceptance criteria.

---

## Core Instruction

Build this project as a **safe, bounded, extensible prototype**.

ThoughtWeave explores promptable and adaptive conversation interfaces, but it must not generate or execute arbitrary UI code.

ChatGPT or a planner may eventually provide structured context or a validated UI/layout suggestion.

The app should render only known, trusted ThoughtWeave components and Apps SDK widget resources.

The current primary MVP is a **ChatGPT App built with OpenAI Apps SDK**, located at:

```text
apps/chatgpt-app
```

The existing Electron app is a legacy/reference prototype. Do not delete or rewrite it unless explicitly asked.

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
- ChatGPT WebView DOM inspection
- hidden transcript capture
- prompt automation through the ChatGPT website
- a replacement ChatGPT client
- uncontrolled self-modifying interface behaviour
- UI that rearranges itself without user control

Prefer:

- Apps SDK / MCP tools first
- TypeScript
- React widget UI rendered inside ChatGPT
- narrowly scoped non-destructive tools
- structured tool input/output
- user/model-provided conversation context
- additive companion panels/widgets
- safe component rendering
- explicit user-facing behaviour
- no OpenAI API calls in the MCP server unless explicitly requested

---

## First MVP Goal

Create a private Developer Mode ChatGPT App prototype showing a polished **ThoughtWeave Reading Lens** companion widget.

The first Apps SDK MVP should include:

- MCP server exposing `/mcp`
- `create_reading_lens` tool
- `render_reading_lens` tool
- React widget rendered in ChatGPT
- Reading Lens
- Pinned Context
- Open Questions
- Suggested Panels
- Next Actions

Use user/model-provided conversation context.

Do not assume direct access to the full ChatGPT thread.

Do not add OpenAI API calls yet.

Do not scrape, inspect, or embed ChatGPT pages.

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
3. Keep MCP tools narrow, typed, non-destructive, and idempotent where practical.
4. Use structured tool data until deeper model/API behaviour is explicitly requested.
5. Report files changed, how to run, what works, what is mocked, and the next useful step.

---

## First Planning Prompt

Use this prompt to begin planning:

```text
Read AGENTS.md and docs/thoughtweave-product-brief.md, then inspect this repository.

I want to build the first Apps SDK prototype of ThoughtWeave, a ChatGPT App for adaptive companion interfaces around deep, long-form ChatGPT conversations.

Do not implement yet.

Please produce a staged plan for the first working prototype. The first prototype should run as a private ChatGPT Developer Mode app with:
- MCP server exposing `/mcp`
- `create_reading_lens`
- `render_reading_lens`
- React widget rendered inside ChatGPT
- Reading Lens
- Pinned Context
- Open Questions
- Suggested Panels
- Next Actions

Focus on a small, safe, buildable implementation using structured tool input/output. Identify the files you would create or modify, the likely stack, risks, and the first acceptance tests.
```

---

## First Build Prompt

After the plan is acceptable, use this prompt:

```text
Implement the first Apps SDK MVP slice only.

Create a ChatGPT App under `apps/chatgpt-app/`. It should expose an MCP `/mcp` endpoint, define the first ThoughtWeave reading-lens tools, and render a polished React widget inside ChatGPT.

Do not add OpenAI API calls yet.
Do not implement arbitrary generated UI.
Do not scrape or inspect ChatGPT DOM.
Do not automate ChatGPT prompts.

After implementation, tell me:
- files created or changed
- how to run and connect the app
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
- prioritise the Apps SDK Reading Lens scenario
- make the state model richer than `messages[]`
- preserve source relationships between excerpts, sections, and branches
- render only trusted ThoughtWeave widget components/resources
- validate tool inputs and outputs before rendering
- avoid premature model integration
- avoid hidden magic that changes UI unexpectedly
- keep the user's current conversational path visible and recoverable
- keep ChatGPT as the conversation surface for the Apps SDK MVP
- keep ThoughtWeave as an additive companion widget, not a ChatGPT replacement

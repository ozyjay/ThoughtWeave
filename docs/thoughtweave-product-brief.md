# ThoughtWeave Product Brief

# Adaptive Companion Interfaces for Deep Conversations

## Purpose

ThoughtWeave explores adaptive companion interfaces for deep, long-form ChatGPT conversations.

The project investigates whether a conversation can become a first-class object whose emerging structure is surfaced through safe, bounded UX: reading lenses, pinned context, open questions, suggested panels, next actions, branch anchors, and later conversation maps.

The current MVP direction is a **ChatGPT App built with OpenAI Apps SDK**. ChatGPT remains the primary conversation surface. ThoughtWeave appears as a companion widget when invoked with user/model-provided conversation context.

The previous Electron prototype remains in the repository as a legacy/reference implementation.

---

## Core Hypothesis

Deep conversations are not linear.

As a conversation grows, it develops structure:

- branches
- themes
- supporting context
- unresolved questions
- evidence chains
- reading paths
- decisions
- tasks
- competing ideas
- summaries
- contradictions
- follow-up trails
- source relationships

Traditional chat interfaces represent all of this as a vertical message stream.

ThoughtWeave explores whether an adaptive companion interface can surface these structures without replacing the conversation itself.

The goal is not simply to improve scrolling.

The goal is to support the shape of thought as it emerges through conversation.

---

## Core Product Principle

The conversation is the primary object.

For the Apps SDK MVP:

- ChatGPT is the conversation surface.
- ThoughtWeave is the adaptive companion surface.
- ThoughtWeave receives only the context provided through tool calls.
- ThoughtWeave does not scrape, inspect, or reconstruct the ChatGPT DOM.
- ThoughtWeave renders only trusted widget components.

The user should never lose:

- context
- reading position
- branch history
- conversational lineage
- pinned excerpts
- unresolved questions
- current thread of thought

---

## Current MVP Goal

Create a private Developer Mode ChatGPT App showing a polished **ThoughtWeave Reading Lens**.

The first MVP should include:

- MCP server exposing `/mcp`
- `create_reading_lens` tool
- `render_reading_lens` tool
- React widget rendered inside ChatGPT
- Reading Lens
- Pinned Context
- Open Questions
- Suggested Panels
- Next Actions

The MVP should use structured context supplied by the user/model through the tool call.

Do not add OpenAI API calls yet.

Do not implement arbitrary generated UI.

Do not scrape ChatGPT.

Do not automate ChatGPT prompts.

Do not assume direct full-thread access.

---

## Architecture Direction

Preferred current stack:

```text
apps/chatgpt-app/
  MCP server
  - TypeScript
  - Express
  - @modelcontextprotocol/sdk
  - @modelcontextprotocol/ext-apps
  - zod schemas
  - /mcp endpoint

  Widget UI
  - React
  - Vite
  - TypeScript
  - rendered as an Apps SDK widget resource
```

The app should follow a decoupled Apps SDK pattern:

```text
ChatGPT conversation
        ↓
ChatGPT chooses/calls ThoughtWeave tool
        ↓
create_reading_lens produces structuredContent
        ↓
render_reading_lens attaches the widget resource
        ↓
ThoughtWeave widget renders trusted companion panels
```

The MCP server should not call the OpenAI API in v1 unless explicitly requested.

---

## First Tool Surface

### `create_reading_lens`

Purpose:

```text
Use this when the user wants ThoughtWeave to organize provided conversation context into a reading lens with pinned excerpts, open questions, suggested panels, and next actions.
```

Input:

```ts
type CreateReadingLensInput = {
  conversation_context: string;
  mode?: "research" | "debugging" | "writing" | "decision" | "general";
  user_goal?: string;
};
```

Output:

```ts
type ReadingLens = {
  summary: string;
  mode: "research" | "debugging" | "writing" | "decision" | "general";
  user_goal?: string;
  sections: LensSection[];
  pinned_excerpts: PinnedExcerpt[];
  open_questions: string[];
  suggested_panels: SuggestedPanel[];
  next_actions: NextAction[];
  state_version: number;
};
```

### `render_reading_lens`

Purpose:

```text
Use this when a ThoughtWeave reading lens has already been prepared and should be displayed as an adaptive companion widget in ChatGPT.
```

The render tool attaches the ThoughtWeave widget resource and passes the prepared structured content to the iframe.

Both tools should be read-only, non-destructive, and idempotent.

---

## UX Model

ThoughtWeave should start intentionally small.

The first widget should show:

- a concise summary of the provided context
- sections representing the current thread, supporting context, and unresolved thread
- pinned excerpts
- open questions
- suggested companion panels
- safe next actions or prompt drafts

The widget should feel calm, compact, and clearly distinct from ChatGPT.

It should not pretend to be ChatGPT or obscure where ChatGPT ends and ThoughtWeave begins.

---

## Policy And Safety Boundaries

ThoughtWeave must not:

- scrape ChatGPT
- inspect the ChatGPT DOM
- reconstruct transcripts from page content
- monitor ChatGPT in the background
- automate prompts through the ChatGPT website
- access ChatGPT credentials, cookies, or tokens
- store hidden page metadata
- render arbitrary generated HTML or JavaScript

ThoughtWeave may:

- receive user/model-provided context through Apps SDK tools
- transform that context into structured local UI state
- render trusted widget components
- offer safe follow-up prompt drafts
- persist widget UI state where supported by the Apps SDK host

If WebView or manual selection flows return later, follow the ChatGPT WebView selection policy document before implementation.

---

## Legacy Electron Prototype

The existing Electron app demonstrates an earlier static Research Review layout with:

- Conversation Map
- Active Chat
- Pinned Context
- Reading Trail
- read/unread sections
- pinning
- branch preview
- resume reading
- trusted layout rendering

Keep this prototype as a reference unless explicitly asked to remove or migrate it.

---

## MVP Acceptance Criteria

The Apps SDK MVP is acceptable when:

- `apps/chatgpt-app` has a clear local run path
- MCP server exposes `/mcp`
- tools list includes `create_reading_lens` and `render_reading_lens`
- `create_reading_lens` returns validated structured content
- `render_reading_lens` attaches the ThoughtWeave widget resource
- widget renders Reading Lens, Pinned Context, Open Questions, Suggested Panels, and Next Actions
- TypeScript build passes
- tests pass
- production dependency audit has no known vulnerabilities
- local MCP SDK smoke test can list and call the tools

Manual ChatGPT Developer Mode testing should happen after the local MCP path works.

---

## Useful Commands

Apps SDK MVP:

```bash
cd apps/chatgpt-app
npm install
npm test
npm run build
npm run server
```

MCP Inspector:

```bash
cd apps/chatgpt-app
npm run inspect
```

Legacy Electron prototype:

```bash
npm install
npm test
npm run compile
npm run build
npm run dev
```

---

## Product Language

Use this product identity unless the user later renames it:

```text
ThoughtWeave
Adaptive interfaces for deep conversations
```

Use this short description:

```text
ThoughtWeave treats long-form conversations as evolving structures of thoughts, branches, contexts, questions, and reasoning paths. The interface adapts to support that structure.
```

Avoid describing ThoughtWeave merely as:

```text
a better ChatGPT client
```

or:

```text
a generic adaptive workspace
```

The project is about conversation-first adaptive UX.

# ThoughtWeave

ThoughtWeave is a standalone desktop app prototype for adaptive interfaces around deep conversations.

It treats long-form conversations as evolving structures of thoughts, branches, contexts, questions, and reasoning paths. The first prototype uses mock data to demonstrate a Research Review Layout without model calls, ChatGPT integration, scraping, or arbitrary generated UI.

## Run

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run compile
npm run build
```

## Current Prototype

- Electron desktop shell with a secure preload bridge
- React + Vite renderer
- Mock research-review conversation data
- Conversation Map, Active Chat, Pinned Context, and Reading Trail panels
- Local in-memory interactions for reading state, pinning, branching, and resume reading
- Trusted layout spec renderer with safe component registry validation

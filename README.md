# ThoughtWeave

ThoughtWeave is a prototype for adaptive companion interfaces around deep conversations.

It treats long-form conversations as evolving structures of thoughts, branches, contexts, questions, and reasoning paths. The current direction is a ChatGPT App built with the Apps SDK: ChatGPT remains the conversation surface, while ThoughtWeave renders an adaptive companion widget from user/model-provided context.

## Run

Apps SDK MVP:

```bash
cd apps/chatgpt-app
npm install
npm run build
npm run server
```

Legacy Electron prototype:

```bash
npm install
npm run dev
```

## Verify

Apps SDK MVP:

```bash
cd apps/chatgpt-app
npm test
npm run build
```

Legacy Electron prototype:

```bash
npm test
npm run compile
npm run build
```

## Current Prototype

- ChatGPT App scaffold under `apps/chatgpt-app`
- MCP server exposing `/mcp`
- `create_reading_lens` and `render_reading_lens` tools
- React widget for Reading Lens, Pinned Context, Open Questions, suggested panels, and next actions
- No ChatGPT DOM scraping, prompt automation, transcript reconstruction, or client-side OpenAI API keys

## Legacy Electron Prototype

- Electron desktop shell with a secure preload bridge
- React + Vite renderer
- Mock research-review conversation data
- Conversation Map, Active Chat, Pinned Context, and Reading Trail panels
- Local in-memory interactions for reading state, pinning, branching, and resume reading
- Trusted layout spec renderer with safe component registry validation

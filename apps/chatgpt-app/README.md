# ThoughtWeave ChatGPT App

ThoughtWeave is now being explored as a ChatGPT App built with the Apps SDK. ChatGPT remains the conversation surface; ThoughtWeave appears as an adaptive companion widget when invoked with user/model-provided conversation context.

This app does not scrape ChatGPT, inspect the DOM, reconstruct transcripts, automate prompts, or require an OpenAI API key for the v1 MCP server.

Read the product brief before changing the app:

```text
../../docs/thoughtweave-product-brief.md
```

## Run Locally

```bash
npm install
npm run build
npm run server
```

The MCP endpoint is:

```text
http://127.0.0.1:8787/mcp
```

Health check:

```text
http://127.0.0.1:8787/health
```

## Test with MCP Inspector

In another terminal:

```bash
npm run inspect
```

## Connect in ChatGPT Developer Mode

1. Run `npm run build` and `npm run server`.
2. Expose port `8787` with an HTTPS tunnel such as `ngrok http 8787`.
3. In ChatGPT, enable Developer Mode under Settings -> Apps & Connectors -> Advanced settings.
4. Create a new app/connector with the public HTTPS URL ending in `/mcp`.
5. Refresh the app after tool or metadata changes.

## Tools

- `create_reading_lens`: turns provided conversation context into structured ThoughtWeave lens data.
- `render_reading_lens`: renders prepared lens data in the ThoughtWeave widget.

Both tools are read-only, idempotent, and non-destructive.

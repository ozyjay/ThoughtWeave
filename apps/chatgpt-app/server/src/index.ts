import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import {
  createReadingLens,
  createReadingLensInputSchema,
  readingLensOutputSchema
} from "./readingLens";
import { getToolDescriptors, THOUGHTWEAVE_WIDGET_URI } from "./serverContract";
import { readWidgetHtml } from "./widgetHtml";

const PORT = Number(process.env.PORT ?? 8787);

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "thoughtweave-chatgpt-app",
    version: "0.1.0"
  });

  const [createLensDescriptor, renderLensDescriptor] = getToolDescriptors();

  server.registerTool(
    createLensDescriptor.name,
    {
      title: createLensDescriptor.title,
      description: createLensDescriptor.description,
      inputSchema: createReadingLensInputSchema.shape,
      outputSchema: readingLensOutputSchema.shape,
      annotations: createLensDescriptor.annotations
    },
    async (args) => {
      const lens = createReadingLens(args);
      return {
        structuredContent: lens,
        content: [
          {
            type: "text",
            text: `ThoughtWeave created a ${lens.mode} reading lens with ${lens.sections.length} sections, ${lens.open_questions.length} open question(s), and ${lens.next_actions.length} next action(s).`
          }
        ]
      };
    }
  );

  registerAppTool(
    server,
    renderLensDescriptor.name,
    {
      title: renderLensDescriptor.title,
      description: renderLensDescriptor.description,
      inputSchema: readingLensOutputSchema.shape,
      outputSchema: readingLensOutputSchema.shape,
      annotations: renderLensDescriptor.annotations,
      _meta: renderLensDescriptor._meta ?? { ui: { resourceUri: THOUGHTWEAVE_WIDGET_URI } }
    },
    async (args) => {
      const lens = readingLensOutputSchema.parse(args);
      return {
        structuredContent: lens,
        content: [
          {
            type: "text",
            text: "Rendered the ThoughtWeave Reading Lens companion widget."
          }
        ],
        _meta: {
          thoughtweave: {
            policy: "ThoughtWeave renders only user/model-provided tool context. It does not scrape ChatGPT."
          }
        }
      };
    }
  );

  registerAppResource(
    server,
    "ThoughtWeave Reading Lens",
    THOUGHTWEAVE_WIDGET_URI,
    {
      description: "Adaptive companion widget for ThoughtWeave reading lenses.",
      _meta: {
        ui: {
          prefersBorder: true,
          csp: {
            connectDomains: [],
            resourceDomains: []
          }
        },
        "openai/widgetDescription":
          "ThoughtWeave organizes provided conversation context into a reading lens with pinned excerpts, open questions, and next actions."
      }
    },
    async () => ({
      contents: [
        {
          uri: THOUGHTWEAVE_WIDGET_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: await readWidgetHtml(),
          _meta: {
            ui: {
              prefersBorder: true,
              csp: {
                connectDomains: [],
                resourceDomains: []
              }
            }
          }
        }
      ]
    })
  );

  return server;
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    app: "ThoughtWeave ChatGPT App",
    mcp: "/mcp"
  });
});

app.all("/mcp", async (req, res) => {
  const server = createMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined
  });

  res.on("close", () => {
    void server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`ThoughtWeave MCP server listening on http://127.0.0.1:${PORT}/mcp`);
});

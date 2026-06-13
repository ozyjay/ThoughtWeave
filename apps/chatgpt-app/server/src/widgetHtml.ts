import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "../..");
const webDistDir = path.join(appRoot, "dist/web");

async function tryRead(filePath: string): Promise<string | undefined> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

export async function readWidgetHtml(): Promise<string> {
  const htmlPath = path.join(webDistDir, "index.html");
  const html = await tryRead(htmlPath);

  if (!html) {
    return `
      <main style="font-family:system-ui,sans-serif;padding:16px">
        <h2>ThoughtWeave</h2>
        <p>Build the widget first with <code>npm run build</code> so ChatGPT can render the Reading Lens UI.</p>
      </main>
    `;
  }

  const withInlineScripts = await inlineAssets(html, "script", "src");
  return inlineAssets(withInlineScripts, "link", "href");
}

async function inlineAssets(html: string, tag: "script" | "link", attribute: "src" | "href"): Promise<string> {
  const pattern =
    tag === "script"
      ? /<script\s+type="module"\s+crossorigin\s+src="([^"]+)"><\/script>/g
      : /<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+)">/g;

  let result = html;
  const matches = [...html.matchAll(pattern)];

  for (const match of matches) {
    const assetRef = match[1];
    if (!assetRef) {
      continue;
    }

    const assetPath = path.join(webDistDir, assetRef.replace(/^\//, ""));
    const asset = await tryRead(assetPath);
    if (!asset) {
      continue;
    }

    const replacement =
      tag === "script"
        ? `<script type="module">${asset}</script>`
        : `<style>${asset}</style>`;

    result = result.replace(match[0], replacement);
  }

  return result;
}

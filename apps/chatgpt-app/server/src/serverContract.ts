export const THOUGHTWEAVE_WIDGET_URI = "ui://thoughtweave/reading-lens.html";

export type ToolDescriptor = {
  name: "create_reading_lens" | "render_reading_lens";
  title: string;
  description: string;
  annotations: {
    readOnlyHint: true;
    destructiveHint: false;
    idempotentHint: true;
    openWorldHint: false;
  };
  _meta?: Record<string, unknown>;
};

const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false
} as const;

export function getToolDescriptors(): ToolDescriptor[] {
  return [
    {
      name: "create_reading_lens",
      title: "Create Reading Lens",
      description:
        "Use this when the user wants ThoughtWeave to organize provided conversation context into a reading lens with pinned excerpts, open questions, suggested panels, and next actions.",
      annotations: readOnlyAnnotations
    },
    {
      name: "render_reading_lens",
      title: "Render Reading Lens",
      description:
        "Use this when a ThoughtWeave reading lens has already been prepared and should be displayed as an adaptive companion widget in ChatGPT.",
      annotations: readOnlyAnnotations,
      _meta: {
        ui: { resourceUri: THOUGHTWEAVE_WIDGET_URI },
        "openai/outputTemplate": THOUGHTWEAVE_WIDGET_URI,
        "openai/toolInvocation/invoking": "Opening ThoughtWeave",
        "openai/toolInvocation/invoked": "ThoughtWeave lens ready"
      }
    }
  ];
}

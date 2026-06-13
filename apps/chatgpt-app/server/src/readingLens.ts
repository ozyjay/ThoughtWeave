import { z } from "zod";

export const readingLensModeSchema = z.enum(["research", "debugging", "writing", "decision", "general"]);

export const createReadingLensInputSchema = z.object({
  conversation_context: z.string().trim().min(1, "Conversation context is required."),
  mode: readingLensModeSchema.optional().default("general"),
  user_goal: z.string().trim().optional()
});

export const lensSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  status: z.enum(["active", "supporting", "unresolved"])
});

export const pinnedExcerptSchema = z.object({
  id: z.string(),
  label: z.string(),
  text: z.string()
});

export const suggestedPanelSchema = z.object({
  id: z.enum(["reading-lens", "pinned-context", "open-questions", "next-actions"]),
  title: z.string(),
  reason: z.string()
});

export const nextActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  prompt: z.string()
});

export const readingLensOutputSchema = z.object({
  summary: z.string(),
  mode: readingLensModeSchema,
  user_goal: z.string().optional(),
  sections: z.array(lensSectionSchema).min(1),
  pinned_excerpts: z.array(pinnedExcerptSchema),
  open_questions: z.array(z.string()),
  suggested_panels: z.array(suggestedPanelSchema).min(1),
  next_actions: z.array(nextActionSchema).min(1),
  state_version: z.number().int().positive()
});

export type CreateReadingLensInput = z.infer<typeof createReadingLensInputSchema>;
export type ReadingLens = z.infer<typeof readingLensOutputSchema>;

const modeLabels: Record<CreateReadingLensInput["mode"], string> = {
  research: "Research review",
  debugging: "Debugging review",
  writing: "Writing review",
  decision: "Decision review",
  general: "Conversation review"
};

function normalizeContext(context: string): string {
  return context
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function firstInterestingExcerpt(sentences: string[]): string {
  return (
    sentences.find((sentence) => /concern|misses|important|should|evidence|risk|constraint/i.test(sentence)) ??
    sentences[0] ??
    "No excerpt was provided."
  );
}

function extractQuestions(sentences: string[]): string[] {
  const questions = sentences
    .filter((sentence) => sentence.includes("?") || /^open question:/i.test(sentence))
    .map((sentence) => sentence.replace(/^open question:\s*/i, "").trim());

  return questions.length > 0 ? questions : ["What follow-up would best preserve the current thread of thought?"];
}

function createSections(sentences: string[], mode: CreateReadingLensInput["mode"]): ReadingLens["sections"] {
  const [first = "Conversation context was provided.", second, ...rest] = sentences;
  const supporting = [second, ...rest].filter(Boolean).slice(0, 3).join(" ");

  return [
    {
      id: "section-current-thread",
      title: modeLabels[mode],
      body: first,
      status: "active"
    },
    {
      id: "section-supporting-context",
      title: "Supporting context",
      body: supporting || "No additional supporting context was included in the supplied excerpt.",
      status: "supporting"
    },
    {
      id: "section-unresolved",
      title: "Unresolved thread",
      body: extractQuestions(sentences)[0] ?? "No unresolved question was detected.",
      status: "unresolved"
    }
  ];
}

export function createReadingLens(input: CreateReadingLensInput): ReadingLens {
  const parsed = createReadingLensInputSchema.parse(input);
  const normalized = normalizeContext(parsed.conversation_context);
  const sentences = splitSentences(normalized);
  const excerpt = firstInterestingExcerpt(sentences);
  const openQuestions = extractQuestions(sentences);

  return readingLensOutputSchema.parse({
    summary: sentences[0] ?? normalized,
    mode: parsed.mode,
    user_goal: parsed.user_goal,
    sections: createSections(sentences, parsed.mode),
    pinned_excerpts: [
      {
        id: "excerpt-primary",
        label: "Pinned context",
        text: excerpt
      }
    ],
    open_questions: openQuestions,
    suggested_panels: [
      {
        id: "reading-lens",
        title: "Reading Lens",
        reason: "Organize the supplied context into a stable current thread."
      },
      {
        id: "pinned-context",
        title: "Pinned Context",
        reason: "Keep the most useful excerpt visible while the conversation continues."
      },
      {
        id: "open-questions",
        title: "Open Questions",
        reason: "Preserve unresolved questions as follow-up anchors."
      },
      {
        id: "next-actions",
        title: "Next Actions",
        reason: "Offer safe prompt drafts without automating ChatGPT."
      }
    ],
    next_actions: [
      {
        id: "action-ask-follow-up",
        label: "Ask a focused follow-up",
        prompt: `Continue from this ${modeLabels[parsed.mode].toLowerCase()} thread: ${openQuestions[0]}`
      },
      {
        id: "action-summarize-lens",
        label: "Summarize this lens",
        prompt: `Summarize the current ThoughtWeave lens in 5 bullets.`
      }
    ],
    state_version: 1
  });
}

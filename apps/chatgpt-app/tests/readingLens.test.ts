import { describe, expect, it } from "vitest";
import {
  createReadingLens,
  createReadingLensInputSchema,
  readingLensOutputSchema
} from "../server/src/readingLens";

const sampleContext = `
We are reviewing evaluation frameworks for digital mental health interventions.
The assistant compared RE-AIM, CFIR, and realist evaluation approaches.
One concern is that symptom reduction alone misses quality of life and implementation outcomes.
Open question: Which patient-reported outcome measures are sensitive enough for short studies?
Next action: compare PROMIS, PHQ-9, GAD-7, and WHODAS across feasibility and sensitivity.
`;

describe("createReadingLens", () => {
  it("creates a structured lens from user-provided conversation context", () => {
    const lens = createReadingLens({
      conversation_context: sampleContext,
      mode: "research",
      user_goal: "Keep track of evidence and unanswered measurement questions."
    });

    expect(lens.summary).toContain("digital mental health interventions");
    expect(lens.sections.length).toBeGreaterThanOrEqual(2);
    expect(lens.pinned_excerpts[0]?.text).toContain("symptom reduction");
    expect(lens.open_questions.some((question) => question.includes("patient-reported"))).toBe(true);
    expect(lens.suggested_panels.map((panel) => panel.id)).toContain("pinned-context");
    expect(lens.next_actions.length).toBeGreaterThan(0);
    expect(() => readingLensOutputSchema.parse(lens)).not.toThrow();
  });

  it("validates the public tool input contract", () => {
    expect(() =>
      createReadingLensInputSchema.parse({
        conversation_context: "A short but explicit context.",
        mode: "debugging",
        user_goal: "Find the current working theory."
      })
    ).not.toThrow();

    expect(() =>
      createReadingLensInputSchema.parse({
        conversation_context: "",
        mode: "unsupported"
      })
    ).toThrow();
  });
});

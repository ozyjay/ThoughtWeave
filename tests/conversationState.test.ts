import { describe, expect, it } from "vitest";
import {
  branchFromPinnedExcerpt,
  pinSection,
  resumeReading,
  setReadingSection
} from "../src/state/conversationState";
import { createMockConversation } from "../src/state/mockConversation";

describe("conversation interaction state", () => {
  it("sets one section as reading and preserves unread sections", () => {
    const conversation = createMockConversation();

    const updated = setReadingSection(conversation, "section-data-considerations");

    const sections = updated.messages.flatMap((message) => message.sections ?? []);
    expect(sections.find((section) => section.id === "section-metrics")?.readState).toBe("read");
    expect(sections.find((section) => section.id === "section-data-considerations")?.readState).toBe("reading");
    expect(updated.readingTrail.lastReadSectionId).toBe("section-data-considerations");
  });

  it("pins a section excerpt and records the source section", () => {
    const conversation = createMockConversation();

    const updated = pinSection(conversation, "section-metrics");

    const pinnedExcerptId = updated.layoutState.pinnedExcerptIds.at(-1);
    const pinnedExcerpt = updated.excerpts.find((excerpt) => excerpt.id === pinnedExcerptId);
    expect(pinnedExcerpt?.sourceSectionId).toBe("section-metrics");
    expect(pinnedExcerpt?.selectedText).toContain("Outcomes should be multi-dimensional");
  });

  it("creates a branch that remains linked to the pinned excerpt", () => {
    const conversation = pinSection(createMockConversation(), "section-metrics");
    const pinnedExcerptId = conversation.layoutState.pinnedExcerptIds.at(-1);

    const updated = branchFromPinnedExcerpt(conversation, pinnedExcerptId ?? "");

    const branch = updated.branches.at(-1);
    expect(branch?.sourceExcerptId).toBe(pinnedExcerptId);
    expect(branch?.title).toBe("Which patient-reported outcome measures are most sensitive to change?");
  });

  it("resumes reading at the first unread section", () => {
    const conversation = createMockConversation();

    const updated = resumeReading(conversation);

    expect(updated.readingTrail.lastReadSectionId).toBe("section-data-considerations");
    expect(
      updated.messages
        .flatMap((message) => message.sections ?? [])
        .find((section) => section.id === "section-data-considerations")?.readState
    ).toBe("reading");
  });
});

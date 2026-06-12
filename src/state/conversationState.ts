import type { Branch, Conversation, Excerpt, ResponseSection } from "../types/conversation";

function getAllSections(conversation: Conversation): ResponseSection[] {
  return conversation.messages.flatMap((message) => message.sections ?? []);
}

function updateSections(
  conversation: Conversation,
  updater: (section: ResponseSection) => ResponseSection
): Conversation {
  return {
    ...conversation,
    messages: conversation.messages.map((message) => ({
      ...message,
      sections: message.sections?.map(updater)
    }))
  };
}

export function setReadingSection(conversation: Conversation, sectionId: string): Conversation {
  const section = getAllSections(conversation).find((candidate) => candidate.id === sectionId);

  if (!section) {
    return conversation;
  }

  const updated = updateSections(conversation, (candidate) => {
    if (candidate.id === sectionId) {
      return { ...candidate, readState: "reading", collapsed: false };
    }

    if (candidate.readState === "reading") {
      return { ...candidate, readState: "read" };
    }

    return candidate;
  });

  const unreadSectionIds = getAllSections(updated)
    .filter((candidate) => candidate.readState === "unread")
    .map((candidate) => candidate.id);

  return {
    ...updated,
    readingTrail: {
      ...updated.readingTrail,
      lastReadMessageId: section.messageId,
      lastReadSectionId: section.id,
      unreadSectionIds
    }
  };
}

export function markSectionReadState(
  conversation: Conversation,
  sectionId: string,
  readState: ResponseSection["readState"]
): Conversation {
  const updated = updateSections(conversation, (section) =>
    section.id === sectionId ? { ...section, readState } : section
  );

  return {
    ...updated,
    readingTrail: {
      ...updated.readingTrail,
      unreadSectionIds: getAllSections(updated)
        .filter((section) => section.readState === "unread")
        .map((section) => section.id)
    }
  };
}

export function pinSection(conversation: Conversation, sectionId: string): Conversation {
  const section = getAllSections(conversation).find((candidate) => candidate.id === sectionId);

  if (!section) {
    return conversation;
  }

  const excerptId = `excerpt-${sectionId.replace(/^section-/, "")}`;
  const existingExcerpt = conversation.excerpts.find((excerpt) => excerpt.id === excerptId);
  const excerpt: Excerpt =
    existingExcerpt ??
    {
      id: excerptId,
      sourceMessageId: section.messageId,
      sourceSectionId: section.id,
      selectedText: section.excerpt,
      note: `Pinned from ${section.heading}`,
      createdAt: new Date().toISOString()
    };

  const updated = updateSections(conversation, (candidate) =>
    candidate.id === sectionId && !candidate.pins.includes(excerpt.id)
      ? { ...candidate, pins: [...candidate.pins, excerpt.id] }
      : candidate
  );

  return {
    ...updated,
    excerpts: existingExcerpt ? updated.excerpts : [...updated.excerpts, excerpt],
    layoutState: {
      ...updated.layoutState,
      pinnedExcerptIds: [...new Set([...updated.layoutState.pinnedExcerptIds, excerpt.id])]
    }
  };
}

export function branchFromPinnedExcerpt(conversation: Conversation, excerptId: string): Conversation {
  const excerpt = conversation.excerpts.find((candidate) => candidate.id === excerptId);

  if (!excerpt) {
    return conversation;
  }

  const existingBranch = conversation.branches.find((branch) => branch.sourceExcerptId === excerptId);

  if (existingBranch) {
    return conversation;
  }

  const branch: Branch = {
    id: `branch-${excerpt.id.replace(/^excerpt-/, "")}`,
    title: "Which patient-reported outcome measures are most sensitive to change?",
    sourceExcerptId: excerpt.id,
    summary:
      "New follow-up branch anchored to the selected source excerpt. The original response remains available in the reading trail.",
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: `message-${excerpt.id}-follow-up`,
        role: "user",
        content: "Which patient-reported outcome measures are most sensitive to change?",
        createdAt: new Date().toISOString()
      }
    ]
  };

  const updated = excerpt.sourceSectionId
    ? updateSections(conversation, (section) =>
        section.id === excerpt.sourceSectionId && !section.branchIds.includes(branch.id)
          ? { ...section, branchIds: [...section.branchIds, branch.id] }
          : section
      )
    : conversation;

  return {
    ...updated,
    branches: [...updated.branches, branch]
  };
}

export function resumeReading(conversation: Conversation): Conversation {
  const firstUnreadSectionId = getAllSections(conversation).find(
    (section) => section.readState === "unread"
  )?.id;

  if (!firstUnreadSectionId) {
    return conversation;
  }

  return setReadingSection(conversation, firstUnreadSectionId);
}

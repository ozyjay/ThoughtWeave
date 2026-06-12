import type { Conversation } from "../types/conversation";

export type ThoughtWeaveComponentProps = {
  conversation: Conversation;
  onSetReadingSection: (sectionId: string) => void;
  onPinSection: (sectionId: string) => void;
  onBranchFromExcerpt: (excerptId: string) => void;
  onMarkRead: (sectionId: string) => void;
  onMarkUnread: (sectionId: string) => void;
  onResumeReading: () => void;
};

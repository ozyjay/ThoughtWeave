export type Role = "user" | "assistant";

export type ReadState = "unread" | "reading" | "read";

export type Message = {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  sections?: ResponseSection[];
};

export type ResponseSection = {
  id: string;
  messageId: string;
  heading: string;
  content: string;
  order: number;
  readState: ReadState;
  collapsed: boolean;
  excerpt: string;
  pins: string[];
  branchIds: string[];
};

export type Excerpt = {
  id: string;
  sourceMessageId: string;
  sourceSectionId?: string;
  selectedText: string;
  note?: string;
  createdAt: string;
};

export type Branch = {
  id: string;
  title: string;
  sourceExcerptId: string;
  messages: Message[];
  summary?: string;
  createdAt: string;
};

export type ReadingTrail = {
  lastReadMessageId?: string;
  lastReadSectionId?: string;
  unreadSectionIds: string[];
};

export type LayoutState = {
  currentLayoutId: string;
  visiblePanels: string[];
  pinnedExcerptIds: string[];
};

export type Conversation = {
  id: string;
  title: string;
  subtitle: string;
  messages: Message[];
  branches: Branch[];
  excerpts: Excerpt[];
  readingTrail: ReadingTrail;
  layoutState: LayoutState;
};

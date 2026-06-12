import { useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { TopActionBar } from "./components/TopActionBar";
import { LayoutRenderer } from "./layout/LayoutRenderer";
import { researchReviewLayout } from "./layout/layouts";
import {
  branchFromPinnedExcerpt,
  markSectionReadState,
  pinSection,
  resumeReading,
  setReadingSection
} from "./state/conversationState";
import { createMockConversation } from "./state/mockConversation";

export default function App() {
  const [conversation, setConversation] = useState(() => createMockConversation());
  const appMetadata = useMemo(() => window.thoughtweave, []);

  return (
    <AppShell>
      <TopActionBar
        appName={appMetadata?.appName ?? "ThoughtWeave"}
        layoutName={researchReviewLayout.layoutName}
        goal={researchReviewLayout.goal}
        onResumeReading={() => setConversation((current) => resumeReading(current))}
      />
      <LayoutRenderer
        conversation={conversation}
        spec={researchReviewLayout}
        onSetReadingSection={(sectionId) =>
          setConversation((current) => setReadingSection(current, sectionId))
        }
        onPinSection={(sectionId) => setConversation((current) => pinSection(current, sectionId))}
        onBranchFromExcerpt={(excerptId) =>
          setConversation((current) => branchFromPinnedExcerpt(current, excerptId))
        }
        onMarkRead={(sectionId) =>
          setConversation((current) => markSectionReadState(current, sectionId, "read"))
        }
        onMarkUnread={(sectionId) =>
          setConversation((current) => markSectionReadState(current, sectionId, "unread"))
        }
        onResumeReading={() => setConversation((current) => resumeReading(current))}
      />
    </AppShell>
  );
}

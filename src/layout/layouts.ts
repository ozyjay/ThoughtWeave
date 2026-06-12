import type { LayoutSpec } from "./layoutSchema";

export const researchReviewLayout: LayoutSpec = {
  layoutId: "research-review",
  layoutName: "Research Review Layout",
  goal: "Support partial reading, anchored follow-up, and return-to-source navigation.",
  regions: [
    {
      id: "left",
      component: "ConversationMap",
      props: {
        showBranches: true,
        showReadProgress: true
      }
    },
    {
      id: "center",
      component: "ActiveChat",
      props: {
        showSectionStatus: true,
        allowInlinePinning: true
      }
    },
    {
      id: "rightTop",
      component: "PinnedContext",
      props: {
        allowBranchFromSelection: true
      }
    },
    {
      id: "rightBottom",
      component: "ReadingTrail",
      props: {
        showUnreadSections: true,
        showReturnToSource: true
      }
    }
  ],
  actions: ["pinSection", "branchFromSelection", "resumeReading", "markRead", "markUnread"]
};

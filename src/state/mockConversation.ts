import type { Conversation, ResponseSection } from "../types/conversation";

const assistantMessageId = "message-assistant-research-review";

const sections: ResponseSection[] = [
  {
    id: "section-evaluation-frameworks",
    messageId: assistantMessageId,
    heading: "1. Evaluation Frameworks",
    content:
      "Robust evaluation should combine clinical effectiveness, implementation quality, patient experience, equity, and service-system fit. RE-AIM is useful for reach and adoption, CFIR helps explain implementation barriers, and pragmatic trial frameworks keep evaluation close to real-world delivery.",
    order: 1,
    readState: "read",
    collapsed: false,
    excerpt:
      "RE-AIM is useful for reach and adoption, CFIR helps explain implementation barriers, and pragmatic trial frameworks keep evaluation close to real-world delivery.",
    pins: [],
    branchIds: []
  },
  {
    id: "section-study-designs",
    messageId: assistantMessageId,
    heading: "2. Study Designs",
    content:
      "The strongest designs often combine randomized or stepped-wedge trials with mixed-method process evaluation. For mature interventions, pragmatic randomized trials can estimate impact while preserving service context. For earlier-stage tools, feasibility studies should test engagement, safety, and workflow fit before large-scale claims.",
    order: 2,
    readState: "read",
    collapsed: false,
    excerpt:
      "The strongest designs often combine randomized or stepped-wedge trials with mixed-method process evaluation.",
    pins: [],
    branchIds: []
  },
  {
    id: "section-metrics",
    messageId: assistantMessageId,
    heading: "3. Metrics and Outcomes",
    content:
      "Outcomes should be multi-dimensional and patient-centered. Core domains include clinical outcomes, functioning and quality of life, engagement and adherence, and implementation outcomes such as reach, adoption, fidelity, and sustainability. The most useful evaluation sets include both validated symptom measures and measures sensitive to day-to-day functional change.",
    order: 3,
    readState: "reading",
    collapsed: false,
    excerpt:
      "Outcomes should be multi-dimensional and patient-centered. Core domains include clinical outcomes, functioning and quality of life, engagement and adherence, and implementation outcomes such as reach, adoption, fidelity, and sustainability.",
    pins: ["excerpt-metrics"],
    branchIds: ["branch-outcome-measures"]
  },
  {
    id: "section-data-considerations",
    messageId: assistantMessageId,
    heading: "4. Data Considerations",
    content:
      "Digital interventions produce dense behavioral traces, but those traces should not be mistaken for meaningful outcomes without validation. Missing data, attrition, device access, privacy constraints, and differential engagement can bias conclusions if they are treated as simple usage metrics.",
    order: 4,
    readState: "unread",
    collapsed: false,
    excerpt:
      "Missing data, attrition, device access, privacy constraints, and differential engagement can bias conclusions.",
    pins: [],
    branchIds: []
  },
  {
    id: "section-common-limitations",
    messageId: assistantMessageId,
    heading: "5. Common Limitations",
    content:
      "Common weaknesses include short follow-up windows, weak comparators, underpowered subgroup analysis, poor reporting on implementation context, and over-reliance on engagement as a proxy for benefit. These limitations make it hard to separate novelty effects from durable clinical value.",
    order: 5,
    readState: "unread",
    collapsed: true,
    excerpt:
      "Common weaknesses include short follow-up windows, weak comparators, underpowered subgroup analysis, and poor reporting on implementation context.",
    pins: [],
    branchIds: []
  },
  {
    id: "section-practical-recommendations",
    messageId: assistantMessageId,
    heading: "6. Practical Recommendations",
    content:
      "A practical evaluation plan should define a theory of change, choose outcomes linked to that theory, measure implementation alongside effectiveness, and pre-specify how engagement data will be interpreted. The strongest reviews make tradeoffs explicit rather than relying on a single headline effect size.",
    order: 6,
    readState: "unread",
    collapsed: true,
    excerpt:
      "The strongest reviews make tradeoffs explicit rather than relying on a single headline effect size.",
    pins: [],
    branchIds: []
  }
];

export function createMockConversation(): Conversation {
  return {
    id: "conversation-research-review",
    title: "What are the most robust evaluation frameworks for measuring the impact of digital mental health interventions in adults?",
    subtitle: "Research Review Layout",
    messages: [
      {
        id: "message-user-initial-question",
        role: "user",
        content:
          "What are the most robust evaluation frameworks for measuring the impact of digital mental health interventions in adults?",
        createdAt: "2026-06-13T08:30:00.000Z"
      },
      {
        id: assistantMessageId,
        role: "assistant",
        content:
          "A robust review should combine effectiveness, implementation, and patient-centered outcome evidence rather than relying on a single metric.",
        createdAt: "2026-06-13T08:32:00.000Z",
        sections
      }
    ],
    excerpts: [
      {
        id: "excerpt-metrics",
        sourceMessageId: assistantMessageId,
        sourceSectionId: "section-metrics",
        selectedText:
          "Outcomes should be multi-dimensional and patient-centered. Core domains include clinical outcomes, functioning and quality of life, engagement and adherence, and implementation outcomes such as reach, adoption, fidelity, and sustainability.",
        note: "Anchor this for follow-up on patient-reported measures.",
        createdAt: "2026-06-13T08:42:00.000Z"
      }
    ],
    branches: [
      {
        id: "branch-outcome-measures",
        title: "Which patient-reported outcome measures are most sensitive to change?",
        sourceExcerptId: "excerpt-metrics",
        summary:
          "Draft follow-up branch comparing PROMIS, PHQ-9, GAD-7, WSAS, and quality-of-life measures for sensitivity and study fit.",
        createdAt: "2026-06-13T08:43:00.000Z",
        messages: [
          {
            id: "message-branch-question",
            role: "user",
            content: "Which patient-reported outcome measures are most sensitive to change?",
            createdAt: "2026-06-13T08:43:00.000Z"
          }
        ]
      }
    ],
    readingTrail: {
      lastReadMessageId: assistantMessageId,
      lastReadSectionId: "section-metrics",
      unreadSectionIds: [
        "section-data-considerations",
        "section-common-limitations",
        "section-practical-recommendations"
      ]
    },
    layoutState: {
      currentLayoutId: "research-review",
      visiblePanels: ["left", "center", "rightTop", "rightBottom"],
      pinnedExcerptIds: ["excerpt-metrics"]
    }
  };
}

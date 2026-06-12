export type LayoutComponentName =
  | "ConversationMap"
  | "ActiveChat"
  | "PinnedContext"
  | "ReadingTrail";

export type LayoutAction =
  | "pinSection"
  | "branchFromSelection"
  | "resumeReading"
  | "markRead"
  | "markUnread";

export type LayoutRegion = {
  id: "left" | "center" | "rightTop" | "rightBottom" | string;
  component: string;
  props: Record<string, boolean | string | number>;
};

export type LayoutSpec = {
  layoutId: string;
  layoutName: string;
  goal: string;
  regions: LayoutRegion[];
  actions: LayoutAction[];
};

export type LayoutValidationResult = {
  valid: boolean;
  errors: string[];
};

export const trustedComponentNames: LayoutComponentName[] = [
  "ConversationMap",
  "ActiveChat",
  "PinnedContext",
  "ReadingTrail"
];

const trustedActions: LayoutAction[] = [
  "pinSection",
  "branchFromSelection",
  "resumeReading",
  "markRead",
  "markUnread"
];

export function validateLayoutSpec(spec: LayoutSpec): LayoutValidationResult {
  const errors: string[] = [];

  if (!spec.layoutId.trim()) {
    errors.push("Layout id is required.");
  }

  if (!spec.layoutName.trim()) {
    errors.push("Layout name is required.");
  }

  for (const region of spec.regions) {
    if (!trustedComponentNames.includes(region.component as LayoutComponentName)) {
      errors.push(`Unsupported component: ${region.component}`);
    }
  }

  for (const action of spec.actions) {
    if (!trustedActions.includes(action)) {
      errors.push(`Unsupported action: ${action}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

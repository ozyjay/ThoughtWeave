import { describe, expect, it } from "vitest";
import { researchReviewLayout } from "../src/layout/layouts";
import { validateLayoutSpec } from "../src/layout/layoutSchema";

describe("layout spec validation", () => {
  it("accepts the trusted research review layout", () => {
    const result = validateLayoutSpec(researchReviewLayout);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects layout regions that reference unknown components", () => {
    const result = validateLayoutSpec({
      ...researchReviewLayout,
      regions: [
        ...researchReviewLayout.regions,
        {
          id: "unsafe",
          component: "GeneratedHtmlPanel",
          props: {}
        }
      ]
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Unsupported component: GeneratedHtmlPanel");
  });
});

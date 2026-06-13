import { describe, expect, it } from "vitest";
import { getToolDescriptors, THOUGHTWEAVE_WIDGET_URI } from "../server/src/serverContract";

describe("ThoughtWeave Apps SDK server contract", () => {
  it("defines focused non-destructive data and render tools", () => {
    const tools = getToolDescriptors();

    expect(tools.map((tool) => tool.name)).toEqual(["create_reading_lens", "render_reading_lens"]);
    expect(tools.every((tool) => tool.annotations.readOnlyHint)).toBe(true);
    expect(tools.every((tool) => tool.annotations.destructiveHint === false)).toBe(true);
    expect(tools[1]?._meta?.["openai/outputTemplate"]).toBe(THOUGHTWEAVE_WIDGET_URI);
  });
});

import { generateScript } from "../../src/lib/script";
import { ToolCategory } from "../../src/lib/types";

const mockData: ToolCategory[] = [
  {
    category: "Dev Tools",
    tools: [
      { name: "node", iconsrc: "node.png", install: { choco: "choco install node" } },
      { name: "git", iconsrc: "git.png", install: { choco: "choco install git" } },
    ],
  },
];

describe("generateScript", () => {
  it("should generate script for selected tools", () => {
    const script = generateScript(mockData, ["node"], "choco");
    expect(script).toContain("choco install node");
    expect(script).not.toContain("git");
  });

  it("should return empty string if no tools selected", () => {
    const script = generateScript(mockData, [], "choco");
    expect(script).toBe("");
  });

  it("should skip tools without matching package manager", () => {
    const script = generateScript(mockData, ["node"], "apt");
    expect(script).toBe("");
  });
});

// import { renderHook, act } from "@testing-library/react";
// import { useScriptGenerator } from "../../src/hooks/useScriptGenerator";
// import { ToolCategory } from "../../src/lib/types";

// const mockData: ToolCategory[] = [
//   {
//     category: "Dev Tools",
//     tools: [
//       { name: "node", iconsrc: "node.png", install: { choco: "choco install node" } },
//     ],
//   },
// ];

// describe("useScriptGenerator", () => {
//   it("should initialize with default OS and pkg manager", () => {
//     const { result } = renderHook(() => useScriptGenerator("windows"));
//     expect(result.current.selectedOS).toBe("windows");
//     expect(result.current.selectedPkg).toBe("choco");
//   });

//   it("should toggle tools", () => {
//     const { result } = renderHook(() => useScriptGenerator("windows"));
//     act(() => result.current.toggleTool("node"));
//     expect(result.current.selectedTools).toContain("node");
//     act(() => result.current.toggleTool("node"));
//     expect(result.current.selectedTools).not.toContain("node");
//   });

//   it("should build script from selected tools", () => {
//     const { result } = renderHook(() => useScriptGenerator("windows"));
//     act(() => result.current.toggleTool("node"));
//     const script = result.current.buildScript(mockData);
//     expect(script).toBe("choco install node");
//   });

//   it("should reset selections when OS changes", () => {
//     const { result } = renderHook(() => useScriptGenerator("windows"));
//     act(() => result.current.toggleTool("node"));
//     act(() => result.current.resetSelections("macos"));
//     expect(result.current.selectedTools).toEqual([]);
//     expect(result.current.selectedOS).toBe("macos");
//   });
// });

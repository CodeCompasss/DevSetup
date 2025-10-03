import { ToolCategory, PkgManager } from "./types";

export function generateScript(
  toolsData: ToolCategory[],
  selectedTools: string[],
  selectedPkg: PkgManager
): string {
  return toolsData
    .flatMap((category) =>
      category.tools
        .filter((tool) => selectedTools.includes(tool.name) && tool.install[selectedPkg])
        .map((tool) => tool.install[selectedPkg]!)
    )
    .join("\n");
}

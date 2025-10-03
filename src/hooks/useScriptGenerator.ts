import { useState } from "react";
import { ToolCategory, OS, PkgManager } from "../lib/types";
import { osOptions, pkgManagers } from "../lib/constants";
import { generateScript } from "../lib/script";

export function useScriptGenerator(initialOS: OS = "windows") {
  const [selectedOS, setSelectedOS] = useState<OS>(initialOS);
  const [selectedPkg, setSelectedPkg] = useState<PkgManager>(pkgManagers[initialOS][0]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const resetSelections = (os: OS) => {
    setSelectedOS(os);
    setSelectedPkg(pkgManagers[os][0]);
    setSelectedTools([]);
  };

  const changePkg = (pkg: PkgManager) => {
    setSelectedPkg(pkg);
    setSelectedTools([]);
  };

  const toggleTool = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName) ? prev.filter((t) => t !== toolName) : [...prev, toolName]
    );
  };

  const buildScript = (toolsData: ToolCategory[]) =>
    generateScript(toolsData, selectedTools, selectedPkg);

  return {
    selectedOS,
    selectedPkg,
    selectedTools,
    searchQuery,
    setSearchQuery,
    resetSelections,
    changePkg,
    toggleTool,
    buildScript,
    osOptions,
    pkgManagers,
  };
}

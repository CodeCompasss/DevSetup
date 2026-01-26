'use client';

import { useTheme } from "../../hooks/useTheme";
import { useToolsData } from "../../hooks/useToolsData";
import { useScriptGenerator } from "../../hooks/useScriptGenerator";
import Header from "./Header";
import SearchBox from "./SearchBox";
import OSSelector from "./OSSelector";
import PackageManagerSelector from "./PackageManagerSelector";
import ToolGrid from "./ToolGrid";
import ScriptOutput from "./ScriptOutput";
import ActionButtons from "./ActionButtons";

export default function ScriptGenerator() {
  const { theme, setTheme } = useTheme();
  const { manifest, loadedCategories, loadCategory, loading } = useToolsData();
  const {
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
  } = useScriptGenerator();

  // Combine all loaded tools for the script builder
  const allLoadedTools = Object.values(loadedCategories);
  const script = buildScript(allLoadedTools);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      alert("Script copied!");
    } catch {
      alert("Failed to copy");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `install_tools_${selectedOS}.sh`;
    link.click();
  };

  if (loading && manifest.length === 0)
    return (
      <div className="text-[var(--foreground)] font-sans text-center mt-20">
        <div>Initializing DevSetup...</div>
        <div className="spinner mt-4">⚙️</div>
      </div>
    );

  return (
    <div className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300" data-theme={theme}>
      <div className="max-w-screen mx-auto px-4 py-10">
        <Header theme={theme} toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        <OSSelector options={osOptions} selectedOS={selectedOS} onSelect={resetSelections} />
        <PackageManagerSelector managers={pkgManagers[selectedOS]} selectedPkg={selectedPkg} onSelect={changePkg} />
        <ToolGrid 
          manifest={manifest} 
          loadedCategories={loadedCategories}
          loadCategory={loadCategory}
          selectedPkg={selectedPkg} 
          selectedTools={selectedTools} 
          searchQuery={searchQuery} 
          onToggleTool={toggleTool} 
        />
        <ScriptOutput value={script} />
        <ActionButtons onCopy={handleCopy} onDownload={handleDownload} />
      </div>
    </div>
  );
}

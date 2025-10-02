'use client';

import { useEffect, useState } from "react";

// Define types
type OS = "windows" | "macos" | "linux";
type WindowsPkg = "choco" | "winget" | "scoop";
type MacPkg = "homebrew";
type LinuxPkg = "apt" | "dnf" | "pacman";
type PkgManager = WindowsPkg | MacPkg | LinuxPkg;

interface Tool {
  name: string;
  iconsrc: string;
  install: Partial<Record<PkgManager, string>>;
}

interface ToolCategory {
  category: string;
  tools: Tool[];
}

const osOptions: OS[] = ["windows", "macos", "linux"];
const pkgManagers: Record<OS, PkgManager[]> = {
  windows: ["choco", "winget", "scoop"],
  macos: ["homebrew"],
  linux: ["apt", "dnf", "pacman"],
};

export default function ScriptGenerator() {
  const [toolsData, setToolsData] = useState<ToolCategory[]>([]);
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const [selectedPkg, setSelectedPkg] = useState<PkgManager>("choco");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Theme
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Fetch tools
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("./tools.json");
        if (!res.ok) throw new Error("Failed to fetch JSON");
        const data: ToolCategory[] = await res.json();
        setToolsData(data);
      } catch {
        alert("Failed to load tool data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const handleToolSelect = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName) ? prev.filter((t) => t !== toolName) : [...prev, toolName]
    );
  };

  const generateScript = () =>
    toolsData
      .flatMap((category) =>
        category.tools
          .filter((tool) => selectedTools.includes(tool.name) && tool.install[selectedPkg])
          .map((tool) => tool.install[selectedPkg]!)
      )
      .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateScript());
      alert("Script copied!");
    } catch {
      alert("Failed to copy");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generateScript()], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "install_script.sh";
    link.click();
  };

  if (loading)
    return (
      <div className="text-[var(--foreground)] font-sans text-center mt-20">
        <div>Loading tools data...</div>
        <div className="spinner">⏳</div>
      </div>
    );

  return (
    <div
      className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
      data-theme={theme}
    >
      <div className="max-w-screen mx-auto px-4 py-10">
        {/* Header with Add + and theme toggle */}
        <h1 className="flex items-center justify-center text-4xl sm:text-6xl font-extrabold mb-10 relative tracking-tight">
          DevSetup
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-3">
            {/* Add New + button */}
            <a
              href="https://forms.gle/cWfDnzvYo5dBuy7C7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
            >
              Add New +
            </a>

            {/* Theme Toggle button (exactly same size/style as Add +) */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-6 py-3 text-lg bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-semibold rounded-full shadow-lg transition duration-300"
            >
              {theme === "light" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </h1>

        {/* OS Selector */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
          {osOptions.map((os) => (
            <button
              key={os}
              onClick={() => {
                setSelectedOS(os);
                setSelectedPkg(pkgManagers[os][0]);
                setSelectedTools([]);
              }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition duration-200 ${
                selectedOS === os
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-gray-700"
              }`}
            >
              {os.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Package Manager Selector */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-10">
          {pkgManagers[selectedOS].map((pkg) => (
            <button
              key={pkg}
              onClick={() => {
                setSelectedPkg(pkg);
                setSelectedTools([]);
              }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition duration-200 ${
                selectedPkg === pkg
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                  : "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-gray-700"
              }`}
            >
              {pkg}
            </button>
          ))}
        </div>

        {/* Tool Categories */}
        {toolsData.map((group, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-1">
              {group.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {group.tools.map((tool, index) => {
                const isAvailable = !!tool.install[selectedPkg];
                return (
                  <label
                    key={index}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-4 transition cursor-pointer border border-transparent bg-[var(--card-bg)] ${
                      isAvailable? "hover:shadow-xl hover:border-indigo-500" : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <input
                      type="checkbox"
                      disabled={!isAvailable}
                      checked={selectedTools.includes(tool.name)}
                      onChange={() => handleToolSelect(tool.name)}
                      className="absolute top-2 right-2 w-5 h-5 accent-indigo-500"
                    />
                    <span className="text-sm text-center">{tool.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Script Output */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-2">Generated Script:</h3>
          <textarea
            readOnly
            value={generateScript()}
            rows={6}
            className="w-full bg-[var(--card-bg)] text-[var(--foreground)] border border-gray-600 rounded-lg p-4 font-mono resize-none transition-colors duration-300"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={handleCopy}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Download Script
          </button>
        </div>
      </div>
    </div>
  );
}

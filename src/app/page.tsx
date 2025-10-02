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
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        {/* Header with Title, Search, and Action buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          {/* Left side - Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-left">
            DevSetup
          </h1>

          {/* Center/Bottom - Search Box */}
          <div className="relative w-full max-w-2xl lg:max-w-3xl hidden sm:block">
            <input
              type="text"
              placeholder="Search for development tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-4 pl-16 bg-gradient-to-r from-[var(--card-bg)] to-gray-800/50 text-[var(--foreground)] border-2 border-gray-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-500 text-lg placeholder-gray-400 shadow-2xl hover:shadow-indigo-500/20 backdrop-blur-sm"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-6 h-6 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex gap-4 lg:flex-shrink-0">
            {/* Add New + button */}
            <a
              href="https://forms.gle/cWfDnzvYo5dBuy7C7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
               Add New +
            </a>

            {/* Theme Toggle button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-8 py-4 text-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold rounded-2xl shadow-2xl hover:shadow-gray-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              {theme === "light" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* Mobile Search Box */}
        <div className="mb-10 sm:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search for development tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 pl-16 bg-gradient-to-r from-[var(--card-bg)] to-gray-800/50 text-[var(--foreground)] border-2 border-gray-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-500 text-lg placeholder-gray-400 shadow-2xl hover:shadow-indigo-500/20 backdrop-blur-sm"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-6 h-6 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
          </div>
        </div>

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
        {toolsData.map((group, i) => {
          // Filter tools based on search query
          const filteredTools = group.tools.filter(tool => 
            tool.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          // Only render category if it has matching tools
          if (filteredTools.length === 0) return null;
          
          return (
            <div key={i} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-1">
                {group.category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredTools.map((tool, index) => {
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
          );
        })}

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

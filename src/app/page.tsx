'use client';

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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

  // Load and parse Excel on mount
  useEffect(() => {
    const fetchAndParse = async () => {
      try {
        const res = await fetch("./tools.xlsx");
        const arrayBuffer = await res.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Assuming sheet 1 contains your data in a suitable format.
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // Define the expected row structure from the Excel sheet
        interface ExcelRow {
          category?: string;
          name: string;
          iconsrc: string;z
          choco?: string;
          winget?: string;
          scoop?: string;
          apt?: string;
          dnf?: string;
          pacman?: string;
          homebrew?: string;
        }
        // Parse sheet to JSON
        const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { defval: "" });

        const categoriesMap: Record<string, ToolCategory> = {};

        jsonData.forEach((row) => {
          const category = row.category || "Uncategorized";

          if (!categoriesMap[category]) {
            categoriesMap[category] = { category, tools: [] };
          }

          const install: Partial<Record<PkgManager, string>> = {};

          // Explicitly check each package manager column
          if (row.choco) install["choco"] = row.choco;
          if (row.winget) install["winget"] = row.winget;
          if (row.scoop) install["scoop"] = row.scoop;
          if (row.apt) install["apt"] = row.apt;
          if (row.dnf) install["dnf"] = row.dnf;
          if (row.pacman) install["pacman"] = row.pacman;
          if (row.homebrew) install["homebrew"] = row.homebrew;

          categoriesMap[category].tools.push({
            name: row.name,
            iconsrc: row.iconsrc,
            install,
          });
        });

        setToolsData(Object.values(categoriesMap));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load Excel data", error);
        setLoading(false);
      }
    };

    fetchAndParse();
  }, []);

  const handleToolSelect = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName) ? prev.filter((t) => t !== toolName) : [...prev, toolName]
    );
  };

  const generateScript = (): string => {
    return toolsData
      .flatMap((category) =>
        category.tools
          .filter((tool) => selectedTools.includes(tool.name) && tool.install[selectedPkg])
          .map((tool) => tool.install[selectedPkg] as string)
      )
      .join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateScript());
      alert("Script copied to clipboard!");
    } catch (err) {
      alert("Failed to copy script: " + err);
    }
  };

  const handleDownload = () => {
    const script = generateScript();
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "install_script.sh";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="text-white font-sans text-center mt-20">
        Loading tools data...
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] min-h-screen text-white font-sans">
      <div className="max-w-screen mx-auto px-4 py-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-10 tracking-tight">
          DevSetup
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
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition duration-200 ${
                selectedOS === os
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
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
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition duration-200 ${
                selectedPkg === pkg
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
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
                    className={`relative flex flex-col items-center justify-center bg-[#161b22] rounded-2xl p-4 transition cursor-pointer border border-transparent ${
                      isAvailable
                        ? "hover:shadow-xl hover:border-indigo-500"
                        : "opacity-40 cursor-not-allowed"
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
            className="w-full bg-[#0d1117] text-gray-100 border border-gray-600 rounded-lg p-4 font-mono resize-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
          >
            Download Script
          </button>
        </div>
      </div>
    </div>
  );
}

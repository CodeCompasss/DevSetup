import { ToolCategory, PkgManager } from "../../lib/types";
import ToolCard from "./ToolCard";

interface Props {
  categories: ToolCategory[];
  selectedPkg: PkgManager;
  selectedTools: string[];
  searchQuery: string;
  onToggleTool: (tool: string) => void;
}

export default function ToolGrid({
  categories,
  selectedPkg,
  selectedTools,
  searchQuery,
  onToggleTool,
}: Props) {
  return (
    <>
      {categories.map((group, i) => {
        const filteredTools = group.tools.filter((tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredTools.length === 0) return null;

        return (
          <div key={i} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-1">
              {group.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  tool={tool}
                  selectedPkg={selectedPkg}
                  checked={selectedTools.includes(tool.name)}
                  onToggle={() => onToggleTool(tool.name)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

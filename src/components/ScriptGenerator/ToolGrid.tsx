import { ToolCategory, PkgManager, CategoryManifest } from "../../lib/types";
import ToolCard from "./ToolCard";
import { useEffect, useRef } from "react";

interface Props {
  manifest: CategoryManifest[];
  loadedCategories: Record<string, ToolCategory>;
  loadCategory: (cat: CategoryManifest) => void;
  selectedPkg: PkgManager;
  selectedTools: string[];
  searchQuery: string;
  onToggleTool: (toolId: string) => void;
}

export default function ToolGrid({
  manifest,
  loadedCategories,
  loadCategory,
  selectedPkg,
  selectedTools,
  searchQuery,
  onToggleTool,
}: Props) {
  return (
    <>
      {manifest.map((entry) => (
        <CategorySection
          key={entry.id}
          entry={entry}
          data={loadedCategories[entry.id]}
          load={() => loadCategory(entry)}
          selectedPkg={selectedPkg}
          selectedTools={selectedTools}
          searchQuery={searchQuery}
          onToggleTool={onToggleTool}
        />
      ))}
    </>
  );
}

function CategorySection({ 
  entry, data, load, selectedPkg, selectedTools, searchQuery, onToggleTool 
}: { 
  entry: CategoryManifest, 
  data?: ToolCategory, 
  load: () => void,
  selectedPkg: PkgManager,
  selectedTools: string[],
  searchQuery: string,
  onToggleTool: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Lazy Load on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before reaching the section
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [load]);

  // If we have search, we might want to force load or show nothing if even the category name doesn't match
  const filteredTools = data?.tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If searching and this category is loaded but has no matches, hide it
  if (searchQuery && data && filteredTools?.length === 0) return null;

  return (
    <div ref={ref} className="mb-10 min-h-[100px]">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-1 flex justify-between items-center">
        <span>{entry.name}</span>
        {!data && <span className="text-xs text-gray-500 animate-pulse">Loading {entry.count} tools...</span>}
      </h2>
      
      {data ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredTools?.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              selectedPkg={selectedPkg}
              checked={selectedTools.includes(tool.id)}
              onToggle={() => onToggleTool(tool.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(entry.count)].map((_, i) => (
            <div key={i} className="h-24 bg-[var(--card-bg)] rounded-2xl animate-pulse opacity-50" />
          ))}
        </div>
      )}
    </div>
  );
}

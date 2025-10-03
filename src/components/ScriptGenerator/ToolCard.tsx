import { Tool, PkgManager } from "../../lib/types";

interface Props {
  tool: Tool;
  selectedPkg: PkgManager;
  checked: boolean;
  onToggle: () => void;
}

export default function ToolCard({ tool, selectedPkg, checked, onToggle }: Props) {
  const isAvailable = !!tool.install[selectedPkg];

  return (
    <label
      className={`relative flex flex-col items-center justify-center rounded-2xl p-4 transition cursor-pointer border border-transparent bg-[var(--card-bg)] ${
        isAvailable ? "hover:shadow-xl hover:border-indigo-500" : "opacity-50 cursor-not-allowed"
      }`}
    >
      <input
        type="checkbox"
        disabled={!isAvailable}
        checked={checked}
        onChange={onToggle}
        className="absolute top-2 right-2 w-5 h-5 accent-indigo-500"
      />
      <div className="flex flex-col items-center justify-center space-y-2">
        {tool.iconsrc && (
          <img 
            src={tool.iconsrc} 
            alt={`${tool.name} icon`}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <span className="text-sm text-center">{tool.name}</span>
      </div>
    </label>
  );
}

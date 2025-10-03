import { PkgManager } from "../../lib/types";

interface Props {
  managers: PkgManager[];
  selectedPkg: PkgManager;
  onSelect: (pkg: PkgManager) => void;
}

export default function PackageManagerSelector({ managers, selectedPkg, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-10">
      {managers.map((pkg) => (
        <button
          key={pkg}
          onClick={() => onSelect(pkg)}
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
  );
}

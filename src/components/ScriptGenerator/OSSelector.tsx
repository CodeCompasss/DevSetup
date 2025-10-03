import { OS } from "../../lib/types";

interface Props {
  options: OS[];
  selectedOS: OS;
  onSelect: (os: OS) => void;
}

export default function OSSelector({ options, selectedOS, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
      {options.map((os) => (
        <button
          key={os}
          onClick={() => onSelect(os)}
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
  );
}

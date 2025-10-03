interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-2xl lg:max-w-3xl mb-8">
      <input
        type="text"
        placeholder="Search for development tools..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-8 py-4 pl-16 bg-gradient-to-r from-[var(--card-bg)] to-gray-800/50 text-[var(--foreground)] border-2 border-gray-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-500 text-lg placeholder-gray-400 shadow-2xl hover:shadow-indigo-500/20 backdrop-blur-sm"
      />
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        🔍
      </div>
    </div>
  );
}

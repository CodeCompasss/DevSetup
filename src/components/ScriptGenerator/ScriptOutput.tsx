interface Props {
  value: string;
}

export default function ScriptOutput({ value }: Props) {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-2">Generated Script:</h3>
      <textarea
        readOnly
        value={value}
        rows={6}
        className="w-full bg-[var(--card-bg)] text-[var(--foreground)] border border-gray-600 rounded-lg p-4 font-mono resize-none transition-colors duration-300"
      />
    </div>
  );
}

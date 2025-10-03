interface Props {
  onCopy: () => void;
  onDownload: () => void;
}

export default function ActionButtons({ onCopy, onDownload }: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        onClick={onCopy}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
      >
        Copy to Clipboard
      </button>
      <button
        onClick={onDownload}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
      >
        Download Script
      </button>
    </div>
  );
}

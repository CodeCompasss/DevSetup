interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-left">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
          DevSetup
        </span>
      </h1>

      <div className="flex gap-4 lg:flex-shrink-0">
        <a
          href="https://forms.gle/cWfDnzvYo5dBuy7C7"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 text-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          Add New +
        </a>

        <button
          onClick={toggleTheme}
          className="px-8 py-4 text-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold rounded-2xl shadow-2xl hover:shadow-gray-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          {theme === "light" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}

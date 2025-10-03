import { useEffect, useState } from "react";

export function useTheme(initial: "light" | "dark" = "dark") {
  const [theme, setTheme] = useState<"light" | "dark">(initial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

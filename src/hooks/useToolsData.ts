import { useEffect, useState } from "react";
import { ToolCategory } from "../lib/types";

export function useToolsData() {
  const [toolsData, setToolsData] = useState<ToolCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("./tools.json");
        if (!res.ok) throw new Error("Failed to fetch JSON");
        const data: ToolCategory[] = await res.json();
        setToolsData(data);
      } catch {
        alert("Failed to load tool data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  return { toolsData, loading };
}

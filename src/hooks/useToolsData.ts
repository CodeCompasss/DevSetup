import { useEffect, useState, useCallback } from "react";
import { ToolCategory, CategoryManifest } from "../lib/types";

export function useToolsData() {
  const [manifest, setManifest] = useState<CategoryManifest[]>([]);
  const [loadedCategories, setLoadedCategories] = useState<Record<string, ToolCategory>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        setLoading(true);
        const res = await fetch("./tools/manifest.json");
        if (!res.ok) throw new Error("Failed to fetch manifest");
        const data: CategoryManifest[] = await res.json();
        setManifest(data);
      } catch (error) {
        console.error("Error loading manifest:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchManifest();
  }, []);

  const loadCategory = useCallback(async (cat: CategoryManifest) => {
    if (loadedCategories[cat.id]) return; // Already loaded

    try {
      const res = await fetch(`.${cat.file}`);
      if (!res.ok) return;
      const data: ToolCategory = await res.json();
      setLoadedCategories(prev => ({ ...prev, [cat.id]: data }));
    } catch (error) {
      console.error(`Failed to load category ${cat.id}:`, error);
    }
  }, [loadedCategories]);

  return { manifest, loadedCategories, loadCategory, loading };
}

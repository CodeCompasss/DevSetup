export type OS = "windows" | "macos" | "linux";
export type WindowsPkg = "choco" | "winget" | "scoop";
export type MacPkg = "homebrew";
export type LinuxPkg = "apt" | "dnf" | "pacman";
export type PkgManager = WindowsPkg | MacPkg | LinuxPkg;

export interface Tool {
  id: string;
  name: string;
  iconsrc: string;
  install: Partial<Record<PkgManager, string>>;
}

export interface ToolCategory {
  id: string;
  category: string;
  tools: Tool[];
}

export interface CategoryManifest {
  id: string;
  name: string;
  file: string;
  count: number;
}

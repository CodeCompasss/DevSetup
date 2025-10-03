export type OS = "windows" | "macos" | "linux";
export type WindowsPkg = "choco" | "winget" | "scoop";
export type MacPkg = "homebrew";
export type LinuxPkg = "apt" | "dnf" | "pacman";
export type PkgManager = WindowsPkg | MacPkg | LinuxPkg;

export interface Tool {
  name: string;
  iconsrc: string;
  install: Partial<Record<PkgManager, string>>;
}

export interface ToolCategory {
  category: string;
  tools: Tool[];
}

import { OS, PkgManager } from "./types";

export const osOptions: OS[] = ["windows", "macos", "linux"];

export const pkgManagers: Record<OS, PkgManager[]> = {
  windows: ["choco", "winget", "scoop"],
  macos: ["homebrew"],
  linux: ["apt", "dnf", "pacman"],
};

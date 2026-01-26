# 🛠️ Developer Guide: DevSetup

Welcome to the **DevSetup** developer guide! This document explains how to maintain, extend, and scale the project.

---

## 🏗️ Project Architecture

DevSetup is built with **Next.js 15 (App Router)** and **TypeScript**. It follows a "Static Data, Dynamic Rendering" model.

-   **Frontend**: React components using Tailwind CSS for a premium, responsive glassmorphic UI.
-   **Data Storage**: Tool information is sharded into optimized JSON files located in `public/tools/`.
-   **Orchestration**: A manifest-based lazy loading system ensures the app stays fast even with thousands of tools.

---

## 📥 Adding New Tools (The Workflow)

Adding tools is designed to be simple and non-technical so anyone can contribute.

1.  **Open the Excel Sheet**: Navigate to `public/tools.xlsx`.
2.  **Add a Row**: Fill in the tool details:
    -   **Category**: Grouping (e.g., Browsers, IDEs).
    -   **Name**: Display name of the tool.
    -   **IconSrc**: A direct URL to an SVG or PNG icon (preferred: [DevIcon](https://devicon.dev/) or [SimpleIcons](https://simpleicons.org/)).
    -   **Package Manager Columns**: Enter the exact installation command for `apt`, `brew`, `choco`, etc.
3.  **Generate JSON**: Run the conversion script:
    ```bash
    node convertExcelToJson.js
    ```
4.  **Verify**: The script will automatically shard the data into `public/tools/` and update `manifest.json`.

---

## 📂 Sharded Data System

To prevent large file sizes from slowing down the browser, we use a sharded JSON strategy:

1.  **`public/tools/manifest.json`**: Contains a list of all categories, their file paths, and tool counts.
2.  **`public/tools/*.json`**: Individual files for each category (e.g., `database.json`).
3.  **Intersection Observer**: The `ToolGrid` component only fetches a category's JSON when that section scrolls into view.

---

## 💻 Development Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Install all project dependencies (use `--legacy-peer-deps` if needed). |
| `npm run dev` | Start the development server with Turbopack. |
| `npm run build` | Build the optimized production application. |
| `npm run lint` | Run ESLint to check for code quality and accessibility issues. |
| `node convertExcelToJson.js` | Sync the Excel database with the JSON infrastructure. |

---

## 🎨 Styling & Component Standards

-   **Theme Support**: We use a `data-theme` attribute on the main wrapper managed by the `useTheme` hook. Use CSS variables defined in `globals.css` for all colors.
-   **Glassmorphism**: Use `backdrop-blur` and semi-transparent backgrounds for a premium feel.
-   **Icons**: Ensure icons have an `onError` handler to prevent layout breaks if a URL fails.

---

## 📈 Future Scaling

If the project grows to **10,000+ tools**, we recommend:
1.  **PostgreSQL/Supabase**: Move from Excel/JSON to a real database.
2.  **Search Indexing**: Implement a search index (like Algolia or a local Fuse.js index) so users can search across the entire database without loading all shards.
3.  **User Profiles**: Allow users to save their "standard templates" to a cloud account.

---

**Made with ❤️ for the Developer Community**

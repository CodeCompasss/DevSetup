
# Contributing to DevSetup

Thank you for considering contributing to the **DevSetup** project! We're excited to have you help make this tool even more useful. Below are instructions for contributing, including adding new tools to the system.

## Table of Contents

- [Contributing to DevSetup](#contributing-to-devsetup)
  - [Table of Contents](#table-of-contents)
  - [How to Add New Tools](#how-to-add-new-tools)
    - [Step 1: Add Tools to the Excel File](#step-1-add-tools-to-the-excel-file)
    - [Step 2: Convert Excel to JSON](#step-2-convert-excel-to-json)
    - [Step 3: Test the Updates](#step-3-test-the-updates)
  - [How to Contribute](#how-to-contribute)
  - [Branch Information](#branch-information)
  - [Troubleshooting](#troubleshooting)
    - [Tools Not Appearing](#tools-not-appearing)
    - [JSON File Not Loading](#json-file-not-loading)
    - [Other Issues](#other-issues)
  - [Thank You!](#thank-you)
  - [License](#license)

## How to Add New Tools

To add new tools to the system, follow these steps:

### Step 1: Add Tools to the Excel File

1. Open the `tools.xlsx` file, which is located in the root folder of the repository.
2. Add a new row for each tool you want to include. Ensure you fill in the following columns:
   - `category`: The category of the tool (e.g., "IDE", "Version Control", etc.).
   - `name`: The name of the tool (e.g., "Visual Studio Code", "Git").
   - `iconsrc`: The URL of the icon for the tool (used in the UI).
   - Installation commands for each package manager:
     - `choco` (Windows)
     - `winget` (Windows)
     - `scoop` (Windows)
     - `apt` (Linux)
     - `dnf` (Linux)
     - `pacman` (Linux)
     - `homebrew` (macOS)

**Example:**

| category   | name                 | iconsrc                      | choco                | winget             | scoop             | apt         | dnf          | pacman    | homebrew     |
|------------|----------------------|------------------------------|----------------------|--------------------|-------------------|-------------|--------------|-----------|--------------|
| IDE        | Visual Studio Code    | https://example.com/vscode.png| vscode               | vscode             | vscode            | code        |              |           |              |
| Versioning | Git                  | https://example.com/git.png   | git                  | git                | git               | git         | git          | git       |              |

### Step 2: Convert Excel to JSON

Once you have added the new tools to the `tools.xlsx` file, you need to convert it to a `tools.json` file. Follow these steps:

1. Open the `convertExcelToJson.js` script (located in the root folder).
2. Run the script using Node.js:

   ```bash
   node convertExcelToJson.js
   ```

This will convert the data from the Excel sheet to a JSON format and output it as `tools.json`. The `tools.json` file is used by the app to generate the installation scripts.
### Step 3: Test the Updates

Once the new tools are added and the JSON file is updated, follow these steps:

1. **Run the app locally** to ensure the new tools are reflected in the UI.
2. **Verify the new tools** appear correctly, and the installation commands for each package manager are functional.
3. If everything looks good, you’re all set! The new tools will be available for users to select and include in their installation scripts.

## How to Contribute

We welcome contributions from the community! Here's how you can contribute:

1. **Fork the repository** to your GitHub account.

2. **Clone the forked repository** to your local machine.

   ```bash
   git clone https://github.com/yourusername/devsetup.git
   cd devsetup
   ```

3. **Create a new branch** for your feature or bug fix. Make sure you are working in the `dev` branch.

   ```bash
   git checkout -b feature/add-new-tool
   ```

4. **Make your changes**, whether it's adding new tools, fixing bugs, or improving the UI.

5. **Commit your changes** with a clear message.

   ```bash
   git add .
   git commit -m "Add Visual Studio Code tool to Excel"
   ```

6. **Push your branch** to your forked repository.

   ```bash
   git push origin feature/add-new-tool
   ```

7. **Open a Pull Request (PR)** to the `dev` branch of the main repository. Include a detailed description of the changes you made.

## Branch Information

* All development should be done on the `dev` branch. Once your changes are tested and reviewed, they can be merged into the `main` branch.

* **Don't forget** to sync your branch with the latest updates from the main repository to avoid merge conflicts.

## Troubleshooting

### Tools Not Appearing

If you don’t see the new tools after adding them, ensure that you:

* Correctly added the tools to the `tools.xlsx` file.
* Ran the `convertExcelToJson.js` script to regenerate the `tools.json` file.

### JSON File Not Loading

If the app fails to load tools, check the following:

* Ensure the `tools.json` file is in the correct location and accessible.
* Check the browser console for any errors that may point to issues with loading the JSON file.

### Other Issues

Feel free to open an issue in the repository if you encounter any bugs or need assistance.

## Thank You!

We appreciate your contributions! Your work helps make this tool more useful for developers everywhere. If you have any questions, feel free to reach out.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


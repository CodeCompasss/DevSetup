

# DevSetup  

## Overview

DevSetup is a web-based tool that generates installation scripts for various tools and software based on the user's OS and preferred package manager. It allows developers to easily select tools they want to install, and it generates a script that can be run on their system (Windows, macOS, or Linux).

This project simplifies setting up a developer environment by providing a streamlined process to install essential tools using the appropriate package manager for the user's operating system.

## Why We Need It

Setting up a development environment involves installing multiple tools, such as IDEs, version control systems, package managers, etc. Each tool may require a different installation method depending on the operating system you're using.

DevSetup allows developers to:

- Select their operating system (Windows, macOS, or Linux)
- Choose the package manager they prefer (e.g., Homebrew for macOS, Chocolatey for Windows, APT for Linux)
- Generate a custom installation script that installs the selected tools automatically

With this tool, you can automate the setup of a developer environment, ensuring you don't miss any dependencies or tools.

## Features

- **Operating System Selector**: Choose between Windows, macOS, or Linux.
- **Package Manager Selector**: Select from various package managers (e.g., `choco`, `winget`, `scoop`, `homebrew`, `apt`).
- **Tool Selector**: Browse through different categories of developer tools, check the ones you want to install.
- **Script Generation**: Automatically generate a script (e.g., shell script for Linux/macOS or batch script for Windows) that installs the selected tools via the package manager.
- **Copy to Clipboard**: Copy the generated script to the clipboard for easy pasting into the terminal.
- **Download Script**: Download the generated script as a `.sh` file for Linux/macOS or `.bat` file for Windows.

## How It Works

1. **Load Data**: The tool loads a JSON file containing a list of tools and their installation commands for each package manager. This data is structured into categories (e.g., IDEs, utilities, version control tools).
2. **OS & Package Manager Selection**: The user selects their operating system and package manager.
3. **Tool Selection**: The user checks off the tools they wish to install. Only tools compatible with the selected OS and package manager are available.
4. **Script Generation**: Once the tools are selected, a script is automatically generated with the appropriate installation commands.
5. **Action Buttons**: The user can copy the script to the clipboard or download it for later use.

## Use Cases

- **New Developer Setup**: Quickly set up a new development environment with all the necessary tools.
- **Consistency Across Machines**: Ensure all developers on a team have the same tools installed with identical setup scripts.
- **Automated Dev Environment Setup**: Automate the installation of development tools during CI/CD pipelines or on virtual machines.

## How to Use

1. **Clone the Repository**
   - Clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/devsetup.git
   cd devsetup
   ```

2. **Install Dependencies**

   * Install the required dependencies for React and Next.js.

   ```bash
   npm install
   ```

3. **Run the Application**

   * Start the development server to run the application locally.

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to interact with the tool.

4. **Select Tools**

   * Select your operating system (Windows, macOS, or Linux).
   * Choose the package manager (e.g., `choco`, `winget`, `apt`, etc.).
   * Check the boxes for the tools you wish to install.
   * Click "Generate Script" to create your installation script.

5. **Copy or Download the Script**

   * Copy the script to the clipboard or download it as a `.sh` or `.bat` file.

---
## Contributing

We'd love to have your help! Please see the [Contributing Guide](CONTRIBUTING.md) for instructions on how to add new tools or contribute to the project.


## Conclusion

DevSetup is a simple yet powerful tool that can save time when setting up a new development environment. By automating the installation of essential tools, it ensures consistency and efficiency across multiple systems. With the ability to add new tools via an Excel file, this project can easily scale and accommodate more software options.

---
# DevSetup

## Introduction

**DevSetup** is a web application designed to help developers quickly generate installation scripts for their development environment. By selecting the operating system (Windows, macOS, or Linux) and package manager (e.g., Chocolatey, Homebrew, APT), developers can easily choose the tools they need and generate a script to install them.

Whether you’re setting up a new machine or just need to install a set of tools, DevSetup streamlines the process by automating the creation of installation scripts.

## Features

- **Select OS and Package Manager**: Choose between Windows, macOS, or Linux and then select your preferred package manager.
- **Tool Selection**: Browse a variety of development tools categorized by type and select the ones you need.
- **Script Generation**: Automatically generate a script based on your selections.
- **Copy & Download**: Copy the generated script to the clipboard or download it as a file.

## Tech Stack

- **Frontend**: React (with hooks), TypeScript
- **Excel Parsing**: [XLSX.js](https://github.com/SheetJS/sheetjs)
- **CSS**: TailwindCSS (for styling)

## How It Works

1. **Load Tools Data**: The app loads a list of tools and their installation commands from an Excel file (`tools.xlsx`).
2. **Tool Categories**: Tools are grouped into categories such as 'Development', 'Databases', 'Web Servers', etc.
3. **OS and Package Manager Selection**: The user selects their operating system (Windows, macOS, Linux) and package manager (e.g., `choco`, `winget`, `apt`, etc.).
4. **Tool Selection**: The user selects tools they want to install from a variety of categories.
5. **Script Generation**: The app generates a script with the corresponding installation commands for the selected tools and package manager.
6. **Copy/Download**: The generated script can be copied to the clipboard or downloaded as a `.sh` file.

## Demo

Visit our website to try the tool live:

[DevSetup Demo](https://devsetup.example.com) *(Replace with the actual URL once live)*

## Installation

### Clone the Repo

To run **DevSetup** locally, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/devsetup.git
cd devsetup
npm install

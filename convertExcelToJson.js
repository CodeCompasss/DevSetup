import  XLSX  from 'xlsx';
import fs from 'fs';

const convertExcelToJson = () => {
  const workbook = XLSX.readFile('./public/tools.xlsx'); // Replace with your Excel file path
  const sheetName = workbook.SheetNames[0]; // Assuming first sheet contains the data
  const worksheet = workbook.Sheets[sheetName];

  // Define the structure of each row
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  const categoriesMap = {};

  jsonData.forEach((row) => {
    const category = row.category || "Uncategorized";

    if (!categoriesMap[category]) {
      categoriesMap[category] = { category, tools: [] };
    }

    const install = {};

    // Map the package managers and installation commands dynamically
    ['choco', 'winget', 'scoop', 'apt', 'dnf', 'pacman', 'homebrew'].forEach(pkg => {
      if (row[pkg]) {
        install[pkg] = row[pkg];
      }
    });

    categoriesMap[category].tools.push({
      name: row.name,
      iconsrc: row.iconsrc,
      install,
    });
  });

  // Write the JSON data to a file
  fs.writeFileSync('tools.json', JSON.stringify(Object.values(categoriesMap), null, 2));

  console.log("Excel file has been converted to JSON.");
};

convertExcelToJson();

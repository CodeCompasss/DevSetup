import  XLSX  from 'xlsx';
import fs from 'fs';

const convertExcelToJson = () => {
  const workbook = XLSX.readFile('./public/tools.xlsx'); 
  const sheetName = workbook.SheetNames[0]; 
  const worksheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  const categoriesMap = {};
  const toolsDir = './public/tools';

  // Ensure tools directory exists
  if (!fs.existsSync(toolsDir)){
      fs.mkdirSync(toolsDir, { recursive: true });
  }

  jsonData.forEach((row) => {
    const category = row.category || "Uncategorized";
    const categoryId = category.toLowerCase().replace(/[^a-z0-9]/g, '_');

    if (!categoriesMap[category]) {
      categoriesMap[category] = { 
        id: categoryId,
        category, 
        tools: [] 
      };
    }

    const install = {};
    ['choco', 'winget', 'scoop', 'apt', 'dnf', 'pacman', 'homebrew'].forEach(pkg => {
      if (row[pkg]) {
        install[pkg] = row[pkg];
      }
    });

    categoriesMap[category].tools.push({
      id: row.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: row.name,
      iconsrc: row.iconsrc,
      install,
    });
  });

  const categoryList = [];

  // Write individual category files and build manifest
  Object.values(categoriesMap).forEach(categoryData => {
    const fileName = `${categoryData.id}.json`;
    fs.writeFileSync(`${toolsDir}/${fileName}`, JSON.stringify(categoryData, null, 2));
    
    categoryList.push({
      id: categoryData.id,
      name: categoryData.category,
      file: `/tools/${fileName}`,
      count: categoryData.tools.length
    });
  });

  // Write manifest file
  fs.writeFileSync('./public/tools/manifest.json', JSON.stringify(categoryList, null, 2));

  console.log(`Successfully sharded ${jsonData.length} tools into ${categoryList.length} categories.`);
};

convertExcelToJson();

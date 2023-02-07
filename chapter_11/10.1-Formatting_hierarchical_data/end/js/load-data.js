import { stratify } from "d3-hierarchy";

export const loadCSVData = () => {
  
  // Load data into the project
  const csvData = require("../data/flat_data.csv"); // We need to use require to tell Parcel that countries.csv is an external, required file, and it needs to include it in dist/.
  console.log(csvData) // already loaded as array of objects

  // Format numbers
  csvData.forEach(d => {
    d.total_speakers = +d.total_speakers;
    d.native_speakers = +d.native_speakers;
  });

  // Create hierarchical data
  const hierarchyGenerator = stratify()
    .id(d => d.child)
    .parentId(d => d.parent);
  const root = hierarchyGenerator(csvData);
  console.log("root", root);

  const descendants = root.descendants();
  const leaves = descendants.filter(d => !d.children);
  console.log("descendants", descendants);
  console.log("leaves", leaves);

  return [root, descendants, leaves];

};

// const jsonData = require("../data/hierarchical-data.json");
// console.log("json data", jsonData);
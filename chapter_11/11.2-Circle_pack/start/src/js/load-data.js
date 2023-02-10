export const loadCSVData = () => {
  
  // Load data into the project
  const csvData = require("../data/flat_data.csv"); // We need to use require to tell Parcel that flat_data.csv is an external, required file, and it needs to be includes in the dist/ folder.
  console.log("csvData", csvData);

  // Format numbers
  csvData.forEach(d => {
    d.total_speakers = +d.total_speakers;
    d.native_speakers = +d.native_speakers;
  });

  return csvData;

};

export const loadJSONData = () => {

  // Load data into the project
  const jsonData = require("../data/hierarchical-data.json");
  console.log("jsonData", jsonData);

  return jsonData;

};

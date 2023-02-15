import { loadCSVData, loadJSONData } from "./load-data.js";
import { CSVToHierarchy, JSONToHierarchy } from "./hierarchy.js";
import { drawCirclePack } from "./circle-pack.js";
import { drawTree } from "./tree.js";
import { createLegend } from "./legend.js";
import { drawTreemap } from "./treemap.js";

// Load and format the hierarchical data
const flatData = loadCSVData();
const [root, descendants, leaves] = CSVToHierarchy(flatData);

const jsonData = loadJSONData();
const [root_j, descendants_j, leaves_j] = JSONToHierarchy(jsonData);

// Draw the circle pack
drawCirclePack(root, descendants, leaves);

// Draw the tree chart
drawTree(root, descendants, leaves);

// Create legend
createLegend();

// Draw the treemap
drawTreemap(root, leaves);
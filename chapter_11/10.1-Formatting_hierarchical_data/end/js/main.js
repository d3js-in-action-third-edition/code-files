import { loadCSVData } from "./load-data.js";
import { buildCirclePack } from "./circle-pack.js";

const [root, descendants, leaves] = loadCSVData();

buildCirclePack(root, descendants, leaves);
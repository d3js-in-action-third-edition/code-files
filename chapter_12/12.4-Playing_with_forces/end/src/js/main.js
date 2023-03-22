import { createLegend } from "./legend";
import { loadData } from "./load-data";
import { drawMatrix } from "./matrix";
import { drawArcDiagram } from "./arc";
import { drawBeeswarm } from "./beeswarm";
import { drawNetwork } from "./network";

createLegend();

// Load data
const [nodes, edges] = loadData();

// Draw the adjacency matrix
drawMatrix(nodes, edges);

// Draw the arc diagram
drawArcDiagram(nodes, edges);

// Draw the beeswarm
// drawBeeswarm(nodes);

// Draw the network
// drawNetwork(nodes, edges);
export const loadData = () => {

  const nodes = require("../data/nodes.json");
  const edges = require("../data/edges.json");
  console.log("nodes", nodes);
  console.log("edges", edges);

  return [nodes, edges];

};
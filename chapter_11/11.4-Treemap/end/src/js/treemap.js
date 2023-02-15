import { treemap } from "d3-hierarchy";
import { select, selectAll } from "d3-selection";
import { colorScale } from "./scales";

export const drawTreemap = (root, leaves) => {

  // Dimensions
  const width = 850;
  const height = 600;

  // Compute the layout
  const treemapLayoutGenerator = treemap()
    .size(([width, height]))
    .paddingInner(1)
    .paddingOuter(1)
    .round(true);
  treemapLayoutGenerator(root);

  // Append svg container
  const svg = select("#treemap")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  // Append a group for each leaf
  const nodes = svg
    .selectAll(".node-container")
    .data(leaves)
    .join("g")
      .attr("class", "node-container")
      .attr("transform", d => `translate(${d.x0}, ${d.y0})`);

  // Append a rectangle for each leaf 
  nodes 
    .append("rect")
      .attr("class", "treemap-node")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("fill", d => colorScale(d.parent.data.parent));

  // Append a label for each leaf
  nodes 
    .append("text")
      .attr("class", d => `treemap-label treemap-label-${d.id.replaceAll(" ", "-").replaceAll("'", "")}`)
      .attr("x", 5)
      .attr("y", 15)
      .attr("fill", "white")
      .style("font-size", "12px")
      .style("font-weight", 500)
      .text(d => d.id);

  // Hide the labels that are larger than their parent
  selectAll(".treemap-label")
    .style("opacity", d => {
      const textElement = document.querySelector(`.treemap-label-${d.id.replaceAll(" ", "-").replaceAll("'", "")}`);
      const textWidth = textElement.getBBox().width;
      return ((d.y1 - d.y0) >= 25) && ((d.x1 - d.x0) >= textWidth + 10) ? 1 : 0;
    });

};
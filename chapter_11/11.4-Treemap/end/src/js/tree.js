import { tree } from "d3-hierarchy";
import { select } from "d3-selection";
import { link, curveBumpX } from "d3-shape";
import { max } from "d3-array";
import { getRadius, colorScale } from "./scales";

export const drawTree = (root, descendants, leaves) => {

  // Dimensions
  const width = 1200;
  const height = 3000;
  const margin = {top:60, right: 200, bottom: 0, left: 100};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute the layout
  const treeLayoutGenerator = tree()
    .size([innerHeight, innerWidth]);
  treeLayoutGenerator(root);

  // Append the SVG container
  const svg = select("#tree")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Append the links
  const linkGenerator = link(curveBumpX)
    .x(d => d.y)
    .y(d => d.x);
  svg
    .selectAll(".tree-link")
    .data(root.links())
    .join("path")
      .attr("class", "tree-link")
        .attr("d", d => linkGenerator(d))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.6);

  // Append the nodes
  const maxSpeakers = max(leaves, d => d.data.total_speakers);
  svg
    .selectAll(".node-tree")
    .data(descendants)
    .join("circle")
      .attr("class", "node-tree")
      .attr("cx", d => d.y)
      .attr("cy", d => d.x)
      .attr("r", d => d.depth === 3 
                      ? getRadius(maxSpeakers, d.data.total_speakers) 
                      : 4
      )
      .attr("fill", d => d.depth === 3 
                      ? colorScale(d.parent.data.parent) 
                      : "white"
      )
      .attr("fill-opacity", d => d.depth === 3 ? 0.3 : 1)
      .attr("stroke", d => d.depth === 3 ? "none" : "gray");

  // Append labels
  svg
    .selectAll(".label-tree")
    .data(descendants)
    .join("text")
      .attr("class", "label-tree")
      .attr("x", d => d.children ? d.y - 8 : d.y + 8)
      .attr("y", d => d.x)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .attr("alignment-baseline", "middle")
      .attr("paint-order", "stroke")
      .attr("stroke", d => d.depth ===3 ? "none" : "white")
      .attr("stroke-width", 2)
      .style("font-size", "16px")
      .text(d => d.id);

};
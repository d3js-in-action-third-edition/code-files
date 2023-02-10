import { pack } from "d3-hierarchy";
import { select } from "d3-selection";

export const drawCirclePack = (root, descendants, leaves) => {

  // Dimensions
  const width = 800;
  const height = 800;
  const margin = { top: 1, right: 1, bottom: 1, left: 1 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute the size of the circles
  root.sum(d => d.total_speakers);

  // Compute the layout
  const packLayoutGenerator = pack()
    .size([innerWidth, innerHeight])
    .padding(3); // Separation between circles
  packLayoutGenerator(root);

  // Append the SVG container
  const svg = select("#circle-pack")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Append circles
  svg
    .selectAll(".pack-circle")
    .data(descendants)
    .join("circle")
      .attr("class", "pack-circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", "none")
      .attr("stroke", "black");

};
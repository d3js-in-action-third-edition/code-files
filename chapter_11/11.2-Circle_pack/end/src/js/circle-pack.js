import { pack } from "d3-hierarchy";
import { select, selectAll } from "d3-selection";
import { colorScale } from "./scales";
import { interpolate } from "d3-interpolate";
import { format } from "d3-format";

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
      .attr("class", d => `pack-circle pack-circle-depth-${d.depth}`)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => {
        switch (d.depth) {
          case 1:
            return colorScale(d.id);
          case 2:
            return interpolate(colorScale(d.parent.id), "white")(0.5);
          default:
            return "white";
        };
      })
      .attr("stroke", d => d.depth === 0 ? "gray" : "none");

  // Append labels
  const minRadius = 22;
  svg
    .selectAll(".leaf-label-container")
    .data(leaves.filter(leave => leave.r >= minRadius))
    .join("foreignObject")
      .attr("class", "leaf-label-container")
      .attr("width", d => 2 * d.r)
      .attr("height", 40)
      .attr("x", d => d.x - d.r)
      .attr("y", d => d.y - 20)
    .append("xhtml:div")
      .attr("class", "leaf-label")
      .text(d => d.id);

  // Interactions
  selectAll(".pack-circle-depth-3, foreignObject")
    .on("mouseenter", (e, d) => {
      console.log(d)
      select("#info .info-language").text(d.id);
      select("#info .info-branch .information").text(d.parent.id);
      select("#info .info-family .information").text(d.parent.data.parent);
      select("#info .info-total-speakers .information").text(format(".3s")(d.data.total_speakers));
      select("#info .info-native-speakers .information").text(format(".3s")(d.data.native_speakers));

      select("#instructions").classed("hidden", true);
      select("#info").classed("hidden", false);
    })
    .on("mouseleave", () => {
      select("#instructions").classed("hidden", false);
      select("#info").classed("hidden", true);
    });

};
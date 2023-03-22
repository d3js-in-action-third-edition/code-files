import { scalePoint } from "d3-scale";
import { houses } from "./helper";
import { select, selectAll } from "d3-selection";
import { line, curveCardinal } from "d3-shape";
import { transition } from "d3-transition";
import { max } from "d3-array";
import { getRadius, colorScale } from "./scales";

export const drawArcDiagram = (nodes, edges) => {

  // Dimensions
  const width = 1140;
  const height = 400;
  const margin = { top: height - 200, right: 100, bottom: 0, left: 100 };
  const innerWidth = width - margin.right - margin.left;


  // Preprocess the data
  const nodeHash = {};
  const arcNodes = JSON.parse(JSON.stringify(nodes));
  arcNodes.sort((a, b) => houses.find(h => h.house === a.house).order - houses.find(h => h.house === b.house).order);
  
  const xScale = scalePoint()
    .domain(arcNodes.map(node => node.id))
    .range([0, innerWidth]);

  arcNodes.forEach((node, i) => {
    nodeHash[node.id] = node;
    node["x"] = xScale(node.id);
  });
  console.log("arcNodes", arcNodes);
  console.log("nodeHash", nodeHash);

  const arcEdges = JSON.parse(JSON.stringify(edges));
  arcEdges.forEach(edge => {
    edge.source = nodeHash[edge.source];
    edge.target = nodeHash[edge.target];
  });
  console.log("arcEdges", arcEdges);


  // Append the SVG container
  const svg = select("#arc")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // Append the arcs
  const getArc = d => {
    const arcGenerator = line().curve(curveCardinal);
    const midX = (d.source.x + d.target.x) / 2;
    const midY = -Math.abs((d.source.x - d.target.x) / 6);

    const path = arcGenerator([[d.source.x, 0], [midX, midY], [d.target.x, 0]]);

    return path;
  };

  svg
    .selectAll(".arc-link")
    .data(arcEdges)
    .join("path")
      .attr("class", "arc-link")
      .attr("d", d => getArc(d))
      .attr("fill", "none")
      .attr("stroke", "#364652")
      .attr("stroke-width", d => d.weight)
      .attr("stroke-opacity", 0.1)
      .attr("stroke-linecap", "round");


  // Append the nodes
  const maxLines = max(arcNodes, d => d.totalLinesNumber);
  svg
    .selectAll(".arc-node")
    .data(arcNodes.sort((a, b) => b.totalLinesNumber - a.totalLinesNumber))
    .join("circle")
      .attr("class", "arc-node")
      .attr("cx", d => d.x)
      .attr("cy", 0)
      .attr("r", d => getRadius(maxLines, d.totalLinesNumber))
      .attr("fill", d => colorScale(d.house))
      .attr("stroke", d => "#FAFBFF")
      .attr("stroke-width", 2);


  // Append the character labels
  svg
    .selectAll(".arc-label")
    .data(arcNodes)
    .join("text")
      .attr("class", "arc-label")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("transform", d => `translate(${d.x}, 70), rotate(-70)`)
      .text(d => d.name)
      .style("font-size", "14px");


  // Add interactions
  selectAll(".arc-node")
    .on("mouseenter", (e, d) => {

      const t = transition()
        .duration(150);

      const isLinked = char => {
        return arcEdges.find(edge => 
          (edge.source.id === d.id && edge.target.id === char.id) || 
          (edge.source.id === char.id && edge.target.id === d.id))
            ? true
            : false;
      };
      
      selectAll(".arc-link")
        .transition(t)
        .attr("stroke-opacity", link => link.source.id === d.id || link.target.id === d.id ? 0.1 : 0);
      
      selectAll(".arc-node")
        .transition(t)
        .attr("fill-opacity", char => char.id === d.id || isLinked(char) ? 1 : 0 )
        .attr("stroke-opacity", char => char.id === d.id || isLinked(char) ? 1 : 0 );

      selectAll(".arc-label")
        .transition(t)
        .style("opacity", char => char.id === d.id || isLinked(char) ? 1 : 0 )
        .style("font-weight", char => char.id === d.id ? 700 : 400);

    })
    .on("mouseleave", (e, d) => {

      selectAll(".arc-link")
        .attr("stroke-opacity", 0.1);

      selectAll(".arc-node")
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      selectAll(".arc-label")
        .style("opacity", 1)
        .style("font-weight", 400);

    });
  
};
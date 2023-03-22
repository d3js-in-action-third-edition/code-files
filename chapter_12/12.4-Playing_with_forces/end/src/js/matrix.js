import { select, selectAll } from "d3-selection";
import { max, range } from "d3-array";
import { scaleLinear } from "d3-scale";
import { transition } from "d3-transition";

export const drawMatrix = (nodes, edges) => {

  // Order characters (nodes) by number of lines
  nodes.sort((a, b) => b.totalLinesNumber - a.totalLinesNumber);

  // Prepare the data matrix
  const edgeHash = {};
  edges.forEach(edge => {

    const link1 = {
      source: edge.source,
      target: edge.target,
      weight: edge.weight
    };
    const id1 = `${edge.source}-${edge.target}`;
    edgeHash[id1] = link1;
    
    const link2 = {
      source: edge.target,
      target: edge.source,
      weight: edge.weight
    };
    const id2 = `${edge.target}-${edge.source}`;
    edgeHash[id2] = link2;

  });
  console.log("edgeHash", edgeHash);

  const matrix = [];
  const squareWidth = 16;
  const padding = 2;
  nodes.forEach((charA, i) => {
    nodes.forEach((charB, j) => {
      if (charA !== charB) {
        const id = `${charA.id}-${charB.id}`;
        const item = {
          id: id,
          source: charA.id,
          target: charB.id,
          x: i * (squareWidth + padding),
          y: j * (squareWidth + padding)
        };

        if (edgeHash[id]) {
          item["weight"] = edgeHash[id].weight;
          matrix.push(item)
        }
      }
    });
  });
  console.log("matrix", matrix);


  // Dimensions
  const innerWidth = nodes.length * (squareWidth + padding);
  const innerHeight = nodes.length * (squareWidth + padding);
  const margin = { top: 130, right: 0, bottom: 0, left: 130 };
  const width = innerWidth + margin.right + margin.left;
  const height = innerHeight + margin.top + margin.bottom;


  // Append SVG container
  const svg = select("#matrix")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    
  // Append the grid squares
  const maxWeight = max(edges, d => d.weight);
  const opacityScale = scaleLinear()
    .domain([0, maxWeight])
    .range([0, 1]);
  svg
    .selectAll(".grid-quare")
    .data(matrix)
    .join("rect")
      .attr("class", "grid-quare")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", squareWidth)
      .attr("height", squareWidth)
      .attr("fill", "#364652")
      .attr("fill-opacity", d => opacityScale(d.weight));


  // Append the labels
  const labelsContainer = svg
    .selectAll(".matrix-label")
    .data(nodes)
    .join("g")
      .attr("class", "matrix-label")
      .attr("dominant-baseline", "middle")
      .style("font-size", "13px");

  labelsContainer
    .append("text")
      .attr("class", "label-top")
      .attr("x", -8)
      .attr("y", (d, i) => i * (squareWidth + padding) + squareWidth / 2)
      .attr("text-anchor", "end")
      .text(d => d.name);
      
  labelsContainer
    .append("text")
      .attr("class", "label-left")
      .attr("transform", (d, i) => `translate(${i * (squareWidth + padding) + squareWidth / 2}, -8) rotate(-90)`)
      .text(d => d.name);


  // Add a legend for the opacity of the squares
  const weights = range(1, maxWeight + 1);

  const legend = select(".matrix-legend")
    .append("ul")
    .selectAll(".legend-color-item")
    .data(weights)
    .join("li")
      .attr("class", "legend-color-item");
  legend
    .append("div")
      .attr("class", "legend-color")
      .style("background-color", "#364652")
      .style("opacity", d => opacityScale(d));
  legend
    .append("div")
      .attr("class", "legend-color-label")
      .text(d => d);


  // Add mouse interaction
  selectAll(".grid-quare")
    .on("mouseenter", (e, d) => {
      const t = transition()
        .duration(150);

      selectAll(".label-left")
        .transition(t)
          .style("opacity", label => label.id === d.source ? 1 : 0.1);

      selectAll(".label-top")
        .transition(t)
          .style("opacity", label => label.id === d.target ? 1 : 0.1);

      const charA = nodes.find(char => char.id === d.source).name;
      const charB = nodes.find(char => char.id === d.target).name;
      select(".matrix-tooltip-charA").text(charA);
      select(".matrix-tooltip-charB").text(charB);
      select(".matrix-tooltip-scenes").text(d.weight);
      select(".matrix-tooltip").classed("hidden", false);
    })
    .on("mouseleave", (e, d) => {
      selectAll(".label-top, .label-left")
        .style("opacity", 1);

      select(".matrix-tooltip").classed("hidden", true);
    });

};
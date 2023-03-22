import { select } from "d3-selection";
import { houses, houses } from "./helper";
import { getRadius } from "./scales";

export const createLegend = () => {

  // Houses
  const housesLegend = select(".legend-houses")
    .append("ul")
    .selectAll(".legend-house")
    .data(houses)
    .join("li")
      .attr("class", "legend-house");

  housesLegend
    .append("span")
      .attr("class", "legend-house-color")
      .style("background-color", d => d.color);

  housesLegend
    .append("span")
      .attr("class", "legend-house-label")
      .text(d => d.house);

    
  // Circle radius
  const linesMax = 600;
  const linesMedium = 200;
  const linesMin = 30;
  const maxRadius = getRadius(linesMax, linesMax);
  const mediumRadius = getRadius(linesMax, linesMedium);
  const minRadius = getRadius(linesMax, linesMin);
  const legendRadius = select(".legend-radius")
    .append("svg")
      .attr("viewBox", "0 0 260 200")
    .append("g")
      .attr("transform", "translate(1, 10)");
  const legendCircles = legendRadius 
    .append("g")
      .attr("fill", "transparent")
      .attr("stroke", "#272626");
  legendCircles
    .append("circle")
      .attr("cx", maxRadius)
      .attr("cy", maxRadius)
      .attr("r", maxRadius);
  legendCircles
    .append("circle")
      .attr("cx", maxRadius)
      .attr("cy", 2*maxRadius - mediumRadius)
      .attr("r", mediumRadius);
  legendCircles
    .append("circle")
      .attr("cx", maxRadius)
      .attr("cy", 2*maxRadius - minRadius)
      .attr("r", minRadius);

  const linesLength = 100;
  const legendLines = legendRadius
    .append("g")
      .attr("stroke", "#272626")
      .attr("stroke-dasharray", "6 4");
  legendLines
    .append("line")
      .attr("x1", maxRadius)
      .attr("y1", 0)
      .attr("x2", maxRadius + linesLength)
      .attr("y2", 0);
  legendLines
    .append("line")
      .attr("x1", maxRadius)
      .attr("y1", 2*maxRadius - 2*mediumRadius)
      .attr("x2", maxRadius + linesLength)
      .attr("y2", 2*maxRadius - 2*mediumRadius);
  legendLines
    .append("line")
      .attr("x1", maxRadius)
      .attr("y1", 2*maxRadius - 2*minRadius)
      .attr("x2", maxRadius + linesLength)
      .attr("y2", 2*maxRadius - 2*minRadius);

  const labels = legendRadius
    .append("g")
      .attr("fill", "#272626")
      .attr("dominant-baseline", "middle");
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 0)
      .text(linesMax);
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*mediumRadius)
      .text(linesMedium);
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*minRadius)
      .text(linesMin);

};
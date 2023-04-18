import { select } from "d3-selection";
import { getCityRadius } from "./scales";

export const drawLegend = (laureatesMax) => {

  const laureatesMedium = 50;
  const laureatesMin = 5;
  const maxRadius = getCityRadius(laureatesMax, laureatesMax);
  const mediumRadius = getCityRadius(laureatesMedium, laureatesMax);
  const minRadius = getCityRadius(laureatesMin, laureatesMax);
  const legendLaureates = select(".legend-cities")
    .append("svg")
      .attr("width", 150)
      .attr("height", 80)
    .append("g")
      .attr("transform", "translate(1, 10)");
  const legendCircles = legendLaureates 
    .append("g")
      .attr("fill", "transparent")
      .attr("stroke", "#09131b");
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

  const linesLength = 50;
  const legendLines = legendLaureates
    .append("g")
      .attr("stroke", "#09131b")
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

  const labels = legendLaureates
    .append("g")
      .attr("fill", "#09131b")
      .attr("dominant-baseline", "middle")
      .style("font-size", "1.6rem");
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 0)
      .text(laureatesMax);
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*mediumRadius)
      .text(laureatesMedium);
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*minRadius)
      .text(laureatesMin);

};
import { select } from "d3-selection";
import { format } from "d3-format";
import { languageFamilies } from "./helper";
import { colorScale, getRadius } from "./scales";

export const createLegend = () => {

  const legendFamilies = select("#legend-families")
    .append("ul")
    .selectAll(".legend-family")
    .data(languageFamilies)
    .join("li");
  legendFamilies
    .append("span")
      .attr("class", "legend-color")
      .style("background-color", d => colorScale(d.label));
  legendFamilies
    .append("span")
      .attr("class", "legend-label")
      .text(d => d.label);

  const speakersMax = 1000000000;
  const speakersMedium = 100000000;
  const speakersMin = 10000000;
  const maxRadius = getRadius(speakersMax, speakersMax);
  const mediumRadius = getRadius(speakersMax, speakersMedium);
  const minRadius = getRadius(speakersMax, speakersMin);
  const legendSpeakers = select("#legend-speakers")
    .append("svg")
      .attr("width", 260)
      .attr("height", 200)
    .append("g")
      .attr("transform", "translate(1, 10)");
  const legendCircles = legendSpeakers 
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
  const legendLines = legendSpeakers
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

  const labels = legendSpeakers
    .append("g")
      .attr("fill", "#272626")
      .attr("dominant-baseline", "middle");
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 0)
      .text(format(".1s")(speakersMax));
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*mediumRadius)
      .text(format(".1s")(speakersMedium));
  labels
    .append("text")
      .attr("x", maxRadius + linesLength + 5)
      .attr("y", 2*maxRadius - 2*minRadius)
      .text(format(".1s")(speakersMin));

};
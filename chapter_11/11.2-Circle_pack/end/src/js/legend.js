import { select } from "d3-selection";
import { format } from "d3-format";
import { languageFamilies } from "./helper";
import { colorScale } from "./scales";

export default createLegend = () => {

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
  const legendSpeakers = select("#legend-speakers")
    .append("svg")
      .attr("width", 260)
      .attr("height", 160)
    .append("g")
      .attr("transform", "translate(1, 10)");
  const legendCircles = legendSpeakers 
    .append("g")
      .attr("fill", "transparent")
      .attr("stroke", "#272626");
  legendCircles
    .append("circle")
      .attr("cx", radialScale(speakersMax))
      .attr("cy", radialScale(speakersMax))
      .attr("r", radialScale(speakersMax));
  legendCircles
    .append("circle")
      .attr("cx", radialScale(speakersMax))
      .attr("cy", 2*radialScale(speakersMax) - radialScale(speakersMedium))
      .attr("r", radialScale(speakersMedium));
  legendCircles
    .append("circle")
      .attr("cx", radialScale(speakersMax))
      .attr("cy", 2*radialScale(speakersMax) - radialScale(speakersMin))
      .attr("r", radialScale(speakersMin));

  const linesLength = 100;
  const legendLines = legendSpeakers
    .append("g")
      .attr("stroke", "#272626")
      .attr("stroke-dasharray", "6 4");
  legendLines
    .append("line")
      .attr("x1", radialScale(speakersMax))
      .attr("y1", 0)
      .attr("x2", radialScale(speakersMax) + linesLength)
      .attr("y2", 0);
  legendLines
    .append("line")
      .attr("x1", radialScale(speakersMax))
      .attr("y1", 2*radialScale(speakersMax) - 2*radialScale(speakersMedium))
      .attr("x2", radialScale(speakersMax) + linesLength)
      .attr("y2", 2*radialScale(speakersMax) - 2*radialScale(speakersMedium));
  legendLines
    .append("line")
      .attr("x1", radialScale(speakersMax))
      .attr("y1", 2*radialScale(speakersMax) - 2*radialScale(speakersMin))
      .attr("x2", radialScale(speakersMax) + linesLength)
      .attr("y2", 2*radialScale(speakersMax) - 2*radialScale(speakersMin));

  const labels = legendSpeakers
    .append("g")
      .attr("fill", "#272626")
      .attr("dominant-baseline", "middle");
  labels
    .append("text")
      .attr("x", radialScale(speakersMax) + linesLength + 5)
      .attr("y", 0)
      .text(format(".1s")(speakersMax));
  labels
    .append("text")
      .attr("x", radialScale(speakersMax) + linesLength + 5)
      .attr("y", 2*radialScale(speakersMax) - 2*radialScale(speakersMedium))
      .text(format(".1s")(speakersMedium));
  labels
    .append("text")
      .attr("x", radialScale(speakersMax) + linesLength + 5)
      .attr("y", 2*radialScale(speakersMax) - 2*radialScale(speakersMin))
      .text(format(".1s")(speakersMin));

};
const resizeChart = () => {

  windowWidth = window.innerWidth;

  // Resize axis labels
  d3.selectAll(".tick text")
    .style("font-size", `${fontSizeScale(windowWidth)}px`);
  d3.selectAll(".axis-label")
    .style("font-size", `${axisLabelsScale(windowWidth)}px`);
  d3.select(".axis-label-left")
    .attr("y", margin.top - axisLabelsScale(window.innerWidth));
  d3.select(".axis-label-bottom")
    .attr("y", height - margin.bottom + 2*axisLabelsScale(window.innerWidth));

};

window.addEventListener("resize", () => {
  resizeChart();
});
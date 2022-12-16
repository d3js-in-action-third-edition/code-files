const resizeChart = () => {

  windowWidth = window.innerWidth;

  // Resize axis labels
  d3.selectAll(".tick text, .axis-label")
    .style("font-size", `${fontSizeScale(windowWidth)}px`);
  d3.select(".axis-label-left")
    .attr("y", margin.top - fontSizeScale(windowWidth));
  d3.select(".axis-label-bottom")
    .attr("y", height - margin.bottom + 2.2*fontSizeScale(windowWidth));

};

window.addEventListener("resize", () => {
  resizeChart();
});
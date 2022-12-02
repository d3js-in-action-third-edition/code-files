const resizeChart = () => {

  // Adapt the size of the text labels
  d3.selectAll("#line-chart text")
    .style("font-size", `${fontSizeScale(windowWidth)}px`);

  if ((windowWidth >= 700 && !isDesktopLayout) ||
      (windowWidth < 700 && isDesktopLayout)) {
    isDesktopLayout = !isDesktopLayout;
    
    // Update the number of ticks on the y-axis
    leftAxis
      .ticks(isDesktopLayout ? 10 : 5);
    d3.select(".axis-y")
      .transition()
        .call(leftAxis);

    // Update the right margin
    margin.right = isDesktopLayout ? 250 : 10;
    innerWidth = width - margin.left - margin.right;

    // Update xScale
    xScale.range([0, innerWidth]);

    // Update x-axis
    bottomAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%b"));
    d3.select(".axis-x")
      .transition()
        .call(bottomAxis);
    positionXaxisLabels();

    // Add/remove the annotations
    if (isDesktopLayout) {
      appendAnnotations();
    } else {
      removeAnnotations();
    }

    // Update area
    d3.select(".temperature-area")
      .transition()
      .attr("d", areaGenerator(data));

    // Update curve
    d3.select(".temperature-curve")
      .transition()
      .attr("d", curveGenerator(data));

    // Update circles
    d3.selectAll("circle")
      .data(data)
      .join("circle")
      .transition()
        .attr("r", 5)
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.avg_temp_F))
        .attr("fill", aubergine);

  }

};

window.addEventListener("resize", () => {
  windowWidth = getWindowWidth();
  resizeChart();
});
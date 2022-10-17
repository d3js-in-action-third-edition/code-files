const createTooltip = () => {

  const tooltip = innerChart
    .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0);
  const tooltipBackground = tooltip
    .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("fill", aubergine)
      .attr("fill-opacity", 0.75);
  const tooltipText = tooltip
    .append("text")
      .text("00.0°F")
      .attr("x", tooltipWidth/2)
      .attr("y", tooltipHeight/2 + 1)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-weight", 900)
      .style("fill", "white");

}

const handleMouseEvents = () => {

  innerChart.selectAll("circle")
    .on("mouseenter", (e, d) => {

      console.log("event", e);
      console.log("attached data", d);

      // Update the text in the tooltip
      d3.select(".tooltip text")
        .text(`${d3.format(".3")(d.avg_temp_F)}°F`);

      // Position the tooltip above the hovered circle
      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");
      console.log(cx, cy);
      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1);

    })
    .on("mouseleave", (e, d) => {

      // Hide the tooltip and move it away from the chart.
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", `translate(0, 500)`);

    });
  
}
const addLegend = () => {
      
  const legendItems = d3.select(".legend-container")
    .append("ul")
      .attr("class", "color-legend")
    .selectAll(".color-legend-item")
    .data(formatsInfo)
    .join("li")
      .attr("class", "color-legend-item");
  legendItems
    .append("span")
      .attr("class", "color-legend-item-color")
      .style("background-color", d => d.color);
  legendItems
    .append("span")
      .attr("class", "color-legend-item-label")
      .text(d => d.label);
  
};
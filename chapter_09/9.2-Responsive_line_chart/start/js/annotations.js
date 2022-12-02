const appendAnnotations = (data, xScale, yScale) => {
  const lastDate = d3.max(data, d => d.date);

  const annotations = innerChart
    .append("g")
      .attr("class", "annotations");

  // Label for line chart
  annotations
    .append("text")
      .attr("class", "annotation")
      .text("Average temperature")
      .attr("x", xScale(lastDate) + 10)
      .attr("y", yScale(data[data.length - 1].avg_temp_F))
      .attr("dominant-baseline", "middle")
      .attr("fill", aubergine);

  // Annotation for max temperature
  annotations
    .append("text")
      .attr("class", "annotation")
      .text("Maximum temperature")
      .attr("x", xScale(data[data.length - 4].date) + 13)
      .attr("y", yScale(data[data.length - 4].max_temp_F) - 20)
      .attr("fill", aubergine);
  annotations
    .append("line")
      .attr("x1", xScale(data[data.length - 4].date))
      .attr("y1", yScale(data[data.length - 4].max_temp_F) - 3)
      .attr("x2", xScale(data[data.length - 4].date) + 10)
      .attr("y2", yScale(data[data.length - 4].max_temp_F) - 20)
      .attr("stroke", aubergine)
      .attr("stroke-width", 2);

  // Annotation for min temperature
  annotations
    .append("text")
      .attr("class", "annotation")
      .text("Minimum temperature")
      .attr("x", xScale(data[data.length - 3].date) + 13)
      .attr("y", yScale(data[data.length - 3].min_temp_F) + 20)
      .attr("dominant-baseline", "hanging")
      .attr("fill", aubergine);
  annotations
    .append("line")
      .attr("x1", xScale(data[data.length - 3].date))
      .attr("y1", yScale(data[data.length - 3].min_temp_F) + 3)
      .attr("x2", xScale(data[data.length - 3].date) + 10)
      .attr("y2", yScale(data[data.length - 3].min_temp_F) + 20)
      .attr("stroke", aubergine)
      .attr("stroke-width", 2);

};
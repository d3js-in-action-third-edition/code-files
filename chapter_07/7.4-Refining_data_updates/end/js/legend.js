const populateLegend = (data) => {

  // Conservation statuses
  const statuses = d3.select(".legend-conservation-status")
    .append("ul")
    .selectAll(".conservation-status")
    .data(conservationStatuses)
    .join("li")
      .attr("class", "conservation-status");

  statuses
    .append("svg")
      .attr("width", 32)
      .attr("height", 32)
    .append("circle")
      .attr("cx", 16)
      .attr("cy", 16)
      .attr("r", 15)
      .attr("fill", d => d.color)
      .attr('fill-opacity', 0.6)
      .attr("stroke", d => d.color)
      .attr("stroke-width", 2);

  statuses
    .append("span")
      .text(d => d.label);


  // Weight
  const sizes = d3.select(".legend-weight")
    .append("svg")
      .attr("width", 180)
      .attr("height", 120)
    .append("g")
      .attr("transform", "translate(0, 10)");

  const maxWeight = 180;
  const mediumWeight = 90;
  const lowWeight = 10;
  const circles = sizes 
    .append("g")
      .attr("fill", "#192e4d")
      .attr("fill-opacity", 0.3);
  circles
    .append("circle")
      .attr("cx", rScale(maxWeight))
      .attr("cy", rScale(maxWeight))
      .attr("r", rScale(maxWeight));
  circles
    .append("circle")
      .attr("cx", rScale(maxWeight))
      .attr("cy", 2*rScale(maxWeight) - rScale(mediumWeight))
      .attr("r", rScale(mediumWeight));
  circles
    .append("circle")
      .attr("cx", rScale(maxWeight))
      .attr("cy", 2*rScale(maxWeight) - rScale(lowWeight))
      .attr("r", rScale(lowWeight));

  const linesLength = 70;
  const lines = sizes
    .append("g")
      .attr("stroke", "#192e4d")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6 4");
  lines
    .append("line")
      .attr("x1", rScale(maxWeight))
      .attr("y1", 0)
      .attr("x2", rScale(maxWeight) + linesLength)
      .attr("y2", 0);
  lines
    .append("line")
      .attr("x1", rScale(maxWeight))
      .attr("y1", 2*rScale(maxWeight) - 2*rScale(mediumWeight))
      .attr("x2", rScale(maxWeight) + linesLength)
      .attr("y2", 02*rScale(maxWeight) - 2*rScale(mediumWeight));
  lines
    .append("line")
      .attr("x1", rScale(maxWeight))
      .attr("y1", 2*rScale(maxWeight) - 2*rScale(lowWeight))
      .attr("x2", rScale(maxWeight) + linesLength)
      .attr("y2", 02*rScale(maxWeight) - 2*rScale(lowWeight));

  const labels = sizes
    .append("g")
      .attr("fill", "#192e4d")
      .attr("dominant-baseline", "middle");
  labels
    .append("text")
      .attr("x", rScale(maxWeight) + linesLength + 5)
      .attr("y", 0)
      .text(`${maxWeight}t`);
  labels
    .append("text")
      .attr("x", rScale(maxWeight) + linesLength + 5)
      .attr("y", 2*rScale(maxWeight) - 2*rScale(mediumWeight))
      .text(`${mediumWeight}t`);
  labels
    .append("text")
      .attr("x", rScale(maxWeight) + linesLength + 5)
      .attr("y", 2*rScale(maxWeight) - 2*rScale(lowWeight))
      .text(`${lowWeight}t`);


};
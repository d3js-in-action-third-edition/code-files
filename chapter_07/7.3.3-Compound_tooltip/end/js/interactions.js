const createTooltip = (data) => {

  const tooltipWidth = 100;
  const tooltipHeight = 190;
  const textColor = "#494e4f";
  const textLineHeight = 22;
  const firstYear = d3.min(data, d => d.year);
  const dataFirstYear = data.find(item => item.year === firstYear);

  // const tooltip = innerChart
  //   .append("g")
  //     .attr("class", "tooltip")
  //     .style("font-size", "14px");
  // tooltip
  //   .append("line")
  //     .attr("x1", 0)
  //     .attr("x2", 0)
  //     .attr("y1", -1 * (margin.top - tooltipHeight))
  //     .attr("y2", innerHeight)
  //     .attr("stroke", textColor)
  //     .attr("stroke-width", 2)
  //     .attr("stroke-dasharray", "6 4");
  // tooltip
  //   .append("text")
  //     .attr("class", "tooltip-year")
  //     .attr("x", 0)
  //     .attr("y", innerHeight + 25)
  //     .style("font-size", "16px")
  //     .style("font-weight", 700)
  //     .style("fill", textColor)
  //     .attr("text-anchor", "middle")
  //     .text(firstYear);

  // const tooltipContent = tooltip
  //   .append("g")
  //     .attr("transform", `translate(${-1 * tooltipWidth/2}, ${-1 * margin.top + 30})`);
  // const tooltipText = tooltipContent
  //   .append("text")
  //     .attr("class", "tooltip-content")
  //     .style("font-size", "14px")
  //     .style("font-weight", 500)
  //     .style("fill", textColor);

  
  // let total1973 = 0;
  // formatsInfo.forEach(format => {
  //   total1973 = total1973 + dataFirstYear[format.id];
  // });
  // formatsInfo.forEach((format, i) => {
  //   tooltipText
  //     .append("tspan")
  //       .attr("class", `sales-${format.id}`)
  //       .attr("x", 0)
  //       .attr("y", i * textLineHeight)
  //       .text(`${format.label}: ${d3.format(",.2r")(dataFirstYear[format.id])}M$`);

  //   tooltipContent
  //     .append("circle")
  //     .attr("cx", -10)
  //     .attr("cy", i * textLineHeight - 5)
  //     .attr("r", 6)
  //     .attr("fill", format.color);
  // });

  // tooltipText
  //   .append("tspan")
  //     .attr("class", "sales-total")
  //     .attr("x", 0)
  //     .attr("dy", textLineHeight)
  //     .text(`Total: ${d3.format(",.2r")(total1973)}M$`);
  // tooltipContent
  //   .append("line")
  //     .attr("x1", -20)
  //     .attr("y1", formatsInfo.length * textLineHeight - 16)
  //     .attr("x2", tooltipWidth + 20)
  //     .attr("y2", formatsInfo.length * textLineHeight - 16)
  //     .attr("stroke", textColor);

}

const handleMouseEvents = (data) => {

  // d3.selectAll(".areas-container path")
  //   .on("mousemove", e => {

  //     // Set the position of the tooltip according to the x-position of the mouse
  //     // console.log(e);
  //     console.log(d3.pointer(e))
  //     const xPosition = d3.pointer(e)[0];
  //     d3.select(".tooltip").attr("transform", `translate(${xPosition}, 0)`);

  //     // Get the year corresponding to the x-position and set the text of the tooltip"s year label
  //     // scaleX is a continuous scale, which means it can return any floating number
  //     // Since the years are integers, we need to round the value returned by the scale
  //     const year = Math.round(xScale.invert(xPosition)); 
  //     d3.select(".tooltip-year").text(year);

  //     // Populate the tooltip content
  //     // console.log("data", data);
  //     const yearData = data.find(item => item.year === year);
  //     console.log(yearData)
  //     let totalSales = 0;

  //     formatsInfo.forEach(format => {
  //       totalSales = totalSales + yearData[format.id];

  //       d3.select(`.sales-${format.id}`)
  //         .text(`${format.label}: ${d3.format(",.2r")(yearData[format.id])}M$`);
  //     });

  //     d3.select(".sales-total")
  //       .text(`Total: ${d3.format(",.2r")(totalSales)}M$`);

  //   });

}
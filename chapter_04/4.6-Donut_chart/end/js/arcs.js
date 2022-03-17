// Create the donut chart here
const drawArcs = (data2020) => {
  console.log("data2020", data2020);

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const pieChartWidth = 300;
  const pieChartHeight = 300;
  const svg = d3.select("#pie-chart")
    .append("svg")
      .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  // Append the group that will contain the chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${pieChartWidth/2}, ${pieChartHeight/2})`);


  /***************************/
  /*      Draw the arcs      */
  /***************************/
  // Format the data for the pie layout generator
  const dataPie = [];
  let totalPeople = 0;
  regimesInfo.forEach(regime => {
    if (regime.id !== "no_regime_data") {
      const slice = { regime: regime.id, numPeople: data2020[regime.id] };
      dataPie.push(slice);
      totalPeople += data2020[regime.id];
    }
  });
  console.log("dataPie", dataPie);
  console.log("totalPeople", totalPeople);

  // Initialize the pie generator
  const pieGenerator = d3.pie()
    .value(d => d.numPeople);

  // Call the pie generator to obtain the annotated data
  const arcsData = pieGenerator(dataPie);
  console.log("arcsData", arcsData);

  // Initialize arc generator
  const arcGenerator = d3.arc()
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)
    .innerRadius(70)
    .outerRadius(110)
    .padAngle(0.02)
    .cornerRadius(3);
  
  // Append arcs
  innerChart
    .selectAll("path.path-2020")
    .data(arcsData)
    .join("path")
      .attr("class", "path-2020")
      .attr("d", arcGenerator)
      .attr("fill", d => colorScale(d.data.regime));


  /*****************************/
  /*     Append the labels     */
  /*****************************/
  // Append the year label at the center of the chart
  innerChart
    .append("text")
      .text("2020")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "20px");

  // Append the regime percentages
  innerChart
    .selectAll(".arc-label")
    .data(arcsData)
    .join("text")
      .attr("class", "arc-label")
      .text(d => d3.format(".0%")(d.data.numPeople/totalPeople))
      .attr("x", d => arcGenerator.centroid(d)[0])
      .attr("y", d => arcGenerator.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", 500);


  /***********************************/
  /*     Append the color legend     */
  /***********************************/
  const legendItems = d3.select("#current-distribution")
    .append("ul")
      .attr("class", "color-legend")
    .selectAll(".color-legend-item")
    .data(arcsData)
    .join("li")
      .attr("class", "color-legend-item");
  legendItems
    .append("span")
      .attr("class", "color-legend-item-color")
      .style("background-color", d => colorScale(regimesInfo.find(regime => regime.id === d.data.regime).id));
  legendItems
    .append("span")
      .attr("class", "color-legend-item-label")
      .text(d => regimesInfo.find(regime => regime.id === d.data.regime).label);

};
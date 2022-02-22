const drawArcs = (data, regimes) => {
  const data2020 = data.find(d => d.year === 2020);
  console.log(data2020);

  const data2020Formatted = [
    {regime:"liberal_democracies", numPeople:1066163865},
    {regime:"electoral_democracies", numPeople:2247950115},
    {regime:"electoral_autocracies", numPeople:992281450},
    {regime:"closed_autocracies", numPeople:1823737580},
    // {regime:"no_regime_data", numPeople:13643611},
  ];

  // Color scale
  colorScale = d3.scaleOrdinal()
    .domain(regimes)
    .range(colors);

  const svg = d3.select("#pie-chart")
    .append("svg")
      .attr("viewBox", [0, 0, width/2, height/2]);

  // Append text in the middle
  svg
    .append("text")
      .text("2000")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("x", width/4)
      .attr("y", height/4)
      .style("font-size", "20px");

  // Initialize the path generator
  // need to generate array with values or array of objects with key-value pair
  const arcs = d3.pie()
    .value(d => d.numPeople)(data2020Formatted);
  console.log("arcs", arcs);

  // Initialize arc generator
  const arcGenerator = d3.arc()
    .innerRadius(70)  // Show that if zero we get a pie chart
    .outerRadius(100)
    .padAngle(0.015)
    .cornerRadius(3);
  
  // Append arcs
  // Could I control the order?
  svg
    .append("g")
      .attr("transform", `translate(${width/4}, ${height/4})`)
    .selectAll("path.path-2020")
    .data(arcs)
    .join("path")
      .attr("class", "path-2020")
      .attr("d", d => {
        return arcGenerator({
          startAngle: d.startAngle,
          endAngle: d.endAngle
        });
      })
      .attr("fill", d => colorScale(d.data.regime));

};
const drawArcs = (data, regimes) => {
  const data2000 = data.find(d => d.year === 2000);
  const data2020 = data.find(d => d.year === 2020);
  console.log(data2000, data2020);

  const data2020Formatted = [
    {regime:"liberal_democracies", numPeople:1066163865},
    {regime:"electoral_democracies", numPeople:2247950115},
    {regime:"electoral_autocracies", numPeople:992281450},
    {regime:"closed_autocracies", numPeople:1823737580},
    {regime:"no_regime_data", numPeople:13643611},
  ]
  const data2000Formatted = [
    {regime:"liberal_democracies", numPeople:1067360224},
    {regime:"electoral_democracies", numPeople:1435304399},
    {regime:"electoral_autocracies", numPeople:3366054285},
    {regime:"closed_autocracies", numPeople:1909939094},
    {regime:"no_regime_data", numPeople:16140723},
  ]

  // Color scale
  colorScale = d3.scaleOrdinal()
    .domain(regimes)
    .range(colors);

  const svg1 = d3.select("#pie-chart-1")
    .append("svg")
      .attr("viewBox", [0, 0, width/2, height/2])
      .style("border", "1px solid black");
  const svg2 = d3.select("#pie-chart-2")
    .append("svg")
      .attr("viewBox", [0, 0, width/2, height/2])
      .style("border", "1px solid black");

  // Append text in the middle
  svg1
    .append("text")
      .text("2000")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("x", width/4)
      .attr("y", height/4)
      .style("font-size", "20px");
  svg2
    .append("text")
      .text("2020")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("x", width/4)
      .attr("y", height/4)
      .style("font-size", "20px");

  // Initialize the path generator
  // need to generate array with values or array of objects with key-value pair
  const arcs1 = d3.pie()
    .value(d => d.numPeople)(data2000Formatted);
  console.log("arcs1", arcs1)
  const arcs2 = d3.pie()
    .value(d => d.numPeople)(data2020Formatted);
  console.log("arcs2", arcs2)

  // Initialize arc generator
  const arcGenerator = d3.arc()
    .innerRadius(70)  // Show that if zero we get a pie chart
    .outerRadius(100)
    .padAngle(0.015)
    .cornerRadius(3);
  
  // Append arcs
  // Could I control the order?
  svg1
    .append("g")
      .attr("transform", `translate(${width/4}, ${height/4})`)
    .selectAll("path.path-2020")
    .data(arcs1)
    .join("path")
      .attr("class", "path-2020")
      .attr("d", d => {
        return arcGenerator({
          startAngle: d.startAngle,
          endAngle: d.endAngle
        });
      })
      .attr("fill", d => colorScale(d.data.regime));
  svg2
    .append("g")
      .attr("transform", `translate(${width/4}, ${height/4})`)
    .selectAll("path.path-2020")
    .data(arcs2)
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
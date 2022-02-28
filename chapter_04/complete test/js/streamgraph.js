const drawStreamGraph = (data, regimes) => {
  console.log("data", data);
  console.log("regimes", regimes);

  // X scale
  xScale = d3.scaleLinear() // Try time scale instead?
    .domain([new Date(d3.min(data, d => d.year)), new Date(d3.max(data, d => d.year))])
    .range([0, innerWidth]);

  // Y scale
  const sumPeople = d3.max(data, d => {
    let sumPeoplePerRegime = 0;
    regimes.forEach(regime => sumPeoplePerRegime += d[regime]);
    return sumPeoplePerRegime;
  });
  console.log("sumPeople", sumPeople);
  yScale = d3.scaleLinear()
    .domain([0, sumPeople])
    .range([innerHeight, 0])
    .nice();

  // Color scale
  colorScale = d3.scaleOrdinal()
    .domain(regimes)
    .range(regimesInfo.map(regime => regime.color));

  const svg = d3.select("#streamgraph") // Shouldn"t we use an id instead? Fix chapt 2-3
    .append("svg")
      .attr("viewBox", [0, 0, width, height]) // How cool, viewbox can also be passed as an array!
      // .style("border", "1px solid black");

  const chart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bottomAxis = d3.axisBottom(xScale)
    .tickSize(innerHeight * -1)
    .tickFormat(d3.format("d"));
  chart // Fix years formatting
    .append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  d3.selectAll(".axis-x text")
    .attr("dy", "15px");
  // Express in millions
  const leftAxis = d3.axisLeft(yScale)
    .tickSize(innerWidth * -1)
    .tickFormat(d3.format("~s"))
  chart
    .append("g")
      .attr("class", "axis axis-y")
      .call(leftAxis);
  d3.selectAll(".axis-y text")
    .attr("dx", "-5px");

  // Initialize the stack generator
  const stack = d3.stack()
    .keys(regimes)
    // .order(d3.stackOrderAscending) // The smallest areas at the bottom and the largest ones at the top.
    .order(d3.stackOrderNone) // The smallest areas at the bottom and the largest ones at the top.
    .offset(d3.stackOffsetNone); // Applies a zero baselinevent.
    // Try relative version
    // Re-order regimes

  // Call the stack generator to produce a stack for the data
  let series = stack(data);
  console.log("series", series);

  // Initialize the area generator
  const area = d3.area()
    .x(d => xScale(d.data.year))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveCatmullRom);

  // Append paths
  chart
    .append("g")
      .attr("class", "stream-paths")
    .selectAll("path")
    .data(series)
    .join("path")
      .attr("d", area)
      .attr("fill", d => colorScale(d.key));

  // Append labels
  const labels = svg
    .append("g")
      .attr("transform", `translate(${margin.left + innerWidth}, ${margin.top})`)
    .selectAll(".streamgraph-legend-label")
    .data(regimesInfo)
    .join("text")
      .attr("class", "streamgraph-legend-label")
      .text(d => d.label)
      .attr("x", 10)
      .attr("y", d => {
        switch (d.id) {
          case "liberal_democracies":
            return 400;
          case "electoral_democracies":
            return 330;
          case "electoral_autocracies":
            return 180;
          case "closed_autocracies":
            return 70;
          case "no_regime_data":
            return 15;
        };
      })
      .attr("fill", d => colorScale(d.color))
      .style("font-size", "14px");
};
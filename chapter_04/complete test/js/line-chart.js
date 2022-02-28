// Draw line chart
const drawLineChart = (data, regimes) => {
  console.log("data", data);
  console.log("regimes", regimes);

  // X scale
  xScale = d3.scaleLinear() // Try time scale instead?
    // .domain(d3.extent(data, d => d.year))
    .domain([new Date(d3.min(data, d => d.year)), new Date(d3.max(data, d => d.year))])
    .range([0, innerWidth]);

  // Y scale
  const maxPeople = d3.max(data, d => {
    const numPeoplePerRegime = [];
    regimes.forEach(regime => {
      numPeoplePerRegime.push(d[regime]);
    });
    return Math.max(...numPeoplePerRegime);
  });
  console.log("maxPeople", maxPeople);
  yScale = d3.scaleLinear()
    .domain([0, maxPeople])
    .range([innerHeight, 0])
    .nice();

  // Color scale
  colorScale = d3.scaleOrdinal()
    .domain(regimes)
    .range(regimesInfo.map(regime => regime.color));

  const svg = d3.select("#line-chart") // Shouldn"t we use an id instead? Fix chapt 2-3
    .append("svg")
      // .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("viewBox", [0, 0, width, height]) // How cool, viewbox can also be passed as an array!
      // .style("border", "1px solid black");

  const chart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bottomAxis = d3.axisBottom(xScale)
    .tickSize(innerHeight * -1)
    .tickFormat(d3.format("d"));
  chart
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


  // Tooltip
  const tooltipWidth = 50;
  const tooltipHeight = 25;
  const tooltip = svg
    .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0);
  const tooltipBackground = tooltip
    .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("fill", "white")
      .attr("stroke-width", 2);
  const tooltipText = tooltip
    .append("text")
      .text("2.5G")
      .attr("x", tooltipWidth/2)
      .attr("y", tooltipHeight/2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "12px")
      .style("font-weight", 500);


  // Show first without loop
  // We could do it in a loop, but a bit overkill... It"s getting complicated
  const datapointRadius = 4;
  regimes.forEach(regime => {
    const regimeData = data.map(d => {
      return {year: d.year, num_people: d[regime]}
    });
    console.log("regimeData", regimeData);

    // Show data points on graph
    const dataPoints = chart
      .selectAll(`circle.${regime}`) // explain why use class name here
      .data(regimeData)
      .join("circle")
        .attr("class", `datapoint ${regime}`)
        .attr("r", datapointRadius)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.num_people))
        .style("fill", colorScale(regime))
        .on("mouseenter", (event, datapoint) => {
          console.log("event", event);
          console.log("datapoint", datapoint);

          tooltipText
            .text(d3.format("0.3s")(datapoint.num_people))
            .attr("fill", colorScale(regime));
          tooltipBackground
            .attr("stroke", colorScale(regime));
          tooltip
            // offset gives inconsistent results...
            .attr("transform", `translate(${event.offsetX}, ${event.offsetY - 1.1*tooltipHeight})`)
            .style("opacity", 1)
        })
        .on("mouseleave", (event, datapoint) => {
          tooltip.style("opacity", 0);
        });

    // Draw line between points

    // First example, pass data points as arrays to understand how it works
    // d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]])

    // Initialize line generator
    const lineGenerator = d3.line()
      .x(d => xScale(d.year)) // x accessor
      .y(d => yScale(d[regime])); // y accessor

    // chart
    //   .append("path")
    //     .attr("d", lineGenerator(data))
    //     .attr("fill", "none")
    //     .attr("stroke", colorScale(regime));

    // Draw curves
    // Show the result of different interpolations but don"t necesserily make the reader do it?
    const curveGenerator1 = d3.line().x(d => xScale(d.year)).y(d => yScale(d[regime])).curve(d3.curveBasis);
    const curveGenerator2 = d3.line().x(d => xScale(d.year)).y(d => yScale(d[regime])).curve(d3.curveCardinal);
    const curveGenerator3 = d3.line().x(d => xScale(d.year)).y(d => yScale(d[regime])).curve(d3.curveBumpX);
    const curveGenerator4 = d3.line().x(d => xScale(d.year)).y(d => yScale(d[regime])).curve(d3.curveStep);
    chart
      .append("path")
        .attr("d", () => {
          switch (regime) {
            case "no_regime_data":
              return lineGenerator(data);
            case "closed_autocracies":
              return curveGenerator1(data);
            case "electoral_autocracies":
              return curveGenerator2(data);
            case "electoral_democracies":
              return curveGenerator3(data);
            case "liberal_democracies":
              return curveGenerator4(data);
          }
        })
        .attr("fill", "none")
        .attr("stroke", colorScale(regime));


    // const tooltip = chart
      // .selectAll(`.tooltip-label-${regime}`)
      // .data(data)
      // .join("text")
      //   .attr("class", `tooltip-label-${regime}`)
      //   .text(d => d3.format("~s")(d[regime]))
      //   .attr("x", d => xScale(d.year))
      //   .attr("y", d => yScale(d[regime]) - 10)
      //   .attr("text-anchor", "middle")
      //   .style("fill", colorScale(regime))
      //   .style("font-size", "12px");

  });

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
        return yScale(data[data.length - 1][d.id]);
        // switch (d.id) {
        //   case "liberal_democracies":
        //     return 297;
        //   case "electoral_democracies":
        //     return 252;
        //   case "electoral_autocracies":
        //     return 20;
        //   case "closed_autocracies":
        //     return 195;
        //   case "no_regime_data":
        //     return 420;
        // };
      })
      .attr("alignment-baseline", "middle")
      .attr("fill", d => colorScale(d.color))
      .style("font-size", "14px");

  // Turning a curve into an area
  // const areaGenerator = d3.area()
  //   .x(d => xScale(d.year)) // x accessor
  //   .y0(yScale(0))
  //   .y1(d => yScale(d["liberal_democracies"]));

  // chart
  //   .append("path")
  //     .attr("d", d => areaGenerator(data))
  //     .attr("fill", colorScale("liberal_democracies"))
  //     .attr("stroke", colorScale("liberal_democracies"));


};
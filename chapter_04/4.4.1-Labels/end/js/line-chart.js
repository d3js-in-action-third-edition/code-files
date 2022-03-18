// Create the line chart here
const drawLineChart = (partialData) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const xScale = d3.scaleLinear()
    .domain(d3.extent(partialData, d => d.year))
    .range([0, innerWidth]);

  // Y scale
  const maxPeople = d3.max(partialData, d => {
    const numPeoplePerRegime = [];
    regimesInfo.forEach(regime => {
      numPeoplePerRegime.push(d[regime.id]);
    });
    return Math.max(...numPeoplePerRegime);
  });
  
  const yScale = d3.scaleLinear()
    .domain([0, maxPeople])
    .range([innerHeight, 0])
    .nice();

  
  /***************************/
  /*     Append the axes     */
  /***************************/
  // Bottom axis
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"))
    .tickSize(innerHeight * -1);
  const axis = innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  d3.selectAll(".axis-x text")
    .attr("y", "10px");

  // Left axis
  const leftAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format("~s"))
    .tickSize(innerWidth * -1);
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);
  d3.selectAll(".axis-y text")
    .attr("dx", "-5px");

  
  /*****************************/
  /*     Line chart series     */
  /*****************************/
  regimesInfo.forEach(regime => {

    // Draw the data points
    innerChart
      .selectAll(`.data-point-${regime.id}`)
      .data(partialData)
      .join("circle")
        .attr("class", d => `data-point-${regime.id}`)
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d[regime.id]))
        .attr("fill", colorScale(regime.id)); 
    
    // Initialize the curve generator
    const curveGenerator = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d[regime.id]))
      .curve(d3.curveMonotoneX);
    
    // Draw the curves
    innerChart
      .append("path")
        .attr("d", curveGenerator(partialData))
        .attr("fill", "none")
        .attr("stroke", colorScale(regime.id));

    // Append labels
    innerChart
      .append("text")
        .attr("class", "chart-label")
        .text(regime.label)
        .attr("x", innerWidth + 10)
        .attr("y", yScale(partialData[partialData.length - 1][regime.id]))
        .attr("alignment-baseline", "middle")
        .attr("fill", d => colorScale(regime.id));

  });

};
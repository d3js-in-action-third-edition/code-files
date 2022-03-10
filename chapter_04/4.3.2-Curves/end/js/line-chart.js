// Create the line chart here
const drawLineChart = (partialData) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`)
      .style("border", "1px solid skyblue");

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

  
  /****************************/
  /*     Draw data points     */
  /****************************/
  innerChart
    .selectAll("circle")
    .data(partialData)
    .join("circle")
      .attr("r", 4)
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.electoral_democracies));

  
  /**************************/
  /*       Draw curve       */
  /**************************/
  // Initialize the curve generator
  const curveGenerator = d3.line()
    .x(d => xScale(d.year)) // x accessor function
    .y(d => yScale(d.electoral_democracies)) // y accessor function
    .curve(d3.curveMonotoneX);

  // Append the path that will constitute the line
  innerChart
    .append("path")
      .attr("d", curveGenerator(partialData))
      .attr("fill", "none")
      .attr("stroke", "black");

};
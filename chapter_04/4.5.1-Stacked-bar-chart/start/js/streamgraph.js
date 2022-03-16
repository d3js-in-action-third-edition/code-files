// Create the streamgraph here
const drawStreamGraph = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#streamgraph")
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
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  // Y scale
  const totalPeoplePerYear = [];
  data.forEach(d => {
    let totalPeople = 0;
    regimesInfo.forEach(regime => {
      totalPeople += d[regime.id];
    });
    totalPeoplePerYear.push(totalPeople);
  });
  const maxPeople = d3.max(totalPeoplePerYear);
  
  const yScale = d3.scaleLinear()
    .domain([0, maxPeople])
    .range([innerHeight, 0])
    .nice();

  // Color scale
  const colorScale = d3.scaleOrdinal()
    .domain(regimesInfo.map(regime => regime.id))
    .range(colors);

  
  /***************************/
  /*     Append the axes     */
  /***************************/
  // Bottom axis
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"))
    .tickSize(innerHeight * -1);
  innerChart
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

};
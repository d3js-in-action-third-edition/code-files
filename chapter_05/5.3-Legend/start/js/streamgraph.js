const drawStreamGraph = (data) => {
  

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#streamgraph")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);



  /*********************************/
  /*    Append the bottom axis     */
  /*********************************/
  const bottomAxis = d3.axisBottom(xScale)
    .tickValues(d3.range(1975, 2020, 5))
    .tickSizeOuter(0)
    .tickSize(innerHeight * -1); // Use the axis' ticks to draw a grid behind the streamgraph
  innerChart
    .append("g")
      .attr("class", "x-axis-streamgraph")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);



  /*************************************/
  /*    Initialize the stack layout    */
  /*************************************/
  const stackGenerator = d3.stack()
    .keys(formatsInfo.map(f => f.id))
    .order(d3.stackOrderInsideOut)
    .offset(d3.stackOffsetSilhouette);

  const annotatedData = stackGenerator(data);
  console.log("annotatedData streamgraph", annotatedData);


  /************************************/
  /*    Declare the vertical scale    */
  /************************************/
  // Find the lower and upper boundary of the domain based on the annotated data
  const minLowerBoundaries = [];
  const maxUpperBoundaries = [];
  annotatedData.forEach(series => {
    minLowerBoundaries.push(d3.min(series, d => d[0]));
    maxUpperBoundaries.push(d3.max(series, d => d[1]));
  });
  const minDomain = d3.min(minLowerBoundaries);
  const maxDomain = d3.max(maxUpperBoundaries);

  // Declare the vertical scale
  const yScale = d3.scaleLinear()
    .domain([minDomain, maxDomain])
    .range([innerHeight, 0])
    .nice();



  /***************************************/
  /*    Initialize the area generator    */
  /***************************************/
  const areaGenerator = d3.area()
    .x(d => xScale(d.data.year) + xScale.bandwidth()/2)
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveCatmullRom);



  /***************************/
  /*    Append the paths     */
  /***************************/
  innerChart
    .append("g")
      .attr("class", "areas-container")
    .selectAll("path")
    .data(annotatedData)
    .join("path")
      .attr("class", d => `area area-${d.key}`)
      .attr("d", areaGenerator)
      .attr("fill", d => colorScale(d.key));



  /*******************************/
  /*    Append the left axis     */
  /*******************************/
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .call(leftAxis);



  /***************************************/
  /*    Add a label to the left axis     */
  /***************************************/
  const leftAxisLabel = svg
    .append("text")
      .attr("dominant-baseline", "hanging");
  leftAxisLabel
    .append("tspan")
      .text("Total revenue");
  leftAxisLabel
    .append("tspan")
      .text("(million USD)")
      .attr("dx", 5)
      .attr("fill-opacity", 0.7);
  leftAxisLabel
    .append("tspan")
      .text("Adjusted for inflation")
      .attr("x", 0)
      .attr("dy", 20)
      .attr("fill-opacity", 0.7)
      .style("font-size", "14px");

  
};
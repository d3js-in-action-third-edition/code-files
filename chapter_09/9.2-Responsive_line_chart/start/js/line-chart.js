// Create the line chart here
const drawLineChart = (data) => {


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const firstDate = new Date(2021, 00, 01, 0, 0, 0);
  const lastDate = d3.max(data, d => d.date);
  xScale
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  // Y scale
  const maxTemp = d3.max(data, d => d.max_temp_F);
  yScale
    .domain([0, maxTemp])
    .range([innerHeight, 0]);

  
  /***************************/
  /*     Append the axes     */
  /***************************/
  // Bottom axis
  bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%b"));
  innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  d3.selectAll(".axis-x text")
    .attr("x", d => {
       const currentMonth = d;
       const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
       return (xScale(nextMonth) - xScale(currentMonth)) / 2;
    })
    .attr("y", "10px");

  // Left axis
  leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);

  // Set the font-family and font-size property of axis labels
  // This could also be handled from a CSS file
  d3.selectAll(".axis-x text, .axis-y text")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "14px");

  // Add label to the y-axis
  svg
    .append("text")
      .text("Temperature (°F)")
      .attr("y", 20);

  
  /************************************************/
  /*   Area chart of the temperature variability  */
  /************************************************/
  // Initialize the area generator
  areaGenerator
    .x(d => xScale(d.date))
    .y0(d => yScale(d.min_temp_F))
    .y1(d => yScale(d.max_temp_F))
    .curve(d3.curveCatmullRom);

  // Draw the area
  innerChart
    .append("path")
      .attr("d", areaGenerator(data))
      .attr("fill", aubergine)
      .attr("fill-opacity", 0.2);

  
  /*********************************************/
  /*   Line chart of the average temperature   */
  /*********************************************/
  // Draw the data points
  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("r", 5)
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.avg_temp_F))
      .attr("fill", aubergine);
    
  // Initialize the line/curve generator
  curveGenerator
    .x(d => xScale(d.date))
    .y(d => yScale(d.avg_temp_F))
    .curve(d3.curveCatmullRom);
    
  // Draw the line/curve
  innerChart
    .append("path")
      .attr("d", curveGenerator(data))
      .attr("fill", "none")
      .attr("stroke", aubergine);

      
  /*****************************/
  /*      Add annotations      */
  /*****************************/
  appendAnnotations(data, xScale, yScale);

};
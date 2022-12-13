const drawScatterplot = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


  /****************************/
  /*    Declare the scales    */
  /****************************/
  // Y scale
  const maxSize = d3.max(data, d => d.max_size_m);
  yScale = d3.scaleLinear()
    .domain([0, maxSize])
    .range([innerHeight, 0])
    .nice();

  // Color scale
  colorScale = d3.scaleOrdinal()
    .domain(conservationStatuses.map(s => s.id))
    .range(conservationStatuses.map(s => s.color));

  // X scale
  const maxPopulation = d3.max(data, d => d.global_population_estimate);
  xScale = d3.scaleLog()
    .domain([1, maxPopulation])
    .range([0, innerWidth])
    .nice();

  // Radius scale
  const maxWeigth = d3.max(data, d => d.max_weight_t);
  rScale = d3.scaleRadial()
    .domain([0, maxWeigth])
    .range([0, 45]);
  

  /***************************/
  /*     Append the axes     */
  /***************************/
  // Bottom axis
  const bottomAxisGenerator = d3.axisBottom(xScale);
  innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxisGenerator);

  // Left axis
  const leftAxisGenerator = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxisGenerator);

  // Add label to the axes
  svg
    .append("text")
      .attr("class", "axis-label axis-label-bottom")
      .text("Estimated population")
      .attr("text-anchor", "end")
      .attr("x", margin.left + innerWidth + 20)
      .attr("y", height - 3);
  svg
    .append("text")
      .attr("class", "axis-label axis-label-left")
      .text("Max size (m)")
      .attr("y", 15);


  /******************************/
  /*     Append the circles     */
  /******************************/
  innerChart
    .selectAll(".cetacean")
    .data(data)
    .join("circle")
      .attr("class", "cetacean")
      .attr("cx", d => xScale(d.global_population_estimate))
      .attr("cy", d => yScale(d.max_size_m))
      .attr("r", d => rScale(d.max_weight_t))
      .attr("fill", d => colorScale(d.status))
      .attr('fill-opacity', 0.6)
      .attr("stroke", d => colorScale(d.status))
      .attr("stroke-width", 2)
      .on("mouseenter", showTooltip)
      .on("mouseleave", hideTooltip);

};
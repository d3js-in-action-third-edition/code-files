const drawScatterplot = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`)
      .attr("role", "img")
      .attr("aria-labelledby", "scatterplotTitle scatterplotDescription");

  // Append title and description
  svg
    .append("title")
      .attr("id", "scatterplotTitle")
      .text("Visualization of a collection of cetacean species");

  const generateDescription = () => {
    const desc = [];
    desc.push("This scatterplot provides information about 39 cetacean species. The biggest cetacean is the blue whale, with a length of 33 meters and a weight of 173 tons. The Pantropical Spotted dolphin has the largest population, with 3 million individuals. The Baiji dolphin, the North Atlantic Right whale and the Atlantic Humpback dolphin are in danger of extinction.");
    desc.push("Cetacean species:");
    data.forEach(d => {
      const cetacean = `
        ${d.common_name},
        population estimate: ${d3.format(".2s")(d.global_population_estimate)},
        maximum size: ${d.max_size_m} meter,
        maximum weight: ${d.max_weight_t} ton,
        conservation status: ${conservationStatuses.find(status => status.id === d.status).label}
      `;
      desc.push(cetacean);
    });
    return desc;
  };

  svg
    .append("desc")
      .attr("id", "scatterplotDescription")
      .text(generateDescription());

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
      .attr("x", margin.left + innerWidth + 20);
  svg
    .append("text")
      .attr("class", "axis-label axis-label-left")
      .text("Max size (m)");


  /******************************/
  /*     Append the circles     */
  /******************************/
  innerChart
    .selectAll(".cetacean")
    .data(data)
    .join("circle")
      .attr("class", d => `cetacean cetacean-${d.status}`)
      .attr("cx", d => xScale(d.global_population_estimate))
      .attr("cy", d => yScale(d.max_size_m))
      .attr("r", d => rScale(d.max_weight_t))
      // .attr("fill", d => colorScale(d.status))
      .attr('fill-opacity', 0.6)
      .attr("stroke", d => colorScale(d.status))
      .attr("stroke-width", 2)
      .on("mouseenter", showTooltip)
      .on("mouseleave", hideTooltip);


  /************************/
  /*     Add patterns     */
  /************************/
  // Declare patterns
  const defs = d3.select("#scatterplot svg")
    .append("defs");

  // Horizontal lines pattern
  const horizontalLinesPattern = defs
    .append("pattern")
      .attr("id", "pattern-horizontal-lines")
      .attr("width", 4)
      .attr("height", 4)
      .attr("patternUnits", "userSpaceOnUse");
  horizontalLinesPattern
    .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#fff");
  horizontalLinesPattern
    .append("line")
      .attr("x1", 0)
      .attr("y1", 2)
      .attr("x2", 4)
      .attr("y2", 2)
      .attr("stroke", colorScale("NT"));

  // Vertical lines pattern
  const verticalLinesPattern = defs
    .append("pattern")
      .attr("id", "pattern-vertical-lines")
      .attr("width", 4)
      .attr("height", 4)
      .attr("patternUnits", "userSpaceOnUse");
  verticalLinesPattern
    .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#fff");
  verticalLinesPattern
    .append("line")
      .attr("x1", 3)
      .attr("y1", 0)
      .attr("x2", 3)
      .attr("y2", 4)
      .attr("stroke", colorScale("VU"));

  // Cross pattern
  const crossPattern = defs
    .append("pattern")
      .attr("id", "pattern-cross")
      .attr("width", 12)
      .attr("height", 12)
      .attr("patternUnits", "userSpaceOnUse");
  crossPattern
    .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", colorScale("CR"));
  crossPattern
    .append("line")
      .attr("x1", 2)
      .attr("y1", 6)
      .attr("x2", 10)
      .attr("y2", 6)
      .attr("stroke", "#fff");
  crossPattern
    .append("line")
      .attr("x1", 6)
      .attr("y1", 2)
      .attr("x2", 6)
      .attr("y2", 10)
      .attr("stroke", "#fff");

  // Circles pattern
  const circlesPattern = defs
    .append("pattern")
      .attr("id", "pattern-circles")
      .attr("width", 5)
      .attr("height", 5)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", "translate(2) rotate(45)");
  circlesPattern
    .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", colorScale("LC"));
  circlesPattern
    .append("circle")
      .attr("cx", 2)
      .attr("cy", 2)
      .attr("r", 1.5)
      .attr("fill", "#fff");

  // Star pattern
  const starPattern = defs
    .append("pattern")
      .attr("id", "pattern-stars")
      .attr("width", 10)
      .attr("height", 10)
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", "translate(2) rotate(45)");
  starPattern
    .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#fff");
  starPattern
    .append("polygon")
      .attr("points", "0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2")
      .attr("fill", colorScale("EN"));

  d3.selectAll(".cetacean")
    .attr("fill", d => getPattern(d.status))


  // Make adjustments based on screen width
  resizeChart();

};

const getPattern = (status) => {
  switch(status) {
    case "LC":
      return "url(#pattern-circles)";
    case "NT":
      return "url(#pattern-horizontal-lines)";
    case "VU":
      return "url(#pattern-vertical-lines)";
    case "EN":
      return "url(#pattern-stars)";
    case "CR":
      return "url(#pattern-cross)";
  };
};
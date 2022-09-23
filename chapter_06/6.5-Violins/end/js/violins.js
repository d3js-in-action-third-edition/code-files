const drawViolinCharts = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 20, bottom: 55, left: 60};
  const width = 1000;
  const height = 400;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#violin")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner charts
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


  /*********************************/
  /*    Calculate the quartiles    */
  /*********************************/
  const roles = [
    {id: "Designer" },
    {id: "Scientist" },
    {id: "Developer" },
    {id: "Analyst" },
    {id: "Leadership" },
  ];

  roles.forEach(role => {

    role["salaries"] = data
      .filter(d => d.role === role.id)
      .map(d => d.salary);
    role["mean"] = d3.mean(role.salaries);
    role["bins"] = d3.bin()(role.salaries);

    const quartilesScale = d3.scaleQuantile()
      .domain(role.salaries)
      .range([0, 1, 2, 3]);
    role["quartiles"] = quartilesScale.quantiles();

  });

  roles.sort((a, b) => a.mean - b.mean);

  console.log("roles", roles);


  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const xScale = d3.scalePoint()
    .domain(roles.map(d => d.id))
    .range([0, innerWidth])
    .padding(0.7);

  // Y scale
  const maxSalary = d3.max(data, d => d.salary);
  const yScale = d3.scaleLinear()
    .domain([0, maxSalary])
    .range([innerHeight, 0])
    .nice();

  // Violins scale
  let maxBinLength = 0;
  roles.forEach(role => {
    const max = d3.max(role.bins, d => d.length);
    if (max > maxBinLength) {
      maxBinLength = max;
    }
  });
  const violinsScale = d3.scaleLinear()
    .domain([0, maxBinLength])
    .range([0, xScale.step()/2]);


  /****************************/
  /*    Append the violins    */
  /****************************/
  roles.forEach(role => {
    const roleContainer = innerChart
      .append("g");

    // Append histogram rectangles
    // roleContainer
    //   .selectAll(`.bar-${role.id}`)
    //   .data(role.bins)
    //   .join("rect")
    //     .attr("class", `bar-${role.id}`)
    //     .attr("x", xScale(role.id))
    //     .attr("y", d => yScale(d.x1))
    //     .attr("width", d => violinsScale(d.length))
    //     .attr("height", d => yScale(d.x0) - yScale(d.x1))
    //     .attr("fill", slateGray)
    //     .attr("fill-opacity", 0.4)
    //     .attr("stroke", white)
    //     .attr("stroke-width", 2);

    // Append area
    const areaGenerator = d3.area()
      .x0(d => xScale(role.id) - violinsScale(d.length))
      .x1(d => xScale(role.id) + violinsScale(d.length))
      .y(d => yScale(d.x1) + ((yScale(d.x0) - yScale(d.x1))/2))
      .curve(d3.curveCatmullRom);

    roleContainer
      .append("path")
        .attr("d", areaGenerator(role.bins))
        .attr("fill", slateGray)
        .attr("fill-opacity", 0.3);

    // Append interquartile range
    const width = 8;
    roleContainer
      .append("rect")
        .attr("x", xScale(role.id) - width/2)
        .attr("y", yScale(role.quartiles[2]))
        .attr("width", width)
        .attr("height", yScale(role.quartiles[0]) - yScale(role.quartiles[2]))
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", gray);

    // Append mean
    roleContainer
      .append("circle")
        .attr("cx", d => xScale(role.id))
        .attr("cy", d => yScale(role.mean))
        .attr("r", 3)
        .attr("fill", white);

  });

  
  /**************************/
  /*      Add the axes      */
  /**************************/
  const bottomAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .call(leftAxis);
  svg
    .append("text")
      .text("Yearly salary (USD)")
      .attr("x", 0)
      .attr("y", 20);

};
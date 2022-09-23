const drawPyramid = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 40, left: 60};
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#pyramid")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  /***************************/
  /*    Generate the bins    */
  /***************************/
  const dataWomen = data.filter(d => d.gender === "Female");
  const binsWomen = d3.bin()
    .value(d => d.salary)(dataWomen);

  const dataMen = data.filter(d => d.gender === "Male");
  const binsMen = d3.bin()
    .value(d => d.salary)(dataMen);

  console.log("binsWomen", binsWomen);
  console.log("binsMen", binsMen);

  
  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const xScaleWomen = d3.scaleLinear()
    .domain([15, 0])
    .range([0, innerWidth/2]);
  const xScaleMen = d3.scaleLinear()
    .domain([0, 15])
    .range([innerWidth/2, innerWidth]);


  const minSalary = binsWomen[0].x0;
  const maxSalary = binsWomen[binsWomen.length - 1].x1;
  const yScale = d3.scaleLinear()
    .domain([minSalary, maxSalary])
    .range([innerHeight, 0]);
  

  /****************************/
  /*      Append the bars     */
  /****************************/
  const pyramidContainer = innerChart
    .append("g")
      .attr("stroke", white)
      .attr("stroke-width", 2);

  pyramidContainer
    .selectAll(".bar-women")
    .data(binsWomen)
    .join("rect")
      .attr("class", "bar-women")
      .attr("x", d => xScaleWomen(d.length / data.length * 100))
      .attr("y", d => yScale(d.x1))
      .attr("width", d => innerWidth/2 - xScaleWomen(d.length / data.length * 100))
      .attr("height", d => yScale(d.x0) - yScale(d.x1))
      .attr("fill", womenColor);

  pyramidContainer
    .selectAll("bar-men")
    .data(binsMen)
    .join("rect")
      .attr("class", "bar-men")
      .attr("x", innerWidth/2)
      .attr("y", d => yScale(d.x1))
      .attr("width", d => xScaleMen(d.length / data.length * 100) - innerWidth/2)
      .attr("height", d => yScale(d.x0) - yScale(d.x1))
      .attr("fill", menColor);
  

  /**************************/
  /*      Add the axes      */
  /**************************/
  const bottomAxisFemales = d3.axisBottom(xScaleWomen)
    .tickValues([15, 10, 5, 0])
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxisFemales);

  const bottomAxisMales = d3.axisBottom(xScaleMen)
    .tickValues([5, 10, 15])
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxisMales);
  svg
    .append("text")
      .text("Percent")
      .attr("text-anchor", "middle")
      .attr("x", margin.left + innerWidth/2)
      .attr("y", height - 3);

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
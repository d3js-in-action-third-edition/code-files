const drawBoxplot = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 25, left: 60};
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#boxplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  /*********************************/
  /*    Calculate the quartiles    */
  /*********************************/
  
  // Female quartiles
  const femalesSalaries = data.filter(d => d.gender === "Female").map(d => d.salary);
  const femalesQuartilesScale = d3.scaleQuantile()
    .domain(femalesSalaries)
    .range([0, 1, 2, 3]);

  const femalesQuartiles = femalesQuartilesScale.quantiles();
  const femalesExtent = d3.extent(femalesSalaries);
  console.log("Women's boxplot boundaries:", femalesExtent, "quartiles:", femalesQuartiles);

  // Male quartiles
  const malesSalaries = data.filter(d => d.gender === "Male").map(d => d.salary);
  const malesQuartilesScale = d3.scaleQuantile()
    .domain(malesSalaries)
    .range([0, 1, 2, 3]);

  const malesQuartiles = malesQuartilesScale.quantiles();
  const malesExtent = d3.extent(malesSalaries);
  console.log("Men's boxplot boundaries:", malesExtent, "quartiles:", malesQuartiles);

  
};
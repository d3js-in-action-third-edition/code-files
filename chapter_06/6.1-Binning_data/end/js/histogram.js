const drawHistogram = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 50, left: 40};
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#histogram")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

  /***************************/
  /*    Generate the bins    */
  /***************************/
  const binGenerator = d3.bin()
    .value(d => d.salary);
  const bins = binGenerator(data);
  console.log("bins", bins);
  

};
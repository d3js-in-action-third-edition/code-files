const drawStreamGraph = (data) => {
  // Generate the streamgraph here
  

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#streamgraph")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

};
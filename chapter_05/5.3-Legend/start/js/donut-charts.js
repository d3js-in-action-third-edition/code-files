const drawDonutCharts = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#donut")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  // Append the group that will contain the inner chart
  const donutContainers = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  /**********************************/
  /*    Create a donut chart for    */
  /*    each year of interest       */
  /**********************************/
  const years = [1975, 1995, 2013];
  const formats = data.columns.filter(format => format !== "year");
  years.forEach(year => {

    // Append a group for each year
    // and translate it to the proper position
    const donutContainer = donutContainers
      .append("g")
        .attr("transform", `translate(${xScale(year)}, ${innerHeight/2})`);

    // Prepare the data for the pie generator
    const yearData = data.find(d => d.year === year);
    const formattedData = [];
    formats.forEach(format => {
      formattedData.push({ format: format, sales: yearData[format] });
    });
    console.log("formattedData", formattedData);

    // Initialize the pie layout generator
    const pieGenerator = d3.pie()
      .value(d => d.sales);

    // Call the pie generator to obtain the annotated data
    const annotatedData = pieGenerator(formattedData);
    console.log("annotatedData", annotatedData)

    // Initialize the arc generator
    const arcGenerator = d3.arc()
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle)
      .innerRadius(60)
      .outerRadius(100)
      .padAngle(0.02)
      .cornerRadius(3);

    // Append the arcs
    const arcs = donutContainer
      .selectAll(`path.arc-${year}`)
      .data(annotatedData)
      // .join("path")
      //   .attr("class", `arc-${year}`)
      //   .attr("d", arcGenerator)
      //   .attr("fill", d => colorScale(d.data.format));
        .join("g")
        .attr("class", `arc-${year}`);
    arcs
      .append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.format));
    arcs
      .append("text")
        .text(d => {
          d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);
          return d3.format(".0%")(d.percentage);
        })
        .attr("x", d => {
          d["centroid"] = arcGenerator
            .startAngle(d.startAngle)
            .endAngle(d.endAngle)
            .centroid();
          return d.centroid[0];
        })
        .attr("y", d => d.centroid[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#f6fafc")
        .attr("fill-opacity", d => d.percentage < 0.05 ? 0 : 1)
        .style("font-size", "16px")
        .style("font-weight", 500);


    // Append year labels
    donutContainer
      .append("text")
        .text(year)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "24px")
        .style("font-weight", 500);

  });


};
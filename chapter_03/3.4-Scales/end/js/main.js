// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")
  .style("border", "1px solid black");

// Load, format and measure the dataset
d3.csv("../data/data.csv", d => {
  // Format the dataset
  return {
    technology: d.technology,
    count: +d.count
  };
}).then(data => {
  // Log the full dataset
  console.log(data);

  // How many rows the dataset contains
  console.log(data.length);   // => 33

  // Get the max and min values
  console.log(d3.max(data, d => d.count));      // => 1078
  console.log(d3.min(data, d => d.count));      // => 20
  console.log(d3.extent(data, d => d.count));   // => [20, 1078]

  // Sort the data in descending order
  data.sort((a, b) => b.count - a.count);

  // Pass the data to another function
  createViz(data);
});

// Create the bar graph
const createViz = (data) => {

  // Declare scales
  const xScale = d3.scaleLinear()
    .domain([0, 1078])
    .range([0, 600]);
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.technology))
    .range([0, 1000])
    .paddingInner(0.2);

  // Use data-binding to append rectangles
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => {
        // console.log(d);
        return "bar";
      })
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("x", 0)
      .attr("y", d => yScale(d.technology))
      .attr("fill", d => d.technology === "D3.js" ? "yellowgreen" : "skyblue");

};

// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
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

  // Use data-binding to append rectangles
  const barHeight = 20;
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => {
        console.log(d);
        return `bar bar-${d.technology}`;
      })
      .attr("width", d => d.count)
      .attr("height", barHeight)
      .attr("x", 0)
      .attr("y", (d, i) => (barHeight + 5) * i)
      .attr("fill", d => d.technology === "D3.js" ? "yellowgreen" : "skyblue");

};

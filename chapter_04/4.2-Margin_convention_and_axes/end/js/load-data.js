// Load data here
d3.tsv("../data/data.tsv", d3.autoType).then(data => {
  console.log("data", data);
  
  drawLineChart(data.slice(-21));
});
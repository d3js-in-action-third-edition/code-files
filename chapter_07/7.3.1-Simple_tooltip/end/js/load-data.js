d3.csv("../data/weekly_temperature.csv", d3.autoType).then(data => {
  console.log("temperature data", data);
  
  drawLineChart(data);
  createTooltip();
  handleMouseEvents();
});
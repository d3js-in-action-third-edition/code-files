d3.csv("../data/weekly_temperature.csv", d3.autoType).then(d => {
  console.log("temperature data", d);

  data = d;
  
  drawLineChart(data);
  createTooltip();
  handleMouseEvents();
});
// Load data
d3.csv("../data/data.csv", d3.autoType).then(data => {
  defineScales(data);
  drawStreamGraph(data);
  createTooltip(data);
  handleMouseEvents(data);
});
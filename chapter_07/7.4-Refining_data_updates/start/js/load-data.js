d3.csv("./data/data.csv", d3.autoType).then(data => {
  data.sort((a, b) => b.max_size_m - a.max_size_m);
  console.log("data", data);

  drawScatterplot(data);
  populateFilters();
  // populateLegend(data);
  handleClickOnFilter(data);
});
const populateFilters = () => {

  const filters = d3.select("#filters")
    .selectAll(".filter")
    .data(cetaceanFilters)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`);

  filters
    .append("span")
      .attr("class", "filter-icon")
      .style("background-image", d => `url(./assets/icon-${d.id}.svg)`);

  filters
    .append("span")
      .attr("class", "filter-text")
      .text(d => d.label);

};

const handleClickOnFilter = (data) => {

  // Handle clicks on filters here

};
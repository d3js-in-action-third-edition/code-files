const createDataTable = (data) => {

  const table = d3.select(".data-table-container")
    .append("table");

  table
    .append("caption")
      .text("Cetacean species data")
    .append("a")
      .attr("href", "./data/data.csv")
      .attr("download", "cetaceans_data")
      .text("Download the data in CSV format");

  // Table header
  const tableHeader = table 
    .append("tr");
  tableHeader
    .append("th")
      .attr("scope", "col")
      .text("Common name");
  tableHeader
    .append("th")
      .attr("scope", "col")
      .text("Population estimate");
  tableHeader
    .append("th")
      .attr("scope", "col")
      .text("Maximum size (meter)");
  tableHeader
    .append("th")
      .attr("scope", "col")
      .text("Maximum weight (ton)");
  tableHeader
    .append("th")
      .attr("scope", "col")
      .text("Conservation status");

  // Table content
  data.forEach(d => {
    const tableRow = table  
      .append("tr");
    tableRow
      .append("td")
        .text(d.common_name);
    tableRow
      .append("td")
        .text(d3.format(".2s")(d.global_population_estimate));
    tableRow
      .append("td")
        .text(d.max_size_m);
    tableRow
      .append("td")
        .text(d.max_weight_t);
    tableRow
      .append("td")
        .text(conservationStatuses.find(status => status.id === d.status).label);
  });

  // Handle mode selection
  d3.select(".data-table-container")
    .style("display", "none");

  d3.select(".toggle-table")
    .on("click", () => {
      d3.select(".toggle-table")
        .attr("aria-pressed", true)
        .classed("active", true);
      d3.select(".toggle-chart")
        .attr("aria-pressed", false)
        .classed("active", false);
      d3.select(".data-table-container")
        .style("display", "block");
      d3.select(".chart-container")
        .style("display", "none");
    });

  d3.select(".toggle-chart")
    .on("click", () => {
      d3.select(".toggle-table")
        .attr("aria-pressed", false)
        .classed("active", false);
      d3.select(".toggle-chart")
        .attr("aria-pressed", true)
        .classed("active", true);
      d3.select(".data-table-container")
        .style("display", "none");
      d3.select(".chart-container")
        .style("display", "block");
    });

};
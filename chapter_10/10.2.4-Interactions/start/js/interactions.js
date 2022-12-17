const populateFilters = () => {

  const filters = d3.select("#filters")
    .append("ul")
    .selectAll(".filter")
    .data(cetaceanFilters)
    .join("li")
    .append("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`)
      .attr("type", "button")
      .attr("aria-pressed", d => d.isActive ? true : false);

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

  d3.selectAll(".filter")
    .on("click", (e, datum) => {
      
      if (!datum.isActive) {

        // Update filters
        cetaceanFilters.forEach(h => {
          h.isActive = h.id === datum.id ? true : false;
        });
        d3.selectAll(".filter")
          .classed("active", d => d.id === datum.id ? true : false)
          .attr("aria-pressed", d => d.isActive ? true : false);

        // Update scatterplot
        const updatedData = datum.id === "all"
          ? data
          : data.filter(d => d.hemisphere === datum.id);

        // Reusable transition
        const t = d3.transition()
          .duration(800)
          .ease(d3.easeExpOut);

          innerChart
          .selectAll("circle")
          .data(updatedData, d => d.uid)
          .join(
            enter => enter
              .append("circle")
                .attr("class", d => `cetacean cetacean-${d.status}`)
                .attr("cx", d => xScale(d.global_population_estimate))
                .attr("cy", d => -50)
                .attr("r", 0)
                .attr("fill", d => getPattern(d.status))
                .attr('fill-opacity', 0.6)
                .attr("stroke", d => colorScale(d.status))
                .attr("stroke-width", 2)
                .style('opacity', 0)
                .on("mouseenter", showTooltip)
                .on("mouseleave", hideTooltip)
              .call(enter => enter.transition(t)
                .attr("cy", d => yScale(d.max_size_m))
                .attr("r", d => rScale(d.max_weight_t))
                .style('opacity', 1)),
            update => update,
            exit => exit
              .call(exit => exit.transition(t)
                .attr("cy", d => innerHeight)
                .attr("r", 0)
                .style('opacity', 0)
                .remove())
          )

      }
    });

};

const appendTooltip = () => {
  const tooltip = innerChart
    .append("text")
      .attr("class", "tooltip")
      .attr("text-anchor", "middle")
      .attr("fill", "#192e4d")
      .style("opacity", 0);
};

const showTooltip = (e, d) => {
  const cx = e.target.getAttribute("cx");
  const cy = e.target.getAttribute("cy");
  const r = e.target.getAttribute("r");
  
  d3.select(".tooltip")
    .attr("x", cx)
    .attr("y", cy - r - 10)
    .text(d.common_name)
    .transition()
    .style("opacity", 1);
};

const hideTooltip = (e, d) => {
  d3.select(".tooltip")
    .attr("y", -500)
    .style("opacity", 0);
};
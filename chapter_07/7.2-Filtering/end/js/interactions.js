/*************************************/
/*  Create and populate the filters  */
/*************************************/
const populateFilters = (data) => {

  d3.select("#filters")
    .selectAll(".filter")
    .data(filters)
    .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        console.log("DOM event", e);
        console.log("Attached datum", d);

        // If the user clicked on a button that is not yet active
        if (!d.isActive) {

          // Update isActive states in the filters array
          filters.forEach(filter => {
            filter.isActive = d.id === filter.id ? true : false;
          });

          // Handle the buttons active class name
          d3.selectAll(".filter")
          .classed("active", filter => filter.id === d.id ? true : false);

          // Call the function to filter the histogram
          updateHistogram(d.id, data);

        }

      });

};


/****************************/
/*   Update the histogram   */
/****************************/
const updateHistogram = (filterId, data) => {
  
  // Filter the original data based on the selected option
  let updatedData = filterId === "all"
    ? data
    : data.filter(respondent => respondent.gender === filterId);

  // Update the bins
  const updatedBins = binGenerator(updatedData);

  // Update the histogram
  d3.selectAll("#histogram rect")
    .data(updatedBins)
    .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));

};
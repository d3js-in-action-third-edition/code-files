/*************************************/
/*  Create and populate the filters  */
/*************************************/
const populateFilters = (data) => {

  d3.select("#filters")
    .selectAll(".filter")
    .data(filters)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {

        // Handle buttons active state
        d3.selectAll(".filter")
          .classed("active", option => option.id === d.id ? true : false);

        // If user clicked on a button that is not yet active
        if (!d.isActive) {

          // Call the function to filter the histogram
          filterHistogram(d.id, data);

          // Update isActive states in the filters array
          filters.forEach(filter => {
            filter.isActive = d.id === filter.id ? true : false;

          });
        }

      });

};


/********************************/
/*   Handle clicks on filters   */
/********************************/
const filterHistogram = (selectedOption, data) => {
  
  // Filter the original data based on the selected option
  let updatedData = selectedOption === "all"
    ? data
    : data.filter(item => item.gender === selectedOption);

  // Update the bins
  const binGenerator = d3.bin()
    .value(d => d.salary);
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
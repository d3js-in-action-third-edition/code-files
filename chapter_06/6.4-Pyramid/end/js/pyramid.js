const drawPyramid = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = {top: 40, right: 30, bottom: 40, left: 60};
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#pyramid")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  /***************************/
  /*    Generate the bins    */
  /***************************/
  const bins = d3.bin()
    .value(d => d.salary)(data);

  const femalesData = data.filter(d => d.gender === "Female");
  const femalesTotal = femalesData.length;

  const malesData = data.filter(d => d.gender === "Male");
  const malesTotal = malesData.length;

  // Add females and males data points directly inside the original bins
  // This will make drawing the dumbell plot easier
  bins.forEach(bin => {
    const femaleBins = [];
    const maleBins = [];
    bin.forEach(respondent => {
      if (respondent.gender === "Female") {
        femaleBins.push(respondent);
      } else {
        maleBins.push(respondent);
      }
    });

    bin["females"] = femaleBins;
    bin["males"] = maleBins;
  });
  console.log("bins per gender", bins);

  
  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const xScaleFemales = d3.scaleLinear()
    .domain([30, 0])
    .range([0, innerWidth/2]);
  const xScaleMales = d3.scaleLinear()
    .domain([0, 30])
    .range([innerWidth/2, innerWidth]);


  const minSalary = bins[0].x0;
  const maxSalary = bins[bins.length - 1].x1;
  const yScale = d3.scaleLinear()  // We could also use a band scale
    .domain([minSalary, maxSalary])
    .range([innerHeight, 0]);
  

  /**************************/
  /*      Add the axes      */
  /**************************/
  const bottomAxisFemales = d3.axisBottom(xScaleFemales)
    .tickValues([30, 20, 10, 0])
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxisFemales);
      
  const bottomAxisMales = d3.axisBottom(xScaleMales)
    .tickValues([10, 20, 30])
    .tickSizeOuter(0);
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxisMales);
  svg
    .append("text")
      .text("Percent")
      .attr("text-anchor", "middle")
      .attr("x", margin.left + innerWidth/2)
      .attr("y", height - 3);

  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .call(leftAxis);
  svg
    .append("text")
      .text("Yearly salary (USD)")
      .attr("x", 0)
      .attr("y", 20);
  

  /******************************/
  /*      Add the dumbbells      */
  /******************************/
  const dumbbellContainers = innerChart
    .selectAll(".dumbbell-container")
    .data(bins)
    .join("g")
      .attr("class", "dumbbell-container")
      .attr("stroke", slateGray)
      .attr("stroke-width", 2);

  dumbbellContainers
    .append("line")
      .attr("x1", d => xScaleFemales(d.females.length / femalesTotal * 100))
      .attr("x2", d => xScaleMales(d.males.length / malesTotal * 100))
      .attr("y1", d => yScale(d.x0 + (d.x1-d.x0)/2))
      .attr("y2", d => yScale(d.x0 + (d.x1-d.x0)/2));

  const circlesRadius = 5;
  dumbbellContainers
    .append("circle")
      .attr("class", "circle-female")
      .attr("cx", d => xScaleFemales(d.females.length / femalesTotal * 100))
      .attr("cy", d => yScale(d.x0 + (d.x1-d.x0)/2))
      .attr("r", circlesRadius)
      .attr("fill", womenColor);
  dumbbellContainers
    .append("circle")
      .attr("class", "circle-male")
      .attr("cx", d => xScaleMales(d.males.length / malesTotal * 100))
      .attr("cy", d => yScale(d.x0 + (d.x1-d.x0)/2))
      .attr("r", circlesRadius)
      .attr("fill", menColor);

  
};
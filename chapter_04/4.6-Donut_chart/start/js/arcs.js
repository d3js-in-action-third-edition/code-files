// Create the donut chart here
const drawArcs = (data2020) => {
  console.log("data2020", data2020);

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const pieChartWidth = 300;
  const pieChartHeight = 300;
  const svg = d3.select("#pie-chart")
    .append("svg")
      .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  // Append the group that will contain the chart
  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${pieChartWidth/2}, ${pieChartHeight/2})`);


  /********************************/
  /*   Format the data for        */
  /*   the pie layout generator   */
  /********************************/
  const dataPie = [];
  let totalPeople = 0;
  regimesInfo.forEach(regime => {
    if (regime.id !== "no_regime_data") {
      const slice = { regime: regime.id, numPeople: data2020[regime.id] };
      dataPie.push(slice);
      totalPeople += data2020[regime.id];
    }
  });
  console.log("dataPie", dataPie);

};
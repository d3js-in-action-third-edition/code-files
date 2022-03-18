const regimesInfo = [
  {id: "liberal_democracies", label: "Liberal democracies"},
  {id: "electoral_democracies", label: "Electoral democracies"},
  {id: "electoral_autocracies", label: "Electoral autocracies"},
  {id: "closed_autocracies", label: "Closed autocracies"},
  {id: "no_regime_data", label: "No regime data"},
];
const colors = ["#26456e", "#5aa5cd", "#f98c40", "#d04a06", "#555555"];

// Add other shared contants here
const margin = {top: 25, right: 150, bottom: 25, left: 40};
const width = 800;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Color scale
const colorScale = d3.scaleOrdinal()
  .domain(regimesInfo.map(regime => regime.id))
  .range(colors);
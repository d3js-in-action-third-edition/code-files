const regimesInfo = [
  {id: "liberal_democracies", label: "Liberal democracies", color: "#26456e"},
  {id: "electoral_democracies", label: "Electoral democracies", color: "#5aa5cd"},
  {id: "electoral_autocracies", label: "Electoral autocracies", color: "#f98c40"},
  {id: "closed_autocracies", label: "Closed autocracies", color: "#d04a06"},
  {id: "no_regime_data", label: "No regime data", color: "#555555"},
];

// Add other shared contants here
const margin = {top: 15, right: 150, bottom: 25, left: 40};
const width = 800;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
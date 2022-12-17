// Chart
const margin = {top: 110, right: 55, bottom: 130, left: 70};
const width = 1200;
const height = 800;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let innerChart;

// Selectors
const cetaceanFilters = [
  { id: "all", label: "All cetaceans", isActive: true },
  { id: "north", label: "Living in the northern hemisphere", isActive: false },
  { id: "south", label: "Living in the southern hemisphere", isActive: false },
  { id: "both", label: "Traveling through both hemispheres", isActive: false },
];

// Conservation status
const conservationStatuses = [
  { id: "LC", label: "Least Concern", color: "#0095A8" },
  { id: "NT", label: "Near Threatened", color: "#012A36" },
  { id: "VU", label: "Vulnerable", color: "#78909C" },
  { id: "EN", label: "Endangered", color: "#FF5F2E" },
  { id: "CR", label: "Critically Endangered", color: "#A22C29" },
];

// Scales
let yScale;
let colorScale;
let xScale;
let rScale;
const fontSizeScale = d3.scaleLinear()
  .domain([315, 1200])
  .range([57, 15])
  .clamp(true);
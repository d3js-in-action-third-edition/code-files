const getWindowWidth = () => {
  return window.innerWidth;
};
let windowWidth = getWindowWidth();
let isDesktopLayout = windowWidth >= 700 ? true : false;

// Chart
const margin = {top: 35, right: isDesktopLayout ? 200 : 10, bottom: 35, left: 45};
const width = 1200;
const height = 500;
let innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const aubergine = "#75485E";
let innerChart;

// Tooltip
const tooltipWidth = 65;
const tooltipHeight = 32;

// Scales
const xScale = d3.scaleTime();
const yScale = d3.scaleLinear();
const fontSizeScale = d3.scaleLinear()
  .domain([600, 1000])
  .range([26, 16])
  .clamp(true);

// Generators
let bottomAxis;
let leftAxis;
const curveGenerator = d3.line();
const areaGenerator = d3.area();

// Data
let data;

// Position x-axis labels
const positionXaxisLabels = () => {
  d3.selectAll(".axis-x text")
    .attr("x", d => {
      const currentMonth = d;
      const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
      return (xScale(nextMonth) - xScale(currentMonth)) / 2;
    })
    .attr("y", 10);
};
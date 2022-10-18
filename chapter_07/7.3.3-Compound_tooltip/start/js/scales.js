// Initialize the scales here
const xScale = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();
 
const defineScales = (data) => {
  
  // Scale for the horizontal axis
  xScale
    .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
    .range([0, innerWidth]);
  
  // Color scale
  colorScale
    .domain(formatsInfo.map(f => f.id))
    .range(formatsInfo.map(f => f.color));
  
};
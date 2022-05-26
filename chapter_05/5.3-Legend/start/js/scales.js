// Initialize the scales here
const xScale = d3.scaleBand();
const colorScale = d3.scaleOrdinal();
 
const defineScales = (data) => {
  
  // Scale for the horizontal axis
  xScale
    .domain(data.map(d => d.year))
    .range([0, innerWidth])
    .paddingInner(0.2);
  
  // Color scale
  colorScale
    .domain(formatsInfo.map(f => f.id))
    .range(formatsInfo.map(f => f.color));
  
};
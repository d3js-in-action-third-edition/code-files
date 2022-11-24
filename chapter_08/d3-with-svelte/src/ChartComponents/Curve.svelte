<script>
  import * as d3 from "d3";

  export let data;
  export let xScale;
  export let yScale;
  export let xAccessor;
  export let yAccessor;
  export let stroke;
  export let strokeWidth;

  const lineGenerator = d3.line()
    .x(d => xScale(d[xAccessor]))
    .y(d => yScale(d[yAccessor]))
    .defined(d => d[yAccessor] !== null)
    .curve(d3.curveMonotoneX);
</script>

<path
  d={lineGenerator(data)}
  fill="none" 
  stroke={stroke} 
  stroke-width={strokeWidth}
/>
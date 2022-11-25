<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let data;
  export let xScale;
  export let yScale;
  export let xAccessor;
  export let yAccessor;
  export let stroke;
  export let strokeWidth;

  let pathRef;

  const lineGenerator = d3.line()
    .x(d => xScale(d[xAccessor]))
    .y(d => yScale(d[yAccessor]))
    .defined(d => d[yAccessor] !== null)
    .curve(d3.curveMonotoneX);

  onMount(() => {
    updatePath(data);
  })

  $: updatePath(data);

  const updatePath = (d) => {
    console.log("update", d)
    d3.select(pathRef)
      .transition()
      .duration(400)
      .ease(d3.easeCubicOut)
        .attr("d", lineGenerator(d));
  }
</script>

<path
bind:this={pathRef}
  fill="none" 
  stroke={stroke} 
  stroke-width={strokeWidth}
/>
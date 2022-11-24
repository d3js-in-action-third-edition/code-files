<script>
  import * as d3 from "d3";

  export let type;
  export let scale;
  export let innerWidth;
  export let innerHeight;
  export let label = "";
  export let ticksArray = [];

  let divider;

  if (type === "bottom") {
    divider = 100;
  } else if (type === "left") {
    divider = 50;
  }
  const numberOfTicks = innerWidth / divider;
  let ticks;
  if (type !== "band") {
    ticks = scale.ticks(numberOfTicks);
  }
</script>

{#if type === "bottom"}
  <g class="axis" transform={`translate(0, ${innerHeight})`} > 
    <line x1={0} y1={0} x2={innerWidth} y2={0} />
    {#each ticks as tick, i (`tick-bottom-${tick}`)}
      <g transform={`translate(${scale(tick)}, 0)`}>
        <line x1={0} y1={0} x2={0} y2={5} />
        <text x={0} y={20} text-anchor="middle">
          {tick}
        </text>
      </g>
    {/each}
    {#if label !== ""}
      <text
        text-anchor="middle"
        transform={`translate(${innerWidth / 2}, 45)`}
      >
        {label}
      </text>
    {/if}
  </g>
{:else if type === "left"}
  <g class="axis">
    <line x1={0} y1={innerHeight} x2={0} y2={0} />
    {#each ticks as tick, i (`tick-left-${tick}`)}
      <g transform={`translate(0, ${scale(tick)})`}>
        <line x1={-5} y1={0} x2={0} y2={0} />
        <text x={-10} y={0} text-anchor="end" alignment-baseline="middle">
          {tick}
        </text>
      </g>
    {/each}
    {#if label !== ""}
      <text
        text-anchor="middle"
        transform={`translate(-42, ${innerHeight / 2}) rotate(-90)`}
      >
        {label}
      </text>
    {/if}
  </g>
{:else if type === "band"}
  <g class="axis" transform={`translate(0, ${innerHeight})`} >
    <line x1={0} y1={0} x2={innerWidth} y2={0} />
    {#each ticksArray as tick (`tick-band-${tick}`)}
      <text
        text-anchor="end"
        alignment-baseline="middle"
        transform={`translate(${scale(tick) + scale.bandwidth() / 2}, 8) rotate(-90)`}
      >
        {tick}
      </text>
    {/each}
  </g>
{/if}
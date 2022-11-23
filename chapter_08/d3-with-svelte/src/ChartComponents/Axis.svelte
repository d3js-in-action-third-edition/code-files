<script>
  import * as d3 from "d3";
    import { tick } from "svelte";

  export let type;
  export let scale;
  export let innerWidth;
  export let innerHeight;
  export let label = "";

  let divider;

  if (type === "bottom") {
    divider = 100;
  } else if (type === "left") {
    divider = 50;
  }
  const numberOfTicks = innerWidth / divider;
  const ticks = scale.ticks(numberOfTicks);
</script>

<style>
  .axis-line {
    stroke: #888b8d;
  }

  .axis-tick,
  .axis-label {
    font-size: 14px;
    fill: #374f5e;
  }
</style>

{#if type === "bottom"}
  <g transform={`translate(0, ${innerHeight})`} > 
    <line class="axis-line" x1={0} y1={0} x2={innerWidth} y2={0} />
    {#each ticks as tick, i (`tick-bottom-${i}`)}
      <text
        class="axis-tick"
        x={scale(tick)}
        y={20}
        text-anchor="middle"
      >
        {tick}
      </text>
    {/each}
    {#if label !== ""}
      <text
        class="axis-label"
        text-anchor="middle"
        transform={`translate(${innerWidth / 2}, 45)`}
      >
        {label}
      </text>
    {/if}
  </g>
{:else if type === "left"}
  <g>
    <line class="axis-line" x1={0} y1={innerHeight} x2={0} y2={0} />
    {#each ticks as tick, i (`tick-left-${i}`)}
      <text
        class="axis-tick"
        x={-10}
        y={scale(tick)}
        text-anchor="end"
        alignment-baseline="middle"
      >
        {tick}
      </text>
    {/each}
    {#if label !== ""}
      <text
        class="axis-label"
        text-anchor="middle"
        transform={`translate(-42, ${innerHeight / 2}) rotate(-90)`}
      >
        {label}
      </text>
    {/if}
  </g>
{/if}
<script>
  import { scalePoint, scaleLinear } from "d3-scale";
  import { months } from "../utils/months";
  import { radiansToDegrees } from "../utils/helpers";
  import Paintings from "../chart_components/Paintings.svelte";
  import Drawings from "../chart_components/Drawings.svelte";

  export let smWidth;
  export let smHeight;
  export let year;
  export let paintingAreaScale;
  export let paintingDefaultRadius;
  export let paintings;
  export let maxDrawings;
  export let drawings;

  const padding = 60;
  $: radius = (smWidth - 2 * padding) / 2;

  const monthScale = scalePoint()
    .domain(months)
    .range([0, 2 * Math.PI - (2 * Math.PI) / 12]);

  $: radialScale = scaleLinear()
    .domain([0, maxDrawings])
    .range([0, 2 * radius]);
</script>

<g transform="translate({smWidth / 2}, 0)">
  <g transform="translate(0, {padding + radius})">
    <circle cx={0} cy={0} r={radius} />
    {#each months as month}
      <line
        x1="0"
        y1="0"
        x2={radius * Math.sin(monthScale(month))}
        y2={-1 * radius * Math.cos(monthScale(month))}
        stroke-linecap="round"
      />
      <text
        class="month-label"
        transform="translate({(radius + 30) *
          Math.sin(monthScale(month))}, {-1 *
          (radius + 30) *
          Math.cos(monthScale(month))}) 
          rotate({monthScale(month) <= Math.PI / 2 ||
        monthScale(month) >= (3 * Math.PI) / 2
          ? radiansToDegrees(monthScale(month))
          : radiansToDegrees(monthScale(month)) - 180})"
        text-anchor="middle"
        dominant-baseline="middle">{month.slice(0, 3)}</text
      >
    {/each}
    <Paintings
      {paintingAreaScale}
      {paintingDefaultRadius}
      {paintings}
      {monthScale}
      {radius}
    />
    <Drawings {drawings} {monthScale} {radialScale} />
  </g>
  <text x={0} y={smHeight - 5} text-anchor="middle">{year}</text>
</g>

<style lang="scss">
  circle {
    fill: none;
    stroke: $text;
  }
  line {
    stroke: $text;
    stroke-opacity: 0.2;
  }
  .month-label {
    font-size: 1.4rem;
  }
</style>

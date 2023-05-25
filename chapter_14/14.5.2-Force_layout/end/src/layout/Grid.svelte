<script>
  import GridItem from "./GridItem.svelte";
  import { range, max } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import paintings from "../data/paintings.json";

  let windowWidth;
  const gridContainer = 1400;
  const padding = 30;
  let svgWidth;
  $: switch (true) {
    case windowWidth >= gridContainer:
      svgWidth = (10 / 12) * (gridContainer - 2 * padding);
      break;
    case windowWidth < gridContainer && windowWidth >= 768:
      svgWidth = (10 / 12) * (windowWidth - 2 * padding);
      break;
    default:
      svgWidth = windowWidth - 2 * padding;
  }

  const years = range(1881, 1891);
  let numColumns;
  $: switch (true) {
    case windowWidth > 900:
      numColumns = 3;
      break;
    case windowWidth <= 900 && windowWidth > 600:
      numColumns = 2;
      break;
    default:
      numColumns = 1;
  }
  $: numRows = Math.ceil(years.length / numColumns);
  $: smWidth = svgWidth / numColumns;
  $: smHeight = smWidth + 40;
  $: svgHeight = numRows * smHeight;

  // Extract the areas of the paintings and find the max area
  paintings.forEach((painting) => {
    if (painting.width_cm && painting.height_cm) {
      painting["area_cm2"] = painting.width_cm * painting.height_cm;
    }
  });
  const maxPaintingArea = max(paintings, (d) => d.area_cm2);

  // Set the scale for the area of the paintings
  const maxPaintingRadius = 10;
  const paintingDefaultRadius = 3; // For the paintings whose dimensions are unknown
  const paintingAreaScale = scaleLinear()
    .domain([0, maxPaintingArea])
    .range([0, Math.PI * Math.pow(maxPaintingRadius, 2)]);
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if svgWidth && svgHeight}
  <svg width={svgWidth} height={svgHeight}>
    {#each years as year, i}
      <g
        transform="translate(
          {(i % numColumns) * smWidth},
          {Math.floor(i / numColumns) * smHeight})"
      >
        <rect x={0} y={0} width={smWidth} height={smHeight} />
        <GridItem
          {smWidth}
          {smHeight}
          {year}
          {paintingAreaScale}
          {paintingDefaultRadius}
          paintings={paintings.filter((painting) => painting.year === year)}
        />
      </g>
    {/each}
  </svg>
{/if}

<style>
  svg {
    border: 1px solid magenta;
  }
  rect {
    fill: none;
    stroke: cyan;
  }
</style>

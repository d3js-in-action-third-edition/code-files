<script>
  import GridItem from "./GridItem.svelte";
  import { range, max } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import paintings from "../data/paintings.json";
  import drawings from "../data/drawings.json";
  import { months } from "../utils/months";
  import letters from "../data/letters.json";
  import Tooltip from "../UI/Tooltip.svelte";

  export let isPeriodSelected;
  export let selectedPeriod;
  export let radialScale;

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

  // Reorganize the drawings on a yearly basis
  const yearlyDrawings = [];
  years.forEach((year) => {
    const relatedDrawings = { year: year, months: [] };
    months.forEach((month) => {
      relatedDrawings.months.push({
        month: month,
        drawings: drawings.filter(
          (drawing) =>
            drawing.year === year.toString() && drawing.month === month
        ),
      });
    });
    yearlyDrawings.push(relatedDrawings);
  });

  // Calculate the maximum number of drawings for a month
  const maxDrawings = max(yearlyDrawings, (d) =>
    max(d.months, (i) => i.drawings.length)
  );

  let windowHeight;
  $: isTooltipVisible = false;
  $: tooltipMeta = {
    x: 0,
    y: 0,
    screenY: 0,
    url: "",
    title: "",
    createdIn: "",
    date: "",
    medium: "",
    currentLocation: "",
    width: 0,
    height: 0,
  };

  // Add timeline information to the paintings
  import timeline from "../data/timeline.json";
  timeline.forEach((t) => {
    t["startDate"] = new Date(t.start_year, t.start_month, 1);
    t["endDate"] = new Date(t.end_year, t.end_month, 0);
  });
  paintings.forEach((p) => {
    const date = new Date(p.year, p.monthIndex, 0);
    timeline.forEach((t) => {
      if (date >= t.startDate && date <= t.endDate) {
        p["period"] = t.id;
      }
    });
  });
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class="viz-container">
  {#if svgWidth && svgHeight}
    <svg width={svgWidth} height={svgHeight}>
      {#each years as year, i}
        <g
          transform="translate(
            {(i % numColumns) * smWidth},
            {Math.floor(i / numColumns) * smHeight})"
        >
          <!-- <rect x={0} y={0} width={smWidth} height={smHeight} /> -->
          <GridItem
            {smWidth}
            {smHeight}
            {year}
            {paintingAreaScale}
            {paintingDefaultRadius}
            paintings={paintings.filter((painting) => painting.year === year)}
            {maxDrawings}
            drawings={yearlyDrawings.find((d) => d.year === year).months}
            letters={letters.filter((letter) => letter.year === year)}
            bind:isTooltipVisible
            bind:tooltipMeta
            {isPeriodSelected}
            {selectedPeriod}
            bind:radialScale
          />
        </g>
      {/each}
    </svg>
  {/if}
  {#if isTooltipVisible}
    <!-- USE SPREAD INSTEAD https://svelte.dev/tutorial/spread-props -->
    <Tooltip {...tooltipMeta} {svgWidth} {windowHeight} />
  {/if}
</div>

<style>
  /* svg {
    border: 1px solid magenta;
  } */
  /* rect {
    fill: none;
    stroke: cyan;
  } */
</style>

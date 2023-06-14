<script>
  import { scaleLinear } from "d3-scale";
  import { months } from "../utils/months";
  import { radiansToDegrees } from "../utils/helpers";
  import Drawings from "../chart_components/Drawings.svelte";
  import Letters from "../chart_components/Letters.svelte";
  import { isMonthIncluded, isYearIncluded } from "../utils/helpers";

  export let smWidth;
  export let smHeight;
  export let year;
  // export let paintingAreaScale;
  // export let paintingDefaultRadius;
  export let paintings;
  export let maxDrawings;
  export let drawings;
  export let letters;
  // export let isTooltipVisible = false;
  // export let tooltipMeta = {};
  export let isPeriodSelected;
  export let selectedPeriod;
  export let radialScale;
  export let radius;
  export let monthScale;
  export let padding;

  $: radius = (smWidth - 2 * padding) / 2;

  monthScale.domain(months).range([0, 2 * Math.PI - (2 * Math.PI) / 12]);

  $: radialScale = scaleLinear()
    .domain([0, maxDrawings])
    .range([0, 2 * radius]);

  let isWorkTooltipVisible = false;
  const handleMouseEnter = () => {
    isWorkTooltipVisible = true;
  };
  const handleMouseLeave = () => {
    isWorkTooltipVisible = false;
  };
</script>

<g transform="translate({smWidth / 2}, 0)">
  <g transform="translate(0, {padding + radius})">
    <circle
      cx="0"
      cy="0"
      r={radius}
      fill="transparent"
      on:mouseenter={() => handleMouseEnter()}
      on:mouseleave={() => handleMouseLeave()}
    />
    {#each months as month}
      <line
        class:lessen={isPeriodSelected &&
          !isMonthIncluded(
            selectedPeriod,
            months.findIndex((m) => m === month),
            year
          )}
        x1="0"
        y1="0"
        x2={radius * Math.sin(monthScale(month))}
        y2={-1 * radius * Math.cos(monthScale(month))}
        stroke-linecap="round"
      />
      <text
        class="month-label"
        class:lessen={isPeriodSelected &&
          !isMonthIncluded(
            selectedPeriod,
            months.findIndex((m) => m === month),
            year
          )}
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
      <text
        class="work-tooltip"
        class:visible={isWorkTooltipVisible}
        transform="translate({(radius + 48) *
          Math.sin(monthScale(month))}, {-1 *
          (radius + 48) *
          Math.cos(monthScale(month))}) rotate({monthScale(month) <=
          Math.PI / 2 || monthScale(month) >= (3 * Math.PI) / 2
          ? radiansToDegrees(monthScale(month))
          : radiansToDegrees(monthScale(month)) - 180})"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {paintings.filter((p) => p.month === month && p.year === year).length}p,
        {drawings.find((d) => d.month === month).drawings.length}d,
        {letters.find((l) => l.month === month && l.year === year)
          .number_of_letters}l
      </text>
    {/each}
    <Drawings
      {drawings}
      {monthScale}
      {radialScale}
      {isPeriodSelected}
      {selectedPeriod}
      {year}
    />
    <Letters
      {letters}
      {monthScale}
      {radialScale}
      {isPeriodSelected}
      {selectedPeriod}
      {year}
    />
  </g>
  <text
    class:lessen={isPeriodSelected && !isYearIncluded(selectedPeriod, year)}
    x={0}
    y={smHeight - 5}
    text-anchor="middle">{year}</text
  >
</g>

<style lang="scss">
  // circle {
  //   fill: none;
  //   stroke: $text;
  // }
  line {
    stroke: $text;
    stroke-opacity: 0.2;
    &.lessen {
      opacity: 0;
    }
  }
  .month-label,
  .work-tooltip {
    font-size: 1.4rem;
  }
  .work-tooltip {
    opacity: 0;
    transition: opacity 200ms ease;
    &.visible {
      opacity: 1;
    }
  }
  text {
    pointer-events: none;
  }
</style>

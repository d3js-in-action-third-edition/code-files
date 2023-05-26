<script>
  import { range } from "d3-array";

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
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if svgWidth && svgHeight}
  <svg width={svgWidth} height={svgHeight} />
{/if}

<style>
  svg {
    border: 1px solid magenta;
  }
</style>

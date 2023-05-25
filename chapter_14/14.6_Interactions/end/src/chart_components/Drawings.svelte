<script>
  import { lineRadial, curveCatmullRomClosed } from "d3-shape";
  import { isYearIncluded } from "../utils/helpers";

  export let drawings;
  export let monthScale;
  export let radialScale;
  export let isPeriodSelected;
  export let selectedPeriod;
  export let year;

  const lineGenerator = lineRadial()
    .angle((d) => monthScale(d.month))
    .radius((d) => radialScale(d.drawings.length))
    .curve(curveCatmullRomClosed);
</script>

<path
  class:lessen={isPeriodSelected && !isYearIncluded(selectedPeriod, year)}
  d={lineGenerator(drawings)}
/>

<style lang="scss">
  path {
    fill: rgba($secondary, 0.25);
    pointer-events: none;
    transition: opacity 100ms ease;
  }
</style>

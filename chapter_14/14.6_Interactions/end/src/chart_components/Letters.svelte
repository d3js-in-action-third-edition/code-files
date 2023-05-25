<script>
  import { months } from "../utils/months";
  import { isMonthIncluded } from "../utils/helpers";

  export let letters;
  export let monthScale;
  export let radialScale;
  export let isPeriodSelected;
  export let selectedPeriod;
  export let year;
</script>

{#each months as month}
  <line
    class:lessen={isPeriodSelected &&
      !isMonthIncluded(
        selectedPeriod,
        months.findIndex((m) => m === month),
        year
      )}
    x1={0}
    y1={0}
    x2={radialScale(letters.find((l) => l.month === month).number_of_letters) *
      Math.sin(monthScale(month))}
    y2={radialScale(letters.find((l) => l.month === month).number_of_letters) *
      Math.cos(monthScale(month))}
    stroke-width={2}
    stroke-linecap="round"
  />
{/each}

<style lang="scss">
  line {
    stroke: $secondary;
    pointer-events: none;
    transition: opacity 100ms ease;
  }
</style>

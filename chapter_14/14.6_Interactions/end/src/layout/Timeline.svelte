<script>
  import { scaleTime } from "d3-scale";
  import { timeFormat } from "d3-time-format";
  import timeline from "../data/timeline.json";

  export let isPeriodSelected = false;
  export let selectedPeriod;

  let height;

  const startDate = new Date(
    timeline[0].start_year,
    timeline[0].start_month,
    1
  );
  const endDate = new Date(
    timeline[timeline.length - 1].end_year,
    timeline[timeline.length - 1].end_month,
    0
  );
  $: timeScale = scaleTime().domain([startDate, endDate]).range([0, height]);

  const handlePeriodSelection = (period) => {
    if (!isPeriodSelected || selectedPeriod !== period.id) {
      isPeriodSelected = true;
      selectedPeriod = period.id;
    } else {
      isPeriodSelected = false;
    }
  };
</script>

<div class="timeline-container" bind:clientHeight={height}>
  {#each timeline as period}
    <div
      class="period-container"
      class:lessen={isPeriodSelected && selectedPeriod !== period.id}
      style="top: {timeScale(
        new Date(period.start_year, period.start_month, 1)
      )}px; height: {timeScale(
        new Date(period.end_year, period.end_month, 25)
      ) - timeScale(new Date(period.start_year, period.start_month, 0))}px;"
      on:click={() => handlePeriodSelection(period)}
    >
      <div class="dates-container">
        <div class="start-date">
          {timeFormat("%b %Y")(
            new Date(period.start_year, period.start_month, 1)
          )}
        </div>
        <div class="end-date">
          {timeFormat("%b %Y")(new Date(period.end_year, period.end_month, 1))}
        </div>
      </div>
      <div class="period" />
      <div class="location">
        <div class="city">{period.city}</div>
        <div class="country">({period.country})</div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .timeline-container {
    height: 100%;
    font-size: 1.6rem;
    line-height: 1.2;
    color: $secondary;
  }
  .period-container {
    display: flex;
    align-items: stretch;
    position: absolute;
    left: 0;
    padding: 3px 0;
    cursor: pointer;
    transition: opacity 100ms ease;
  }
  .period {
    width: 10px;
    background-color: rgba($secondary, 0.7);
    border-radius: 8px;
  }
  .dates-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70px;
  }
  .location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 120px;
    padding-left: 10px;
  }
  .city {
    font-weight: 600;
  }
</style>

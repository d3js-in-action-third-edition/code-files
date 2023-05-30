<script>
  import Header from "./layout/Header.svelte";
  import Legend from "./layout/Legend.svelte";
  import Grid from "./layout/Grid.svelte";
  import Timeline from "./layout/Timeline.svelte";
  import Notes from "./layout/Notes.svelte";
  import Sources from "./layout/Sources.svelte";

  let radialScale;
  let isPeriodSelected;
  let selectedPeriod;
</script>

<Header />
<main>
  <div class="container">
    <section>
      <Legend {radialScale} />
    </section>
    <section>
      <div class="row">
        <div class="col-0 col-md-2">
          <h3>Timeline</h3>
          <div class="instruction">
            Click on a period to highlight the related work. Click again to
            unselect it.
          </div>
        </div>
        <div class="col-0 col-md-6">
          <h3>Visualizations</h3>
          <div class="instruction">
            Pass your mouse over a visualization to see the number of paintings
            (p), drawings (d), and letters (l) for each month. Position your
            mouse over a circle to read details about the related painting.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-0 col-md-2">
          <Timeline bind:isPeriodSelected bind:selectedPeriod />
        </div>
        <div class="col-12 col-md-10">
          <Grid {isPeriodSelected} {selectedPeriod} bind:radialScale />
        </div>
      </div>
    </section>
    <section>
      <Notes />
      <Sources />
    </section>
  </div>
</main>

<style>
  .instruction {
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
  }
</style>

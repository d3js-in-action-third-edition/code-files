<script>
  import { onMount} from "svelte";
  import * as d3 from "d3";

  import ScatterplotD3Controlled from "./ScatterplotD3Controlled.svelte";
  import ScatterplotSvelteControlled from "./ScatterplotSvelteControlled.svelte";
  import BarChart from "./BarChart.svelte";
  import Rankings from "./Rankings.svelte";

  export let data;

  const margin = {top: 30, right: 10, bottom: 50, left: 60};
  let colorScale;

  onMount(() => {
    if (data) {
      setColorScale();
    }
  });

  const setColorScale = () => {
    colorScale = d3.scaleOrdinal()
      .domain(data.ids)
      .range(d3.schemeTableau10);
  };
</script>

<div>
  <h1>Front-end Frameworks</h1>
  <div class="row">
    <div class="col-9">
      <Rankings 
        margin={margin} 
        data={data}
        colorScale={colorScale}
      />
    </div>
    <div class="col-3">
      <div class="row">
        <div class="col-12">
          {#if colorScale && data}
            <!-- <ScatterplotD3Controlled
              margin={margin} 
              data={data.experience}
              colorScale={colorScale}
            /> -->
            <ScatterplotSvelteControlled
              margin={margin} 
              data={data.experience}
              colorScale={colorScale}
            />
          {/if}
        </div>
        <div class="col-12">
          <BarChart 
            margin={margin} 
            data={data.experience}
            colorScale={colorScale}
          />
        </div>
      </div>
    </div>
  </div>
  <div class="source">Data source and original rankings chart: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
</div>
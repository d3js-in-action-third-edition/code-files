<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Charts from "./Charts/Charts.svelte";

  let frameworksData;

  onMount(() => {
    const dataURL = "https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json";
    
    d3.json(dataURL).then(data => {
      console.log("data", data);
      frameworksData = data;
    });
  });
</script>

<div class="container">
  {#if frameworksData}
    <Charts data={frameworksData} />
  {:else}
    <div class="loading">Loading...</div>
  {/if}
</div>
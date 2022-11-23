<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Card from "../UI/Card.svelte";
  import ChartContainer from "../ChartComponents/ChartContainer.svelte";

  export let margin;
  export let data;
  export let colorScale;

  const width = 300;
  const height = 245;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let scatterplotRef;
  onMount(() => {
    createScatterplot();
  });

  const createScatterplot = () => {
    const scatterplotContainer = d3.select(scatterplotRef);

    // Declare scales
    const maxUsers = d3.max(data, d => d.user_count);
    const xScale = d3.scaleLinear()
      .domain([0, maxUsers])
      .range([0, innerWidth])
      .nice();
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    // Append axes
    const bottomAxis = d3.axisBottom(xScale)
      .ticks([3])
      .tickFormat(d3.format("d"));
    scatterplotContainer
      .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);
        
    const leftAxis = d3.axisLeft(yScale)
      .ticks([5]);
    scatterplotContainer
      .append("g")
        .attr("class", "axis")
        .call(leftAxis);
    
    // Append circles
    scatterplotContainer
      .selectAll(".scatterplot-circle")
      .data(data)
      .join("circle")
        .attr("class", "scatterplot-circle")
        .attr("cx", d => xScale(d.user_count))
        .attr("cy", d => yScale(d.retention_percentage))
        .attr("r", 6)
        .attr("fill", d => colorScale(d.id));
  };
</script>

<Card>
  <h2>Retention vs Usage</h2>
  <ChartContainer
    width={width}
    height={height}
    margin={margin}
  >
    <g bind:this={scatterplotRef}></g>
  </ChartContainer>
</Card>
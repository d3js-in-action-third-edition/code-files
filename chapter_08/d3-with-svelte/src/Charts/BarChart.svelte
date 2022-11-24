<script>
  import * as d3 from "d3";

  import Card from "../UI/Card.svelte";
  import ChartContainer from "../ChartComponents/ChartContainer.svelte";
  import Axis from "../ChartComponents/Axis.svelte";
  import Rectangle from "../ChartComponents/Rectangle.svelte";
    import { color } from "d3";

  export let margin;
  export let data;
  export let colorScale;

  const width = 300;
  const height = 245;
  const marginBottom = 85;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - marginBottom;

  const awarenessData = [];
  data.forEach(d => {
    const awareness = { 
      id: d.id, 
      name: d.name,
      awareness_percentage: d.awareness[d.awareness.length -1].percentage_question 
    };
    awarenessData.push(awareness);
  });
  awarenessData.sort((a, b) => b.awareness_percentage - a.awareness_percentage);

  const xScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerWidth])
    .padding(0.2);
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);
</script>

<Card>
  <h2>Awareness</h2>
  <ChartContainer
    width={width}
    height={height}
    margin={margin}
  >
    {#if data && colorScale}
      <Axis 
        type="band"
        scale={xScale}
        ticksArray={awarenessData.map(d => d.name)}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
      />
      <Axis 
        type="left"
        scale={yScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        label={"Awareness %"}
      />
      {#each awarenessData as framework (framework.id)}
        <Rectangle
          x={xScale(framework.name)}
          y={yScale(framework.awareness_percentage)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(framework.awareness_percentage)}
          fill={colorScale(framework.id)}
        />
      {/each}
    {/if}
  </ChartContainer>
</Card>
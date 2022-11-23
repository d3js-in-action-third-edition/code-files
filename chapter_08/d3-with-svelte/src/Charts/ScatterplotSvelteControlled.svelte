<script>
  import * as d3 from "d3";

  import Card from "../UI/Card.svelte";
  import ChartContainer from "../ChartComponents/ChartContainer.svelte";
  import Axis from "../ChartComponents/Axis.svelte";
  import Circle from "../ChartComponents/Circle.svelte";

  export let margin;
  export let data;
  export let colorScale;

  const width = 300;
  const height = 245;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const maxUsers = d3.max(data, d => d.user_count);
  const  xScale = d3.scaleLinear()
      .domain([0, maxUsers])
      .range([0, innerWidth])
      .nice();
  const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);
</script>

<Card>
  <h2>Retention vs Usage</h2>
  <ChartContainer
    width={width}
    height={height}
    margin={margin}
  >
    <Axis 
      type="bottom"
      scale={xScale}
      innerWidth={innerWidth}
      innerHeight={innerHeight}
      label={"User Count"}
    />
    <Axis 
      type="left"
      scale={yScale}
      innerWidth={innerWidth}
      innerHeight={innerHeight}
      label={"Retention %"}
    />
    {#each data as framework (framework.id)}
      <Circle
        cx={xScale(framework.user_count)}
        cy={yScale(framework.retention_percentage)}
        r={6}
        fill={colorScale(framework.id)}
      />
    {/each}
  </ChartContainer>
</Card>
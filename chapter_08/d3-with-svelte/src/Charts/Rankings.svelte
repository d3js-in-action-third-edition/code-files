<script>
  import * as d3 from "d3";

  import Card from "../UI/Card.svelte";
  import ChartContainer from "../ChartComponents/ChartContainer.svelte";
  import RankingFilters from "../Interactions/RankingFilters.svelte";
  import Curve from "../ChartComponents/Curve.svelte";
  import Label from "../ChartComponents/Label.svelte";
  import Badge from "../UI/Badge.svelte";

  export let margin;
  export let data;
  export let colorScale;

  const width = 1000;
  const height = 542;
  const marginRight = 150;
  const marginLeft = 110;
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - margin.top - margin.bottom;

  const rankingFilters = [
    { id: "satisfaction", label: "Satisfaction" },
    { id: "interest", label: "Interest" },
    { id: "usage", label: "Usage" },
    { id: "awareness", label: "Awareness" },
  ];
  let activeFilter = "satisfaction";

  const xScale = d3.scalePoint()
    .domain(data.years)
    .range([0, innerWidth]);
  const ranks = d3.range(1, data.ids.length + 1);
  const yScale = d3.scalePoint()
    .domain(ranks)
    .range([0, innerHeight]);

  const filterSelectionHandler = (id) => {
    if (activeFilter !== id) {
      activeFilter = id;
    }
  };
</script>

<Card>
  <h2>Rankings</h2>
  <RankingFilters
    filters={rankingFilters}
    activeFilter={activeFilter}
    onFilterSelection={filterSelectionHandler}
  />
  <ChartContainer
    width={width}
    height={height}
    margin={{top: margin.top, right: marginRight, bottom: margin.bottom, left: marginLeft}}
  >
  {#if data && colorScale}
    {#each data.years as year (`line-year-${year}`)}
      <g class="axis" transform={`translate(${xScale(year)}, 0)`}>
        <line 
          x1={0}
          y1={innerHeight}
          x2={0}
          y2={0}
          stroke-dasharray={"6 4"}
        />
        <text
          x={0}
          y={innerHeight + 40}
          text-anchor="middle"
        >
          {year}
        </text>
      </g>
    {/each}
    {#each data.experience as framework (`curve-${framework.id}`)}
      <g>
        <Curve
          data={framework[activeFilter]}
          xScale={xScale}
          yScale={yScale}
          xAccessor="year"
          yAccessor="rank"
          stroke={colorScale(framework.id)}
          strokeWidth={5}
        />
        {#if framework[activeFilter] && framework[activeFilter][0].rank}
          <Label
            x={-25}
            y={yScale(framework[activeFilter][0].rank)}
            color={colorScale(framework.id)}
            label={framework.name}
            textAnchor={"end"}
          />
        {/if}
        {#if framework[activeFilter]}
          <Label
            x={innerWidth + 25}
            y={yScale(framework[activeFilter][framework[activeFilter].length - 1].rank)}
            color={colorScale(framework.id)}
            label={framework.name}
            textAnchor={"start"}
          />
          {#each framework[activeFilter] as selection, i (`${framework.id}-selection-${i}`)}
            {#if selection.rank}
              <Badge
                translation={[xScale(selection.year), yScale(selection.rank)]}
                strokeColor={colorScale(framework.id)}
                label={`${Math.round(selection.percentage_question)}%`}
              />
            {/if}
          {/each}
        {/if}
      </g>
    {/each}
    {/if}
  </ChartContainer>
</Card>
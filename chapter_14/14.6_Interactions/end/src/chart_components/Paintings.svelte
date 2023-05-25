<script>
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { scaleOrdinal } from "d3-scale";
  import { subjects } from "../utils/subjects";

  export let paintingAreaScale;
  export let paintingDefaultRadius;
  export let paintings;
  export let monthScale;
  export let radius;
  export let isTooltipVisible = false;
  export let tooltipMeta = {};

  let simulation = forceSimulation(paintings);
  let nodes = [];
  simulation.on("tick", () => {
    console.log("tick");
    nodes = simulation.nodes();
  });

  $: {
    console.log("run the simulation");
    simulation
      .force(
        "x",
        forceX((d) =>
          d.month !== "" ? radius * Math.sin(monthScale(d.month)) : 0
        ).strength(0.5)
      )
      .force(
        "y",
        forceY((d) =>
          d.month !== "" ? -1 * radius * Math.cos(monthScale(d.month)) : 0
        ).strength(0.5)
      )
      .force(
        "collide",
        forceCollide()
          .radius((d) =>
            d.width_cm === null && d.height_cm === null
              ? paintingDefaultRadius + 1
              : Math.sqrt(paintingAreaScale(d.area_cm2) / Math.PI) + 1
          )
          .strength(1)
      )
      .alpha(0.5)
      .alphaDecay(0.1);
  }

  const colorScale = scaleOrdinal()
    .domain(subjects.map((d) => d.subject))
    .range(subjects.map((d) => d.color));

  const handleMouseEnter = (e, node) => {
    isTooltipVisible = true;
    tooltipMeta = {
      x: e.offsetX,
      y: e.offsetY,
      screenY: e.clientY,
      url: node.imageLink,
      title: node.title,
      createdIn: node.created_in,
      date: node.month !== "" ? `${node.month} ${node.year}` : node.year,
      medium: node.medium,
      currentLocation: node.current_location,
      width: node.width_cm,
      height: node.height_cm,
      subject: node.subject,
    };
  };
  const handleMouseLeave = () => {
    isTooltipVisible = false;
  };
</script>

{#each nodes as node}
  <circle
    cx={node.x}
    cy={node.y}
    r={node.area_cm2
      ? Math.sqrt(paintingAreaScale(node.area_cm2) / Math.PI)
      : paintingDefaultRadius}
    fill={colorScale(node.subject)}
    on:mouseover={(e) => handleMouseEnter(e, node)}
    on:focus={(e) => handleMouseEnter(e, node)}
    on:mouseleave={() => handleMouseLeave()}
  />
{/each}
<script>
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { scaleOrdinal } from "d3-scale";
  import { subjects } from "../utils/subjects";
  import { onMount } from "svelte";

  export let paintingAreaScale;
  export let paintingDefaultRadius;
  export let monthScale;
  export let radius;
  export let isTooltipVisible = false;
  export let tooltipMeta = {};

  export let width;
  export let height;
  export let paintings;
  export let yearsTranslations;

  const colorScale = scaleOrdinal()
    .domain(subjects.map((d) => d.subject))
    .range(subjects.map((d) => d.color));

  let simulation = forceSimulation(paintings);
  let nodes = [];
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });

  let canvasElement;
  let context;
  onMount(() => {
    context = canvasElement.getContext("2d");
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
  });

  const handleSimulationEnd = () => {
    // Draw the paintings circles on the visible canvas
    nodes.forEach((node) => {
      // Set the context's fillStyle and strokeStyle properties
      context.fillStyle = colorScale(node.subject);
      switch (node.medium) {
        case "oil":
          context.strokeStyle = "#FFFAFC";
          break;
        case "watercolor":
          context.strokeStyle = "#160E13";
          break;
        case "print":
          context.strokeStyle = "#BC5D9A";
          break;
      }

      // Draw the circle
      context.beginPath();
      context.arc(
        node.x,
        node.y,
        node.area_cm2
          ? Math.sqrt(paintingAreaScale(node.area_cm2) / Math.PI)
          : paintingDefaultRadius,
        0,
        2 * Math.PI
      );
      context.fill();
      context.stroke();
    });
  };

  $: {
    simulation
      .force(
        "x",
        forceX((d) => {
          const translation = yearsTranslations.find(
            (y) => y.year === d.year
          ).translationX;
          return d.month !== ""
            ? translation + radius * Math.sin(monthScale(d.month))
            : translation;
        }).strength(0.5)
      )
      .force(
        "y",
        forceY((d) => {
          const translation = yearsTranslations.find(
            (y) => y.year === d.year
          ).translationY;
          return d.month !== ""
            ? translation - radius * Math.cos(monthScale(d.month))
            : translation;
        }).strength(0.5)
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
      .alphaDecay(0.1)
      .on("end", handleSimulationEnd);
  }
</script>

<canvas
  width={width * window.devicePixelRatio}
  height={height * window.devicePixelRatio}
  bind:this={canvasElement}
/>

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
  }
</style>

<script>
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { scaleOrdinal } from "d3-scale";
  import { subjects } from "../utils/subjects";

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
      .alphaDecay(0.1);
  }
</script>

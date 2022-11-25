<script>
  import Circle from "../ChartComponents/Circle.svelte";

  export let translation;
  export let strokeColor;
  export let label;
</script>

<style>
  text {
    font-size: 12px;
    font-weight: bold;
  }
</style>

<g transform={`translate(${translation[0]}, ${translation[1]})`}>
  <Circle 
    cx={0}
    cy={0}
    r={18}
    fill={"#fff"}
    stroke={strokeColor}
    strokeWidth={3}
  />
  <text
    text-anchor="middle"
    alignment-baseline="middle"
    fill="#374f5e"
  >
    {label}
  </text>
</g>
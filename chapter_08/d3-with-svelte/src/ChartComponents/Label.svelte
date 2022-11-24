<script>
  export let x;
  export let y;
  export let color;
  export let textAnchor;
  export let label;
</script>

<style>
  text {
    font-weight: bold;
  }
</style>

<text
  x={x}
  y={y}
  fill={color}
  text-anchor={textAnchor}
  alignment-baseline="middle"
>
  {label}
</text>
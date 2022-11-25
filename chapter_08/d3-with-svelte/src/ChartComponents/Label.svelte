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
    transition: transform 400ms cubic-bezier(0.33, 1, 0.68, 1);
  }
</style>

<text
  x={0}
  y={0}
  fill={color}
  text-anchor={textAnchor}
  alignment-baseline="middle"
  style="transform: {`translate(${x}px, ${y}px)`};"
>
  {label}
</text>
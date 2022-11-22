<script>
  export let width;
  export let height;
  export let margin;
</script>

<svg viewBox={`0 0 ${width} ${height}`}>
  <g transform={`translate(${margin.left}, ${margin.top})`}>
    <slot />
  </g>
</svg>
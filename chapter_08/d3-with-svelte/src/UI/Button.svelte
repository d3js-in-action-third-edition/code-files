<script>
  export let isActive = false;
  export let type = "button";
  export let label = "";
  export let onFilterSelection;
</script>

<style>
  button {
    padding: 8px 10px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.4rem;
    background-color: transparent;
    border: 1px dashed #06273b;
    border-left: none;
    cursor: pointer;
    transition: all 250ms ease-in;
  }
  button:first-of-type {
    border-left: 1px dashed #06273b;
  }
  button:hover,
  button.active {
    background-color: rgba(6, 39, 59, 0.15);
    transition-timing-function: ease-out;
  }
  button.active {
    cursor: default;
  }
</style>

<button
  class={`${isActive ? "active" : ""}`}
  type={type}
  on:click={onFilterSelection}
>
  {label}
</button>
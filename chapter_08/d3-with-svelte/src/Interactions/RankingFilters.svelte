<script>
  import Button from "../UI/Button.svelte";

  export let filters;
  export let activeFilter;
</script>

<style>
  .ranking-filters {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
</style>

<div class="ranking-filters">
  {#each filters as filter (filter.id)}
    <Button
      isActive={activeFilter === filter.id ? true : false}
      label={filter.label}
    />
  {/each}
</div>
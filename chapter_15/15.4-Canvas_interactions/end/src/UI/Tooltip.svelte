<script>
  import { fly, fade } from "svelte/transition";
  import { subjects } from "../utils/subjects";

  export let x;
  export let y;
  export let url;
  export let title;
  export let createdIn;
  export let date;
  export let medium;
  export let currentLocation;
  export let width;
  export let height;
  export let subject;
  export let svgWidth;
  export let screenY;
  export let windowHeight;
</script>

<div
  class="tooltip"
  style="left: {x <= svgWidth / 2 ? `${x + 10}px` : 'auto'}; 
         right: {x > svgWidth / 2 ? `${svgWidth - x + 10}px` : 'auto'}; 
         top: {screenY < windowHeight - 330 ? `${y + 10}px` : `${y - 310}px`};"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade
>
  <div
    class="image"
    style="background-image: url({url}); width: {width === null
      ? 300
      : (300 * width) / height}px;"
  />
  <div class="metadata">
    <div
      class="subject"
      style="background-color: {subjects.find((s) => s.subject === subject)
        .color};"
    />
    <h3 class="title">{title}</h3>
    <div class="date">{createdIn}, {date}</div>
    <div class="medium">medium: {medium}</div>
    <div class="current-location">{currentLocation}</div>
    <div class="dimensions">
      {width !== null ? `${width} x ${height} cm` : ""}
    </div>
  </div>
</div>

<style lang="scss">
  .tooltip {
    display: flex;
    position: absolute;
    height: 300px;
    background-color: $white;
    border-radius: $radius;
    box-shadow: 0px 2px 6px 0px rgba($text, 0.2);
    @media (max-width: $md) {
      position: fixed;
      flex-direction: column;
      top: auto !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0;
      width: calc(100% + $gutter);
      height: 400px;
    }
  }
  .image {
    flex-shrink: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    @media (max-width: $md) {
      width: 100%;
      height: 200px;
    }
  }
  .metadata {
    position: relative;
    max-width: 600px;
    padding: 20px 30px 10px 25px;
    overflow: hidden;
    div {
      margin: 5px 0;
    }
    @media (max-width: $md) {
      height: 200px;
    }
  }
  .title {
    margin-bottom: 1.2rem;
    font-family: $fontSecondary;
  }
  .subject {
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 100%;
    margin: 0 !important;
  }
</style>

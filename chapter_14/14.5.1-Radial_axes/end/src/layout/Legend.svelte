<script>
  import { subjects } from "../utils/subjects";

  export let radialScale;

  const lengths = [10, 25, 50];
</script>

<h2>How to read this visualization</h2>
<div class="row">
  <div class="col-12 col-md-4">
    <p>
      Each wheel represents a year in the life of Van Gogh, divided into months.
      For each month, the circles show each painting completed during that
      period.
    </p>
    <img src="./assets/legend-circle.svg" alt="How to read the visualization" />
  </div>
  <div class="col-12 col-md-4">
    <p>
      The color of the circles depicts the subject of the painting, while their
      size is proportional to the dimensions of the work. Circles with a border
      are watercolor (black border) and prints (purple border). All the other
      circles are oil.
    </p>
    <div class="circles-legend-container">
      <div class="color-legend">
        <h3>Color</h3>
        <ul>
          {#each subjects as subject}
            <li>
              <span class="color" style="background-color: {subject.color}" />
              <span class="label">{subject.subject}</span>
            </li>
          {/each}
        </ul>
      </div>
      <div class="border-legend">
        <h3>Border</h3>
        <ul>
          <li>
            <span class="border oil" />
            <span class="label">Oil</span>
          </li>
          <li>
            <span class="border watercolor" />
            <span class="label">Watercolor</span>
          </li>
          <li>
            <span class="border print" />
            <span class="label">Lithograph and Etchings</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-4">
    <p>
      The length of the purple bars is proportional to the number of letters
      written, and the area behind visualizes the number of drawings.
    </p>
    <h3>Length of the purple bars and areas</h3>
    <div class="length-legend">
      <ul>
        {#if radialScale}
          {#each lengths as length}
            <li>
              <span class="bar" style="width: {radialScale(length)}px" />
              <span class="label">{length}</span>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>

<style lang="scss">
  ul {
    margin-left: 3px;
  }
  li {
    margin: 3px 0;
  }
  img {
    max-width: 500px;
  }
  span {
    display: inline-block;
  }
  .circles-legend-container {
    display: flex;
  }
  .color,
  .border {
    position: relative;
    top: 4px;
    width: 20px;
    height: 20px;
    margin-right: 2px;
    border-radius: 50%;
  }
  .color-legend {
    .label {
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
  .border {
    background-color: rgba($text, 0.2);
    &.watercolor {
      border: 2px solid $text;
    }
    &.print {
      border: 2px solid $secondaryPale;
    }
  }
  .bar {
    position: relative;
    top: -4px;
    height: 3px;
    margin-right: 5px;
    background-color: $secondary;
    border-radius: 3px;
  }
</style>

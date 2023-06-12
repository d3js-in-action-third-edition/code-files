// Append a canvas element
const canvas = d3.select("#canvas")
  .append("canvas")
    .style("border", "1px solid black")
    .style("max-width", "100%");

const container = document.querySelector("#canvas");
const devicePixelRatio = window.devicePixelRatio;
console.log("devicePixelRatio", devicePixelRatio);

// Set the width and height of the canvas element
const setCanvasSize = () => {
  const width = container.offsetWidth;
  const height = 0.333 * width;
  console.log("width:", width, "height:", height);

  canvas
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio);
};
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// The canvas context is an object with properties and methods 
// that you can use to render graphics inside the canvas element. 
// The context can be 2d or WebGL (3d).
const context = canvas.node().getContext("2d");
context.scale(devicePixelRatio, devicePixelRatio);
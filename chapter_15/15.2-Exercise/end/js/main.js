// Append a canvas element
const canvas = d3.select("#canvas")
  .append("canvas")
    .style("border", "1px solid gray")
    .style("max-width", "100%");

const container = document.querySelector("#canvas");
const devicePixelRatio = window.devicePixelRatio;

// Set the width and height of the canvas element
const width = container.offsetWidth;
const height = width;

canvas
  .attr("width", width * devicePixelRatio)
  .attr("height", height * devicePixelRatio);

// The canvas context is an object with properties and methods 
// that you can use to render graphics inside the canvas element. 
// The context can be 2d or WebGL (3d).
const context = canvas.node().getContext("2d");
context.scale(devicePixelRatio, devicePixelRatio);

// Square
context.rect(100, 100, 200, 200);
context.lineWidth = 3;
context.stroke();

// Circle
context.beginPath(); // Reset
context.arc(200, 200, 100, 0, 2 * Math.PI);
context.fillStyle = "plum";
context.fill();

// Diagonal lines
context.beginPath(); // Reset
context.moveTo(100, 100);
context.lineTo(300, 300);
context.moveTo(300, 100);
context.lineTo(100, 300);
context.stroke();

// Text
context.font = "18px sans-serif";
context.fillStyle = "#000";
context.textAlign = "center";
context.fillText("Canvas is awesome!", 200, 90);
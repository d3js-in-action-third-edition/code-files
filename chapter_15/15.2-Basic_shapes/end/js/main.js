// Append a canvas element
const canvas = d3.select("#canvas")
  .append("canvas")
    .style("border", "1px solid black")
    .style("max-width", "100%");

const container = document.querySelector("#canvas");
const devicePixelRatio = window.devicePixelRatio;
console.log("devicePixelRatio", devicePixelRatio);

// Set the width and height of the canvas element
const width = container.offsetWidth;
const height = 0.333 * width;
console.log("width:", width, "height:", height);

canvas
  .attr("width", width * devicePixelRatio)
  .attr("height", height * devicePixelRatio);

// The canvas context is an object with properties and methods 
// that you can use to render graphics inside the canvas element. 
// The context can be 2d or WebGL (3d).
const context = canvas.node().getContext("2d");
context.scale(devicePixelRatio, devicePixelRatio);

// Drawing the line
context.beginPath();
context.moveTo(66, 60);
context.lineTo(186, 300);
context.stroke();

// Drawing the rectangles
context.rect(346, 33, 160, 80); // x, y, width, height
context.roundRect(346, 133, 160, 80, [20]); // x, y, width, height, [radii]
context.fillStyle = "#6ba5d7";
context.fill();

context.beginPath();  // Reset
context.rect(346, 233, 106, 80);
context.strokeStyle = "#6ba5d7";
context.stroke();

// Drawing the circles
context.beginPath();  // Try without it to see how the latest rectangle get connected to the first circle
context.arc(706, 106, 66, 0,  2 * Math.PI);  // x, y, radius, startAngle, endAngle
context.strokeStyle = "#81c21c";
context.lineWidth = 3;
context.stroke();

context.beginPath();
context.ellipse(706, 273, 66, 40, 0, 0, 2 * Math.PI);  // x, y, radiusX, radiusY, startAngle, endAngle
context.fillStyle = "#81c21c";
context.fill();

// Drawing the path
const path = new Path2D("M900 200 C 945 110, 965 110, 1010 200 S 1075 293, 1120 200");
context.strokeStyle = "#773b9a";
context.stroke(path);

// Adding the text elements
context.fillStyle = "#636466";
context.font = "16px monospace";
context.fillText("line", 80, 346);
context.fillText("rect", 346, 346);
context.fillText("path", 973, 346);

context.textAlign = "center";
context.fillText("circle", 706, 206);
context.fillText("ellipse", 706, 346);
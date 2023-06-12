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

// Drawing the line
context.strokeStyle = "#000";
context.lineWidth = 1;
context.beginPath();
context.moveTo(66.67, 60);
context.lineTo(186.67, 300);
context.stroke();

// // Drawing the rectangles
// context.fillStyle = "#6ba5d7";
// context.fillRect(260, 25, 120, 60); // x, y, width, height

// context.beginPath();
// context.roundRect(260, 100, 120, 60, [20]);
// context.fill();

// context.fillStyle = "#fff";
// context.fillRect(260, 175, 60, 60);
// context.strokeStyle = "#6ba5d7";
// context.strokeRect(260, 175, 60, 60);

// // Drawing the circles
// context.strokeStyle = "#81c21c";
// context.lineWidth = 3;
// context.beginPath();  // Try without it to see how another line is drawn
// context.arc(530, 80, 50, 0,  2 * Math.PI, true);  // x, y, radius, startAngle, endAngle, isCounterClockwise
// context.stroke();

// context.fillStyle = "#81c21c";
// context.beginPath();
// context.ellipse(530, 205, 50, 30, 0, 0, 2 * Math.PI);
// context.fill();

// // Drawing the path
// context.strokeStyle = "#773b9a";
// const path = new Path2D("M680 150 C 710 80, 725 80, 755 150 S 810 220, 840 150");
// context.stroke(path);

// // Adding the text elements
// context.fillStyle = "#636466";
// context.font = "16px monospace";
// context.fillText("line", 60, 260);
// context.fillText("rect", 260, 260);
// context.fillText("path", 730, 260);

// context.textAlign = "center";
// context.fillText("circle", 530, 155);
// context.fillText("ellipse", 530, 260);
const margin = {top: 200, right: 90, bottom: 50, left: 90};
const width = 860;
const height = 450;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let innerChart;

const formatsInfo = [
  {id: "vinyl", label: "Vinyl", color: "#76B6C2"},
  {id: "eight_track", label: "8-Track", color: "#4CDDF7"},
  {id: "cassette", label: "Cassette", color: "#20B9BC"},
  {id: "cd", label: "CD", color: "#2F8999"},
  {id: "download", label: "Download", color: "#E39F94"},
  {id: "streaming", label: "Streaming", color: "#ED7864"},
  {id: "other", label: "Other", color: "#ABABAB"},
];
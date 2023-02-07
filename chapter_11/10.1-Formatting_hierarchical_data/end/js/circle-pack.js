import { pack } from "d3-hierarchy";

export const buildCirclePack = (root, descendants, leaves) => {

  // Dimensions
  const width = 800;
  const height = 800;
  const margin = { top: 1, right: 1, bottom: 1, left: 1 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute the size of the circles
  root.sum(d => d.total_speakers);

  // Compute the layout
  const packLayoutGenerator = pack()
    .size([innerWidth, innerHeight])
    .padding(3); // Separation between circles
  const packLayout = packLayoutGenerator(root);

};
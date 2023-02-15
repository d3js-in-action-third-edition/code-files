import { stratify, hierarchy } from "d3-hierarchy";

export const CSVToHierarchy = (data) => {

  const hierarchyGenerator = stratify()
    .id(d => d.child)
    .parentId(d => d.parent);
  const root = hierarchyGenerator(data);
  console.log("root", root);

  const descendants = root.descendants();
  const leaves = root.leaves();
  console.log("descendants", descendants);
  console.log("leaves", leaves);

  return [root, descendants, leaves];

};

export const JSONToHierarchy = (data) => {

  const root = hierarchy(data);
  console.log("root", root);

  const descendants = root.descendants();
  const leaves = root.leaves();
  console.log("descendants", descendants);
  console.log("leaves", leaves);

  return [root, descendants, leaves];

};
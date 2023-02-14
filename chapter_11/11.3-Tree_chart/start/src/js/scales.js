import { scaleOrdinal } from "d3-scale";
import { languageFamilies } from "./helper";

export const colorScale = scaleOrdinal()
  .domain(languageFamilies.map(d => d.label))
  .range(languageFamilies.map(d => d.color));
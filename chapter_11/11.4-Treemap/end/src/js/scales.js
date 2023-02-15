import { scaleOrdinal, scaleRadial } from "d3-scale";
import { languageFamilies } from "./helper";

export const colorScale = scaleOrdinal()
  .domain(languageFamilies.map(d => d.label))
  .range(languageFamilies.map(d => d.color));

export const getRadius = (maxSpeakers, speakers) => {
  const radialScale = scaleRadial()
    .domain([0, maxSpeakers])
    .range([0, 83]);

  return radialScale(speakers);
};
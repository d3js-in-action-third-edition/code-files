import { drawWorldMap } from "./map-world";
import { drawFranceMap } from "./map-france";

import countries from "../data/world.json";
import laureates from "../data/laureates.json";
import franceTopoData from "../data/france.json";

console.log("countries", countries);
console.log("laureates", laureates);

drawWorldMap(laureates, countries);

console.log("France topojson data", franceTopoData);
drawFranceMap(laureates, franceTopoData);

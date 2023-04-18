import { drawWorldMap } from "./map-world";
import { drawFranceMap } from "./map-france";

import laureates from "../data/laureates.json";
import world from "../data/world.json";
import france from "../data/france.json";
console.log("laureates", laureates);
console.log("world (GeoJSON)", world);
console.log("France (TopoJSON)", france);

drawWorldMap(laureates, world);
drawFranceMap(laureates, france);

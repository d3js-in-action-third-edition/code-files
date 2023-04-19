import { select, selectAll } from "d3-selection";
import { geoPath, geoEqualEarth, geoGraticule } from "d3-geo";
import { transition } from "d3-transition";
import { max, min } from "d3-array";
import { zoom, zoomIdentity } from "d3-zoom";
import { scaleLinear } from "d3-scale";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";
import { brushX } from "d3-brush";
import { countryColorScale, getCityRadius } from "./scales";
import { drawLegend } from "./legend";

export const drawWorldMap = (laureates, world) => {

  // Perform calculations
  world.features.forEach(country => {
    const props = country.properties;
    props.laureates = laureates.filter(laureate => laureate.birth_country === props.name);
  });

  const cities = [];
  laureates.forEach(laureate => {
    if (laureate.birth_country !== "" && laureate.birth_city !== "") {

      const relatedCity = cities.find(city => city.city === laureate.birth_city) && cities.find(city => city.country === laureate.birth_country);
      
      if (relatedCity) {
        relatedCity.laureates.push(laureate);
      } else {
        cities.push({
          city: laureate.birth_city,
          country: laureate.birth_country,
          latitude: laureate.birt_city_latitude,
          longitude: laureate.birt_city_longitude,
          laureates: [laureate]
        });
      }

    }
  });

  // Dimensions
  const width = 1230;
  const height = 620;

  // Declare state variables
  let isCountryMap = true;
  const minYear = min(laureates, d => d.year);
  const maxYear = max(laureates, d => d.year);
  let brushMin = minYear;
  let brushMax = maxYear;

  // Append the SVG container
  const svg = select("#map")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  // Define the map projection
  const projection = geoEqualEarth()
    .translate([width/2, height/2])
    .scale(220);

  // Initialize the path generator
  const geoPathGenerator = geoPath()
    .projection(projection);

  // Define the graticule generator
  const graticuleGenerator = geoGraticule();

  // Append the graticules
  const graticules = svg
    .append("g")
      .attr("fill", "transparent")
      .attr("stroke", "#09131b")
      .attr("stroke-opacity", 0.2);
  graticules
    .append("path")
    .datum(graticuleGenerator)
      .attr("d", geoPathGenerator);
  graticules
    .append("path")
    .datum(graticuleGenerator.outline)
      .attr("d", geoPathGenerator);

  // Handle the tooltip
  const showTooltip = (text) => {
    select("#map-tooltip")
      .text(text)
      .transition()
      .style("opacity", 1);
  };

  const hideTooltip = () => {
    select("#map-tooltip")
      .transition()
      .style("opacity", 0);
  };

  // Append the country paths
  svg
    .selectAll(".country-path")
    .data(world.features)
    .join("path")
      .attr("class", "country-path")
      .attr("d", geoPathGenerator)
      .attr("stroke", "#09131b")
      .attr("stroke-opacity", 0.4);

  const updateCountryFills = () => {
    const selectedData = JSON.parse(JSON.stringify(world.features));
    selectedData.forEach(d => {
      if (d.properties.laureates) {
        d.properties.laureates = d.properties.laureates.filter(l => l.year >= brushMin && l.year <= brushMax);
      }
    });

    selectAll(".country-path")
      .data(selectedData)
      .on("mouseenter", (e, d) => {
        const p = d.properties;
        const lastWord = p.laureates.length > 1 ? "laureates" : "laureate";
        const text = `${p.name}, ${p.laureates.length} ${lastWord}`;
        showTooltip(text);
      })
      .on("mouseleave", hideTooltip)
      .transition()
      .attr("fill", d => d.properties.laureates.length > 0 
        ? countryColorScale(d.properties.laureates.length) 
        : "#f8fcff");
  };

  const maxLaureatesPerCity = max(cities, d => d.laureates.length);
  const updateCityCircles = () => {
    const selectedData = JSON.parse(JSON.stringify(cities));
    selectedData.forEach(city => {
      city.laureates = city.laureates.filter(l => l.year >= brushMin && l.year <= brushMax);
    });

    selectAll(".circle-city")
      .data(selectedData)
      .on("mouseenter", (e, d) => {
        const lastWord = d.laureates.length > 1 ? "laureates" : "laureate";
        const text = `${d.city}, ${d.laureates.length} ${lastWord}`;
        showTooltip(text);
      })
      .on("mouseleave", hideTooltip)
      .transition()
      .attr("r", d => getCityRadius(d.laureates.length, maxLaureatesPerCity));
  };

  const displayCountries = () => {
    isCountryMap = true;

    // Remove city circles
    selectAll(".circle-city")
      .transition()
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .remove();

    updateCountryFills();

    // Show related legend
    select(".legend-cities")
      .style("display", "none");
    select(".legend-countries")
      .style("display", "flex");
  };
  
  const displayCities = () => {

    isCountryMap = false;

    // Remove country styles and events
    selectAll(".country-path")
      .on("mouseenter", null)
      .on("leave", null)
      .transition()
      .attr("fill", "#f8fcff");

    // Show birth cities
    svg
      .selectAll(".circle-city")
      .data(cities)
      .join("circle")
        .attr("class", "circle-city")
        .attr("cx", d => projection([d.longitude, d.latitude])[0])
        .attr("cy", d => projection([d.longitude, d.latitude])[1])
        .attr("fill", "#35a7c2")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "#35a7c2");

    updateCityCircles();

    // Show related legend
    select(".legend-countries")
      .style("display", "none");
    select(".legend-cities")
      .style("display", "block");
    
  };

  drawLegend(maxLaureatesPerCity);
  
  // Listen to radio buttons selection 
  selectAll("input#countries, input#cities")
    .on("click", e => {
      if (e.target.id === "countries") {
        displayCountries();
      } else if (e.target.id === "cities") {
        displayCities();
      }
    });

  // On project load, display countries
  displayCountries();

  // Handle zoom
  const zoomHandler = zoom()
    .scaleExtent([1, 5])
    .translateExtent([[-width/2, -height/2], [3*width/2, 3*height/2]])
    .on("zoom", (e) => {
      console.log(e);
      svg.attr("transform", e.transform);

      if (select("#map-reset").classed("hidden")) {
        select("#map-reset")
          .classed("hidden", false);
      }
      if (e.transform.k === 1 && e.transform.x === 0 && e.transform.y === 0) {
        select("#map-reset")
          .classed("hidden", true);
      }
    });

  select(".map-container")
    .call(zoomHandler);

  select("#map-reset")
    .attr("class", "hidden")
    .on("click", () => {
      select(".map-container")
        .transition()
        .call(zoomHandler.transform, zoomIdentity);
    });

  // Add the timeline selector
  const tlWidth = 1000;
  const tlHeight = 80;
  const tlMargin= { top: 0, right: 10, bottom: 0, left: 0 };
  const tlInnerWidth = tlWidth - tlMargin.right - tlMargin.left;

  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([0, tlInnerWidth]);

  const yearsSelector = select("#years-selector")
    .append("svg")
      .attr("viewBox", `0 0 ${tlWidth} ${tlHeight}`);

  const xAxisGenerator = axisBottom(xScale)
    .tickFormat(format(""))
    .tickSizeOuter(0);
  yearsSelector
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, 30)`)
      .call(xAxisGenerator);

  const handleBrush = (e) => {
    console.log(e);

    brushMin = Math.round(xScale.invert(e.selection[0]));
    brushMax = Math.round(xScale.invert(e.selection[1]));

    if (isCountryMap) {
      updateCountryFills();
    } else {
      updateCityCircles();
    }
  };

  const brushHandler = brushX() // Always capture the full height with the brush
    .extent([[0, 0], [tlInnerWidth, tlHeight]]) // Set the brushable area
    .on("brush", handleBrush);

  yearsSelector
    .call(brushHandler)
    .call(brushHandler.move, [xScale(minYear), xScale(maxYear)]); // Initial brushed zone
  // Note that can also pan and resize the brushable area!

};
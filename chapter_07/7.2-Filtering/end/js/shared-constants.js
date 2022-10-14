/************************/
/*      Dimensions      */
/************************/
const margin = {top: 40, right: 30, bottom: 50, left: 40};
const width = 1000;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;


/**********************/
/*       Colors       */
/**********************/
const slateGray = "#305252";
const gray = "#606464";
const white = "#faffff";
const womenColor = "#826C7F";
const menColor = "#FA7E61";


/*****************************************/
/*  Make the scales accessible globally  */
/*****************************************/
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


/*************************************************/
/*  Make the bins generator accessible globally  */
/*************************************************/
const binGenerator = d3.bin()
  .value(d => d.salary);


/***********************/
/*       Filters       */
/***********************/
const filters = [
  { id: "all", label: "All", isActive: true },
  { id: "female", label: "Women", isActive: false },
  { id: "male", label: "Men", isActive: false },
];
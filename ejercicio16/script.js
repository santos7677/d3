console.log('running');
var margin = {top: 10, right: 30, bottom: 30, left: 30};
var w = 960 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;

d3.csv("cars.csv", function(d) {
   return {
    lb: d['weight (lb)'] != '' ? parseInt(d['weight (lb)']) : 0,
    mph: d['0-60 mph (s)'] != '' ? parseInt(d['0-60 mph (s)']) : 0,
    hp: d['power (hp)'] != '' ? parseInt(d['power (hp)']) : 0,
    cy: d['cylinders'] != '' ? parseInt(d['cylinders']) : 0
  };
}, function(error, data) {
   crearVisualizacion(data)
 });

function crearVisualizacion(pesos) {
  var xAxis = d3.scale.linear()
  .domain([0, d3.max(pesos, function(d) { return +d.lb;})])
  .range([0, w]);

  var yAxis = d3.scale.linear()
  .domain([0, d3.max(pesos, function(d) { return +d.mph;})])
  .range([h, 0]);

  var XScale = d3.scale.linear()
  .domain([0, d3.max(pesos, function(d) { return d.lb;})])
  .range([0, w]);

  var YScale = d3.scale.linear()
  .domain([0, d3.max(pesos, function(d) { return d.mph;})])
  .range([h, 0]);

  var RadiusScale = d3.scale.linear()
  .domain([0, d3.max(pesos, function(d) { return d.hp; })])
  .range([0, 10]);

  var ColorScale = d3.scale.category10()
  .domain([0, d3.max(pesos, function(d) { return d.cy; })]);

  var OpacityScale = d3.scale.linear()
    .domain([0, d3.max(pesos, function(d) { return d.cy; })])
    .range([0.1, .4])

  //var Opacity_cy = function(d) { return d / 20; }

  var yAxis = d3.svg.axis()
  .scale(yAxis)
  .orient("left");

  var xAxis = d3.svg.axis()
  .scale(xAxis)
  .orient("bottom");

  var svg = d3.select("body").append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .attr("class", "axis")
  //Primero yAxis
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(yAxis);

  svg.selectAll("circle")
  .data(pesos)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d3.format(".2f")(XScale(d.lb));})
  .attr("cy", function(d) { return d3.format(".2f")(YScale(d.mph));})
  .attr("r", function(d) { return d3.format(".2f")(RadiusScale(d.hp));})
  .attr("fill-opacity", function(d) { return OpacityScale(d.cy);})
  .style("fill", function(d) { return ColorScale(d.cy);});

  //Segundo xAxis
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis)

  //Funciones script
  d3.selectAll("circle").on("click", function(d){
    alert("Cilindros: " + d.cy);
  });

  d3.selectAll("circle").on("mouseover", function(d) {
    d3.select(this).style("stroke", d3.select(this).style("fill"));
    d3.select("p#info")
    .text("Peso: " + d.lb + " kg - Velocidad: " + d.hp + " mph")
    .style("color", d3.select(this).style("fill"));
  });

  d3.selectAll("circle").on("mouseout", function(d){
    d3.select(this).style("stroke", null);
    d3.select("p#info")
    .text("");
  });
}

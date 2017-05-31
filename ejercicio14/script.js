console.log('running');
var margin = {top: 10, right: 30, bottom: 30, left: 30};
var w = 960 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;
var barMargin = 1;
var bins = 20;

d3.csv("cars.csv", function(data) {
   var pesos = data.map(
        function(d){
            return parseInt(d['weight (lb)']);
        }
    );

    crearVisualizacion(pesos);
});

function crearVisualizacion(pesos) {
  var x = d3.scale.linear()
  .domain([0, d3.max(pesos)])
  .range([0, w]);

  var histogram = d3.layout.histogram()
  .bins(x.ticks(bins))
  (pesos);

  var y = d3.scale.linear()
  .domain([0, d3.max(histogram, function(d){return d.length})])
  .range([h, 0]);

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var svg = d3.select("body").append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .attr("class", "axis")
  //Primero yAxis
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(yAxis);

  var bar = svg.selectAll("bar")
  .data(histogram)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y); })
  .attr("width", function(d) { return x(d.dx) - barMargin; })
  .attr("height", function(d) { return h - y(d.y); })

  //Segundo xAxis
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis)
}

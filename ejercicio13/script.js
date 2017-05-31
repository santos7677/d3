console.log('running');
var w = 800;
var h = 600;
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

  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  var bar = svg.selectAll("bar")
  .data(histogram)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y); })
  .attr("width", function(d) { return x(d.dx) - barMargin; })
  .attr("height", function(d) { return h - y(d.y); })
  .style({"stroke": "steelblue", "fill": "steelblue"})
  .append("svg:title").text(function(d) {return d3.round(d.y)});
}

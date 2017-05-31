console.log('running');
var w = 500;
var h = 2000;
var barMargin = 1;

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

  var y = d3.scale.linear()
   .domain([0, pesos.length])
   .range([0, h]);

  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg.selectAll('.bar')
  .data(pesos)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('y', function(d, i){return d3.format(".2f")(y(i));})
  .attr('width', function(d){return d3.format(".2f")(x(d));})
  .attr('height', function(d, i){return d3.format(".2f")(y(i+1) - y(i) - barMargin);})
  .style({"stroke": "steelblue", "fill": "steelblue"});
}

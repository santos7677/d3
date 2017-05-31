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
  var barWidth = Math.floor((h / pesos.length) - barMargin );

  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg.selectAll('.bar')
  .data(pesos)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('y', function(d,i) {return i*(barWidth+barMargin);})
  .attr('width', function(d){return d * 0.05;})
  .attr('height', barWidth)
  .style({"stroke": "steelblue", "fill": "steelblue"});
}

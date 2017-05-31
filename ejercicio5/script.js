console.log('running');
var datos = [1,10,20,30,40,50];

d3.select('body')
.selectAll("p")
.data(datos)
.enter()
.append("p")
.style("color", function(d, i){if(i % 2 == 0) return "red";})
.text(function(d){return "Párrafo " + String(d);});
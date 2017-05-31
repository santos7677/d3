console.log('running');
var datos = [1,10,20,30,40,50];

d3.select('body')
.selectAll("p")
.data(datos)
.enter()
.append("p")
.attr("class", function(d, i){if(i % 2 == 0) return "impar";})
.text(function(d){return "Párrafo " + String(d);});
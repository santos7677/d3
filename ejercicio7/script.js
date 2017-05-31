console.log('running');
var datos = [1,10,20,30,40,50];

d3.select('body > div.container')
.selectAll("div")
.data(datos)
.enter()
.append("div")
.style("width", function(d){return String(d * 5) + "px";})
.text(function(d){return String(d);});
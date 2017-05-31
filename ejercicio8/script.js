console.log('running');

d3.csv("cars.csv", function(data) {
    crearVisualizacion(data);
});

function crearVisualizacion(data) {
    d3.select('body')
    .append("p")
    .text("Párrafo " + String(data.length));
}

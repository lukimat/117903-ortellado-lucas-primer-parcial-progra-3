const cajaSeries = document.getElementById('series');
const btnOrdenarNombre = document.getElementById('ordenar-nombre');
const btnOrdenarIdioma = document.getElementById('ordenar-idioma');

let listaGuardadas = [];
function cargarSeriesGuardadas() {
    const datosLocales = localStorage.getItem('misSeriesLocales');
    
    if (datosLocales) {
        const arrayCrudo = JSON.parse(datosLocales);
        listaGuardadas = arrayCrudo.map(obj => new Serie(obj.id, obj.url, obj.name, obj.language, obj.generes, obj.image));
        
        dibujarSeries();
    } else {
        cajaSeries.innerHTML = "<h5>No tenés ninguna serie guardada todavía.</h5>";
    }
}

function dibujarSeries() {
    cajaSeries.innerHTML = "";
    listaGuardadas.forEach(serie => {
        cajaSeries.appendChild(serie.createHtmlElement());
    });
}

btnOrdenarNombre.addEventListener('click', () => {
    listaGuardadas.sort((a, b) => a.name.localeCompare(b.name));
    dibujarSeries(); 
});

btnOrdenarIdioma.addEventListener('click', () => {
    listaGuardadas.sort((a, b) => a.language.localeCompare(b.language));
    dibujarSeries(); 
});
cargarSeriesGuardadas();
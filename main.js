
const contenedorSeries = document.getElementById('series');
const botonAnt = document.getElementById('anterior');
const botonSig = document.getElementById('siguiente');

let paginaActual = 0;

async function traerSeriesPorPagina(numeroPagina) {

    contenedorSeries.innerHTML = ""; 

    
    let primerId = (numeroPagina * 6) + 1;
    let ultimoId = primerId + 5;

    
    for (let i = primerId; i <= ultimoId; i++) {
        try {
            
            let respuesta = await fetch(`https://api.tvmaze.com/shows/${i}`);

            
            if (respuesta.status === 200) {
                let info = await respuesta.json();
                let nuevaSerie = new Serie(
                    info.id,    
                    info.url,
                    info.name,
                    info.language,
                    info.genres, 
                    info.image.medium 
                );
                let nodoHtml = nuevaSerie.createHtmlElement();
                contenedorSeries.appendChild(nodoHtml);
            }
        } catch (error) {
            console.log("Error al traer la serie " + i, error);
        }
    }
}

function paginaSiguiente() {
    paginaActual++;
    traerSeriesPorPagina(paginaActual);
}

function paginaAnterior() {
    if (paginaActual > 0) {
        paginaActual--;
        traerSeriesPorPagina(paginaActual);
    } else {
        alert("Ya estás en el inicio del catálogo.");
    }
}

botonSig.addEventListener('click', paginaSiguiente);
botonAnt.addEventListener('click', paginaAnterior);

traerSeriesPorPagina(paginaActual);
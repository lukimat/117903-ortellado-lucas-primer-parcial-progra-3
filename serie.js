class Serie {
    constructor(id, url, name, language, generes, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.generes = generes; 
        this.image = image;
    }
    toJsonString() {
        return JSON.stringify(this);
    }
    static createFromJsonString(json) {
        const objetoParseado = JSON.parse(json);
        return new Serie(
            objetoParseado.id, 
            objetoParseado.url, 
            objetoParseado.name, 
            objetoParseado.language, 
            objetoParseado.generes, 
            objetoParseado.image
        );
    }
// --- PUNTO 6 ---
    createHtmlElement() {
        const contenedorTarjeta = document.createElement('div');
        contenedorTarjeta.className = 'card text-center shadow-sm h-100'; 

        // 6.a: Envolvemos la imagen en un <a> con el atributo url
        // 6.b: Agregamos el botón guardar al final del body
        contenedorTarjeta.innerHTML = `
            <a href="${this.url}" target="_blank">
                <img src="${this.image}" class="card-img-top" alt="${this.name}">
            </a>
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text"><strong>Idioma:</strong> ${this.language}</p>
                <p class="card-text"><small class="text-muted">Géneros: ${this.generes.join(', ')}</small></p>
                <button class="btn btn-success boton-guardar mt-2">Guardar</button>
            </div>
        `;

        // Capturamos el botón específico de esta serie y le damos el evento
        const btnGuardar = contenedorTarjeta.querySelector('.boton-guardar');
        btnGuardar.addEventListener('click', () => {
            // Llamamos al método estático pasándole "this" (esta misma serie)
            Serie.guardarSerie(this);
        });

        return contenedorTarjeta;
    }

    // --- PUNTO 7 ---
    static guardarSerie(serie) {
        // Traemos lo guardado o arrancamos un array vacío si no hay nada
        let miListaGuardada = JSON.parse(localStorage.getItem('misSeriesLocales')) || [];
        
        // Verificamos por ID para no guardar duplicados
        const yaEstaGuardada = miListaGuardada.find(item => item.id === serie.id);
        
        if (!yaEstaGuardada) {
            miListaGuardada.push(serie);
            localStorage.setItem('misSeriesLocales', JSON.stringify(miListaGuardada));
            alert(`La serie ${serie.name} se guardó correctamente.`);
        } else {
            alert(`La serie ${serie.name} ya la tenías guardada.`);
        }
    }
  }
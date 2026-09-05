//==============================================
// CENTRO DE DESCARGAS TECNOLAB
//==============================================

// Cantidad de planos por página
const PLANOS_POR_PAGINA = 15;

// Variables globales
let planos = [];
let paginaActual = 1;

// Elementos HTML
const lista = document.getElementById("lista-planos");
const buscador = document.getElementById("buscador");
const paginacion = document.getElementById("paginacion");
let mostrandoResultados = false;

//==============================================
// CARGAR ARCHIVO JSON
//==============================================

fetch("data/planos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        planos = datos;
        ordenarPlanos();
        planosFiltrados = [...planos];
        crearPaginacion(planosFiltrados);
        mostrarPagina(1);
    })
    .catch(error => {
        console.error("Error cargando planos:", error);
    });


//==============================================
// ORDEN ALFABÉTICO
//==============================================

function ordenarPlanos(){
    planos.sort((a,b)=>{
        return a.nombre.localeCompare(b.nombre);
    });

}

//==============================================
// MOSTRAR UNA PÁGINA
//==============================================

function mostrarPagina(numero){

    paginaActual = numero;
    lista.innerHTML = "";
    
    if (!mostrandoResultados) {
        lista.style.display = "none";
        paginacion.style.display = "none";
        return;
    }
    lista.style.display = "";
    paginacion.style.display = "";

    const inicio = (numero - 1) * PLANOS_POR_PAGINA;
    const fin = inicio + PLANOS_POR_PAGINA;
    const pagina = planosFiltrados.slice(inicio, fin);

    pagina.forEach(plano => {
        lista.innerHTML += `
        <li>
            <a href="${plano.link}" target="_blank">
                ${plano.nombre}
            </a>
        </li>
        `;
    });
}
//==============================================
// VARIABLE PARA FILTRAR
//==============================================

let planosFiltrados = [];

//==============================================
// BUSCADOR
//==============================================

buscador.addEventListener("input",()=>{
    const texto = buscador.value.toLowerCase().trim();

    // Mostrar recuadros solamente cuando haya texto
    mostrandoResultados = texto !== "";

    planosFiltrados = planos.filter(plano=>{
        return plano.nombre.toLowerCase().includes(texto);
    });

    crearPaginacion(planosFiltrados);
    mostrarPagina(1);
});

//==============================================
// PAGINACIÓN
//==============================================

function crearPaginacion(datos){
    paginacion.innerHTML = "";
    const paginas = Math.ceil(datos.length / PLANOS_POR_PAGINA);
    for(let i=1;i<=paginas;i++){
        const boton = document.createElement("button");
        boton.innerText = i;
        if(i===paginaActual){
            boton.classList.add("activo");
        }
        boton.addEventListener("click",()=>{
            mostrarPagina(i);
            actualizarBotones(i);
        });
        paginacion.appendChild(boton);
    }
}

//==============================================
// ACTUALIZAR BOTONES
//==============================================

function actualizarBotones(numero){
    const botones = document.querySelectorAll("#paginacion button");
    botones.forEach(btn=>{

        btn.classList.remove("activo");
        if(Number(btn.innerText)===numero){
            btn.classList.add("activo");
        }
    });
}
//==============================================
// AL CARGAR LA PÁGINA
//==============================================

planosFiltrados = planos;
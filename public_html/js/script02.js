// 1. BOTONES "LEER MÁS" - Expandir / Contraer
const botones = document.querySelectorAll(".boton-manga");

botones.forEach(function (boton) {
    const parrafo = boton.previousElementSibling;

    const textoCompleto = parrafo.innerText.trim().replace(/\s+/g, " ");

    const resumen = textoCompleto.length > 100
        ? textoCompleto.substring(0, 100) + "..."
        : textoCompleto;

    parrafo.innerText = resumen;
    let expandido = false;

    boton.textContent = "Leer más";

    boton.addEventListener("click", function () {
        if (!expandido) {
            parrafo.innerText = textoCompleto;
            boton.textContent = "Leer menos";
            expandido = true;
        } else {
            parrafo.innerText = resumen;
            boton.textContent = "Leer más";
            expandido = false;
        }
    });
});


// 2. FECHAS DE PUBLICACIÓN
const fechas = {
    "Naruto":          "1999-09-21",
    "Dragon Ball":     "1984-11-20",
    "One Piece":       "1997-07-22",
    "Attack on Titan": "2009-09-09"
};

document.querySelectorAll(".manga").forEach(function (manga) {
    const nombre = manga.getAttribute("data-nombre");
    const fecha = fechas[nombre];
    if (fecha) {
        manga.setAttribute("data-fecha", fecha);
        const h2 = manga.querySelector("h2");
        const fechaTexto = document.createElement("p");
        fechaTexto.classList.add("fecha-publicacion");
        fechaTexto.textContent = "📅 Publicado: " + new Date(fecha).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
        fechaTexto.style.fontSize = "13px";
        fechaTexto.style.color = "#888";
        fechaTexto.style.marginTop = "-10px";
        fechaTexto.style.marginBottom = "8px";
        h2.insertAdjacentElement("afterend", fechaTexto);
    }
});


// 3. ORDENAMIENTO
const divOrden = document.createElement("div");
divOrden.style.textAlign = "center";
divOrden.style.marginBottom = "20px";

const btnAZ = document.createElement("button");
btnAZ.textContent = "🔤 A - Z";
btnAZ.className = "boton-manga";
btnAZ.style.marginRight = "10px";

const btnFecha = document.createElement("button");
btnFecha.textContent = "📅 Más antiguos";
btnFecha.className = "boton-manga";
btnFecha.style.marginRight = "10px";

const btnFechaDesc = document.createElement("button");
btnFechaDesc.textContent = "📅 Más recientes";
btnFechaDesc.className = "boton-manga";

divOrden.appendChild(btnAZ);
divOrden.appendChild(btnFecha);
divOrden.appendChild(btnFechaDesc);

const divMangas = document.querySelector(".mangas");
divMangas.insertAdjacentElement("beforebegin", divOrden);

function ordenar(tipo) {
    const tabla = document.querySelector(".mangas table");
    const filas = Array.from(tabla.querySelectorAll("tr")).filter(tr => tr.querySelector(".manga"));

    filas.sort(function (a, b) {
        const mangaA = a.querySelector(".manga");
        const mangaB = b.querySelector(".manga");

        if (tipo === "az") {
            const nombreA = mangaA.getAttribute("data-nombre").toLowerCase();
            const nombreB = mangaB.getAttribute("data-nombre").toLowerCase();
            return nombreA.localeCompare(nombreB);
        } else if (tipo === "fecha_asc") {
            return new Date(mangaA.getAttribute("data-fecha")) - new Date(mangaB.getAttribute("data-fecha"));
        } else if (tipo === "fecha_desc") {
            return new Date(mangaB.getAttribute("data-fecha")) - new Date(mangaA.getAttribute("data-fecha"));
        }
    });

    filas.forEach(function (fila) {
        tabla.appendChild(fila);
    });
}

btnAZ.addEventListener("click", function () { ordenar("az"); });
btnFecha.addEventListener("click", function () { ordenar("fecha_asc"); });
btnFechaDesc.addEventListener("click", function () { ordenar("fecha_desc"); });


// 4. MENSAJE "SIN RESULTADOS"
const inputBuscar = document.getElementById("buscarManga");

const mensajeVacio = document.createElement("p");
mensajeVacio.id = "sin-resultados";
mensajeVacio.textContent = "No se encontró ningún manga con ese nombre.";
mensajeVacio.style.textAlign = "center";
mensajeVacio.style.color = "white";
mensajeVacio.style.fontSize = "1.1rem";
mensajeVacio.style.textShadow = "1px 1px 4px black";
mensajeVacio.style.display = "none";
mensajeVacio.style.marginTop = "15px";
inputBuscar.parentElement.insertAdjacentElement("afterend", mensajeVacio);


// 5. BUSCADOR
inputBuscar.addEventListener("input", function () {
    const texto = this.value.toLowerCase().trim();
    const mangas = document.querySelectorAll(".manga");
    let hayVisible = false;

    mangas.forEach(function (manga) {
        const nombre = manga.getAttribute("data-nombre").toLowerCase();
        const fila = manga.closest("tr");

        if (nombre.includes(texto)) {
            if (fila) fila.style.display = "";
            hayVisible = true;
        } else {
            if (fila) fila.style.display = "none";
        }
    });

    mensajeVacio.style.display = hayVisible ? "none" : "block";
});

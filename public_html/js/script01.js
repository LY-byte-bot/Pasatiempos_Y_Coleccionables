// 1. BOTONES "LEER MÁS" - Expandir / Contraer
const botones = document.querySelectorAll(".boton-comic");

botones.forEach(function (boton) {
    const parrafo = boton.previousElementSibling;

    // Limpiar espacios y saltos de línea extra
    const textoCompleto = parrafo.innerText.trim().replace(/\s+/g, " ");

    // Recortar a 100 caracteres para el resumen
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
    "Spider-Man": "1962-03-01",
    "Batman": "1939-05-01",
    "Superman": "1938-06-01",
    "Iron Man": "1963-03-01"
};

document.querySelectorAll(".comic").forEach(function (comic) {
    const nombre = comic.getAttribute("data-nombre");
    const fecha = fechas[nombre];
    if (fecha) {
        comic.setAttribute("data-fecha", fecha);
        const h2 = comic.querySelector("h2");
        const fechaTexto = document.createElement("p");
        fechaTexto.classList.add("fecha-publicacion");
        fechaTexto.textContent = "📅 Publicado: " + new Date(fecha).toLocaleDateString("es-ES", {year: "numeric", month: "long", day: "numeric"});
        fechaTexto.style.fontSize = "13px";
        fechaTexto.style.color = "#888";
        fechaTexto.style.marginTop = "-10px";
        fechaTexto.style.marginBottom = "8px";
        h2.insertAdjacentElement("afterend", fechaTexto);
    }
});


// 3. ORDENAMIENTO
const contenedor = document.querySelector(".comics table tbody") || document.querySelector(".comics table");

// Crear botones de ordenamiento
const divOrden = document.createElement("div");
divOrden.style.textAlign = "center";
divOrden.style.marginBottom = "20px";

const btnAZ = document.createElement("button");
btnAZ.textContent = "🔤 A - Z";
btnAZ.className = "boton-comic";
btnAZ.style.marginRight = "10px";

const btnFecha = document.createElement("button");
btnFecha.textContent = "📅 Más antiguos";
btnFecha.className = "boton-comic";
btnFecha.style.marginRight = "10px";

const btnFechaDesc = document.createElement("button");
btnFechaDesc.textContent = "📅 Más recientes";
btnFechaDesc.className = "boton-comic";

divOrden.appendChild(btnAZ);
divOrden.appendChild(btnFecha);
divOrden.appendChild(btnFechaDesc);

// Insertar antes de la tabla
const divComics = document.querySelector(".comics");
divComics.insertAdjacentElement("beforebegin", divOrden);

function ordenar(tipo) {
    const tabla = document.querySelector(".comics table");
    const filas = Array.from(tabla.querySelectorAll("tr")).filter(tr => tr.querySelector(".comic"));

    filas.sort(function (a, b) {
        const comicA = a.querySelector(".comic");
        const comicB = b.querySelector(".comic");

        if (tipo === "az") {
            const nombreA = comicA.getAttribute("data-nombre").toLowerCase();
            const nombreB = comicB.getAttribute("data-nombre").toLowerCase();
            return nombreA.localeCompare(nombreB);
        } else if (tipo === "fecha_asc") {
            return new Date(comicA.getAttribute("data-fecha")) - new Date(comicB.getAttribute("data-fecha"));
        } else if (tipo === "fecha_desc") {
            return new Date(comicB.getAttribute("data-fecha")) - new Date(comicA.getAttribute("data-fecha"));
        }
    });

    filas.forEach(function (fila) {
        tabla.appendChild(fila);
    });
}

btnAZ.addEventListener("click", function () {
    ordenar("az");
});
btnFecha.addEventListener("click", function () {
    ordenar("fecha_asc");
});
btnFechaDesc.addEventListener("click", function () {
    ordenar("fecha_desc");
});


// 4. MENSAJE "SIN RESULTADOS"
const inputBuscar = document.getElementById("buscarComic");

const mensajeVacio = document.createElement("p");
mensajeVacio.id = "sin-resultados";
mensajeVacio.textContent = "No se encontró ningún cómic con ese nombre.";
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
    const comics = document.querySelectorAll(".comic");
    let hayVisible = false;

    comics.forEach(function (comic) {
        const nombre = comic.getAttribute("data-nombre").toLowerCase();
        const fila = comic.closest("tr");

        if (nombre.includes(texto)) {
            if (fila)
                fila.style.display = "";
            hayVisible = true;
        } else {
            if (fila)
                fila.style.display = "none";
        }
    });

    mensajeVacio.style.display = hayVisible ? "none" : "block";
});

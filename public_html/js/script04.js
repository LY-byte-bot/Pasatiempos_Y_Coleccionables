
// 1. BOTONES "LEER MÁS" - Expandir / Contraer
const botones = document.querySelectorAll(".boton-pintura");

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
    "La Mona Lisa":        "1503-01-01",
    "La Noche Estrellada": "1889-06-01",
    "Las Meninas":         "1656-01-01",
    "La Creación de Adán": "1512-01-01"
};

document.querySelectorAll(".pintura").forEach(function (pintura) {
    const nombre = pintura.getAttribute("data-nombre");
    const fecha = fechas[nombre];
    if (fecha) {
        pintura.setAttribute("data-fecha", fecha);
        const h2 = pintura.querySelector("h2");
        const fechaTexto = document.createElement("p");
        fechaTexto.classList.add("fecha-publicacion");
        fechaTexto.textContent = "🎨 Creada: " + new Date(fecha).toLocaleDateString("es-ES", { year: "numeric", month: "long" });
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
btnAZ.className = "boton-pintura";
btnAZ.style.marginRight = "10px";

const btnFecha = document.createElement("button");
btnFecha.textContent = "🎨 Más antiguas";
btnFecha.className = "boton-pintura";
btnFecha.style.marginRight = "10px";

const btnFechaDesc = document.createElement("button");
btnFechaDesc.textContent = "🎨 Más recientes";
btnFechaDesc.className = "boton-pintura";

divOrden.appendChild(btnAZ);
divOrden.appendChild(btnFecha);
divOrden.appendChild(btnFechaDesc);

const divPinturas = document.querySelector(".pinturas");
divPinturas.insertAdjacentElement("beforebegin", divOrden);

function ordenar(tipo) {
    const tabla = document.querySelector(".pinturas table");
    const filas = Array.from(tabla.querySelectorAll("tr")).filter(tr => tr.querySelector(".pintura"));

    filas.sort(function (a, b) {
        const pinturaA = a.querySelector(".pintura");
        const pinturaB = b.querySelector(".pintura");

        if (tipo === "az") {
            const nombreA = pinturaA.getAttribute("data-nombre").toLowerCase();
            const nombreB = pinturaB.getAttribute("data-nombre").toLowerCase();
            return nombreA.localeCompare(nombreB);
        } else if (tipo === "fecha_asc") {
            return new Date(pinturaA.getAttribute("data-fecha")) - new Date(pinturaB.getAttribute("data-fecha"));
        } else if (tipo === "fecha_desc") {
            return new Date(pinturaB.getAttribute("data-fecha")) - new Date(pinturaA.getAttribute("data-fecha"));
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
const inputBuscar = document.getElementById("buscarPintura");

const mensajeVacio = document.createElement("p");
mensajeVacio.id = "sin-resultados";
mensajeVacio.textContent = "No se encontró ninguna pintura con ese nombre.";
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
    const pinturas = document.querySelectorAll(".pintura");
    let hayVisible = false;

    pinturas.forEach(function (pintura) {
        const nombre = pintura.getAttribute("data-nombre").toLowerCase();
        const fila = pintura.closest("tr");

        if (nombre.includes(texto)) {
            if (fila) fila.style.display = "";
            hayVisible = true;
        } else {
            if (fila) fila.style.display = "none";
        }
    });

    mensajeVacio.style.display = hayVisible ? "none" : "block";
});

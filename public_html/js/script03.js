
const botones = document.querySelectorAll(".boton-disco");

botones.forEach(function (boton) {
    const parrafo = boton.previousElementSibling;

    const textoCompleto = parrafo.innerHTML;
    const oraciones = textoCompleto.split(". ");
    const resumen = oraciones.slice(0, 2).join(". ") + (oraciones.length > 2 ? "..." : "");

    parrafo.innerHTML = resumen;
    let expandido = false;

    boton.addEventListener("click", function () {
        if (!expandido) {
            parrafo.innerHTML = textoCompleto;
            boton.textContent = "Leer menos";
            expandido = true;
        } else {
            parrafo.innerHTML = resumen;
            boton.textContent = "Leer más";
            expandido = false;
        }
    });
});



const inputBuscar = document.getElementById("buscarDisco");

const mensajeVacio = document.createElement("p");
mensajeVacio.id = "sin-resultados";
mensajeVacio.textContent = "No se encontró ningún disco con ese nombre.";
mensajeVacio.style.textAlign = "center";
mensajeVacio.style.color = "white";
mensajeVacio.style.fontSize = "1.1rem";
mensajeVacio.style.textShadow = "1px 1px 4px black";
mensajeVacio.style.display = "none";
mensajeVacio.style.marginTop = "15px";
inputBuscar.parentElement.insertAdjacentElement("afterend", mensajeVacio);


inputBuscar.addEventListener("input", function () {
    const texto = this.value.toLowerCase().trim();
    const discos = document.querySelectorAll(".disco");
    let hayVisible = false;

    discos.forEach(function (disco) {
        const nombre = disco.getAttribute("data-nombre").toLowerCase();
        const fila = disco.closest("tr");

        if (nombre.includes(texto)) {
            if (fila) fila.style.display = "";
            hayVisible = true;
        } else {
            if (fila) fila.style.display = "none";
        }
    });

    mensajeVacio.style.display = hayVisible ? "none" : "block";
});

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//*control de carrusel*//
const slides = [
    {
        radio: document.getElementById("slide1"),
        descripcion: "Maquina Arcade Clásica"
    },
    {
        radio: document.getElementById("slide2"),
        descripcion: "Rockola Vintage"
    },
    {
        radio: document.getElementById("slide3"),
        descripcion:"Pinball de Colección"
    }
    
];

let indiceActual = 0;

const descripcion = document.getElementById("descripcion-carrusel");

function mostrarSlide(indice){
    slides[indice].radio.checked = true;
    descripcion.textContent = slides[indice].descripcion;
    indiceActual = indice;
}

function siguienteSlide() {
    let siguiente = indiceActual + 1;

    if (siguiente >= slides.length) {
        siguiente = 0;
    }

    mostrarSlide(siguiente);
}

function anteriorSlide() {
    let anterior = indiceActual - 1;

    if (anterior < 0) {
        anterior = slides.length - 1;
    }

    mostrarSlide(anterior);
}

document.getElementById("siguiente")
        .addEventListener("click", siguienteSlide);

document.getElementById("anterior")
        .addEventListener("click", anteriorSlide);

slides.forEach((slide, indice) => {
    slide.radio.addEventListener("change", () => {
        indiceActual = indice;
        descripcion.textContent = slide.descripcion;
    });
});

let temporizador = setInterval(siguienteSlide, 4000);



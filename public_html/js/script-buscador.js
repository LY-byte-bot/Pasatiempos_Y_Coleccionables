/*scripts generales (utilizados por varias paginas, antiguedades, arcade, artistas80s)*/


const buscador = document.getElementById("buscar");
const tarjetas = document.querySelectorAll(".card");

buscador.addEventListener("keyup", function () {

    const texto = this.value.toLowerCase();

    tarjetas.forEach(function (tarjeta) {

        const contenido = tarjeta.textContent.toLowerCase();

        if (contenido.includes(texto)) {
            tarjeta.style.display = "flex";
        } else {
            tarjeta.style.display = "none";
        }

    });

});

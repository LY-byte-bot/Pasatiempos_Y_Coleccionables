/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const botonesFavoritos = document.querySelectorAll('.btn-favorito');

if (botonesFavoritos.length > 0) {
    botonesFavoritos.forEach(boton => {
        boton.addEventListener('click', function() {
            const idArticulo = this.getAttribute('data-id');
            const tituloArticulo = this.getAttribute('data-titulo');
            const imgArticulo = this.getAttribute('data-img');

           // AQUI ESTA EL ARREGLO
            let canastaFavoritos = JSON.parse(sessionStorage.getItem('misFavoritos')) || [];

            const yaExiste = canastaFavoritos.find(item => item.id === idArticulo);

            if (yaExiste) {
                alert("¡Este artículo ya está en tu colección temporal!");
            } else {
                canastaFavoritos.push({
                    id: idArticulo,
                    titulo: tituloArticulo,
                    img: imgArticulo
                });

                //  sesión actual
                sessionStorage.setItem('misFavoritos', JSON.stringify(canastaFavoritos));
                
                this.style.backgroundColor = "gold";
                this.style.color = "rgb(41, 59, 81)";
                this.innerText = "✔️ Guardado";
                
                alert("¡Añadido a tu sesión actual");
            }
        });
    });
}


// PARTE 2: MOSTRAR FAVORITOS


const contenedorFavoritos = document.getElementById('contenedor-favoritos');

if (contenedorFavoritos) {
    function mostrarFavoritos() {
        // CONTENIDO ACTUAL DEL ARREGLO
        const misFavoritos = JSON.parse(sessionStorage.getItem('misFavoritos')) || [];
        contenedorFavoritos.innerHTML = "";

        if (misFavoritos.length === 0) {
            contenedorFavoritos.innerHTML = `
                <h3 style="color: white; text-align: center; grid-column: 1 / -1; margin-top: 50px;">
                    Aún no tienes curiosidades.
                </h3>
            `;
            return;
        }

        misFavoritos.forEach(item => {
            const tarjetaHTML = `
                <div class="card">
                    <div class="card-img-container">
                        <img src="${item.img}" class="card-img" alt="${item.titulo}">
                    </div>
                    <div class="card-text">
                        <h3>${item.titulo}</h3>
                        <button type="button" class="btn-eliminar-favorito" data-id="${item.id}">
                            Eliminar de favoritos
                        </button>
                    </div>
                </div>
            `;
            contenedorFavoritos.innerHTML += tarjetaHTML;
        });
    }
//correción del contenedor favoritos
    contenedorFavoritos.addEventListener('click', function (evento) {
        const botonEliminar = evento.target.closest('.btn-eliminar-favorito');

        if (!botonEliminar) {
            return;
        }

        const deseaEliminar = confirm('¿Estás seguro de que deseas eliminar este objeto de favoritos?');

        if (deseaEliminar) {
            const idArticulo = botonEliminar.getAttribute('data-id');
            const misFavoritos = JSON.parse(sessionStorage.getItem('misFavoritos')) || [];
            const favoritosActualizados = misFavoritos.filter(item => item.id !== idArticulo);

            sessionStorage.setItem('misFavoritos', JSON.stringify(favoritosActualizados));
            mostrarFavoritos();
        }
    });

    mostrarFavoritos();
}

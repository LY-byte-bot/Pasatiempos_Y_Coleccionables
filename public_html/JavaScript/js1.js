/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
// Seleccionamos todos los botones de favoritos
const botonesFavoritos = document.querySelectorAll('.btn-favorito');

botonesFavoritos.forEach(boton => {
    boton.addEventListener('click', function() {
        // 1. Obtener la información del artículo desde los atributos 'data-'
        const idArticulo = this.getAttribute('data-id');
        const tituloArticulo = this.getAttribute('data-titulo');
        const imgArticulo = this.getAttribute('data-img');

        // 2. Leer la "canasta" del localStorage. 
        // CONDICIONAL INICIAL: Si no hay nada, creamos un arreglo vacío []
        let canastaFavoritos = JSON.parse(localStorage.getItem('misFavoritos'));
        if (!canastaFavoritos) {
            canastaFavoritos = [];
        }

        // 3. CONDICIONAL PRINCIPAL: Comprobar si el artículo ya existe en la canasta
        const yaExiste = canastaFavoritos.find(item => item.id === idArticulo);

        if (yaExiste) {
            // SI YA EXISTE: Le avisamos al usuario
            alert("¡Este artículo ya está en tu colección de favoritos!");
        } else {
            // SI NO EXISTE (ELSE): Lo agregamos a la canasta
            canastaFavoritos.push({
                id: idArticulo,
                titulo: tituloArticulo,
                img: imgArticulo
            });

            // Guardamos la canasta actualizada en el navegador
            localStorage.setItem('misFavoritos', JSON.stringify(canastaFavoritos));
            
            // Efecto visual: Cambiamos el color del botón para confirmar
            this.style.backgroundColor = "gold";
            this.style.color = "rgb(41, 59, 81)";
            this.innerText = "✔️ Guardado";
            
            alert("¡Añadido a tus favoritos!");
        }
    });
});


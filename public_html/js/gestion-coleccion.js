class Coleccionable {
    constructor(id, nombre, categoria, precio, estado, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = Number(precio);
        this.estado = estado;
        this.cantidad = Number(cantidad);
    }

    calcularSubtotal() {
        return this.precio * this.cantidad;
    }
}

const CLAVE_ALMACENAMIENTO = 'coleccionablesRegistrados';
const estados = ['Nuevo', 'Usado', 'Restaurado'];
localStorage.removeItem(CLAVE_ALMACENAMIENTO);
let coleccionables = cargarColeccionables();

const formulario = document.getElementById('formulario-coleccionable');
const cuerpoTabla = document.getElementById('cuerpo-coleccionables');
const cuerpoMatriz = document.getElementById('cuerpo-matriz');
const busqueda = document.getElementById('busqueda');
const criterioOrden = document.getElementById('criterio-orden');
const mensajeFormulario = document.getElementById('mensaje-formulario');

function cargarColeccionables() {
    let datosGuardados = [];
    try {
        datosGuardados = JSON.parse(sessionStorage.getItem(CLAVE_ALMACENAMIENTO)) || [];
    } catch (error) {
        console.error('No fue posible leer la colección guardada:', error);
    }
    return datosGuardados.map(dato => new Coleccionable(
        dato.id, dato.nombre, dato.categoria, dato.precio, dato.estado, dato.cantidad
    ));
}

function escaparHTML(texto) {
    const elemento = document.createElement('span');
    elemento.textContent = String(texto);
    return elemento.innerHTML;
}

function guardarColeccionables() {
    sessionStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(coleccionables));
}

function generarId() {
    let mayorId = 0;
    for (let i = 0; i < coleccionables.length; i++) {
        const numeroId = Number(coleccionables[i].id.replace('COL-', ''));
        if (numeroId > mayorId) mayorId = numeroId;
    }
    return `COL-${String(mayorId + 1).padStart(3, '0')}`;
}

function obtenerDatosFormulario() {
    return {
        id: document.getElementById('id-coleccionable').value,
        nombre: document.getElementById('nombre').value.trim(),
        categoria: document.getElementById('categoria').value,
        precio: Number(document.getElementById('precio').value),
        estado: document.getElementById('estado').value,
        cantidad: Number(document.getElementById('cantidad').value)
    };
}

function validarDatos(datos) {
    return datos.nombre !== '' && datos.categoria !== '' && datos.precio > 0 &&
            datos.estado !== '' && Number.isInteger(datos.cantidad) && datos.cantidad > 0;
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const datos = obtenerDatosFormulario();

    if (!validarDatos(datos)) {
        mostrarMensaje('Completa todos los campos con valores válidos.', true);
        return;
    }

    if (datos.id === '') {
        coleccionables.push(new Coleccionable(
            generarId(), datos.nombre, datos.categoria, datos.precio, datos.estado, datos.cantidad
        ));
        mostrarMensaje('Coleccionable agregado correctamente.');
    } else {
        const indice = coleccionables.findIndex(item => item.id === datos.id);
        if (indice !== -1) {
            coleccionables[indice] = new Coleccionable(
                datos.id, datos.nombre, datos.categoria, datos.precio, datos.estado, datos.cantidad
            );
            mostrarMensaje('Coleccionable actualizado correctamente.');
        }
    }

    guardarColeccionables();
    limpiarFormulario();
    actualizarInterfaz();
});

function editarColeccionable(id) {
    const item = coleccionables.find(coleccionable => coleccionable.id === id);
    if (!item) return;

    document.getElementById('id-coleccionable').value = item.id;
    document.getElementById('nombre').value = item.nombre;
    document.getElementById('categoria').value = item.categoria;
    document.getElementById('precio').value = item.precio;
    document.getElementById('estado').value = item.estado;
    document.getElementById('cantidad').value = item.cantidad;
    document.getElementById('titulo-formulario').textContent = `Editar ${item.nombre}`;
    document.getElementById('boton-guardar').textContent = 'Guardar cambios';
    document.getElementById('boton-cancelar').hidden = false;
    formulario.scrollIntoView({behavior: 'smooth', block: 'center'});
}

function eliminarColeccionable(id) {
    const item = coleccionables.find(coleccionable => coleccionable.id === id);
    if (!item || !confirm(`¿Deseas eliminar "${item.nombre}" de la colección?`)) return;

    coleccionables = coleccionables.filter(coleccionable => coleccionable.id !== id);
    guardarColeccionables();
    limpiarFormulario();
    mostrarMensaje('Coleccionable eliminado correctamente.');
    actualizarInterfaz();
}

function limpiarFormulario() {
    formulario.reset();
    document.getElementById('id-coleccionable').value = '';
    document.getElementById('titulo-formulario').textContent = 'Registrar coleccionable';
    document.getElementById('boton-guardar').textContent = 'Agregar';
    document.getElementById('boton-cancelar').hidden = true;
}

function mostrarMensaje(texto, esError = false) {
    mensajeFormulario.textContent = texto;
    mensajeFormulario.classList.toggle('error', esError);
}

document.getElementById('boton-cancelar').addEventListener('click', function () {
    limpiarFormulario();
    mostrarMensaje('Edición cancelada.');
});

function comparar(a, b, criterio) {
    switch (criterio) {
        case 'nombre-asc': return a.nombre.localeCompare(b.nombre);
        case 'nombre-desc': return b.nombre.localeCompare(a.nombre);
        case 'precio-asc': return a.precio - b.precio;
        case 'precio-desc': return b.precio - a.precio;
        case 'cantidad-desc': return b.cantidad - a.cantidad;
        case 'categoria': return a.categoria.localeCompare(b.categoria);
        default: return a.id.localeCompare(b.id, undefined, {numeric: true});
    }
}

function ordenarConBurbuja(datos, criterio) {
    const ordenados = [...datos];
    for (let i = 0; i < ordenados.length - 1; i++) {
        for (let j = 0; j < ordenados.length - i - 1; j++) {
            if (comparar(ordenados[j], ordenados[j + 1], criterio) > 0) {
                const temporal = ordenados[j];
                ordenados[j] = ordenados[j + 1];
                ordenados[j + 1] = temporal;
            }
        }
    }
    return ordenados;
}

function obtenerResultados() {
    const texto = busqueda.value.toLowerCase().trim();
    const encontrados = coleccionables.filter(item =>
        item.id.toLowerCase().includes(texto) || item.nombre.toLowerCase().includes(texto) ||
        item.categoria.toLowerCase().includes(texto) || item.estado.toLowerCase().includes(texto)
    );
    return ordenarConBurbuja(encontrados, criterioOrden.value);
}

function mostrarColeccionables() {
    const resultados = obtenerResultados();
    cuerpoTabla.innerHTML = '';

    resultados.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${escaparHTML(item.id)}</td><td>${escaparHTML(item.nombre)}</td><td>${escaparHTML(item.categoria)}</td>
            <td>S/ ${item.precio.toFixed(2)}</td><td>${escaparHTML(item.estado)}</td><td>${item.cantidad}</td>
            <td>S/ ${item.calcularSubtotal().toFixed(2)}</td>
            <td class="acciones-tabla">
                <button type="button" class="boton-editar" data-accion="editar" data-id="${item.id}">Editar</button>
                <button type="button" class="boton-eliminar" data-accion="eliminar" data-id="${item.id}">Eliminar</button>
            </td>`;
        cuerpoTabla.appendChild(fila);
    });

    document.getElementById('sin-resultados').hidden = resultados.length !== 0;
}

cuerpoTabla.addEventListener('click', function (evento) {
    const boton = evento.target.closest('button[data-accion]');
    if (!boton) return;
    if (boton.dataset.accion === 'editar') editarColeccionable(boton.dataset.id);
    if (boton.dataset.accion === 'eliminar') eliminarColeccionable(boton.dataset.id);
});

function mostrarEstadisticas() {
    let totalUnidades = 0;
    let valorTotal = 0;
    const cantidadesCategoria = {};

    coleccionables.forEach(item => {
        totalUnidades += item.cantidad;
        valorTotal += item.calcularSubtotal();
        cantidadesCategoria[item.categoria] = (cantidadesCategoria[item.categoria] || 0) + item.cantidad;
    });

    const objetoCaro = coleccionables.reduce((mayor, item) => !mayor || item.precio > mayor.precio ? item : mayor, null);
    const categoriaFrecuente = Object.entries(cantidadesCategoria)
        .reduce((mayor, actual) => !mayor || actual[1] > mayor[1] ? actual : mayor, null);

    document.getElementById('total-registros').textContent = coleccionables.length;
    document.getElementById('total-unidades').textContent = totalUnidades;
    document.getElementById('valor-total').textContent = `S/ ${valorTotal.toFixed(2)}`;
    document.getElementById('precio-promedio').textContent = `S/ ${coleccionables.length ? (valorTotal / totalUnidades).toFixed(2) : '0.00'}`;
    document.getElementById('objeto-caro').textContent = objetoCaro ? objetoCaro.nombre : '—';
    document.getElementById('categoria-frecuente').textContent = categoriaFrecuente ? categoriaFrecuente[0] : '—';
}

function construirMatriz() {
    const categorias = [...new Set(coleccionables.map(item => item.categoria))];
    const matriz = [];

    for (let i = 0; i < categorias.length; i++) {
        const fila = [categorias[i], 0, 0, 0];
        for (let j = 0; j < coleccionables.length; j++) {
            if (coleccionables[j].categoria === categorias[i]) {
                const columnaEstado = estados.indexOf(coleccionables[j].estado) + 1;
                fila[columnaEstado] += coleccionables[j].cantidad;
            }
        }
        matriz.push(fila);
    }
    return matriz;
}

function mostrarMatriz() {
    const matriz = construirMatriz();
    cuerpoMatriz.innerHTML = '';

    if (matriz.length === 0) {
        cuerpoMatriz.innerHTML = '<tr><td colspan="5">Registra objetos para generar la matriz.</td></tr>';
        return;
    }

    for (let i = 0; i < matriz.length; i++) {
        const totalFila = matriz[i][1] + matriz[i][2] + matriz[i][3];
        cuerpoMatriz.innerHTML += `<tr><td>${escaparHTML(matriz[i][0])}</td><td>${matriz[i][1]}</td><td>${matriz[i][2]}</td><td>${matriz[i][3]}</td><td>${totalFila}</td></tr>`;
    }
}

function actualizarInterfaz() {
    mostrarColeccionables();
    mostrarEstadisticas();
    mostrarMatriz();
}

busqueda.addEventListener('input', mostrarColeccionables);
criterioOrden.addEventListener('change', mostrarColeccionables);
actualizarInterfaz();

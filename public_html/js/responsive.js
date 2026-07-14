document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    if (navbar && !document.querySelector('.boton-menu')) {
        const botonMenu = document.createElement('button');
        botonMenu.type = 'button';
        botonMenu.className = 'boton-menu';
        botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-controls', 'menu-principal');
        botonMenu.innerHTML = '<span></span><span></span><span></span>';

        navbar.id = 'menu-principal';
        navbar.parentElement.insertBefore(botonMenu, navbar);

        function cerrarMenu() {
            navbar.classList.remove('menu-abierto');
            botonMenu.classList.remove('activo');
            botonMenu.setAttribute('aria-expanded', 'false');
            botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
        }

        botonMenu.addEventListener('click', function () {
            const estaAbierto = navbar.classList.toggle('menu-abierto');
            botonMenu.classList.toggle('activo', estaAbierto);
            botonMenu.setAttribute('aria-expanded', String(estaAbierto));
            botonMenu.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        });

        navbar.addEventListener('click', function (evento) {
            if (evento.target.closest('a')) {
                cerrarMenu();
            }
        });

        document.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') {
                cerrarMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                cerrarMenu();
            }
        });
    }

    const botonSubir = document.createElement('button');
    botonSubir.type = 'button';
    botonSubir.className = 'boton-subir';
    botonSubir.setAttribute('aria-label', 'Volver al inicio de la página');
    botonSubir.textContent = '↑';
    document.body.appendChild(botonSubir);

    function actualizarBotonSubir() {
        botonSubir.classList.toggle('visible', window.scrollY > 300);
    }

    window.addEventListener('scroll', actualizarBotonSubir, {passive: true});

    botonSubir.addEventListener('click', function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    actualizarBotonSubir();
});

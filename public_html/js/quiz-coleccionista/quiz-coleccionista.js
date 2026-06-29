function calcularResultado() {

    const respuestas = document.querySelectorAll('input[type="radio"]:checked');

    if (respuestas.length < 5) {
        alert("Responde todas las preguntas.");
        return;
    }

    let puntaje = 0;

    respuestas.forEach(respuesta => {
        puntaje += Number(respuesta.value);
    });

    let mensaje = "";

    if (puntaje == 5) {
        mensaje = "🏆 ¡Excelente! Eres un verdadero coleccionista.";
    }
    else if (puntaje >= 3) {
        mensaje = "👍 Buen trabajo. Conoces bastante sobre el coleccionismo.";
    }
    else {
        mensaje = "📚 Sigue aprendiendo. Aún puedes mejorar tus conocimientos.";
    }

    document.getElementById("resultado").innerHTML =
        `Obtuviste ${puntaje} de 5 puntos.<br>${mensaje}`;
}


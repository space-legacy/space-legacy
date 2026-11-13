// ==========================================
// 1. CATÁLOGO DE EQUIPOS ESPACIALES
// ==========================================

const equipos = [
    {
        nombre: "Módulo Lunar Apolo 11",
        ubicacion: "luna",
        descripcion: "Etapa de descenso del módulo lunar que permaneció en la superficie de la Luna."
    },
    {
        nombre: "Vehículo Lunar Rover",
        ubicacion: "luna",
        descripcion: "Vehículo utilizado por los astronautas para desplazarse por la superficie lunar."
    },
    {
        nombre: "Surveyor 3",
        ubicacion: "luna",
        descripcion: "Sonda robótica que aterrizó en la Luna en 1967."
    },
    {
        nombre: "Viking 1",
        ubicacion: "marte",
        descripcion: "Módulo de aterrizaje que llegó a Marte en 1976."
    },
    {
        nombre: "Mars Pathfinder",
        ubicacion: "marte",
        descripcion: "Misión que llevó el vehículo Sojourner a la superficie marciana."
    },
    {
        nombre: "Opportunity",
        ubicacion: "marte",
        descripcion: "Vehículo explorador que estudió la superficie de Marte."
    }
];

// Buscar elementos del catálogo
const contenedorEquipos = document.getElementById("equipmentGrid");
const botonesFiltro = document.querySelectorAll(".filter-btn");

// Mostrar equipos
function mostrarEquipos(categoria = "todos") {

    const equiposFiltrados = equipos.filter(equipo =>
        categoria === "todos" || equipo.ubicacion === categoria
    );

    contenedorEquipos.innerHTML = "";

    equiposFiltrados.forEach(equipo => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("equipment-card");

        tarjeta.innerHTML = `
            <h3>${equipo.nombre}</h3>
            <p><strong>Ubicación:</strong> ${equipo.ubicacion === "luna" ? "Luna" : "Marte"}</p>
            <p>${equipo.descripcion}</p>
        `;

        contenedorEquipos.appendChild(tarjeta);
    });
}

// Activar filtros
botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesFiltro.forEach(elemento => {
            elemento.classList.remove("active");
        });

        boton.classList.add("active");
        mostrarEquipos(boton.dataset.filter);
    });

});

// Mostrar todos los equipos al cargar
mostrarEquipos();


// ==========================================
// 2. JUEGO DE PREGUNTAS ESPACIALES
// ==========================================

const preguntas = [
    {
        pregunta: "¿En qué año llegó el ser humano a la Luna por primera vez?",
        opciones: ["1959", "1969", "1979", "1989"],
        correcta: 1,
        explicacion: "El Apolo 11 llegó a la Luna en julio de 1969."
    },
    {
        pregunta: "¿Cuál fue el vehículo explorador que llegó a Marte con la misión Mars Pathfinder?",
        opciones: ["Opportunity", "Curiosity", "Sojourner", "Perseverance"],
        correcta: 2,
        explicacion: "Sojourner llegó a Marte en 1997 con la misión Mars Pathfinder."
    },
    {
        pregunta: "¿Qué planeta es conocido como el planeta rojo?",
        opciones: ["Venus", "Júpiter", "Marte", "Saturno"],
        correcta: 2,
        explicacion: "Marte recibe ese nombre por el aspecto rojizo de su superficie."
    },
    {
        pregunta: "¿Qué misión llevó a los primeros astronautas que caminaron sobre la Luna?",
        opciones: ["Apolo 11", "Viking 1", "Mars Pathfinder", "Voyager 1"],
        correcta: 0,
        explicacion: "La misión Apolo 11 llevó a Neil Armstrong y Buzz Aldrin a la superficie lunar."
    },
    {
        pregunta: "¿Qué tipo de equipo es Opportunity?",
        opciones: ["Un satélite terrestre", "Un vehículo explorador de Marte", "Un telescopio lunar", "Una estación espacial"],
        correcta: 1,
        explicacion: "Opportunity fue un vehículo explorador robótico que estudió Marte."
    }
];

let preguntaActual = 0;
let puntos = 0;
let respondida = false;

// Elementos del juego
const numeroPregunta = document.getElementById("numeroPregunta");
const marcador = document.getElementById("marcador");
const barraProgreso = document.getElementById("progreso");
const textoPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("opciones");
const mensajeRespuesta = document.getElementById("mensajeRespuesta");
const botonSiguiente = document.getElementById("siguientePregunta");
const resultadoJuego = document.getElementById("resultadoJuego");
const textoResultado = document.getElementById("textoResultado");
const botonReiniciar = document.getElementById("reiniciarJuego");

// Cargar una pregunta
function cargarPregunta() {

    respondida = false;

    const pregunta = preguntas[preguntaActual];

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    marcador.textContent = `Puntos: ${puntos}`;

    barraProgreso.style.width =
        `${((preguntaActual + 1) / preguntas.length) * 100}%`;

    textoPregunta.textContent = pregunta.pregunta;

    mensajeRespuesta.textContent = "";
    contenedorOpciones.innerHTML = "";
    botonSiguiente.hidden = true;
    resultadoJuego.hidden = true;

    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.classList.add("opcion");
        boton.textContent = opcion;

        boton.addEventListener("click", () => {
            comprobarRespuesta(indice, boton);
        });

        contenedorOpciones.appendChild(boton);
    });
}

// Comprobar respuesta
function comprobarRespuesta(indice, botonSeleccionado) {

    if (respondida) return;

    respondida = true;

    const pregunta = preguntas[preguntaActual];
    const botones = contenedorOpciones.querySelectorAll(".opcion");

    botones.forEach((boton, indiceBoton) => {

        boton.disabled = true;

        if (indiceBoton === pregunta.correcta) {
            boton.classList.add("correcta");
        }
    });

    if (indice === pregunta.correcta) {

        puntos++;

        mensajeRespuesta.textContent =
            "¡Respuesta correcta! " + pregunta.explicacion;

    } else {

        botonSeleccionado.classList.add("incorrecta");

        mensajeRespuesta.textContent =
            "Respuesta incorrecta. " + pregunta.explicacion;
    }

    marcador.textContent = `Puntos: ${puntos}`;
    botonSiguiente.hidden = false;

    if (preguntaActual === preguntas.length - 1) {
        botonSiguiente.textContent = "Ver resultado";
    } else {
        botonSiguiente.textContent = "Siguiente pregunta";
    }
}

// Pasar a la siguiente pregunta o mostrar resultado
botonSiguiente.addEventListener("click", () => {

    if (preguntaActual < preguntas.length - 1) {

        preguntaActual++;
        cargarPregunta();

    } else {

        mostrarResultado();
    }
});

// Mostrar puntaje final
function mostrarResultado() {

    contenedorOpciones.innerHTML = "";
    botonSiguiente.hidden = true;
    mensajeRespuesta.textContent = "";
    resultadoJuego.hidden = false;

    textoPregunta.textContent = "Este es tu resultado:";

    textoResultado.textContent =
        `Obtuviste ${puntos} de ${preguntas.length} respuestas correctas.`;

    if (puntos === 5) {
        textoResultado.textContent += " ¡Excelente! Completaste el reto espacial.";
    } else if (puntos >= 3) {
        textoResultado.textContent += " ¡Buen trabajo! Sigue explorando.";
    } else {
        textoResultado.textContent += " Puedes intentarlo otra vez y aprender más.";
    }
}

// Reiniciar juego
botonReiniciar.addEventListener("click", () => {

    preguntaActual = 0;
    puntos = 0;
    botonSiguiente.textContent = "Siguiente pregunta";

    cargarPregunta();
});

// Iniciar juego
cargarPregunta();


// ==========================================
// 3. MISIÓN INTERACTIVA A MARTE
// ==========================================

const historiaMision = document.getElementById("historiaMision");
const opcionesMision = document.getElementById("opcionesMision");
const botonReiniciarMision = document.getElementById("reiniciarMision");

// Escuchar las decisiones del visitante
opcionesMision.addEventListener("click", (evento) => {

    const boton = evento.target.closest("button[data-decision]");

    if (!boton) return;

    const decision = boton.dataset.decision;

    // Primera decisión
    if (decision === "equipo") {

        historiaMision.innerHTML = `
            <span class="mision-icono">🔋</span>
            <h3>Revisión de instrumentos</h3>
            <p>
                Los instrumentos están listos. Sin embargo, el equipo detecta
                que debes revisar el sistema de energía antes de continuar.
                ¿Qué decides hacer?
            </p>
        `;

        opcionesMision.innerHTML = `
            <button class="opcion-mision" data-decision="energia">
                Revisar las baterías y el sistema de energía
            </button>
            <button class="opcion-mision" data-decision="ignorar">
                Ignorar la alerta y continuar
            </button>
        `;

    } else if (decision === "rapido") {

        finalizarMision(
            "⚠️",
            "Misión en riesgo",
            "La nave fue lanzada sin revisar los instrumentos. Durante el viaje se detectó una falla y la misión no pudo continuar como estaba planeada. Recuerda: revisar los equipos ayuda a prevenir problemas."
        );

    // Segunda decisión
    } else if (decision === "energia") {

        historiaMision.innerHTML = `
            <span class="mision-icono">🪐</span>
            <h3>La nave llegó a Marte</h3>
            <p>
                El sistema de energía funciona correctamente. Ahora debes
                seleccionar un lugar para aterrizar el vehículo explorador.
                ¿Cuál eliges?
            </p>
        `;

        opcionesMision.innerHTML = `
            <button class="opcion-mision" data-decision="seguro">
                Elegir una zona plana y despejada
            </button>
            <button class="opcion-mision" data-decision="peligroso">
                Elegir una zona rocosa y difícil
            </button>
        `;

    } else if (decision === "ignorar") {

        finalizarMision(
            "🔋",
            "Energía insuficiente",
            "La nave continuó con una batería sin revisar. El vehículo no pudo completar las actividades previstas. La revisión del sistema de energía habría permitido detectar el problema."
        );

    // Decisión final
    } else if (decision === "seguro") {

        finalizarMision(
            "🏆",
            "¡Misión completada!",
            "El vehículo aterrizó en una zona adecuada y comenzó a explorar Marte. Envió información científica a la Tierra. Has completado la misión espacial."
        );

    } else if (decision === "peligroso") {

        finalizarMision(
            "⚠️",
            "Aterrizaje complicado",
            "El terreno rocoso dificultó el aterrizaje y el vehículo sufrió daños. La selección del lugar de aterrizaje puede afectar el desarrollo de una misión."
        );
    }

});

// Mostrar el resultado de la misión
function finalizarMision(icono, titulo, descripcion) {

    historiaMision.innerHTML = `
        <span class="mision-icono">${icono}</span>
        <h3>${titulo}</h3>
        <p>${descripcion}</p>
    `;

    opcionesMision.innerHTML = "";
    botonReiniciarMision.hidden = false;
}

// Reiniciar misión
botonReiniciarMision.addEventListener("click", () => {

    historiaMision.innerHTML = `
        <span class="mision-icono">🛰️</span>
        <h3>Tu misión comienza aquí</h3>
        <p>
            Una nave está lista para viajar a Marte.
            Debes elegir cómo preparar el equipo antes del lanzamiento.
        </p>
    `;

    opcionesMision.innerHTML = `
        <button class="opcion-mision" data-decision="equipo">
            Revisar los instrumentos científicos
        </button>
        <button class="opcion-mision" data-decision="rapido">
            Lanzar rápidamente sin revisar
        </button>
    `;

    botonReiniciarMision.hidden = true;
});
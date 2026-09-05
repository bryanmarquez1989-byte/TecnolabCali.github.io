document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formularioContacto");
    const mensajeFormulario = document.getElementById("mensajeFormulario");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const equipo = document.getElementById("equipo").value;
        const problema = document.getElementById("problema").value.trim();

        const medioSeleccionado = document.querySelector(
            'input[name="medio"]:checked'
        );

        const medio = medioSeleccionado
            ? medioSeleccionado.value
            : "WhatsApp";

        if (!nombre || !telefono || !equipo || !problema) {

            mensajeFormulario.textContent =
                "Por favor completa los campos requeridos.";
            return;
        }

        const mensaje =
`Hola TecnoLab.

Quiero solicitar atención técnica.

Nombre: ${nombre}
Número de contacto: ${telefono}
Medio de contacto: ${medio}
Equipo: ${equipo}

Problema:
${problema}`;

        const numeroTecnoLab = "573043857629";

        const url =
            "https://wa.me/" +
            numeroTecnoLab +
            "?text=" +
            encodeURIComponent(mensaje);

        mensajeFormulario.textContent =
            "Abriendo WhatsApp...";

        window.open(url, "_blank");

        formulario.reset();
    });
});
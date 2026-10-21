document.addEventListener("DOMContentLoaded", function() {
    const formConfig = document.getElementById("form-config");
    const inputPais = document.getElementById("pais");
    
    // Lista de países válidos en minúsculas (según la práctica)
    const paisesValidos = ["españa", "francia", "alemania", "italia", "reino unido"];

    // Función para mostrar la ventana modal de error
    function mostrarModal(mensaje) {
        const modal = document.getElementById("modal");
        const modalTexto = document.getElementById("modal-texto");
        
        if (modal && modalTexto) {
            // Actualizamos el contenido de la ventana modal con el mensaje y el botón
            modalTexto.innerHTML = `<p>${mensaje}</p><button type="button" id="modal-aceptar">Aceptar</button>`;
            modal.style.display = "block";

            // Evento para cerrar la ventana modal al pulsar el botón "Aceptar"
            document.getElementById("modal-aceptar").onclick = function() {
                modal.style.display = "none";
            };
        } else {
            // Respaldo por si el modal no se encuentra en el DOM
            alert(mensaje);
        }
    }

    // Comprobación al enviar el formulario
    if (formConfig && inputPais) {
        formConfig.addEventListener("submit", function(event) {
            // 1. Eliminamos espacios iniciales/finales y convertimos a minúsculas
            const valorPais = inputPais.value.trim().toLowerCase();
            
            // 2. Si el campo está vacío o el país no está en la lista permitida
            if (valorPais === "" || !paisesValidos.includes(valorPais)) {
                event.preventDefault(); // Evita que se envíe el formulario
                mostrarModal("Pais Erroneo"); // Muestra la ventana emergente
            }
        });
    }
});
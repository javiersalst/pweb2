document.addEventListener("DOMContentLoaded", function() {
    const formConfig = document.getElementById("form-config");
    const inputPais = document.getElementById("pais");
    
    // Lista de países válidos en minúsculas
    const paisesValidos = ["españa", "francia", "alemania", "italia", "reino unido"];

    // Función para mostrar la ventana modal existente en el HTML
    function mostrarModal(mensaje) {
        const modal = document.getElementById("modal");
        const modalTexto = document.getElementById("modal-texto");
        
        // Actualizamos el contenido del modal con el mensaje y el botón de aceptar
        modalTexto.innerHTML = `<p>${mensaje}</p><button type="button" id="modal-aceptar">Aceptar</button>`;
        modal.style.display = "block";

        // Evento para cerrar la ventana modal al pulsar Aceptar
        document.getElementById("modal-aceptar").onclick = function() {
            modal.style.display = "none";
        };
    }

    // Validación al enviar el formulario
    if (formConfig) {
        formConfig.addEventListener("submit", function(event) {
            // 1. Quitamos espacios iniciales/finales y pasamos todo a minúsculas
            const valorPais = inputPais.value.trim().toLowerCase();
            
            // 2. Comprobamos si está vacío o si no se encuentra en la lista
            if (valorPais === "" || !paisesValidos.includes(valorPais)) {
                event.preventDefault(); // Evita que se envíe el formulario
                mostrarModal("Pais Erroneo"); // Muestra el mensaje en la ventana modal
            }
        });
    }
});
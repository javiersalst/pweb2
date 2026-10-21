document.addEventListener("DOMContentLoaded", function() {
    const formConfig = document.getElementById("form-config");
    const inputPais = document.getElementById("pais");
    
    // Lista de países válidos en minúsculas
    const paisesValidos = ["españa", "francia", "alemania", "italia", "reino unido"];

    // Función para mostrar la ventana modal
    function mostrarModal(mensaje) {
        const modal = document.getElementById("modal");
        const modalTexto = document.getElementById("modal-texto");
        
        if (modal && modalTexto) {
            modalTexto.innerHTML = `<p>${mensaje}</p><button type="button" id="modal-aceptar">Aceptar</button>`;
            modal.style.display = "block";

            // Evento para cerrar la ventana modal al pulsar Aceptar
            document.getElementById("modal-aceptar").onclick = function() {
                modal.style.display = "none";
            };
        } else {
            // Por si acaso el modal no se encuentra, usamos alert temporalmente para probar
            alert(mensaje);
        }
    }

    // Validación al enviar el formulario
    if (formConfig) {
        formConfig.addEventListener("submit", function(event) {
            const valorPais = inputPais.value.trim().toLowerCase();
            
            // Si el país no está en la lista o está vacío
            if (valorPais === "" || !paisesValidos.includes(valorPais)) {
                event.preventDefault(); // Evita que se envíe
                mostrarModal("Pais Erroneo"); // Muestra el mensaje
            }
        });
    }
});
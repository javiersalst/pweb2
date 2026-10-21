// Esperamos a que cargue todo el documento
document.addEventListener("DOMContentLoaded", function() {
    
    // Elementos del DOM
    const formConfig = document.getElementById("form-config");
    const inputPais = document.getElementById("pais");
    const inputMax = document.getElementById("temp-max");
    const inputMin = document.getElementById("temp-min");
    const outputDiferencia = document.getElementById("diferencia-temp");
    
    // Lista de países válidos en minúsculas (según la lista facilitada)
    const paisesValidos = ["españa", "francia", "alemania", "italia", "reino unido"];

    // 1. Validación en tiempo real para las temperaturas (como ya tenías)
    function validarTemperaturas() {
        const min = parseFloat(inputMin.value);
        const max = parseFloat(inputMax.value);
        
        if (isNaN(min) || isNaN(max) || min < -20 || min > 45 || max < -20 || max > 45) {
            outputDiferencia.value = "Los valores deben de estar entre -20 y 45 ºC";
            return false;
        }
        if (min > max) {
            outputDiferencia.value = "La temperatura mínima no puede ser mayor que la máxima";
            return false;
        }
        outputDiferencia.value = (max - min) + "ºC";
        return true;
    }

    if (inputMax && inputMin) {
        inputMax.oninput = validarTemperaturas;
        inputMin.oninput = validarTemperaturas;
    }

    // 2. Función para mostrar la ventana modal personalizada
    function mostrarModal(mensaje) {
        let modal = document.getElementById("modal");
        
        // Si no existe el modal en el HTML, lo creamos dinámicamente por seguridad
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "modal";
            modal.innerHTML = `<div><div id="modal-texto"><button type="button" id="modal-aceptar">Aceptar</button></div></div>`;
            document.body.appendChild(modal);
        }

        const modalTexto = document.getElementById("modal-texto");
        modalTexto.innerHTML = `<p>${mensaje}</p><button type="button" id="modal-aceptar">Aceptar</button>`;
        modal.style.display = "block";

        // Evento para cerrar la ventana modal al pulsar Aceptar
        document.getElementById("modal-aceptar").onclick = function() {
            modal.style.display = "none";
        };
    }

    // 3. Validación al enviar el formulario (Submit)
    if (formConfig) {
        formConfig.addEventListener("submit", function(event) {
            
            // Validar el país: quitamos espacios y pasamos a minúsculas
            const valorPais = inputPais.value.trim().toLowerCase();
            
            if (valorPais === "" || !paisesValidos.includes(valorPais)) {
                event.preventDefault(); // Evita que se envíe el formulario
                mostrarModal("Pais Erroneo"); // Muestra el mensaje tal y como pide la práctica
                return;
            }

            // Validar temperaturas antes de enviar
            if (!validarTemperaturas()) {
                event.preventDefault();
                mostrarModal("Revise los valores de temperatura.");
                return;
            }
            
            // Aquí puedes añadir más validaciones (como la contraseña) si lo necesitas
        });
    }
});
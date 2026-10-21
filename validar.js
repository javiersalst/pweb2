document.addEventListener("DOMContentLoaded", function() {
    const formConfig = document.getElementById("form-config");
    const inputPais = document.getElementById("pais");
    
    const paisesValidos = ["españa", "francia", "alemania", "italia", "reino unido"];

    function mostrarModal(mensaje) {
        const modal = document.getElementById("modal");
        const modalTexto = document.getElementById("modal-texto");
        
        if (modal && modalTexto) {
            modalTexto.innerHTML = `<p>${mensaje}</p><button type="button" id="modal-aceptar">Aceptar</button>`;
            modal.style.display = "block";

            document.getElementById("modal-aceptar").onclick = function() {
                modal.style.display = "none";
            };
        } else {
            alert(mensaje);
        }
    }

    if (formConfig && inputPais) {
        formConfig.addEventListener("submit", function(event) {
            const valorPais = inputPais.value.trim().toLowerCase();
            
            if (valorPais === "" || !paisesValidos.includes(valorPais)) {
                event.preventDefault(); // Detiene el envío
                event.stopPropagation();
                mostrarModal("Pais Erroneo"); // Muestra el modal
            }
        }, true); 
    }
});
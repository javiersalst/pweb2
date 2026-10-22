
var paises = ["españa", "francia", "italia", "alemania", "reino unido"];

var formConfig = document.getElementById("form-config");
var pais = document.getElementById("pais");
var gps = document.getElementById("gps");
var mapaUrl = document.getElementById("mapa-url");
var tempActual = document.getElementById("temp-actual");
var password = document.getElementById("password");
var indicadorPassword = document.getElementById("indicador-password");

var modal = document.getElementById("modal");
var modalTexto = document.getElementById("modal-texto");
var modalAceptar = document.getElementById("modal-aceptar");
function mostrarModal(mensajes) {
  modalTexto.innerHTML = "";
  for (var i = 0; i < mensajes.length; i++) {
    var p = document.createElement("p");
    p.textContent = mensajes[i];
    modalTexto.appendChild(p);
  }
  modal.style.display = "block";
}

if (modalAceptar) {
  modalAceptar.onclick = function() {
    modal.style.display = "none";
  };
}
function validarPais(valor) {
  var p = valor.trim().toLowerCase();
  for (var i = 0; i < paises.length; i++) {
    if (paises[i] === p) return true;
  }
  return false;
}
if (password && indicadorPassword) {
  password.oninput = function() {
    var len = password.value.length;
    if (len < 9) {
      indicadorPassword.textContent = "Contraseña corta (mínimo 9 caracteres)";
    } else {
      indicadorPassword.textContent = "Longitud correcta";
    }
  };
}
function convertirAjusteGps(texto) {
  var partes = texto.split(",");
  if (partes.length !== 2) return null;

  var lat = parseFloat(partes[0].trim().replace(",", "."));
  var lon = parseFloat(partes[1].trim().replace(",", "."));

  if (isNaN(lat) || isNaN(lon)) return null;

  return "https://maps.google.com/maps?q=" + lat + "," + lon;
}

// Rellenar automáticamente el mapa al escribir
if (gps) {
  gps.oninput = function() {
    var url = convertirAjusteGps(gps.value);
    if (url && mapaUrl) {
      mapaUrl.value = url;
    }
  };
}
if (formConfig) {
  formConfig.onsubmit = function(e) {
    e.preventDefault();
    var errores = [];
    if (!validarPais(pais.value)) {
      errores.push("El país introducido no es válido.");
    }
    var urlGps = convertirAjusteGps(gps.value);
    if (!urlGps) {
      errores.push("Coordenadas GPS incorrectas (Usa formato: 40.513, -3.3486).");
    } else {
      mapaUrl.value = urlGps;
    }
    if (tempActual) {
      var t = parseFloat(tempActual.value.trim().replace(",", "."));
      if (isNaN(t) || t < 22 || t > 26) {
        errores.push("La temperatura debe estar entre 22 y 26 ºC.");
      }
    }
    if (password.value.length < 9) {
      errores.push("La contraseña debe tener al menos 9 caracteres.");
    }
    if (errores.length > 0) {
      mostrarModal(errores);
      return;
    }
    formConfig.submit();
  };
}
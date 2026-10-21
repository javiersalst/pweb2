var paises = ["españa", "francia", "italia", "alemania", "reino unido"];

var formConfig = document.getElementById("form-config");
var pais = document.getElementById("pais");
var gps = document.getElementById("gps");
var btnGenerarMaps = document.getElementById("btn-generar-maps");
var mapaUrl = document.getElementById("mapa-url");
var enlaceMaps = document.getElementById("enlace-maps");
var tempActual = document.getElementById("temp-actual");
var password = document.getElementById("password");
var indicadorPassword = document.getElementById("indicador-password");

var modal = document.getElementById("modal");
var modalTexto = document.getElementById("modal-texto");
var modalAceptar = document.getElementById("modal-aceptar");

var advertenciaTemp = false;

function mostrarModal(mensajes) {
  if (!modal || !modalTexto) {
    alert(mensajes.join("\n"));
    return;
  }
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
    if (advertenciaTemp) {
      advertenciaTemp = false;
      formConfig.submit();
    }
  };
}

function validarPais(valor) {
  var p = valor.trim().toLowerCase();
  if (p === "") return false;
  for (var i = 0; i < paises.length; i++) {
    if (paises[i] === p) return true;
  }
  return false;
}

// =========================================================
// APARTADO 2: Conversión de Coordenadas GPS a Google Maps
// =========================================================

function convertirCoordenadaADecimal(coordStr) {
  if (!coordStr) return null;
  var s = coordStr.trim().toUpperCase();
  if (s === "") return null;

  // Sur (S), Oeste (O / W) o signo '-' hacen que la coordenada sea negativa
  var esNegativo = (s.indexOf("S") !== -1 || s.indexOf("O") !== -1 || s.indexOf("W") !== -1 || s.indexOf("-") !== -1);

  // Extraer números (tanto con punto como con coma decimal)
  var numeros = s.match(/\d+(?:[.,]\d+)?/g);
  if (!numeros) return null;

  var decimal = 0;
  if (numeros.length === 1) {
    // Grados decimales
    decimal = parseFloat(numeros[0].replace(",", "."));
  } else if (numeros.length === 2 || numeros.length === 3) {
    // Grados, Minutos y Segundos (GMS)
    var grados = parseFloat(numeros[0].replace(",", "."));
    var minutos = parseFloat(numeros[1].replace(",", "."));
    var segundos = (numeros.length === 3) ? parseFloat(numeros[2].replace(",", ".")) : 0;

    if (minutos < 0 || minutos >= 60 || segundos < 0 || segundos >= 60) {
      return null;
    }
    decimal = grados + (minutos / 60) + (segundos / 3600);
  } else {
    return null;
  }

  if (isNaN(decimal)) return null;
  return esNegativo ? -Math.abs(decimal) : Math.abs(decimal);
}

function generarEnlaceMaps(valorGps) {
  if (!valorGps) return null;
  var texto = valorGps.trim();

  // Dividir latitud y longitud por coma o punto y coma
  var partes = texto.split(";");
  if (partes.length !== 2) {
    partes = texto.split(",");
  }

  // Si sigue sin haber 2 partes exactas, no es válido
  if (partes.length !== 2) {
    return null;
  }

  var lat = convertirCoordenadaADecimal(partes[0]);
  var lon = convertirCoordenadaADecimal(partes[1]);

  if (lat === null || lon === null || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return null;
  }

  var latRedondeada = Number(lat.toFixed(6));
  var lonRedondeada = Number(lon.toFixed(6));

  var latStr = (latRedondeada >= 0 ? "+" : "") + latRedondeada;
  var lonStr = (lonRedondeada >= 0 ? "+" : "") + lonRedondeada;

  return "https://maps.google.com/maps?q=" + latStr + "," + lonStr;
}

function actualizarCamposMapa(mostrarErrorSiFalla) {
  var url = generarEnlaceMaps(gps.value);
  if (url) {
    if (mapaUrl) mapaUrl.value = url;
    if (enlaceMaps) {
      enlaceMaps.href = url;
      enlaceMaps.textContent = "Abrir en Google Maps (" + url + ")";
      enlaceMaps.style.display = "inline-block";
    }
    localStorage.setItem("urlMapsGuardada", url);
    return true;
  } else {
    if (enlaceMaps) enlaceMaps.style.display = "none";
    if (mostrarErrorSiFalla) {
      mostrarModal(["Coordenadas GPS incorrectas. Ejemplos válidos:\n• 40.513, -3.3486\n• N 40° 30' 45.00\", O 3° 20' 54.00\""]);
    }
    return false;
  }
}

// Se genera tanto al escribir en el campo GPS como al pulsar el botón "Generar enlace"
if (gps) {
  gps.addEventListener("input", function() {
    actualizarCamposMapa(false);
  });
  gps.addEventListener("change", function() {
    actualizarCamposMapa(false);
  });
}

if (btnGenerarMaps) {
  btnGenerarMaps.addEventListener("click", function() {
    actualizarCamposMapa(true);
  });
}

// =========================================================
// Indicador de longitud de contraseña
// =========================================================
if (password && indicadorPassword) {
  password.oninput = function() {
    var len = password.value.length;
    if (len === 0) {
      indicadorPassword.textContent = "";
    } else if (len < 9) {
      indicadorPassword.textContent = "Evaluación de longitud: Demasiado corta (mínimo 9)";
    } else if (len <= 11) {
      indicadorPassword.textContent = "Evaluación de longitud: Corta";
    } else if (len <= 15) {
      indicadorPassword.textContent = "Evaluación de longitud: Media";
    } else {
      indicadorPassword.textContent = "Evaluación de longitud: Larga";
    }
  };
}

// =========================================================
// Envío del formulario
// =========================================================
if (formConfig) {
  formConfig.onsubmit = function(e) {
    e.preventDefault();

    var errores = [];
    var avisos = [];

    if (!validarPais(pais.value)) {
      errores.push("Pais Erroneo");
    }

    if (!actualizarCamposMapa(false)) {
      errores.push("Coordenadas GPS inválidas. Use formato decimal (40.513, -3.3486) o GMS (N 40° 30' 45.00\", O 3° 20' 54.00\").");
    }

    if (tempActual) {
      var tempCadena = tempActual.value.trim().replace(",", ".");
      if (tempCadena === "") {
        errores.push("Falta introducir la temperatura actual.");
      } else {
        var numTemp = Number(tempCadena);
        if (isNaN(numTemp)) {
          errores.push("Formato de temperatura incorrecto.");
        } else if (numTemp < 22 || numTemp > 26) {
          avisos.push("Advertencia: la temperatura (" + numTemp + " ºC) está fuera del intervalo 22-26 ºC.");
        }
      }
    }

    if (password.value.length < 9) {
      errores.push("La contraseña debe tener al menos 9 caracteres.");
    }

    if (errores.length > 0) {
      mostrarModal(errores);
      return;
    }

    if (avisos.length > 0) {
      advertenciaTemp = true;
      mostrarModal(avisos);
      return;
    }

    formConfig.submit();
  };
}
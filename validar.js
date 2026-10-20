var paises=["españa","francia","italia","alemania","reino unido"];

var formConfig=document.getElementById("form-config");
var pais=document.getElementById("pais");
var tempActual=document.getElementById("temp-actual");
var password=document.getElementById("password");
var indicadorPassword=document.getElementById("indicador-password");

var modal=document.getElementById("modal");
var modalTexto=document.getElementById("modal-texto");
var modalAceptar=document.getElementById("modal-aceptar");

var advertenciaTemp=false;

function mostrarModal(mensajes){
  modalTexto.innerHTML="";
  for(var i=0;i<mensajes.length;i++){
    var p=document.createElement("p");
    p.textContent=mensajes[i];
    modalTexto.appendChild(p);
  }
  modal.style.display="block";
}

modalAceptar.onclick=function(){
  modal.style.display="none";
  if(advertenciaTemp){
    advertenciaTemp=false;
    formConfig.submit();
  }
};

function validarPais(valor){
  var p=valor.trim().toLowerCase();
  if(p===""){
    return false;
  }
  for(var i=0;i<paises.length;i++){
    if(paises[i]===p){
      return true;
    }
  }
  return false;
}

// Indicador obligatorio: evaluacion de longitud (no seguridad)
password.oninput=function(){
  var len=password.value.length;
  if(len===0){
    indicadorPassword.textContent="";
  }else if(len<9){
    indicadorPassword.textContent="Evaluación de longitud: Demasiado corta (mínimo 9)";
  }else if(len<=11){
    indicadorPassword.textContent="Evaluación de longitud: Corta";
  }else if(len<=15){
    indicadorPassword.textContent="Evaluación de longitud: Media";
  }else{
    indicadorPassword.textContent="Evaluación de longitud: Larga";
  }
};

formConfig.onsubmit=function(e){
  e.preventDefault();

  var errores=[];
  var avisos=[];

  // 1. Validacion de pais
  if(!validarPais(pais.value)){
    errores.push("Pais Erroneo");
  }

  // 2. Validacion de temperatura actual (intervalo inclusivo 22 a 26)
  var tempCadena=tempActual.value.trim().replace(",",".");
  if(tempCadena===""){
    errores.push("Falta introducir la temperatura actual.");
  }else{
    var numTemp=Number(tempCadena);
    if(isNaN(numTemp)){
      errores.push("Formato de temperatura incorrecto.");
    }else if(numTemp<22||numTemp>26){
      avisos.push("Advertencia: la temperatura ("+numTemp+" ºC) está fuera del intervalo 22-26 ºC.");
    }
  }

  // 3. Validacion de contrasena
  if(password.value.length<9){
    errores.push("La contraseña debe tener al menos 9 caracteres.");
  }

  // Si hay errores obligatorios, impiden completar la operacion
  if(errores.length>0){
    mostrarModal(errores);
    return;
  }

  // Si solo hay advertencia de temperatura, no impide registrar la lectura
  if(avisos.length>0){
    advertenciaTemp=true;
    mostrarModal(avisos);
    return;
  }

  formConfig.submit();
};
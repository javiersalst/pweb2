var paises=["españa","francia","italia","alemania","reino unido"];

var formConfig=document.getElementById("form-config");
var pais=document.getElementById("pais");
var tempActual=document.getElementById("temp-actual");
var password=document.getElementById("password");
var indicadorPassword=document.getElementById("indicador-password");

var modal=document.getElementById("modal");
var modalTexto=document.getElementById("modal-texto");
var modalAceptar=document.getElementById("modal-aceptar");

var enviarOk=false;

function mostrarModal(titulo,mensajes){
  modal.querySelector("h3").textContent=titulo;
  modalTexto.innerHTML="";

  var ul=document.createElement("ul");
  for(var i=0;i<mensajes.length;i++){
    var li=document.createElement("li");
    li.textContent=mensajes[i];
    ul.appendChild(li);
  }
  modalTexto.appendChild(ul);
  modal.style.display="block";
}

modalAceptar.onclick=function(){
  modal.style.display="none";
  if(enviarOk){
    enviarOk=false;
    formConfig.submit();
  }
};

function validarPais(valor){
  var p=valor.trim().toLowerCase();
  for(var i=0;i<paises.length;i++){
    if(paises[i]===p){
      return true;
    }
  }
  return false;
}

password.oninput=function(){
  var total=password.value.length;
  if(total===0){
    indicadorPassword.textContent="";
  }else if(total<9){
    indicadorPassword.textContent="Corta";
  }else if(total<=11){
    indicadorPassword.textContent="Media";
  }else{
    indicadorPassword.textContent="Larga";
  }
};

formConfig.onsubmit=function(e){
  e.preventDefault();

  var errores=[];
  var avisos=[];

  // comprobar pais
  if(!validarPais(pais.value)){
    errores.push("El país no es válido.");
  }

  // comprobar temperatura
  var textoTemp=tempActual.value.trim().replace(",",".");
  if(textoTemp===""){
    errores.push("Falta la temperatura actual.");
  }else{
    var numTemp=Number(textoTemp);
    if(isNaN(numTemp)){
      errores.push("La temperatura debe ser un número.");
    }else if(numTemp<22||numTemp>26){
      avisos.push("Temperatura fuera de rango (22-26): "+numTemp);
    }
  }

  // comprobar contrasena
  if(password.value.length<9){
    errores.push("La contraseña debe tener al menos 9 caracteres.");
  }

  // comprobaciones
  if(errores.length>0){
    mostrarModal("Errores",errores.concat(avisos));
  }else if(avisos.length>0){
    enviarOk=true;
    mostrarModal("Aviso",avisos);
  }else{
    formConfig.submit();
  }
};
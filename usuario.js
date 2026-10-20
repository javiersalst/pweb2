document.addEventListener("DOMContentLoaded", function() {
    const asideInfo =document.getElementById("info-usuario");
    if(asideInfo){
        const fname = localStorage.getItem('fname') || 'invitado';
        asideInfo.textContent='Hola ' + fname + ' : Bienvenido a Smart Room';
    }
});
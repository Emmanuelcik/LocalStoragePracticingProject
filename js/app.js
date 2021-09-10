//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


//Event Listeners
eventListeners();
function eventListeners() {
    formulario.addEventListener("submit", agregarTweet);
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();
   
    //textarea
    const tweet = document.querySelector("#tweet").value;
    if (tweet === ""){
        mostrarError("No puedes agregar un tweet vacio");
        return;
    }
}
function mostrarError(mensaje){
    
    const errorPrevio = document.querySelector(".error");
    if(errorPrevio){
        return;
    }
    const mensajeError = document.createElement("P");

    mensajeError.textContent = mensaje;
    mensajeError.classList.add("error");

    //insrtarlo en el HTML
    const contenido = document.querySelector("#contenido");
       
    contenido.appendChild(mensajeError);

    //Elimina la alerta despeus de 3 seg
    setTimeout( ()=>{
        mensajeError.remove();
    }, 3000)
}
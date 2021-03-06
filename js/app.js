//Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


//Event Listeners
eventListeners();
function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    //Cuando el dom esta listo
    document.addEventListener("DOMContentLoaded", () =>{
        tweets = JSON.parse( localStorage.getItem("tweets")) || [];
        crearHTML();
    })
    
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

    const tweetOBJ = {
        id: Date.now(),
        tweet, //Como es igual el valor de la variable a la variable se asigna directo
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetOBJ];
    console.log(tweets);

    //Crear HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}
function mostrarError(mensaje){
    
    //Eliminar que se muestre más de una alerta
    const errorPrevio = document.querySelector(".error");
    if(errorPrevio){
        return;
    }
    //Agregar validacion
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

function crearHTML() {
    limpiarHTML();
    if(tweets.length > 0){
    }
    tweets.forEach( tweet => {
        //Agregar boton de eliminar 
        const boton = document.createElement("a");
        boton.classList.add("borrar-tweet");
        boton.textContent = "X";
        //Añadir funcion de eliminar
        boton.onclick = () =>{
            borrarTweet(tweet.id);
        }
        //Crear el html 
        const li = document.createElement("li");

        li.textContent = tweet.tweet;

        //Asignar el boton
        li.appendChild(boton);

        listaTweets.appendChild(li);
    });

    //SINCRONIZAR STORAGE
    sincronizarStorage();
}

//limpiar el HTML 

function limpiarHTML () {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Agrega los tweets actuales a localstorage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet (id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}
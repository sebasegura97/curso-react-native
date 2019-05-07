// VARIABLES
    // var: global
    var VAR = 5;

    // let: function scope
    let LET = 3;

    // const: no se puede reasignar
    const CONSTANTE = 3.14;

// FUNCTIONS

    // "Traditional" way
    function miPrimerFuncion(){
        alert("Hola mundo")
    }

    function probandoLetScope(){
        let LET = 5;
        for (let LET = 0; LET < 10; LET++) {
            // some statements, LET is 9
            console.log("for loop LET:", LET)
        }
        // Here LET is 5
        console.log("outside for loop LET:", LET)
    }

    function probandoVarScope(){
        var VAR = 5;
        for (var VAR = 0; VAR < 10; VAR++) {
            // some statements
            console.log("for loop VAR: ", VAR)
        }
        // Here var is 10
        console.log("outside for loop VAR:", VAR)
    }

    function functionWithParameters( x = 1, y = 1){
        return x + y; 
    }

    // Arrow functions

    miPrimerArrowFunction = () => alert("Una arrow function!")
        
    // sort works by default with string
    arrowFunctionWithParameters = ( x = ["x","j","k"] ) => { return x.sort() } 

    // to sort number just provide a compare function:
    orderFunction = ( x = [1, 0] ) => {
        x.sort(orderAscendent)
        function orderAscendent(a,b){
            return a - b;
        }
        return x;
    }

// CLASES 

    class MiPrimerClase {
        constructor(ancho = 0, alto = 0){
            this.ancho = ancho;
            this.alto = alto;
        }
        getAlto(){
            return this.alto;
        }
        getAncho(){
            return this.ancho;
        }
        getArea(){
            return this.ancho * this.alto;
        }
        // ejecutar en consola:
        // var rectangulo = new MiPrimeraClase();
        // var rectangulo = new MiPrimeraClase(3, 2);
        // rectangulo.getArea()
    }

// JSON

    var miPrimerJSON = {
        key: "value",
        nombre: "Sebastian",
        apellido: "Segura"
    }

    var complexJSON = {
        name: "Complex JSON",
        function: () => { alert("Arrow function desde un JSON") },
        array: [3, 4, 1, 6],
    }

    // Destructuring JSON:
    const { nombre, apellido } = miPrimerJSON;
    const nombreWithoutDestructuring = miPrimerJSON.nombre;
    const apellidoWithoutDestructuring = miPrimerJSON.apellido;

    // Rest operator: ...
    var restJSON = {
        property: "restJSON",
        reason: "Combinar JSON facilmente",
        tip: "It works with array too",
        ...miPrimerJSON
    }


// BONUS: Acceder al DOM desde js:
var title = document.querySelector(".title")
title.innerHTML = "Cambiemos las cosas desde javascript"

// Probando acceder al dom con functions y timeout
function accessingDOM(){
    // window.setTimeout(function, time)
    timeout = window.setTimeout(animateBox, 3000)
    function animateBox(){
        var div = document.getElementById("caja");
        div.className = "animateBox"
    }
    
    // window.setInterval(function, time)
    interval = window.setInterval(clock, 1000)
    function clock() {
        title.innerHTML = new Date();
    }
}

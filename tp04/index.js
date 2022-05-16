import {restar, sumar, dividir, multiplicar, potenciar, raiz, perimetroCircunferencia} from './src/modules/matematica.js';
import {Anto, Dali} from "./personas.js";
import {cambiarArchivo} from "./index04.js";

console.log("Esta es nuestra primera app en noud y esta muy bueno!!");
let puntuacion = 8;
console.log("Nuestra puntuacion es un " + puntuacion + " de 10");
const nota = 10;
const calificacion = `Estimamos que nuestra calificacion va a ser un ${nota}. No es una amenaza pero no aceptamos un no por respuesta :)`;
console.log(calificacion);

/*---*/

console.log(sumar(2, 4));
console.log(restar(4, 3));
console.log(dividir(2, 4));
console.log(multiplicar(2, 4));
console.log(potenciar(2));
console.log(raiz(4));

/*---*/

console.log(Anto.dni);


/*---*/

cambiarArchivo("polshuCapo.txt", "Hola Polshu esta es nuestra primer pagina uev")
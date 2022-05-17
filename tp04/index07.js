import countryToCurrency from "country-to-currency";
export default function obtenerMoneda(country){
    return(countryToCurrency[country])
}

let moneda = obtenerMoneda('AU'); 
console.log(moneda);
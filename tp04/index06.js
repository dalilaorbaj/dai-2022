
const url = " http://www.ort.edu.ar:8080/alumnos/index.htm?curso=2022&mes=mayo";

function esValida(url) {
    try {
        let valida = new URL(url);
        return valida;
    } catch (_) {
        return false;
    }
}

function GetDataFromURL(url) {
    const valida = IsURL(url);
    if (validURL) {
        let data = {
            'host': valida.host,
            'path': valida.pathName,
            'params': valida.parametros
        }
        return data;
    } 
    else {
        return "La direccion ingresada es incorrecta :/";
    }
}

console.log(GetDataFromURL(url));
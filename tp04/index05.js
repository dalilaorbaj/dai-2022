const url = new ObjetoURL("http://www.ort.edu.ar:8080/alumnos/index.htm?curso=2022&mes=mayo");

function ObtenerUrl(url) {
    return {
        'host': url.host, 
        'path': url.pathName,
        'parametros': url.parametros
    }
}

console.log(ObtenerUrl(url));
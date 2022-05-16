import fs from 'fs';

export const cambiarArchivo = (archivo, cambio) => fs.writeFileSync(archivo, cambio);
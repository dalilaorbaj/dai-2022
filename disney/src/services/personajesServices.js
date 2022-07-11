import config from '../../dbconfig.js';
import sql from 'mssql';
import personaje from '../models/Personaje.js';

class PersonajeService {
    getAll = async () => {
        let rta = null;
        try {
            let pool = await sql.connect(config);
        
            let result = await pool.request().query("SELECT * FROM Personajes");
            rta = result.recordsets[0];
        }
        catch (error) {
            throw error
        }
        return rta;
    }

    getById = async (id) => {
        let rta = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().input('pId', sql.Int, id).query("SELECT * FROM Personajes WHERE Id = @pId");
            rta = result.recordsets[0][0];
        }
        catch (error) {
            throw error
        }
        return rta;
    }

    createPersonaje = async (personaje) => {
        let filasAfectadas = 0;
        try {
            let pool = await sql.connect(config);
            console.log(personaje);
            let result = await pool.request()
            
            .input("imagen", sql.VarChar, personaje.imagen)
            .input("nombre", sql.VarChar, personaje.nombre)
            .input("edad", sql.Date, personaje.edad)
            .input("peso", sql.Int, personaje.peso)
            .input("historia", sql.VarChar, personaje.historia)
            .input("pelis", sql.Int, personaje.pelis)

                .query("INSERT INTO Personajes (imagen, nombre, edad, peso, historia, pelis) VALUES (@imagen, @nombre, @edad, @peso, @historia, @pelis)");
                
                filasAfectadas = result.rowsAffected;

        }
        catch (error) {
            throw error
        }
        return filasAfectadas>0;
    }

    updatePersonaje = async (id, personaje) => {
        let filasAfectadas = 0;

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input("imagen", sql.VarChar, personaje.imagen)
            .input("nombre", sql.VarChar, personaje.nombre)
            .input("edad", sql.Date, personaje.edad)
            .input("peso", sql.Int, personaje.peso)
            .input("historia", sql.VarChar, personaje.historia)
            .input("pelis", sql.Int, personaje.pelis)
                .query("UPDATE Personajes SET imagen = @imagen, nombre = @nombre, edad = @edad, peso = @peso, historia=@historia, pelis=@pelis WHERE Id = @pId"); 
                filasAfectadas = result.rowsAffected;
        }
        catch (error) {
            throw error
        }
        return filasAfectadas>0;
    }

    deleteById = async (id) => {
        let filasAfectadas = 0;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId', sql.Int, id).query("DELETE FROM Personajes WHERE Id=@pId");
            filasAfectadas = result.rowsAffected;
        }
        catch (error) {
            throw error
        }
        return filasAfectadas>0;
    }
}

export default PersonajeService;
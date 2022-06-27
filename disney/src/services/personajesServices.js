import config from '../../dbconfig.js';
import sql from 'mssql';
import pelicula from '../models/Pelicula.js';

class PeliculaService {
    getAll = async () => {
        let rta = null;
        try {
            let pool = await sql.connect(config);
        
            let result = await pool.request().query("SELECT * FROM Peliculas");
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
            let result = await pool.request().input('pId', sql.Int, id).query("SELECT * FROM Peliculas WHERE Id = @pId");
            rta = result.recordsets[0][0];
        }
        catch (error) {
            throw error
        }
        return rta;
    }

    createPelicula = async (pelicula) => {
        let filasAfectadas = 0;
        try {
            let pool = await sql.connect(config);
            console.log(pelicula);
            let result = await pool.request()
            
            .input("imagen", sql.VarChar, pelicula.imagen)
            .input("titulo", sql.VarChar, pelicula.titulo)
            .input("fechaCreacion", sql.Date, pelicula.fechaCreacion)
            .input("calificacion", sql.Int, pelicula.calificacion)
                .query("INSERT INTO Peliculas (imagen, titulo, fechaCreacion, calificacion) VALUES (@imagen, @titulo, @fechaCreacion, @calificacion)");
                
                filasAfectadas = result.rowsAffected;

        }
        catch (error) {
            throw error
        }
        return filasAfectadas>0;
    }

    updatePelicula = async (id, pelicula) => {
        let filasAfectadas = 0;

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input("imagen", sql.VarChar, pelicula.imagen)
                .input("titulo", sql.VarChar, pelicula.titulo)
                .input("fechaCreacion", sql.Date, pelicula.fechaCreacion)
                .input("calificacion", sql.Int, pelicula.calificacion)
                .query("UPDATE Peliculas SET imagen = @imagen, titulo = @titulo, fechaCreacion = @fechaCreacion, calificacion = @calificacion WHERE Id = @pId"); 
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
            .input('pId', sql.Int, id).query("DELETE FROM Peliculas WHERE Id=@pId");
            filasAfectadas = result.rowsAffected;
        }
        catch (error) {
            throw error
        }
        return filasAfectadas>0;
    }
}

export default PeliculaService;
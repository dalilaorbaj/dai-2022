import config from '../../dbconfig.js';
import sql from 'mssql';
import Usuario from '../models/Usuario.js'
import jwt from "jsonwebtoken"



class UsuarioService {
    buscarUsuario = async (userName, password) => {
        let usuario = null;
        try {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .input('pUserName', sql.VarChar, userName)
                .input('pPassword', sql.VarChar, password)
                .query('SELECT * FROM Usuarios WHERE UserName = @pUserName AND Password=@pPassword');
            usuario = result.recordsets[0][0];
            /*if(usuario.length == 0) return usuario = null;*/
            return usuario;

        } catch (error) {
            console.log(error);
            return error
        }
    }

    generateToken = async (usuario) => {

        try {
            const userToken = jwt.sign({ user: usuario }, 'shhhhh', { expiresIn: '300s' });
            console.log(userToken)

            function addMinutes(date, minutes) {
                return new Date(date.getTime() + minutes * 60000);
            }

            const tokenExpirationDate = addMinutes(new Date, 5).toLocaleString();

            let pool = await sql.connect(config);
            const result = await pool.request()
                .input("userName", sql.VarChar, usuario.userName)
                .input("password", sql.VarChar, usuario.password)
                .input("token", sql.VarChar, userToken)
                .input("tokenExpirationDate", sql.VarChar, tokenExpirationDate)
                .query("UPDATE Usuarios SET Token = @token, TokenExpirationDate = @tokenExpirationDate WHERE UserName = @userName AND Password=@password");
                return userToken;

        } catch (error) {
            console.log(error);
            return error
        }

    }
    GetByUserNamePassword = async (userName, password) => {

        try {
            let miUsuario = new Usuario()
            miUsuario = null;
            let pool = await sql.connect(config);
            let result = await pool.request().input('puserName', sql.VarChar, userName).input('ppassword', sql.VarChar, password).query("SELECT * FROM Usuarios u WHERE u.UserName = @puserName AND u.Password=@ppassword");
            
            console.log(result.recordsets[0][0])
            miUsuario = result.recordsets[0][0];
            return miUsuario;

        }
        catch (error) {
            throw error
        }
    }

    Login = async (userName, password) => {
        try {
            let miUsuario = new Usuario();
            miUsuario = await this.GetByUserNamePassword(userName, password);
            if (miUsuario != null) {
                this.RefreshToken(miUsuario.Id);
            }
            return miUsuario;

        }
        catch (error) {
            throw error
        }
    }




    GetByToken = async (token) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('ptoken', sql.VarChar, token)
            .query("SELECT * FROM Usuarios u WHERE u.Token=@ptoken");
            let miUsuario = result.recordsets[0][0];
            return miUsuario;
        }
        catch (error) {
            throw error
        }
    }



    RefreshToken = async (id) => {
        try {
            let registrosModificados = 0;
            const token = this.GenerateToken();
            let pool = await sql.connect(config);
            let result = await pool.request().input('token', sql.VarChar, token)
            .input('pid', sql.Int, id)
            .query("UPDATE Usuarios SET Token=@token, TokenExpirationDate=DATEADD(minute, 15, GETDATE()) WHERE Id=@pid");
            registrosModificados = result.recordsets[0];
            return token;
        }
        catch (error) {
            throw error
        }
        
    }

}
export default UsuarioService;
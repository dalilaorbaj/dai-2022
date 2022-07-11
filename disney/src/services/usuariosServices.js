import config from '../../dbconfig.js';
import sql from 'mssql';
import Usuario from '../models/Usuario.js'
import jwt from "jsonwebtoken"


class UsuarioService {


    
    buscarUsuario = async (userName, password) =>{
        let usuario = null;
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
                                    .input ('pUserName', sql.VarChar, userName)
                                    .input ('pPassword', sql.VarChar, password)
                                    .query('SELECT * FROM Usuarios WHERE UserName = @puserName AND Password=@ppassword');
                                    usuario = result.recordsets[0][0];   
            /*if(usuario.length == 0) return usuario = null;*/
            return usuario;

        } catch(error){
            console.log(error);
            return error
        }
    }

    generateToken = async (usuario) =>{

        try{
            const token = await jwt.sign({user: usuario},'secretkey',  {expiresIn: '300s'},(err, token)=>{
                return token;
                }
            )

            function addMinutes(date, minutes) {
                return new Date(date.getTime() + minutes*60000);
            }
              
            const tokenExpirationDate = addMinutes(new Date, 5).toLocaleString();

            let pool = await sql.connect(config);
            const result = await pool.request()
            .input("puserName", sql.VarChar, usuario.userName)
            .input("ppassword", sql.VarChar, usuario.password)
            .input("token", sql.VarChar, token)
            .input("tokenExpirationDate", sql.VarChar, tokenExpirationDate)
            .query("UPDATE Usuarios SET token = @token, tokenExpirationDate = @tokenExpirationDate WHERE UserName = @puserName AND Password=@ppassword"); 
            return token;

        } catch(error){
            console.log(error);
            return error
        }
       
    }


    /*

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
            const miUsuario = new Usuario()
            miUsuario = null;
            let pool = await sql.connect(config);
            let result = await pool.request().input('ptoken', sql.VarChar, token).query("SELECT * FROM Usuarios u WHERE u.Token=@token");
            miUsuario = result.recordsets[0][0];
        }
        catch (error) {
            throw error
        }
        return miUsuario;
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
*/
}
export default UsuarioService;
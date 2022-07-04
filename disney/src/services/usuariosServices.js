import config from '../../dbconfig.js';
import sql from 'mssql';
import Usuario from '../models/Usuario.js'

class UsuarioService {

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
            miUsuario = this.GetByUserNamePassword(userName, password);
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

    GenerateToken = () =>{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
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
import config from '../../dbconfig.js';
import sql from 'mssql';
import Usuario from '../models/Usuario.js'
import UsuariosServices from '../services/usuariosServices.js'

class SecurityHelper {
    IsValidToken = async (token) => {
        try{
            const usuario = new Usuario();
            usuario = UsuariosServices.GetByToken(token);
    
            var now = Date.now();

            if(usuario!=null){
                if(usuario.TokenExpirationDate > now){
                    return true;
                }
                else{
                    return false;
                }
            }
            return false;
        }
        catch (error) {
            throw error
        }
    }
}
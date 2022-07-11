import { request, response } from "express";
import jwt from "jsonwebtoken";
import Usuario from '../models/Usuario.js'
import UsuariosServices from '../services/usuariosServices.js'

let servicios = new UsuariosServices()

    export const IsValidToken = async (token) => {
        try{
            let usuario = servicios.GetByToken(token);
    
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


    /*
const isValidToken = (req = request, res = response, next) => {

    const token = req.get('x-token')
    console.log(token);

    if (!token) {
        return res.status(400).json({
            msg: 'El token es obligatorio'
        })
    }

    try {
        const { valid } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!valid) {
            return res.status(401).json({
                msg: 'Token invalido'
            })
        }
    } catch (error) {
        return res.status(401).json({
            msg: 'Token invalido'
        })
    }


    next()
}

export default isValidToken;
*/
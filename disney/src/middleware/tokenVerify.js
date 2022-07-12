import { Router } from "express";
const rutasProtegidas = Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token,  (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Falta token' 
      });
    }
 });
 export default rutasProtegidas;
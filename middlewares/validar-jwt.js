const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization');
  if(!token){
    return res.status(401).json({
      msg:'No hay token en la petición'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    console.log('uid', uid);
    const usuario = await Usuario.findById(uid);
    if(!usuario){
      return res.status(401).json({
        msg: 'Usuario no existe en la BD'
      })
    }

    if(!usuario.estado){
      return res.status(401).json({
        msg: 'usuario con estado false'
      })
    }
    req.usuario = usuario;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
}

module.exports = {
  isAuthenticated
}

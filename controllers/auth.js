const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require("../models/usuario");

const login = async(req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }

    if(!usuario.estado){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      })
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      })
    }

    const token = await generarJWT(usuario.id);

    res.json({
      msg: 'login ok',
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  login
}
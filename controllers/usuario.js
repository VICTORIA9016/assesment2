const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const obtenerUsuarios = async(req, res) => {
  const usuarios = await Usuario.find({estado: true});
  const total = await Usuario.countDocuments({estado: true});
  res.json({
    msg: 'Total de usuarios',
    total,
    usuarios
  })
}

const crearUsuario = async(req, res) => {
  const { nombre, apellido, correo, password } = req.body;
  const usuario = new Usuario({ nombre, apellido, correo, password })

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  await usuario.save();
  res.status(200).json({
    msg: 'Usuario creado',
    usuario
  })
}

const editarUsuario = async(req, res) => {
  try {
    const { id } = req.params;
    const { _id, estado, correo, password, ...resto } = req.body;
    
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    const usuarioAutenticado = req.usuario;
    res.json({
      msg: 'Usuario Editado',
      usuario,
      usuarioAutenticado
    })
  } catch (error) {
    console.log(error);
  }
}

const eliminarUsuario = async(req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true});
  const usuarioAutenticado = req.usuario;
  res.json({
    msg: 'Usuario eliminado',
    usuario,
    usuarioAutenticado
  })
}

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario
}
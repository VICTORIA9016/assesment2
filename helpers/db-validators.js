const Usuario = require("../models/usuario")
const List = require('../models/list');

const emailExiste = async( correo = '' ) => {
  const existeEmail = await Usuario.findOne({correo});
  if(existeEmail){
    throw new Error(`El email ${correo} ya está registrado`);
  }
}

const existeUsuarioPorId = async(id) => {
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`No existe el usuario con el id ${id}`)
  }
}

const existeListPorId = async(id) => {
  const existeList = await List.findById(id);
  if(!existeList){
    throw new Error(`No existe la lista con el id ${id}`)
  }
}

module.exports = {
  emailExiste,
  existeUsuarioPorId,
  existeListPorId
}
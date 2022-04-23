
const mongoose = require('mongoose');
const List = require('../models/list');

const obtenerLists = async(req, res) => {
  const lists = await List.find({estado:true}).populate('usuario', 'nombre');
  const total = await List.countDocuments({estado:true});
  res.json({
    msg: 'Total de usuarios',
    total,
    lists
  })
}

const obtenerList = async(req, res) => {
  const { id } = req.params;
  const list = await List.findById(id).populate('usuario', 'nombre');

  res.status(200).json({
    list
  })

}

const crearList = async(req, res) => {
  const { estado, usuario, ...resto } = req.body;
  const listDB = await List.findOne({title: resto.title});
  if(listDB){
    return res.status(400).json({
      msg: `La lista con el title ${listDB.title} ya existe`
    })
  }
  const data = {
    ...resto,
    usuario: req.usuario._id
  }
  const list = new List(data);
  await list.save();
  res.status(200).json(list);
}

const eliminarList = async(req, res) => {
  const {id} = req.params;
  const list = await List.findByIdAndUpdate(id, {estado: false}, {new:true});
  const usuarioAutenticado = req.usuario;
  res.json({
    msg: 'lista eliminada',
    list,
    usuarioAutenticado
  })
}

const obtenerListasPorUsuario = async(req, res) => {
  const {id} = req.params;
  const lists = await List.find({usuario: mongoose.Types.ObjectId(id)}).populate('usuario', 'nombre');
  res.json({
    lists
  })
}

module.exports = {
  obtenerLists,
  obtenerList,
  crearList,
  eliminarList,
  obtenerListasPorUsuario
}
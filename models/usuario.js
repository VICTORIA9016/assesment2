const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre es obligatorio']
  },
  apellido: {
    type: String,
    require: [true, 'El apellido es obligatorio']
  },
  correo: {
    type: String,
    require: [true, 'El correo es obligatorio']
  },
  password: {
    type: String,
    require: [true, 'La contraseña es obligatorio']
  },
  estado: {
    type: Boolean,
    default: true
  },
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
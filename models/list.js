const { Schema, model } = require('mongoose');

const ListSchema = Schema({
  title: {
    type: String,
    require: [true, 'El título es obligatorio']
  },
  description: {
    type: String,
    require: [true, 'La descripción es obligatorio']
  },
  link: {
    type: String,
    require: [true, 'El link es obligatorio']
  },
  estado: {
    type: Boolean,
    default: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  }
});

ListSchema.methods.toJSON = function() {
  const { __v, ...list } = this.toObject();
  return list;
}

module.exports = model('List', ListSchema);
const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  biografia: {
    type: String
  }
}, {
  timestamps: true // cria createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Autor', AutorSchema);

const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  biografia: {
    type: String
  },
  livros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livro' }]
}, {
  timestamps: true // cria createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Autor', AutorSchema);

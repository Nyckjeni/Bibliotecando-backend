// models/Livro.js
const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor', // Referência ao modelo Autor
    required: true
  },
  imagem: {
    type: String, // Pode ser a URL da imagem
    required: true
  },
  sinopse: {
    type: String,
    required: true
  }
});

const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;


// routes/livroRoutes.js
const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Criar novo livro
router.post('/', livroController.criarLivro);

// Buscar todos os livros
router.get('/', livroController.buscarLivros);

// Buscar livro por ID
router.get('/:id', livroController.buscarLivroPorId);

// Atualizar livro
router.put('/:id', livroController.atualizarLivro);

// Deletar livro
router.delete('/:id', livroController.deletarLivro);

module.exports = router;

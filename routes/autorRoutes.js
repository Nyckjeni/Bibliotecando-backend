// routes/autorRoutes.js
const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

// Definindo as rotas
router.post('/', autorController.criarAutor);  // Para criar um autor
router.get('/', autorController.buscarAutores);  // Para buscar todos os autores
router.get('/:id', autorController.buscarAutorPorId);  // Para buscar um autor por ID
router.put('/:id', autorController.atualizarAutor);  // Para atualizar um autor
router.delete('/:id', autorController.deletarAutor);  // Para deletar um autor

module.exports = router; // Exportando as rotas


// controllers/livroController.js
const Livro = require('../models/Livro');
const Autor = require('../models/Autor');

// Criar novo livro
exports.criarLivro = async (req, res) => {
  try {
    const { nome, genero, autor, imagem, sinopse } = req.body;

    // Verificando se o autor existe
    const autorEncontrado = await Autor.findById(autor);
    if (!autorEncontrado) {
      return res.status(404).json({ erro: 'Autor não encontrado' });
    }

    const novoLivro = new Livro({ nome, genero, autor, imagem, sinopse });
    const livroSalvo = await novoLivro.save();
    res.status(201).json(livroSalvo);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar livro', detalhes: error.message });
  }
};

// Buscar todos os livros
exports.buscarLivros = async (req, res) => {
  try {
    const livros = await Livro.find().populate('autor'); // Populando o autor
    res.json(livros);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livros', detalhes: error.message });
  }
};

// Buscar livro por ID
exports.buscarLivroPorId = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id).populate('autor');
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livro', detalhes: error.message });
  }
};

// Atualizar livro
exports.atualizarLivro = async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('autor');
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar livro', detalhes: error.message });
  }
};

// Deletar livro
exports.deletarLivro = async (req, res) => {
  try {
    const livroDeletado = await Livro.findByIdAndDelete(req.params.id);
    if (!livroDeletado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json({ mensagem: 'Livro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar livro', detalhes: error.message });
  }
};

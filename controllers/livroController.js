const Livro = require('../models/Livro');
const Autor = require('../models/Autor');
const mongoose = require('mongoose');

// Criar novo livro
exports.criarLivro = async (req, res) => {
  try {
    const { nome, genero, autor, imagem, sinopse } = req.body;

    if (!nome || !genero || !autor || !imagem || !sinopse) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const autorEncontrado = await Autor.findById(autor);
    if (!autorEncontrado) {
      return res.status(404).json({ erro: 'Autor não encontrado' });
    }

    const novoLivro = new Livro({ nome, genero, autor, imagem, sinopse });
    const livroSalvo = await novoLivro.save();

    await Autor.findByIdAndUpdate(autor, {
      $push: { livros: livroSalvo._id }
    });

    const livroComAutor = await Livro.findById(livroSalvo._id).populate('autor', 'nome');
    res.status(201).json(livroComAutor);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar livro', detalhes: error.message });
  }
};

// Buscar todos os livros
exports.buscarLivros = async (req, res) => {
  try {
    const livros = await Livro.find().populate('autor', 'nome');
    res.json(livros);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livros', detalhes: error.message });
  }
};

// Buscar livro por ID
exports.buscarLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const livro = await Livro.findById(id).populate('autor', 'nome');
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livro', detalhes: error.message });
  }
};

// Buscar livro por nome
exports.buscarLivroPorNome = async (req, res) => {
  try {
    const nomeBuscado = req.params.nome;
    const livro = await Livro.findOne({ nome: new RegExp(nomeBuscado, 'i') }).populate('autor', 'nome');
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livro', detalhes: error.message });
  }
};

// Atualizar livro
exports.atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, genero, autor, imagem, sinopse } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const livroExistente = await Livro.findById(id);
    if (!livroExistente) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    if (autor) {
      const autorExiste = await Autor.findById(autor);
      if (!autorExiste) {
        return res.status(404).json({ erro: 'Autor não encontrado' });
      }
    }

    const livroAtualizado = await Livro.findByIdAndUpdate(
      id,
      { nome, genero, autor, imagem, sinopse },
      { new: true }
    ).populate('autor', 'nome');

    res.json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar livro', detalhes: error.message });
  }
};

// Deletar livro
exports.deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const livro = await Livro.findById(id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    await Autor.findByIdAndUpdate(livro.autor, {
      $pull: { livros: livro._id }
    });

    await Livro.findByIdAndDelete(id);

    res.json({ mensagem: 'Livro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar livro', detalhes: error.message });
  }
};

const Autor = require('../models/Autor');

// Criar novo autor
exports.criarAutor = async (req, res) => {
  try {
    const novoAutor = new Autor(req.body);
    const autorSalvo = await novoAutor.save();
    res.status(201).json(autorSalvo);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar autor', detalhes: error.message });
  }
};

// Buscar todos os autores
exports.buscarAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar autores', detalhes: error.message });
  }
};

// Buscar autor por ID
exports.buscarAutorPorId = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    if (!autor) return res.status(404).json({ erro: 'Autor não encontrado' });
    res.json(autor);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar autor', detalhes: error.message });
  }
};

// Buscar autor por nome
exports.buscarAutorPorNome = async (req, res) => {
  try {
    const nomeBuscado = req.params.nome;
    const autor = await Autor.findOne({ nome: new RegExp(nomeBuscado, 'i') });


    if (!autor) return res.status(404).json({ erro: 'Autor não encontrado' });

    res.json(autor);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar autor', detalhes: error.message });
  }
};


// Atualizar autor
exports.atualizarAutor = async (req, res) => {
  try {
    const autorAtualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!autorAtualizado) return res.status(404).json({ erro: 'Autor não encontrado' });
    res.json(autorAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar autor', detalhes: error.message });
  }
};

// Deletar autor
exports.deletarAutor = async (req, res) => {
  try {
    const autorDeletado = await Autor.findByIdAndDelete(req.params.id);
    if (!autorDeletado) return res.status(404).json({ erro: 'Autor não encontrado' });
    res.json({ mensagem: 'Autor deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar autor', detalhes: error.message });
  }
};

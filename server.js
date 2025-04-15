const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Servir arquivos de imagem

// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Livros funcionando 🚀');
});

// Rotas de Autor
const autorRoutes = require('./routes/autorRoutes');
app.use('/api/autores', autorRoutes);  // Rota de Autores

// Rota para buscar autor por nome (Adicionada)
const autorController = require('./controllers/autorController');
app.get('/api/autores/nome/:nome', autorController.buscarAutorPorNome); // ✅ NOVA LINHA ADICIONADA

// Rotas de Livro
const livroRoutes = require('./routes/livroRoutes');
app.use('/api/livros', livroRoutes);  // Rota de Livros

// Configuração do multer (para upload de imagens)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Usando o upload de imagem nas rotas de livros
const livroController = require('./controllers/livroController');
app.post('/api/livros', upload.single('imagem'), livroController.criarLivro);  // Criação de livro com upload de imagem

// Start do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

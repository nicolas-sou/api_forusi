const express = require('express');
const app = express();
const path = require('path');
const produtos = require('./data/produtos.json');

app.use(express.static(path.join(__dirname))); // servir index.html e assets

// Servir imagens da pasta public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API de produtos
app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json(produto);
});

// Roda o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

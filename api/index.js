const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const fs = require('fs');

const app = express();

// Lê produtos com fs (funciona em ambiente serverless)
const produtosPath = path.join(__dirname, '../data/produtos.json');
const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf-8'));

// Arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Rotas da API
app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json(produto);
});

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);

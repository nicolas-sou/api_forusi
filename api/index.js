const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const fs = require('fs');

const app = express();

const produtos = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/produtos.json'), 'utf-8'));

app.use('/static', express.static(path.join(__dirname, '../../')));

// API de produtos
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
  res.sendFile(path.join(__dirname, '../../index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);

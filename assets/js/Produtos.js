document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('produtos-container');
  const botao = document.getElementById('btn-ver-mais');

  let pagina = 0;
  const porPagina = 6;
  let produtos = [];

  console.log('🔄 Iniciando carregamento dos produtos...');

  fetch('/api/produtos')
    .then(res => res.json())
    .then(data => {
      console.log('✅ Produtos carregados:', data.length);
      produtos = data;
      mostrarMaisProdutos();
    })
    .catch(err => {
      console.error('❌ Erro ao carregar produtos:', err);
    });

  function mostrarMaisProdutos() {
    console.log('➡️ Mostrando página:', pagina);

    const inicio = pagina * porPagina;
    const fim = inicio + porPagina;
    const produtosPagina = produtos.slice(inicio, fim);

    if (produtosPagina.length === 0) {
      console.log('🚫 Nenhum produto para exibir.');
      return;
    }

    produtosPagina.forEach(produto => {
  const card = document.createElement('div');
  card.className = 'col-md-4 mb-4';
  card.setAttribute('data-aos', 'zoom-in');
  card.setAttribute('data-aos-duration', '1000');
  card.innerHTML = `
    <a href="produto.html?id=${produto.id}" class="text-decoration-none text-dark">
      <div class="card h-100">
        <img src="/images/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
        <div class="card-body">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">${produto.descricao || ''}</p>
        </div>
      </div>
    </a>
  `;
  container.appendChild(card);
    });

    AOS.refresh();
    pagina++;

    if (pagina * porPagina >= produtos.length) {
      console.log('✅ Todos os produtos foram exibidos.');
      botao.style.display = 'none';
    }
  }

  botao.addEventListener('click', () => {
    console.log('🖱️ Botão clicado!');
    mostrarMaisProdutos();
  });
});

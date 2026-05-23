function obterIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function renderizarInfoGeral(filme) {
    document.title = `${filme.titulo} · Harry Potter`;

    document.getElementById('detalheImagem').src   = filme.imagem;
    document.getElementById('detalheImagem').alt   = filme.titulo;
    document.getElementById('detalheAno').textContent      = filme.ano;
    document.getElementById('detalheTitulo').textContent   = filme.titulo;
    document.getElementById('detalheDiretor').textContent  = filme.diretor;
    document.getElementById('detalheDuracao').textContent  = filme.duracao;
    document.getElementById('detalheAnoDup').textContent   = filme.ano;
    document.getElementById('detalheParte').textContent    = `Parte ${filme.id}`;
    document.getElementById('detalheSinopse').textContent  = filme.sinopse;
}

function renderizarFotos(filme) {
    const lista = document.getElementById('listaFotos');

    if (!filme.fotos || filme.fotos.length === 0) {
        lista.innerHTML = '<p class="text-muted">Nenhuma foto disponível.</p>';
        return;
    }

    filme.fotos.forEach(function(foto) {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        col.innerHTML = `
            <div class="foto-card">
                <img src="${foto.src}" alt="${foto.titulo}"
                    onerror="this.style.background='#1a1a2e'; this.removeAttribute('src');"/>
                <p>${foto.titulo}</p>
            </div>
        `;
        lista.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    const id = obterIdDaURL();
    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    fetch('db.json')
        .then(function(res) { return res.json(); })
        .then(function(dados) {
            const filme = dados.filmes.find(f => f.id === id);
            if (!filme) {
                window.location.href = 'index.html';
                return;
            }
            renderizarInfoGeral(filme);
            renderizarFotos(filme);
        })
        .catch(function() {
            console.error('Erro ao carregar db.json.');
        });

});
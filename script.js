// ── Carrossel Hero ──────────────────────────
function renderizarSlides(filmes) {
    const indicadores = document.getElementById("carrosselIndicadores");
    const inner       = document.getElementById("carrosselInner");

    // Filtra apenas os filmes com destaque: true
    const destaques = filmes.filter(f => f.destaque);

    destaques.forEach(function(filme, index) {
        // Indicador
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("data-bs-target", "#heroCarrossel");
        btn.setAttribute("data-bs-slide-to", index);
        if (index === 0) btn.classList.add("active");
        indicadores.appendChild(btn);

        // Slide
        const item = document.createElement("div");
        item.className = "carousel-item h-100" + (index === 0 ? " active" : "");

        item.innerHTML = `
            <img src="${filme.imagemCarrossel}" class="hero-img" alt="${filme.titulo}"/>
            <div class="carousel-caption d-none d-md-block hero-caption">
                <a href="detalhes.html?id=${filme.id}" class="slide-link">
                    <h2>${filme.titulo}</h2>
                    <p>${filme.sinopse.substring(0, 120)}...</p>
                </a>
            </div>
        `;

        inner.appendChild(item);
    });

    // Inicia o carrossel
    const carouselEl = document.getElementById("heroCarrossel");
    if (carouselEl) {
        new bootstrap.Carousel(carouselEl, {
            interval: 4000,
            ride: true,
            pause: false,
            wrap: true,
            touch: true
        }).cycle();
    }
}

// ── Grid de Filmes ───────────────────────────
function renderizarFilmes(filmes) {
    const lista = document.getElementById("listaFilmes");

    filmes.forEach(function(filme) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";

        col.innerHTML = `
            <a href="detalhes.html?id=${filme.id}" class="filme-card">
                <img src="${filme.imagem}" alt="${filme.titulo}"
                    onerror="this.style.background='#1a1a2e'; this.removeAttribute('src');"/>
                <p>${filme.titulo}</p>
            </a>
        `;

        lista.appendChild(col);
    });
}

// ── Footer ───────────────────────────────────
function renderizarFooter(autora) {
    document.getElementById("footerAutora").textContent =
        `${autora.nome} — ${autora.curso}`;
}

// ── Inicialização ────────────────────────────
document.addEventListener("DOMContentLoaded", function() {

    fetch("db.json")
        .then(function(res) { return res.json(); })
        .then(function(dados) {
            renderizarSlides(dados.filmes);
            renderizarFilmes(dados.filmes);
            renderizarFooter(dados.autora);
        })
        .catch(function() {
            console.error("Erro ao carregar db.json.");
        });

});
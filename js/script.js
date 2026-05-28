function renderizarSlides(filmes) {
    const indicadores = document.getElementById("carrosselIndicadores");
    const inner       = document.getElementById("carrosselInner");

    const destaques = filmes.filter(f => f.destaque);

    destaques.forEach(function(filme, index) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("data-bs-target", "#heroCarrossel");
        btn.setAttribute("data-bs-slide-to", index);
        if (index === 0) btn.classList.add("active");
        indicadores.appendChild(btn);

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

function renderizarFilmes(filmes) {
    const lista = document.getElementById("listaFilmes");
    lista.innerHTML = "";

    if (filmes.length === 0) {
        lista.innerHTML = `
            <div class="col-12 text-center py-5">
                <p style="color:#c9a227; font-size:1.1rem;">
                    ⚡ Nenhum filme encontrado para essa busca.
                </p>
            </div>
        `;
        return;
    }

    filmes.forEach(function(filme, index) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";
        col.innerHTML = `
            <a href="detalhes.html?id=${filme.id}" class="filme-card filme-card-animar">
                <img src="${filme.imagem}" alt="${filme.titulo}"
                    onerror="this.style.background='#1a1a2e'; this.removeAttribute('src');"/>
                <p>${filme.titulo}</p>
            </a>
        `;
        col.querySelector("a").style.animationDelay = (index * 80) + "ms";
        lista.appendChild(col);
    });
}

function ativarPesquisa(filmes) {
    const input = document.querySelector("input[type='search']");
    if (!input) return;

    input.addEventListener("input", function() {
        const termo = input.value.toLowerCase().trim();

        let filtrados = filmes.filter(function(filme) {
            return (
                filme.titulo.toLowerCase().includes(termo) ||
                filme.diretor.toLowerCase().includes(termo) ||
                String(filme.ano).includes(termo)
            );
        });

        const ordenacaoAtual = document.getElementById("ordenacao").value;
        filtrados = ordenar(filtrados, ordenacaoAtual);

        renderizarFilmes(filtrados);

        if (termo.length > 0) {
            document.getElementById("filmes").scrollIntoView({ behavior: "smooth" });
        }
    });
}

function ordenar(filmes, criterio) {
    const copia = [...filmes];
    if (criterio === "ano-asc") {
        copia.sort((a, b) => a.ano - b.ano);
    } else if (criterio === "ano-desc") {
        copia.sort((a, b) => b.ano - a.ano);
    } else if (criterio === "az") {
        copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterio === "za") {
        copia.sort((a, b) => b.titulo.localeCompare(a.titulo));
    }
    return copia;
}

function ativarOrdenacao(filmes) {
    const select = document.getElementById("ordenacao");
    if (!select) return;

    select.addEventListener("change", function() {
        const termo = document.querySelector("input[type='search']").value.toLowerCase().trim();

        let filtrados = filmes.filter(function(filme) {
            return (
                filme.titulo.toLowerCase().includes(termo) ||
                filme.diretor.toLowerCase().includes(termo) ||
                String(filme.ano).includes(termo)
            );
        });

        filtrados = ordenar(filtrados, select.value);
        renderizarFilmes(filtrados);
    });
}

function ativarVoltarAoTopo() {
    const btn = document.getElementById("btnTopo");
    if (!btn) return;

    window.addEventListener("scroll", function() {
        if (window.scrollY > 400) {
            btn.classList.add("visivel");
        } else {
            btn.classList.remove("visivel");
        }
    });

    btn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function renderizarFooter(autora) {
    document.getElementById("footerAutora").textContent =
        `${autora.nome} — ${autora.curso}`;
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarSlides(dados.filmes);
    renderizarFilmes(dados.filmes);
    renderizarFooter(dados.autora);
    ativarPesquisa(dados.filmes);
    ativarOrdenacao(dados.filmes);
    ativarVoltarAoTopo();
});
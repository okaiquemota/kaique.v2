/* A seta troca o perfil: foto, nome, descrição e links (assets/js/perfis.js).
   Também troca com as setas do teclado e arrastando a foto pro lado. */
(function () {
    'use strict';

    var perfis = window.PERFIS || [];
    var NOMES_REDES = { instagram: 'Instagram', github: 'GitHub', behance: 'Behance' };
    var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var foto = document.getElementById('foto');
    var nome = document.getElementById('nome');
    var sobre = document.getElementById('sobre');
    var links = document.getElementById('links');
    var seta = document.getElementById('seta');
    var conta = document.getElementById('conta');

    document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    if (perfis.length < 2) { seta.hidden = true; return; }

    function el(tag, classe, texto) {
        var e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto != null) e.textContent = texto;
        return e;
    }
    function linkFora(texto, url, rotulo) {
        var a = el('a', null, texto);
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        if (rotulo) a.setAttribute('aria-label', rotulo);
        return a;
    }
    function indice(id) {
        for (var i = 0; i < perfis.length; i++) if (perfis[i].id === id) return i;
        return -1;
    }

    function montaLinks(p) {
        var lista = el('ul');
        var itens = p.links || (p.eventos || []).map(function (ev) {
            return /^https?:\/\//i.test(ev.drive || '') ? { texto: ev.nome + ' ↗', url: ev.drive } : { texto: ev.nome + ' · em breve' };
        });
        itens.forEach(function (item) {
            var li = el('li');
            if (item.perfil) {
                var interno = el('a', null, item.texto);
                interno.href = '#' + item.perfil;
                li.append(interno);
            } else if (item.url) {
                li.append(linkFora(item.texto, item.url));
            } else {
                li.append(el('span', 'em-breve', item.texto));
            }
            lista.append(li);
        });

        var redes = el('ul', 'redes');
        (p.redes || []).forEach(function (r) {
            var a = linkFora('', r.url, NOMES_REDES[r.rede] || r.rede);
            a.innerHTML = '<svg class="logo" aria-hidden="true" focusable="false"><use href="#ico-' + r.rede + '"/></svg>';
            var li = el('li');
            li.append(a);
            redes.append(li);
        });

        links.replaceChildren(lista, redes);
    }

    function mostra(p, i) {
        foto.src = p.foto;
        foto.alt = p.alt;
        nome.textContent = p.nome;
        sobre.replaceChildren(document.createTextNode(p.sobre[0] + ' '));
        if (p.sobre[1]) sobre.append(el('span', 'cidade', p.sobre[1]));
        montaLinks(p);
        document.title = p.nome;
        conta.textContent = (i + 1) + '/' + perfis.length;
        seta.setAttribute('aria-label', 'Próximo perfil: ' + perfis[(i + 1) % perfis.length].nome);
    }

    var atual = 0;
    var trocando = false;
    function vai(i, doEndereco) {
        i = (i + perfis.length) % perfis.length;
        if (i === atual || trocando) return;
        atual = i;
        var p = perfis[i];
        if (!doEndereco) {
            try {
                history.replaceState(null, '', i === 0 ? location.pathname + location.search : '#' + p.id);
            } catch (e) {
                // em página embutida o endereço pode não mudar; a troca segue igual
            }
        }

        if (reduzir) { mostra(p, i); return; }
        trocando = true;
        document.body.classList.add('trocando');
        setTimeout(function () {
            mostra(p, i);
            var pronto = function () {
                document.body.classList.remove('trocando');
                trocando = false;
            };
            if (foto.decode) foto.decode().then(pronto, pronto); else pronto();
        }, 240);
    }

    // começa no perfil do endereço (kaique.v2/#imnotkiq)
    var inicio = indice(location.hash.slice(1));
    if (inicio > 0) { atual = inicio; mostra(perfis[inicio], inicio); } else { mostra(perfis[0], 0); }
    window.addEventListener('hashchange', function () {
        var i = indice(location.hash.slice(1));
        vai(i < 0 ? 0 : i, true);
    });

    seta.addEventListener('click', function () { vai(atual + 1); });
    window.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowRight') vai(atual + 1);
        else if (e.key === 'ArrowLeft') vai(atual - 1);
    });

    // arrastar a foto pro lado
    var quadro = document.getElementById('quadro');
    var x0 = null;
    quadro.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    quadro.addEventListener('pointerup', function (e) {
        if (x0 === null) return;
        var dx = e.clientX - x0;
        x0 = null;
        if (Math.abs(dx) > 40) vai(atual + (dx < 0 ? 1 : -1));
    });
    quadro.addEventListener('pointercancel', function () { x0 = null; });

    // deixa as outras fotos prontas
    window.addEventListener('load', function () {
        perfis.forEach(function (p) { new Image().src = p.foto; });
    });
})();

/* As setas trocam o perfil: foto, nome, descrição e links (assets/js/perfis.js).
   Também troca com as setas do teclado e arrastando a foto pro lado. */
(function () {
    'use strict';

    var perfis = window.PERFIS || [];
    var NOMES_REDES = { instagram: 'Instagram', github: 'GitHub', behance: 'Behance' };
    var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var foto = document.getElementById('foto');
    var moldura = document.getElementById('moldura');
    var nome = document.getElementById('nome');
    var sobre = document.getElementById('sobre');
    var links = document.getElementById('links');
    var seta = document.getElementById('seta');
    var anterior = document.getElementById('anterior');
    var conta = document.getElementById('conta');
    var corDaBarra = document.querySelector('meta[name="theme-color"]');

    document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    if (perfis.length < 2) { document.getElementById('troca').hidden = true; return; }

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

    // cada perfil tem o seu visual (cores e detalhes no site.css)
    function veste(p) {
        document.documentElement.dataset.perfil = p.id;
        if (corDaBarra) corDaBarra.content = getComputedStyle(document.documentElement).getPropertyValue('--papel').trim();
    }

    function mostra(p, i) {
        veste(p);
        foto.src = p.foto;
        foto.alt = p.alt;
        pintaTexto(p, i);
    }

    function pintaTexto(p, i) {
        nome.textContent = p.nome;
        sobre.replaceChildren(document.createTextNode(p.sobre[0] + ' '));
        if (p.sobre[1]) sobre.append(el('span', 'cidade', p.sobre[1]));
        montaLinks(p);
        document.title = p.nome;
        conta.textContent = (i + 1) + '/' + perfis.length;
        seta.setAttribute('aria-label', 'Próximo perfil: ' + perfis[(i + 1) % perfis.length].nome);
        anterior.setAttribute('aria-label', 'Perfil anterior: ' + perfis[(i - 1 + perfis.length) % perfis.length].nome);
    }

    // ---------- Animação da troca ----------
    // A foto nova entra como uma cortina pelo lado da seta, com um zoom que assenta,
    // e a antiga recua um pouco por baixo. O texto sai subindo e volta descendo, um de cada vez.
    var CURVA = 'cubic-bezier(0.77, 0, 0.18, 1)';
    var DURACAO = 950;
    var cortina = window.CSS && CSS.supports && CSS.supports('clip-path', 'inset(0 0 0 0)');
    var textos = [nome, sobre, links];

    function troca(p, i, dir) {
        trocando = true;
        veste(p);

        textos.forEach(function (t, k) {
            t.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-8px)' }],
                { duration: 220, delay: k * 40, easing: 'ease-in', fill: 'forwards' });
        });
        setTimeout(function () {
            pintaTexto(p, i);
            textos.forEach(function (t, k) {
                t.getAnimations().forEach(function (a) { a.cancel(); });
                t.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
                    { duration: 520, delay: 160 + k * 70, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'backwards' });
            });
        }, 340);

        var velha = foto;
        var nova = new Image(velha.width, velha.height);
        nova.className = 'foto foto-nova';
        nova.alt = p.alt;
        nova.src = p.foto;
        var comeca = function () {
            moldura.append(nova);
            var entra = nova.animate(cortina ? [
                { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', transform: 'scale(1.14)' },
                { clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' }
            ] : [
                { opacity: 0, transform: 'scale(1.06)' },
                { opacity: 1, transform: 'scale(1)' }
            ], { duration: DURACAO, easing: CURVA });
            velha.animate([
                { transform: 'none' },
                { transform: 'translateX(' + (-dir * 14) + '%) scale(1.04)' }
            ], { duration: DURACAO, easing: CURVA, fill: 'forwards' });
            entra.onfinish = function () {
                velha.remove();
                nova.classList.remove('foto-nova');
                nova.id = 'foto';
                foto = nova;
                trocando = false;
            };
        };
        if (nova.decode) nova.decode().then(comeca, comeca); else nova.onload = comeca;
    }

    var atual = 0;
    var trocando = false;
    function vai(i, doEndereco, dir) {
        i = (i + perfis.length) % perfis.length;
        if (i === atual || trocando) return;
        dir = dir || (i > atual ? 1 : -1);
        atual = i;
        var p = perfis[i];
        if (!doEndereco) {
            try {
                history.replaceState(null, '', i === 0 ? location.pathname + location.search : '#' + p.id);
            } catch (e) {
                // em página embutida o endereço pode não mudar; a troca segue igual
            }
        }

        if (reduzir || !foto.animate) { mostra(p, i); return; }
        troca(p, i, dir);
    }

    // começa no perfil do endereço (kaique.v2/#imnotkiq)
    var inicio = indice(location.hash.slice(1));
    if (inicio > 0) { atual = inicio; mostra(perfis[inicio], inicio); } else { mostra(perfis[0], 0); }
    window.addEventListener('hashchange', function () {
        var i = indice(location.hash.slice(1));
        vai(i < 0 ? 0 : i, true);
    });

    seta.addEventListener('click', function () { vai(atual + 1, false, 1); });
    anterior.addEventListener('click', function () { vai(atual - 1, false, -1); });
    window.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowRight') vai(atual + 1, false, 1);
        else if (e.key === 'ArrowLeft') vai(atual - 1, false, -1);
    });

    // arrastar a foto pro lado
    var quadro = document.getElementById('quadro');
    var x0 = null;
    quadro.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    quadro.addEventListener('pointerup', function (e) {
        if (x0 === null) return;
        var dx = e.clientX - x0;
        x0 = null;
        if (Math.abs(dx) > 40) vai(atual + (dx < 0 ? 1 : -1), false, dx < 0 ? 1 : -1);
    });
    quadro.addEventListener('pointercancel', function () { x0 = null; });

    // deixa as outras fotos prontas
    window.addEventListener('load', function () {
        perfis.forEach(function (p) { new Image().src = p.foto; });
    });
})();

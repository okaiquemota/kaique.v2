/* Kaique Mota · Fotografia
   Efeitos e interações. A página funciona sem este arquivo: sem ele, tudo
   aparece de uma vez, os pacotes ficam um embaixo do outro e o formulário
   não envia (os links diretos do WhatsApp continuam lá). */
(function () {
    'use strict';

    var raiz = document.documentElement;
    raiz.classList.add('js');
    var poucoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
    function comportamento() { return poucoMovimento.matches ? 'auto' : 'smooth'; }

    document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // ---------- Topo: ganha uma linha ao rolar e se esconde enquanto desce ----------
    var topo = document.querySelector('.topo');
    var linksMenu = Array.prototype.slice.call(document.querySelectorAll('.menu ul a'));
    var ultimoY = window.scrollY;
    var agendado = false;
    function aoRolar() {
        agendado = false;
        var y = Math.max(0, window.scrollY);
        topo.classList.toggle('rolou', y > 8);
        if (y < 200) linksMenu.forEach(function (a) { a.removeAttribute('aria-current'); });
        if (Math.abs(y - ultimoY) < 6) return;
        topo.classList.toggle('escondido', y > ultimoY && y > 360 && !topo.contains(document.activeElement));
        ultimoY = y;
    }
    window.addEventListener('scroll', function () {
        if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
    }, { passive: true });
    topo.addEventListener('focusin', function () { topo.classList.remove('escondido'); });
    aoRolar();

    // o link do menu acompanha a seção que está na tela
    if ('IntersectionObserver' in window) {
        var secoes = linksMenu.map(function (a) { return document.querySelector(a.getAttribute('href')); });
        var vigiaSecao = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (en) {
                if (!en.isIntersecting) return;
                var k = secoes.indexOf(en.target);
                linksMenu.forEach(function (a, j) {
                    if (j === k) a.setAttribute('aria-current', 'true');
                    else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        secoes.forEach(function (s) { if (s) vigiaSecao.observe(s); });
    }

    // ---------- Menu do celular ----------
    var menu = document.getElementById('menu-celular');
    var abreMenu = document.querySelector('.abre-menu');
    if (menu && abreMenu && typeof menu.showModal === 'function') {
        abreMenu.addEventListener('click', function () {
            menu.showModal();
            abreMenu.setAttribute('aria-expanded', 'true');
        });
        menu.addEventListener('close', function () { abreMenu.setAttribute('aria-expanded', 'false'); });
        menu.querySelector('.fecha-menu').addEventListener('click', function () { menu.close(); });
        menu.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (ev) {
                var alvo = document.querySelector(a.getAttribute('href'));
                if (!alvo) return;
                ev.preventDefault();
                menu.close();
                alvo.scrollIntoView({ behavior: comportamento() });
                history.replaceState(null, '', a.getAttribute('href'));
            });
        });
    }

    // ---------- Aparecer ao rolar ----------
    var revelaveis = document.querySelectorAll('[data-revela]');
    if ('IntersectionObserver' in window && !poucoMovimento.matches) {
        var vigia = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('visivel'); vigia.unobserve(en.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        revelaveis.forEach(function (el) { vigia.observe(el); });
    } else {
        revelaveis.forEach(function (el) { el.classList.add('visivel'); });
    }

    // ---------- Pacotes em abas ----------
    var paineis = Array.prototype.slice.call(document.querySelectorAll('.painel'));
    var lista = document.querySelector('.abas');
    var abas = [];
    function escolhe(k, marcaEndereco) {
        abas.forEach(function (b, j) {
            var sel = j === k;
            b.setAttribute('aria-selected', sel ? 'true' : 'false');
            b.tabIndex = sel ? 0 : -1;
            paineis[j].hidden = !sel;
        });
        var b = abas[k];
        lista.scrollTo({ left: b.offsetLeft - (lista.clientWidth - b.offsetWidth) / 2, behavior: comportamento() });
        if (marcaEndereco) history.replaceState(null, '', '#' + paineis[k].id);
    }
    function peloEndereco() {
        var id = decodeURIComponent(location.hash.slice(1));
        for (var j = 0; j < paineis.length; j++) {
            if (paineis[j].id === id) {
                escolhe(j, false);
                document.getElementById('investimento').scrollIntoView();
                return true;
            }
        }
        return false;
    }
    if (paineis.length && lista) {
        paineis.forEach(function (p, k) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'aba';
            b.id = 'aba-' + p.id;
            b.textContent = p.dataset.aba;
            b.setAttribute('role', 'tab');
            b.setAttribute('aria-controls', p.id);
            b.addEventListener('click', function () { escolhe(k, true); });
            b.addEventListener('keydown', function (ev) {
                var alvo = null;
                if (ev.key === 'ArrowRight') alvo = (k + 1) % paineis.length;
                else if (ev.key === 'ArrowLeft') alvo = (k - 1 + paineis.length) % paineis.length;
                else if (ev.key === 'Home') alvo = 0;
                else if (ev.key === 'End') alvo = paineis.length - 1;
                if (alvo === null) return;
                ev.preventDefault();
                escolhe(alvo, true);
                abas[alvo].focus();
            });
            lista.appendChild(b);
            abas.push(b);
            p.setAttribute('role', 'tabpanel');
            p.setAttribute('aria-labelledby', b.id);
            p.tabIndex = 0;
        });
        lista.setAttribute('role', 'tablist');
        lista.hidden = false;
        if (!peloEndereco()) escolhe(0, false);
        window.addEventListener('hashchange', peloEndereco);
    }

    // ---------- Formulário: vira uma mensagem pronta no WhatsApp ----------
    var form = document.getElementById('consulta');
    if (form) {
        var campo = form.elements;
        var erroNome = document.getElementById('erro-nome');
        var aviso = document.getElementById('aviso-form');
        var hoje = new Date();
        campo.data.min = [hoje.getFullYear(), String(hoje.getMonth() + 1).padStart(2, '0'), String(hoje.getDate()).padStart(2, '0')].join('-');

        // "Quero este" num pacote já preenche o tipo e a mensagem
        document.querySelectorAll('[data-pacote]').forEach(function (a) {
            a.addEventListener('click', function () {
                campo.tipo.value = a.dataset.tipo;
                if (!campo.mensagem.value.trim() || campo.mensagem.dataset.auto) {
                    campo.mensagem.value = 'Tenho interesse no pacote ' + a.dataset.pacote + '.';
                    campo.mensagem.dataset.auto = '1';
                }
                setTimeout(function () { campo.nome.focus({ preventScroll: true }); }, 0);
            });
        });
        campo.mensagem.addEventListener('input', function () { delete campo.mensagem.dataset.auto; });
        campo.nome.addEventListener('input', function () {
            if (campo.nome.value.trim()) { campo.nome.removeAttribute('aria-invalid'); erroNome.hidden = true; }
        });

        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var v = function (n) { return (campo[n].value || '').trim(); };
            if (!v('nome')) {
                campo.nome.setAttribute('aria-invalid', 'true');
                erroNome.hidden = false;
                campo.nome.focus();
                return;
            }
            var data = v('data');
            if (data) { var p = data.split('-'); data = p[2] + '/' + p[1] + '/' + p[0]; }
            var linhas = [
                'Oi, Kaique! Vim pelo site.', '',
                'Nome: ' + v('nome'),
                'Tipo de foto: ' + v('tipo'),
                'Data: ' + (data || 'ainda não sei'),
                'Local: ' + (v('local') || 'a combinar')
            ];
            if (v('mensagem')) linhas.push('', v('mensagem'));
            var url = 'https://wa.me/' + form.dataset.whats + '?text=' + encodeURIComponent(linhas.join('\n'));
            aviso.textContent = 'Abrindo o WhatsApp…';
            var janela = window.open(url, '_blank');
            if (janela) janela.opener = null;
            else location.href = url;
        });
    }

    // ---------- Foto grande: setas, teclado e arrastar no celular ----------
    var quadros = Array.prototype.slice.call(document.querySelectorAll('.quadro'));
    var visor = document.getElementById('visor');
    if (quadros.length && visor && typeof visor.showModal === 'function') {
        var foto = document.getElementById('visor-foto');
        var conta = document.getElementById('visor-conta');
        var atual = 0;
        var quemAbriu = null;

        var mostra = function (k) {
            atual = (k + quadros.length) % quadros.length;
            var q = quadros[atual];
            var miniatura = q.querySelector('img');
            foto.classList.add('trocando');
            var nova = new Image();
            nova.onload = nova.onerror = function () {
                foto.src = nova.src;
                foto.alt = miniatura.alt;
                requestAnimationFrame(function () { foto.classList.remove('trocando'); });
            };
            nova.src = q.dataset.grande;
            conta.textContent = (atual + 1) + ' de ' + quadros.length;
            new Image().src = quadros[(atual + 1) % quadros.length].dataset.grande;
        };

        quadros.forEach(function (q, k) {
            q.addEventListener('click', function () {
                quemAbriu = q;
                mostra(k);
                visor.showModal();
            });
        });
        visor.addEventListener('close', function () { if (quemAbriu) quemAbriu.focus(); });
        document.getElementById('visor-fechar').addEventListener('click', function () { visor.close(); });
        document.getElementById('visor-ant').addEventListener('click', function () { mostra(atual - 1); });
        document.getElementById('visor-prox').addEventListener('click', function () { mostra(atual + 1); });
        visor.addEventListener('keydown', function (ev) {
            if (ev.key === 'ArrowLeft') mostra(atual - 1);
            else if (ev.key === 'ArrowRight') mostra(atual + 1);
        });

        var x0 = null;
        var arrastou = false;
        visor.addEventListener('pointerdown', function (ev) { x0 = ev.clientX; arrastou = false; });
        visor.addEventListener('pointerup', function (ev) {
            if (x0 === null) return;
            var dx = ev.clientX - x0;
            x0 = null;
            if (Math.abs(dx) > 50) { arrastou = true; mostra(atual + (dx < 0 ? 1 : -1)); }
        });
        // clicar fora da foto fecha
        visor.addEventListener('click', function (ev) {
            if (!arrastou && ev.target === visor) visor.close();
            arrastou = false;
        });
    }
})();

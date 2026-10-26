/* -------------------------------------------------------------------------
   Vistas da pagina: tudo, projetos, fotografia e sobre.
   Cada uma tem endereco proprio (#projetos, #fotografia, #sobre).
------------------------------------------------------------------------- */
(() => {
    const grade = document.getElementById('grade');
    const sobre = document.getElementById('sobre');
    const conteudo = document.getElementById('conteudo');
    const cards = [...grade.querySelectorAll('.card')];
    const links = [...document.querySelectorAll('[data-vista]')];
    const vistas = ['', 'projetos', 'fotografia', 'sobre'];

    function mostrar(primeira) {
        const pedida = decodeURIComponent(location.hash.slice(1));
        const vista = vistas.includes(pedida) ? pedida : '';

        grade.hidden = vista === 'sobre';
        sobre.hidden = vista !== 'sobre';
        let n = 0;
        cards.forEach((card) => {
            const aparece = !vista || card.dataset.grupo === vista;
            card.hidden = !aparece;
            if (aparece) card.style.setProperty('--i', n++);
        });
        links.forEach((link) => {
            if (link.dataset.vista === vista && vista) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });

        // reinicia a entrada a cada troca de vista
        [grade, sobre].forEach((el) => el.classList.remove('entra'));
        void conteudo.offsetWidth;
        (vista === 'sobre' ? sobre : grade).classList.add('entra');

        if (!primeira) conteudo.focus({ preventScroll: true });
    }

    window.addEventListener('hashchange', () => {
        mostrar(false);
        window.scrollTo({ top: 0 });
    });
    mostrar(true);

    document.querySelectorAll('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();

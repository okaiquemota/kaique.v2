/* ==================================================================
   OS TRÊS PERFIS — a seta passa de um pro outro, nesta ordem.
   A assinatura fica fixa; muda a foto, o nome, a descrição e os links.

   id       vai no endereço: kaique.v2/#imnotkiq abre direto nele
   nome     o nome no topo
   sobre    a descrição em cinza (linha 2 desce sozinha no celular)
   foto     em pé, 4:5, em assets/img/
   links    { texto, url } abre fora; { texto, perfil } troca de perfil aqui
   redes    logos: instagram, github ou behance
   eventos  (imnotkiq) um link por evento, direto pro drive.
            Põe o novo em cima. Sem drive ainda: aparece "em breve".
            O drive precisa estar em "Qualquer pessoa com o link → Leitor".
   ================================================================== */
window.PERFIS = [
    {
        id: 'kaique',
        nome: 'Kaique Mota',
        sobre: ['Fotógrafo, designer e desenvolvedor.', 'Ribeirão Preto, SP.'],
        foto: 'assets/img/kaique.jpg',
        alt: 'Kaique Mota de perfil contra o céu, em preto e branco',
        links: [
            { texto: '@imnotkiq', perfil: 'imnotkiq' },
            { texto: '@okaiquemota', perfil: 'okaiquemota' },
            { texto: '@mov.code', url: 'https://www.instagram.com/mov.code' }
        ],
        redes: [
            { rede: 'instagram', url: 'https://www.instagram.com/kiq.ham' },
            { rede: 'github', url: 'https://github.com/okaiquemota' },
            { rede: 'behance', url: 'https://www.behance.net/okaiquemota' }
        ]
    },
    {
        id: 'okaiquemota',
        nome: 'okaiquemota',
        sobre: ['Fotógrafo de ensaios e casais.', 'Ribeirão Preto, SP.'],
        foto: 'assets/img/okaiquemota.jpg',
        alt: 'Casal correndo de mãos dadas na grama, em preto e branco',
        links: [
            { texto: 'Agendar um ensaio ↗', url: 'https://ig.me/m/okaiquemota' }
        ],
        redes: [
            { rede: 'instagram', url: 'https://www.instagram.com/okaiquemota' }
        ]
    },
    {
        id: 'imnotkiq',
        nome: 'imnotkiq',
        sobre: ['Fotografia automotiva.', 'As fotos de cada evento, no Drive.'],
        foto: 'assets/img/imnotkiq.jpg',
        alt: 'Carro de drift no meio da fumaça, em preto e branco',
        eventos: [
            { nome: 'Ultimate Drift', drive: '' }
        ],
        redes: [
            { rede: 'instagram', url: 'https://www.instagram.com/imnotkiq' }
        ]
    }
];

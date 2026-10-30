# Kaique Mota

Página pessoal: o nome no topo, uma foto no meio com a assinatura de verdade por cima e os links embaixo, tudo centralizado.

Em `/fotografia` fica o site de fotografia (o do [@okaiquemota](https://www.instagram.com/okaiquemota/)): abertura com foto e apresentação, "Trabalhos recentes" (uma faixa de fotos por trabalho), "Sobre", "Como funciona", os pacotes 2026 em abas, as condições e "Consultar data", um formulário que monta a mensagem pronta no WhatsApp. Fica em https://okaiquemota.com.br/fotografia/ — e `/fotografia/#casamento`, `#pre-wedding`, `#festas`, `#aniversarios`, `#making-of`, `#ensaios` e `#marcas` já abrem a aba do tipo de foto.

Títulos em Instrument Serif e texto em Instrument Sans, as duas guardadas em `fotografia/fontes/` (licença OFL). Os efeitos (fotos que aparecem ao rolar, topo que some ao descer, abas, visor de fotos) ficam no `fotografia.js`; sem ele a página continua inteira, e quem pede menos movimento no sistema vê tudo parado.

```
.
├── index.html
├── fotografia/
│   ├── index.html         o site do okaiquemota (pacotes e preços estão aqui)
│   ├── fotografia.css
│   ├── fotografia.js      menu do celular, abas dos pacotes, visor de fotos e formulário
│   ├── fontes/            Instrument Serif e Instrument Sans (woff2)
│   └── img/               fotos dos trabalhos (NOME-1080.jpg e NOME-720.jpg, 4:5) e o retrato kaique-*.jpg
└── assets/
    ├── css/site.css
    └── img/
        ├── kaique.jpg         a foto do meio (em pé, 4:5)
        ├── assinatura.png     a assinatura, tirada do traço do lápis (preta, fundo transparente)
        └── assinatura.svg     a mesma assinatura em vetor (também é o ícone da aba)
```

Não tem build nem dependência. Pra rodar no computador: `python3 -m http.server 8000`.

## Trocar a foto

Substitua `assets/img/kaique.jpg` por outra com o mesmo nome. Se mudar o tamanho, atualize o `width` e o `height` da `<img class="foto">` no `index.html`.

## Adicionar um trabalho

Cada trabalho é um `<article class="trabalho">` na seção `#trabalhos` do `fotografia/index.html`: uma faixa com 4 fotos e, embaixo, o nome e o tipo. Pra um trabalho novo, copie o bloco logo abaixo do título da seção (o mais novo fica em cima) e troque o nome, o tipo e as fotos: em cada foto, o `src`, o `srcset`, o `data-grande` (a versão grande que abre no visor), o `alt` e o `aria-label`. Cada foto tem duas versões em `fotografia/img/`: `-1080.jpg` (1080×1350) e `-720.jpg` (720×900).

## Adicionar ou trocar um link

Os links ficam no `<nav class="links">` do `index.html`. Cada grupo é uma `<ul>`; os logos usam os símbolos do topo do arquivo (`#ico-instagram`, `#ico-x`, `#ico-github`, `#ico-behance`).

## Publicar

Em **Settings → Pages**, branch `main` e pasta `/ (root)`. O site fica em https://okaiquemota.com.br (o arquivo `CNAME` diz isso pro GitHub).

DNS no Registro.br (zona do okaiquemota.com.br):

| Tipo  | Nome  | Valor                   |
|-------|-------|-------------------------|
| A     | (vazio) | 185.199.108.153       |
| A     | (vazio) | 185.199.109.153       |
| A     | (vazio) | 185.199.110.153       |
| A     | (vazio) | 185.199.111.153       |
| CNAME | www   | okaiquemota.github.io   |

Quando o DNS propagar, marca **Enforce HTTPS** em Settings → Pages.

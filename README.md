# Kaique Mota

Página pessoal: o nome no topo, uma foto no meio com a assinatura de verdade por cima e os links embaixo, tudo centralizado.

Em `/fotografia` fica o site profissional do [@okaiquemota](https://www.instagram.com/okaiquemota/), no estilo dos sites de fotógrafos de casamento fine art: abertura com três fotos, a assinatura, o portfólio contado como história (o pré-wedding da Vinicius & Stefany), "Sobre", "Como funciona", os pacotes 2026 e "Consultar data", um formulário que monta a mensagem pronta no WhatsApp. Fica em https://okaiquemota.com.br/fotografia/ — e `/fotografia/#casamento`, `#pre-wedding`, `#festas`, `#aniversarios`, `#making-of`, `#ensaios` e `#marcas` já abrem o tipo de foto.

```
.
├── index.html
├── fotografia/
│   ├── index.html         o site do okaiquemota (pacotes e preços estão aqui)
│   ├── fotografia.css
│   └── img/               fotos do portfólio (vs-NN-1080.jpg e vs-NN-720.jpg, 4:5) e o retrato kaique-*.jpg
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

## Trocar fotos do portfólio

Cada foto tem duas versões em `fotografia/img/`: `-1080.jpg` (1080×1350) e `-720.jpg` (720×900). Pra trocar uma, substitua as duas com o mesmo nome e ajuste o texto do `alt` no `fotografia/index.html`.

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

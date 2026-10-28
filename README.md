# Kaique Mota

Página pessoal: o nome no topo, uma foto no meio com a assinatura de verdade por cima e os links embaixo, tudo centralizado.

Em `/fotografia` fica o site do [@okaiquemota](https://www.instagram.com/okaiquemota/): a mesma primeira tela, nas cores do okaiquemota (rosado claro e tinta marrom), e embaixo os pacotes, o "Como funciona" e a reserva pelo WhatsApp, no desenho do orçamento. Fica em https://okaiquemota.com.br/fotografia/ — e `/fotografia/#casamento`, `#pre-wedding`, `#festas`, `#aniversarios`, `#making-of`, `#ensaios` e `#marcas` já abrem o tipo de foto.

```
.
├── index.html
├── fotografia/
│   ├── index.html         o site do okaiquemota (pacotes e preços estão aqui)
│   └── fotografia.css
└── assets/
    ├── css/site.css
    └── img/
        ├── kaique.jpg         a foto do meio (em pé, 4:5)
        ├── okaiquemota.jpg    a foto do site de fotografia
        ├── assinatura.png     a assinatura, tirada do traço do lápis (preta, fundo transparente)
        └── assinatura.svg     a mesma assinatura em vetor (também é o ícone da aba)
```

Não tem build nem dependência. Pra rodar no computador: `python3 -m http.server 8000`.

## Trocar a foto

Substitua `assets/img/kaique.jpg` por outra com o mesmo nome. Se mudar o tamanho, atualize o `width` e o `height` da `<img class="foto">` no `index.html`.

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

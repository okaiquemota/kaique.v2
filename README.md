# Kaique Mota

Página pessoal: menu pequeno no topo e a assinatura, em verde neon, se escrevendo no meio da tela.

```
.
├── index.html                 links e a assinatura (em linha, para animar)
└── assets/
    ├── css/site.css
    └── img/assinatura.svg     a assinatura vetorizada, sozinha
```

Não tem build nem dependência. Pra rodar no computador: `python3 -m http.server 8000`.

## A assinatura

É a assinatura de verdade, fotografada no papel e vetorizada. No `index.html` ela aparece por baixo de uma máscara: cinco traços guia (em `<g class="guias">`) correm na ordem em que ela é escrita e vão revelando o desenho. Clicar na assinatura escreve de novo. Quem pede menos movimento no sistema vê ela pronta, sem animação.

A cor fica em `--neon`, no topo do `site.css`.

## Adicionar ou trocar um link

Os links ficam no `<nav class="links">` do `index.html`. Cada grupo é uma `<ul>`.

## Publicar

Em **Settings → Pages**, escolhe a branch `main` e a pasta `/ (root)`. O site fica em https://okaiquemota.github.io/kaique.v2/

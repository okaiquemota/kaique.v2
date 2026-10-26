# Kaique Mota

Página pessoal: o nome no topo, uma foto no meio com a assinatura de verdade por cima e os links embaixo.

```
.
├── index.html
└── assets/
    ├── css/site.css
    └── img/
        ├── foto.jpg           a foto do meio (troque pela que quiser, em pé, 4:5)
        ├── assinatura.png     a assinatura, tirada do traço do lápis (preta, fundo transparente)
        └── assinatura.svg     a mesma assinatura em vetor, para outros usos
```

Não tem build nem dependência. Pra rodar no computador: `python3 -m http.server 8000`.

## Trocar a foto

Substitua `assets/img/foto.jpg` por outra com o mesmo nome. Se mudar o tamanho, atualize o `width` e o `height` da `<img class="foto">` no `index.html`.

## Adicionar ou trocar um link

Os links ficam no `<nav class="links">` do `index.html`. Cada grupo é uma `<ul>`.

## Publicar

Em **Settings → Pages**, escolhe a branch `main` e a pasta `/ (root)`. O site fica em https://okaiquemota.github.io/kaique.v2/

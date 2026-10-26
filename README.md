# Kaique Mota

Portfólio pessoal: projetos, fotografia e contato.

```
.
├── index.html             página única (tudo, #projetos, #fotografia, #sobre)
├── img/                   miniaturas quadradas
└── assets/
    ├── css/site.css
    └── js/site.js         troca de vista pelo endereço
```

Não tem build nem dependência. Pra rodar no computador: `python3 -m http.server 8000`.

## Adicionar ou trocar um link

Cada miniatura é um `<a class="card">` dentro de `#grade` no `index.html`. O `data-grupo` diz em qual vista ela aparece (`projetos`, `fotografia` ou qualquer outro para aparecer só em "tudo"). A imagem vai em `img/`, quadrada.

## Publicar

Em **Settings → Pages**, escolhe a branch `main` e a pasta `/ (root)`. O site fica em https://okaiquemota.github.io/kaique.v2/

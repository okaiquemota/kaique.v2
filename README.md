# Kaique Mota

Site único dos três perfis: o pessoal, o [@okaiquemota](https://www.instagram.com/okaiquemota/) (ensaios e casais) e o [@imnotkiq](https://www.instagram.com/imnotkiq/) (fotografia automotiva, com os drives dos eventos).

Tudo centralizado: o nome no topo, uma foto no meio com a assinatura de verdade por cima, os links embaixo e as setas (← 1/3 →) logo abaixo deles. As setas passam de um perfil pro outro: a assinatura fica, e mudam a foto, o nome, a descrição e os links. Também troca com as setas do teclado e arrastando a foto pro lado no celular.

Cada perfil tem o seu visual, com detalhes sutis (as cores ficam no começo do `site.css`, os detalhes no fim):

- **Kaique Mota**: branco e preto.
- **okaiquemota**: rosado bem claro, tinta marrom quente, o nome em itálico e a foto um pouco mais quente.
- **imnotkiq**: quase preto, assinatura branca, o nome em caixa alta espaçado, a foto mais escura, o roxo do imnotkiq no contador e nos sublinhados, e um grão de filme por cima.

Na troca, a foto nova entra como uma cortina pelo lado da seta, com um zoom leve que assenta, enquanto a antiga recua por baixo; o nome, a descrição e os links saem e voltam com um deslize, um de cada vez; e a cor do fundo e a tinta da assinatura mudam devagar. Quem pede menos movimento no sistema vê a troca direta. A assinatura é um recorte do `assinatura.png` pintado com a tinta de cada perfil.

Cada perfil tem endereço próprio, bom pra pôr na bio de cada Instagram:

- https://okaiquemota.github.io/kaique.v2/ (pessoal)
- https://okaiquemota.github.io/kaique.v2/#okaiquemota
- https://okaiquemota.github.io/kaique.v2/#imnotkiq

```
.
├── index.html             já vem com o perfil pessoal escrito
└── assets/
    ├── css/site.css
    ├── js/
    │   ├── perfis.js      os três perfis: textos, fotos, links e drives (é aqui que você mexe)
    │   └── site.js        as setas e a troca de perfil
    └── img/
        ├── kaique.jpg         foto do perfil pessoal
        ├── okaiquemota.jpg    foto do okaiquemota
        ├── imnotkiq.jpg       foto do imnotkiq
        ├── assinatura.png     a assinatura, tirada do traço do lápis (preta, fundo transparente)
        └── assinatura.svg     a mesma assinatura em vetor (também é o ícone da aba)
```

Não tem build nem dependência. Pra rodar no computador: `python3 -m http.server 8000`.

## Adicionar um drive no imnotkiq

Em `assets/js/perfis.js`, no perfil `imnotkiq`, adiciona o evento **no topo** de `eventos`: `{ nome: 'Nome do evento', drive: 'link da pasta' }`. O link precisa estar em "Qualquer pessoa com o link → Leitor". Com `drive: ''` o evento aparece em cinza com "em breve".

## Trocar uma foto

Substitui o arquivo em `assets/img/` por outro com o mesmo nome, em pé (4:5, 1200×1500 de preferência). As fotos estão em preto e branco claro; mantém o mesmo tratamento pra elas combinarem.

## Publicar

Em **Settings → Pages**, branch `main` e pasta `/ (root)`.

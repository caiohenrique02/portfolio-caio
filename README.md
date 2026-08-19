# Portfólio — Caio Henrique

Site estático (HTML/CSS/JS puro, zero build), em duas versões que dividem o mesmo conteúdo,
os mesmos elementos gráficos e o mesmo `script.js`:

| Versão | Arquivo | CSS | Tom |
|---|---|---|---|
| v1 escura | `index.html` | `styles.css` | fundo quase preto, acento ciano/violeta |
| v2 clara | `claro.html` | `styles-light.css` | fundo branco levemente azulado, superfícies translúcidas |

O seletor **Escuro / Claro** fica na nav das duas páginas (e também no rodapé), então dá para
alternar clicando e ver uma de cada vez.

Hero e seção de projetos são iguais nas duas, mudando só o tom. Na v2 o restante do texto foi
reescrito: `Atuação` no lugar de `Serviços`, `Método` no lugar de `Processo`, com o que é
entregue em cada etapa explicitado.

## Rodar local

```bash
cd ~/portfolio-caio
python3 -m http.server 8080
# http://localhost:8080          → versão escura
# http://localhost:8080/claro.html → versão clara
```

(Abrir os HTML direto no navegador também funciona.)

## O que trocar

| O quê | Onde |
|---|---|
| Número do WhatsApp | `index.html` e `claro.html` → busque por `wa.me/5583900000000` |
| E-mail | `index.html` / `claro.html` → `caiohenriqueramosm@gmail.com` |
| Textos dos projetos | seção `<!-- ===== PROJETOS ===== -->` nos dois arquivos |
| Cores da v1 | `styles.css` → bloco `:root` |
| Cores da v2 | `styles-light.css` → bloco `:root` |

As cores da rede de partículas do fundo saem do CSS (`--net-line`, `--net-dot`, `--net-hot`,
`--net-cursor`, `--net-alpha`), por isso o mesmo `script.js` serve para as duas versões.

## Screenshots dos projetos

Estão em `assets/shots/`, capturadas dos sites reais em 19/08/2026, em JPG 1600×1000.

Para atualizar quando algum site mudar:

```bash
cd ~/portfolio-caio/assets/shots
google-chrome --headless=new --hide-scrollbars --window-size=1600,1000 \
  --virtual-time-budget=12000 --screenshot=yank.png https://barbeariayank.com
# depois converta pra jpg (o HTML aponta para .jpg)
```

Se algum arquivo faltar, o card cai automaticamente num gradiente com o nome do projeto.

## Deploy

Por ser estático, sobe em qualquer lugar: Hostinger (upload da pasta via FTP/File Manager),
Vercel, Netlify, GitHub Pages ou EasyPanel com um Nginx simples. Suba a pasta inteira para as
duas versões continuarem acessíveis.

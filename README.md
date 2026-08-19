# Portfólio — Caio Henrique

Site estático (HTML/CSS/JS puro, zero build). Tema escuro, fundo com rede de partículas,
reveals no scroll, tilt 3D nos cards e mockups de navegador nos projetos.

## Rodar local

```bash
cd ~/portfolio-caio
python3 -m http.server 8080
# abra http://localhost:8080
```

(Abrir o `index.html` direto no navegador também funciona.)

## O que trocar

| O quê | Onde |
|---|---|
| Número do WhatsApp | `index.html` → busque por `wa.me/5583900000000` (2 ocorrências possíveis) |
| E-mail | `index.html` → `caiohenriqueramosm@gmail.com` |
| Textos dos projetos | `index.html` → seção `<!-- ===== PROJETOS ===== -->` |
| Cores | `styles.css` → bloco `:root` (`--cyan`, `--violet`, `--bg`) |

## Screenshots dos projetos

Já estão em `assets/shots/` — capturadas automaticamente dos sites reais em 19/08/2026,
otimizadas em JPG 1600×1000 (~500 KB no total):

- `yank.jpg`, `tulio.jpg`, `motomania.jpg`, `lavo.jpg`

Para atualizar quando algum site mudar:

```bash
cd ~/portfolio-caio/assets/shots
google-chrome --headless=new --hide-scrollbars --window-size=1600,1000 \
  --virtual-time-budget=12000 --screenshot=yank.png https://barbeariayank.com
# depois converta pra jpg (o HTML aponta para .jpg)
```

Se algum arquivo faltar, o card cai automaticamente num gradiente com o nome do projeto —
o site não quebra.

## Deploy

Por ser estático, sobe em qualquer lugar: Hostinger (upload da pasta via FTP/File Manager),
Vercel, Netlify, GitHub Pages ou EasyPanel com um Nginx simples.

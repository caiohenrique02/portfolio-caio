# Portfólio — Caio Henrique

Site estático (HTML/CSS/JS puro, zero build), uma única versão em tom claro:

| Arquivo | O que é |
|---|---|
| `index.html` | a página inteira |
| `styles.css` | estilos (fundo branco levemente azulado, superfícies translúcidas) |
| `script.js` | rede de partículas do fundo, reveal ao rolar, tilt dos cards, rotator do hero |

A versão escura (`claro.html` / `styles-light.css` eram o par da clara) foi retirada em
20/08/2026. O código dela continua no histórico do git, no commit `21bc299`.

## Rodar local

```bash
cd ~/portfolio-caio
python3 -m http.server 8080
# http://localhost:8080
```

(Abrir o HTML direto no navegador também funciona.)

## O que trocar

| O quê | Onde |
|---|---|
| Número do WhatsApp | `index.html` → busque por `wa.me/5583900000000` |
| E-mail | `index.html` → `caiohenriqueramosm@gmail.com` |
| Textos dos projetos | seção `<!-- ===== PROJETOS ===== -->` |
| Cores | `styles.css` → bloco `:root` |

As cores da rede de partículas do fundo saem do CSS (`--net-line`, `--net-dot`, `--net-hot`,
`--net-cursor`, `--net-alpha`).

## Ilustrações

Os três cards de **Atuação** e as quatro etapas de **Método** têm uma ilustração em SVG inline,
escrita à mão no próprio `index.html` (sem biblioteca, sem imagem externa):

| Card | Cena |
|---|---|
| Sites e páginas de venda | janela de navegador com hero e botão de ação + celular ao lado |
| Sistemas internos | painel com menu, indicadores, tabela, gráfico de barras e cadeado |
| Integração e infraestrutura | servidor central ligado a quatro sistemas, com pacotes correndo nos cabos e um relógio de rotina agendada |
| 01 Diagnóstico | três etapas do processo com setas, lupa passando por cima e um alerta onde ele trava |
| 02 Arquitetura | tela em wireframe ligada a duas tabelas do banco, com a relação entre elas |
| 03 Entregas parciais | ambiente de teste com link próprio, blocos publicados, um pendente e barra de progresso |
| 04 Produção e manutenção | linha de monitoramento batendo, servidor no ar e domínio com certificado |

As animações (linhas crescendo, barras subindo, pacotes nos cabos, lupa varrendo o processo)
ficam no `styles.css` sob `/* ---- ilustrações dos cards ---- */` e só disparam quando o card
entra na tela, via a classe `.in` que o `script.js` adiciona. Quem usa `prefers-reduced-motion` vê tudo parado no estado
final. As formas são coordenadas de um `viewBox` (320×140 nos cards de Atuação, 200×110 nas etapas) —
para mexer, edite os `x/y/width` direto no SVG. As classes (`a-panel`, `a-fill`, `a-grad`,
`a-wire`, `a-pulse`…) são compartilhadas pelas sete ilustrações.

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
Vercel, Netlify, GitHub Pages ou EasyPanel com um Nginx simples.

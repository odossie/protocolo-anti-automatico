# Hero PAA-001 — Padrão Oculto / Padrão Exposto

Hero em tela cheia do Protocolo Anti-Automático™. O personagem oficial fica no centro; passar o cursor sobre ele abre um círculo de varredura que revela a camada de dados (duotom glacial + marcações do ciclo gatilho → rotina → recompensa → reforço → repetição). Clicar fixa a varredura no corpo inteiro; no celular, é um toque.

## Rodar

```bash
npm install
npm run dev            # desenvolvimento → http://localhost:5173
npm run build          # gera dist/
npm run build:preview  # arquivo único sem Pixel, para pré-visualização
```

Deploy na Vercel: importar a pasta como projeto Vite (build `npm run build`, saída `dist`). Nenhuma variável de ambiente.

## Onde mexer

- **Copy, preço, checkout, fichas** → `src/data.js`. Tudo vem da LP V5; os invariantes (URL da Cakto, R$27/R$97) ficam no topo do arquivo.
- **Pixel** → `index.html` (PageView) e `src/analytics.js` (InitiateCheckout com dedupe de 800 ms nos dois CTAs; eventos próprios `HeroScan`, `HeroScanLock`, `HeroFile_*`, uma vez por sessão).
- **Marcações da varredura** → `MARKS` em `src/data.js`, em coordenadas da arte (1024 × 1536). Trocou a arte, re-mede.
- **Paleta** → tokens em `src/index.css`: `--accent` (turquesa glacial `#2ee8c8`), `--frost` (brilho branco-esverdeado), `--on-accent` (texto escuro sobre o turquesa: branco não tem contraste). O duotom da varredura fica no filtro `#dossie-xray` em `SubjectScan.jsx`.
- **Halo** → `--plate-hue` em `Hero.css` (`-12deg` puxa o ciano da arte para o turquesa; `0deg` devolve o original) e o anel de luz `.hero__subject-halo`, alinhado ao halo da arte.
- **Arte** → `src/assets/subject.webp` (recorte com alfa: é o mapa de clique e a máscara da grade) e `backdrop.webp` (arte original, mesma dimensão, usada como placa de fundo). Os dois precisam ter exatamente o mesmo tamanho e enquadramento.

## Como funciona (antes de mexer em número)

- **`--u`** em `Hero.css` é 1/100 de uma composição de 1280 × 820, limitada por largura e altura: a cena inteira escala como uma peça.
- **Varredura**: duas camadas do mesmo recorte; a de cima recebe o filtro SVG `#dossie-xray` e aparece por uma máscara radial com pluma, movida por springs. O hover só conta sobre pixel opaco do recorte (mapa alfa de 160 px).
- **Painel**: o contorno com o entalhe do CTA e a baía das fichas é recortado em JS (`usePanelShape.js`) com geometria `offset*`, que ignora o parallax.
- **Parallax**: um par de springs compartilhado via contexto; cada `<Layer>` tem sua profundidade. Não aplique `transform` CSS direto num `Layer`.
- **Movimento reduzido**: sem parallax nem animações ambientes; a varredura continua funcionando.

As âncoras da nav (`#sec-diagnostico`, `#sec-mecanismo`…) apontam para as seções da LP V5 — o hero foi feito para entrar no topo dela.

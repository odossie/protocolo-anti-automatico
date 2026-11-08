/* ═══════════════════════════════════════════════════════════════════════
   Fonte única de copy e invariantes comerciais do hero.
   Toda a copy foi extraída da LP V5 "Operação" — nada inventado.
   ═══════════════════════════════════════════════════════════════════════ */

import backdropUrl from './assets/backdrop.webp'
import subjectUrl from './assets/subject.webp'

// Invariantes comerciais — não alterar sem decisão explícita.
export const CHECKOUT_URL = 'https://pay.cakto.com.br/7u4fyv6_851435'
export const PRICE = 27
export const PRICE_ANCHOR = 97
export const PRODUCT_ID = 'PAA-001'

// Imagens do personagem oficial. `subject` é o recorte (alpha = hit map e
// máscara da varredura); `backdrop` é a arte original, usada como placa
// atrás do recorte, nas mesmas coordenadas, então os dois casam pixel a pixel.
export const ART = {
  subject: subjectUrl,
  backdrop: backdropUrl,
  width: 1024,
  height: 1536,
}

/*
  Marcações da camada de dados, em coordenadas da arte (1024 × 1536).
  O ciclo do protocolo — gatilho → rotina → recompensa → reforço → repetição —
  é projetado sobre o corpo; a repetição fica no brinco, o laço fechado. `side` decide para que lado
  sai a etiqueta. Medidas tiradas da arte atual; se a arte mudar, re-medir.
*/
export const MARKS = [
  { id: 'gatilho', n: '01', label: 'Gatilho', note: 'percepção', box: [388, 418, 262, 74], side: 'left' },
  { id: 'repeticao', n: '05', label: 'Repetição', note: 'ciclo fechado', box: [668, 486, 52, 96], side: 'top' },
  { id: 'rotina', n: '02', label: 'Rotina', note: 'execução automática', box: [440, 560, 130, 136], side: 'left' },
  { id: 'recompensa', n: '03', label: 'Recompensa', note: 'alívio imediato', box: [462, 780, 134, 104], side: 'left' },
  { id: 'reforco', n: '04', label: 'Reforço', note: 'vínculo ativo', box: [532, 880, 136, 124], side: 'right' },
]

/*
  Arquivos navegáveis. O ativo aparece no painel; os outros viram miniaturas.
  `surface` = o que se vê; `scan` = o que a varredura revela.
*/
export const FILES = [
  {
    id: 'paa001',
    plate: 'PAA-001',
    kind: 'protocol',
    surface: {
      pill: 'Arquivo PAA-001 · Confidencial',
      name: 'Protocolo Anti-Automático™',
      blurb:
        'Você sabe o que precisa fazer. Mesmo assim, na hora, outra coisa decide. 21 dias de intervenção estruturada no ciclo — não é leitura, é um processo que se abre.',
      chips: {
        a: { label: 'Estrutura', value: '3 fases · 21 fichas' },
        b: { label: 'Procedimentos', value: '5 POPs' },
        c: { label: 'Instrumento', value: 'Índice de Automatismo' },
        d: { label: 'Formato', value: 'PDF A4 · 70 págs' },
      },
    },
    scan: {
      pill: 'Varredura ativa · Setor S/AC',
      name: 'Ciclo automático detectado',
      blurb:
        'O ciclo não espera você estar motivado pra rodar. Ele roda sozinho. Por isso precisa ser interrompido por estrutura — não por esforço.',
      chips: {
        a: { label: 'Padrão', value: 'Ativo · reforço contínuo' },
        b: { label: 'Nível de alerta', value: 'Máximo' },
        c: { label: 'Índice de Automatismo', value: 'Não medido · Dia 01' },
        d: { label: 'Causa raiz', value: 'Ausência de estrutura' },
      },
    },
  },
  {
    id: 's047',
    plate: 'DIC · 047',
    kind: 'case',
    surface: {
      pill: 'Ficha · Sujeito 047',
      name: 'Procrastinação noturna',
      blurb:
        'Explica o ciclo melhor que qualquer especialista. E segue preso nele há 6 anos. Entender nunca foi o problema.',
      chips: {
        a: { label: 'Contexto', value: 'Analista financeiro' },
        b: { label: 'Status', value: 'Crítico' },
        c: { label: 'Duração', value: '~6 anos em ciclo ativo' },
        d: { label: 'Padrão', value: 'Adia para “amanhã”' },
      },
    },
    scan: {
      pill: 'Varredura · Sujeito 047',
      name: 'Adiamento de Início',
      blurb:
        'O gatilho está no momento anterior à ação. A decisão existe e é clara — a iniciação é que não acontece. Cada adiamento barateia o custo do próximo.',
      chips: {
        a: { label: 'Ponto de quebra', value: 'Antes do início' },
        b: { label: 'Perfil', value: 'Adiamento de Início' },
        c: { label: 'Índice de Automatismo', value: 'Não medido · Dia 01' },
        d: { label: 'Prognóstico', value: 'Sem intervenção, mantém' },
      },
    },
  },
  {
    id: 's112',
    plate: 'DIC · 112',
    kind: 'case',
    surface: {
      pill: 'Ficha · Sujeito 112',
      name: 'Consumo de conteúdo',
      blurb:
        '+200 horas estudando disciplina. Zero implementado. O estudo virou a desculpa perfeita pra nunca começar.',
      chips: {
        a: { label: 'Contexto', value: 'Empreendedor solo' },
        b: { label: 'Status', value: 'Crítico' },
        c: { label: 'Duração', value: '~4 anos em ciclo ativo' },
        d: { label: 'Padrão', value: 'Estudo no lugar da ação' },
      },
    },
    scan: {
      pill: 'Varredura · Sujeito 112',
      name: 'Preparação Permanente',
      blurb:
        'O estudo ocupou o lugar da execução. Consumir sobre o problema produz a sensação de estar resolvendo — e é essa sensação que sustenta o ciclo.',
      chips: {
        a: { label: 'Ponto de quebra', value: 'Não chega a executar' },
        b: { label: 'Perfil', value: 'Preparação Permanente' },
        c: { label: 'Índice de Automatismo', value: 'Não medido · Dia 01' },
        d: { label: 'Prognóstico', value: 'Sem intervenção, mantém' },
      },
    },
  },
  {
    id: 's198',
    plate: 'DIC · 198',
    kind: 'case',
    surface: {
      pill: 'Ficha · Sujeito 198',
      name: 'Motivação-colapso',
      blurb:
        'Toda vez começa “pra valer”. Toda vez quebra no mesmo ponto. Só muda a data do recomeço.',
      chips: {
        a: { label: 'Contexto', value: 'Estudante · duplo turno' },
        b: { label: 'Status', value: 'Crítico' },
        c: { label: 'Duração', value: 'Repete a cada 3–4 semanas' },
        d: { label: 'Padrão', value: 'Abandona em 4 dias' },
      },
    },
    scan: {
      pill: 'Varredura · Sujeito 198',
      name: 'Colapso de Manutenção',
      blurb:
        'A iniciação funciona. O que não existe é estrutura de sustentação — o ciclo quebra sempre no mesmo ponto, e o recomeço acaba virando o próprio hábito.',
      chips: {
        a: { label: 'Ponto de quebra', value: 'No meio · dia 4' },
        b: { label: 'Perfil', value: 'Colapso de Manutenção' },
        c: { label: 'Índice de Automatismo', value: 'Não medido · Dia 01' },
        d: { label: 'Prognóstico', value: 'Sem intervenção, mantém' },
      },
    },
  },
]

// Âncoras das seções da LP V5 — o hero foi feito para entrar no topo dela.
export const NAV = [
  { label: 'Diagnóstico', href: '#sec-diagnostico' },
  { label: 'Mecanismo', href: '#sec-mecanismo' },
  { label: 'Arquivo', href: '#sec-entrega' },
  { label: 'Casos', href: '#sec-casos' },
  { label: 'Garantia', href: '#sec-garantia' },
]

/*
  O DOSSIÊ™ · CONFIGURAÇÃO DA LANDING PAGE
  ----------------------------------------
  Edite só este arquivo para trocar preço, checkout, imagens, textos comerciais e links legais.
  Campos vazios ('') aparecem na página como pendentes, marcados como [A DEFINIR].
*/
window.DOSSIE_CONFIG = {
  oferta: {
    // Ex.: 'R$ 97'. Vazio = mostra [DEFINIR PREÇO].
    preco: 'R$ 27,00',
    // Ex.: 'ou 12x de R$ 9,74 no cartão'. Vazio = não aparece.
    parcelamento: '',
    // URL completa do checkout (Hotmart, Kiwify, Cakto etc.). Vazio = o botão mostra aviso de checkout não configurado.
    checkoutUrl: 'https://pay.cakto.com.br/7u4fyv6_851435',
    // Quais botões levam direto ao checkout. 'todos' = topo, hero, oferta, CTA final e barra do celular.
    // 'oferta' = só o botão da oferta e o CTA final; os demais rolam até a oferta.
    checkoutEm: 'todos',
    // Texto dos botões
    ctaPrincipal: 'ABRIR MEU PROCESSO PAA-001',
    ctaOferta: 'ABRIR MEU PROCESSO',
    ctaFinal: 'ABRIR PROCESSO PAA-001',
    ctaHeader: 'ABRIR PROCESSO'
  },

  // Condições comerciais. Vazio = a resposta do FAQ mostra [A DEFINIR].
  comercial: {
    entrega: '',   // Ex.: 'O link de download chega no e-mail da compra logo após a confirmação do pagamento.'
    garantia: ''   // Ex.: '7 dias de garantia pela plataforma de pagamento.' Não preencha se não houver.
  },

  // Imagens aprovadas. Troque o caminho para substituir; o alt é lido por leitores de tela e buscadores.
  imagens: {
    hero:        { src: 'assets/01-pasta-paa-001.webp',        alt: 'Pasta preta do Dossiê com a etiqueta Processo PAA-001, Setor S/AC, carimbo Classificação: Restrito e a Folha de Abertura de Processo ao lado.' },
    laudo:       { src: 'assets/02-distracao-silenciosa.webp', alt: 'Mesa à noite com lista de tarefas inacabada, caneta, relógio marcando quase onze horas e celular acendendo com notificações.' },
    arquitetura: { src: 'assets/03-tres-pastas.webp',          alt: 'Três pastas numeradas 01, 02 e 03, cada uma mais aberta que a anterior, representando as três fases do protocolo.' },
    dossie:      { src: 'assets/04-paginas-do-dossie.webp',    alt: 'Quatro páginas do PDF sobre a mesa: Abertura de Processo, A Máquina, Consolidação de Campo e Manual Operacional da Própria Mente.' },
    pops:        { src: 'assets/05-fichas-pops.webp',          alt: 'Cinco fichas pautadas dos procedimentos POP-01 Interrupção, POP-02 Foco, POP-03 Decisão, POP-04 Reinício e POP-05 Recuperação.' },
    // IMAGEM 06 (pasta fechada com Folha de Abertura) não foi enviada. Até lá, a oferta usa a imagem 01.
    oferta:      { src: 'assets/01-pasta-paa-001.webp',        alt: 'Pasta fechada do Processo PAA-001 com a Folha de Abertura de Processo.' }
  },

  // Links do rodapé. URL vazia = o item aparece como texto, sem link quebrado.
  legal: [
    { rotulo: 'Termos de uso', url: '' },
    { rotulo: 'Política de privacidade', url: '' },
    { rotulo: 'Contato', url: '' }
  ]
};

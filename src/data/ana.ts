// Tudo o que é "dado" do site num lugar só.
// - Serviços, preços e durações: agenda da Miss Belle (Agenda LIVIA), só os da Ana Paula.
// - Textos, regras e perguntas: o treinamento da Belle (a IA da Miss Belle no WhatsApp).
// Quando a sincronização automática com a agenda existir, ela troca SERVICOS.

export const WHATSAPP = '5588981035530';
export const whatsapp = (texto: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
export const INSTAGRAM = 'https://www.instagram.com/anapaula_pmu_artist/';
export const INSTAGRAM_ESTUDIO = 'https://www.instagram.com/anapaula.beauty.studio/';

export const ENDERECO = {
  rua: 'Rua José Sebastião de Carvalho, 450',
  bairro: 'Lagoa Seca',
  cidade: 'Juazeiro do Norte',
  uf: 'CE',
  // O mesmo texto da base da Belle.
  referencia: 'Próximo ao Pastos e Pizzas e ao Colégio Espaço Brincar',
};

// Expediente da agenda (Ana Paula). Domingo fechado.
export const HORARIO = [
  { dias: 'Segunda, quarta e sexta', horas: '8h às 18h' },
  { dias: 'Terça', horas: '9h às 18h30' },
  { dias: 'Quinta', horas: '8h às 21h' },
  { dias: 'Sábado', horas: '8h às 12h' },
];

export type Pagina = 'sobrancelhas' | 'labios' | 'cilios';

export type Servico = {
  id: string;
  nome: string;
  detalhe: string;
  preco: number;
  observacao?: string;
  pagina: Pagina;
  foto: 'micro-sobrancelhas' | 'brow-lamination' | 'micro-labial' | 'sobrancelha-tintura' | 'cilios';
  destaque?: boolean; // aparece no resumo da inicial
};

export const SERVICOS: Servico[] = [
  { id: 'micro-sobrancelhas', nome: 'Micropigmentação de sobrancelhas', detalhe: 'Fio a fio · cerca de 1h30 · até 3x sem juros', preco: 350, observacao: 'retoque R$ 200', pagina: 'sobrancelhas', foto: 'micro-sobrancelhas', destaque: true },
  { id: 'brow-lamination', nome: 'Brow lamination', detalhe: 'Já inclui o design e a finalização · cerca de 40 min', preco: 80, pagina: 'sobrancelhas', foto: 'brow-lamination', destaque: true },
  { id: 'design-tintura', nome: 'Design com finalização em tintura', detalhe: 'Cerca de 30 min', preco: 40, pagina: 'sobrancelhas', foto: 'sobrancelha-tintura' },
  { id: 'design-henna', nome: 'Design com henna', detalhe: 'Cerca de 30 min', preco: 50, pagina: 'sobrancelhas', foto: 'sobrancelha-tintura' },
  { id: 'design', nome: 'Design de sobrancelha', detalhe: 'Personalizado para o formato do rosto · cerca de 30 min', preco: 30, pagina: 'sobrancelhas', foto: 'sobrancelha-tintura' },
  { id: 'micro-labial', nome: 'Micropigmentação labial', detalhe: 'Cor e contorno · cerca de 3h30 · até 3x sem juros', preco: 350, observacao: 'retoque R$ 200', pagina: 'labios', foto: 'micro-labial', destaque: true },
  { id: 'extensao-cilios', nome: 'Extensão de cílios', detalhe: 'Cerca de 1h30', preco: 120, observacao: 'manutenção R$ 70', pagina: 'cilios', foto: 'cilios', destaque: true },
];

export const reais = (v: number) => `R$ ${v.toLocaleString('pt-BR')}`;

// Treinamento da Belle: pagamento e parcelamento.
export const PAGAMENTO =
  'Pix, dinheiro e cartão de crédito ou débito (Visa, Mastercard, Elo e American Express). A micropigmentação, de sobrancelhas ou de lábios, sai em até 3x sem juros no cartão de crédito; o retoque, em até 2x sem juros.';

export const VIDEOS = [
  { arquivo: 'tecnica-fios', titulo: 'A técnica fio a fio', descricao: 'Como cada fio é desenhado na micropigmentação de sobrancelhas.', pagina: 'sobrancelhas' as Pagina },
  { arquivo: 'cilios', titulo: 'Extensão de cílios', descricao: 'Antes e depois da extensão de cílios.', pagina: 'cilios' as Pagina },
];

export type Pergunta = { p: string; r: string };

// Perguntas que valem para todos os serviços (treinamento da Belle).
export const PERGUNTAS_GERAIS: Pergunta[] = [
  { p: 'A avaliação é cobrada?', r: 'Não. A avaliação é gratuita.' },
  { p: 'Posso mandar uma foto para a Ana Paula avaliar?', r: 'Pode sim. É só enviar uma foto nítida da sobrancelha ou da boca pelo WhatsApp que a Ana Paula faz uma primeira avaliação e orienta sobre o procedimento mais indicado.' },
  { p: 'Como faço para agendar?', r: 'Pelo WhatsApp: é só informar o procedimento e o dia e o horário de preferência. A Ana Paula verifica a agenda e sugere um horário disponível. Para confirmar, envie seu nome completo.' },
  { p: 'Como funciona a confirmação do agendamento?', r: 'Depois de agendar, você recebe a confirmação com dia e horário. Um dia antes do atendimento chega uma mensagem de confirmação, e é muito importante responder confirmando para garantir o horário.' },
  { p: 'Vocês atendem aos sábados?', r: 'Sim, há atendimento aos sábados pela manhã.' },
  { p: 'Quais são as formas de pagamento?', r: PAGAMENTO },
];

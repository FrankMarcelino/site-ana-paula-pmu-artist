// Tudo o que é "dado" do site num lugar só. Os preços e durações vêm da agenda da
// Miss Belle (Agenda LIVIA); quando a sincronização automática existir, ela troca este arquivo.

export const WHATSAPP = '5588981035530';
export const whatsapp = (texto: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
export const INSTAGRAM = 'https://www.instagram.com/anapaula_pmu_artist/';
export const INSTAGRAM_ESTUDIO = 'https://www.instagram.com/anapaula.beauty.studio/';

export const ENDERECO = {
  rua: 'Rua José Sebastião de Carvalho, 450',
  bairro: 'Lagoa Seca',
  cidade: 'Juazeiro do Norte',
  uf: 'CE',
};

// Expediente da agenda (Ana Paula). Domingo fechado.
export const HORARIO = [
  { dias: 'Segunda, quarta e sexta', horas: '8h às 18h' },
  { dias: 'Terça', horas: '9h às 18h30' },
  { dias: 'Quinta', horas: '8h às 21h' },
  { dias: 'Sábado', horas: '8h às 12h' },
];

export type Servico = {
  id: string;
  nome: string;
  detalhe: string;
  preco: number;
  retoque?: number;
  pagina: 'sobrancelhas' | 'labios';
};

export const SERVICOS: Servico[] = [
  { id: 'micro-sobrancelhas', nome: 'Micropigmentação de sobrancelhas', detalhe: 'Fio a fio · cerca de 1h30', preco: 350, retoque: 200, pagina: 'sobrancelhas' },
  { id: 'brow-lamination', nome: 'Brow lamination', detalhe: 'Fios alinhados e fixados · cerca de 40 min', preco: 80, pagina: 'sobrancelhas' },
  { id: 'micro-labial', nome: 'Micropigmentação labial', detalhe: 'Cor e contorno · cerca de 3h30', preco: 350, retoque: 200, pagina: 'labios' },
  // Não está na agenda: preço do site antigo, a confirmar com a Ana.
  { id: 'hydra-gloss', nome: 'Hydra gloss', detalhe: 'Hidratação e brilho para os lábios', preco: 120, pagina: 'labios' },
];

export const reais = (v: number) => `R$ ${v.toLocaleString('pt-BR')}`;

export const VIDEOS = [
  { arquivo: 'tecnica-fios', titulo: 'A técnica fio a fio', descricao: 'Como cada fio é desenhado na micropigmentação de sobrancelhas.' },
  { arquivo: 'cilios', titulo: 'Cílios', descricao: 'Procedimento de cílios no estúdio.' },
];

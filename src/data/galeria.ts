// Fotos dos serviços: um lugar só para a vitrine da inicial, o cardápio e as galerias.
// As novas vieram de "novas imagens para o site" (24/10), capadas em 1600 px; as de antes e
// depois são as do site antigo.
import type { ImageMetadata } from 'astro';
import type { Pagina } from './ana';
import fioAFio from '../assets/galeria/fio-a-fio.jpeg';
import nanoFios from '../assets/galeria/nano-fios.jpeg';
import shadowAntesDepois from '../assets/galeria/shadow-antes-depois.jpeg';
import shadowCicatrizada from '../assets/galeria/shadow-cicatrizada.jpeg';
import microSobrancelhasAntesDepois from '../assets/galeria/micro-sobrancelhas-antes-depois.jpg';
import cicatrizadaSobrancelhaEBoca from '../assets/galeria/cicatrizada-sobrancelha-e-boca.jpeg';
import browLamination from '../assets/galeria/brow-lamination.jpeg';
import browLaminationAntesDepois from '../assets/galeria/brow-lamination-antes-depois.jpeg';
import browLaminationAntesDepois2 from '../assets/galeria/brow-lamination-antes-depois-2.jpg';
import henna1 from '../assets/galeria/henna-1.jpeg';
import henna2 from '../assets/galeria/henna-2.jpeg';
import designTintura from '../assets/galeria/design-tintura.jpeg';
import microLabial from '../assets/galeria/micro-labial.jpeg';
import microLabialESobrancelhas from '../assets/galeria/micro-labial-e-sobrancelhas.jpeg';
import microLabialAntesDepois from '../assets/galeria/micro-labial-antes-depois.jpg';
import cilios from '../assets/galeria/cilios.jpeg';
import ciliosEDesign from '../assets/galeria/cilios-e-design.jpeg';
import ciliosAntesDepois from '../assets/galeria/cilios-antes-depois.jpg';

export type Foto = {
  src: ImageMetadata;
  alt: string;
  legenda: string;
  // A foto de tintura foi tirada com a cliente deitada (rosto de ponta-cabeça): girada, fica de pé.
  girar?: boolean;
  // Onde está o rosto, para o recorte quadrado/3:4 não cortar o que importa.
  foco?: string;
};

export const FOTOS = {
  'fio-a-fio': { src: fioAFio, alt: 'Sobrancelha de perto com micropigmentação fio a fio', legenda: 'Fio a fio, de perto' },
  'nano-fios': { src: nanoFios, alt: 'Sobrancelha com a técnica de nano fios, fios bem finos', legenda: 'Nano fios: fios ainda mais finos', foco: '50% 40%' },
  'shadow-antes-depois': { src: shadowAntesDepois, alt: 'Antes e depois da micropigmentação de sobrancelhas com a técnica shadow', legenda: 'Técnica shadow: antes e depois' },
  'shadow-cicatrizada': { src: shadowCicatrizada, alt: 'Sobrancelhas com a técnica shadow já cicatrizadas', legenda: 'Shadow já cicatrizado' },
  'micro-sobrancelhas-antes-depois': { src: microSobrancelhasAntesDepois, alt: 'Antes e depois da micropigmentação de sobrancelhas', legenda: 'Micropigmentação: antes e depois' },
  'cicatrizada-sobrancelha-e-boca': { src: cicatrizadaSobrancelhaEBoca, alt: 'Sobrancelhas e lábios micropigmentados, já cicatrizados', legenda: 'Sobrancelhas e lábios já cicatrizados' },
  'brow-lamination': { src: browLamination, alt: 'Sobrancelhas logo depois do brow lamination', legenda: 'Brow lamination', foco: '50% 35%' },
  'brow-lamination-antes-depois': { src: browLaminationAntesDepois, alt: 'Antes e depois do brow lamination', legenda: 'Brow lamination: antes e depois' },
  'brow-lamination-antes-depois-2': { src: browLaminationAntesDepois2, alt: 'Antes e depois do brow lamination, de perto', legenda: 'Brow lamination: antes e depois, de perto' },
  'henna-1': { src: henna1, alt: 'Sobrancelhas com design e henna', legenda: 'Design com henna', foco: '50% 30%' },
  'henna-2': { src: henna2, alt: 'Sobrancelhas com design e henna, outro resultado', legenda: 'Design com henna', foco: '50% 30%' },
  'design-tintura': { src: designTintura, alt: 'Sobrancelhas com design e finalização em tintura', legenda: 'Design com finalização em tintura', girar: true, foco: '40% 50%' },
  'micro-labial': { src: microLabial, alt: 'Lábios logo depois da micropigmentação labial', legenda: 'Logo depois: a cor suaviza na cicatrização', foco: '50% 50%' },
  'micro-labial-e-sobrancelhas': { src: microLabialESobrancelhas, alt: 'Micropigmentação labial e de sobrancelhas na mesma cliente', legenda: 'Lábios e sobrancelhas', foco: '50% 40%' },
  'micro-labial-antes-depois': { src: microLabialAntesDepois, alt: 'Antes, durante e depois da micropigmentação labial', legenda: 'Antes, durante e depois' },
  'cilios': { src: cilios, alt: 'Extensão de cílios, resultado', legenda: 'Extensão de cílios', foco: '50% 35%' },
  'cilios-e-design': { src: ciliosEDesign, alt: 'Extensão de cílios com design de sobrancelhas', legenda: 'Cílios e design de sobrancelhas', foco: '50% 35%' },
  'cilios-antes-depois': { src: ciliosAntesDepois, alt: 'Antes e depois da extensão de cílios', legenda: 'Cílios: antes e depois' },
} satisfies Record<string, Foto>;

export type IdFoto = keyof typeof FOTOS;

// Ordem das galerias de cada página: técnica primeiro, depois antes e depois, depois cicatrizado.
export const GALERIA: Record<Pagina, IdFoto[]> = {
  sobrancelhas: ['fio-a-fio', 'nano-fios', 'shadow-antes-depois', 'micro-sobrancelhas-antes-depois', 'shadow-cicatrizada', 'cicatrizada-sobrancelha-e-boca', 'brow-lamination', 'brow-lamination-antes-depois', 'brow-lamination-antes-depois-2', 'henna-1', 'henna-2', 'design-tintura'],
  labios: ['micro-labial', 'micro-labial-antes-depois', 'micro-labial-e-sobrancelhas', 'cicatrizada-sobrancelha-e-boca'],
  cilios: ['cilios', 'cilios-e-design', 'cilios-antes-depois'],
};

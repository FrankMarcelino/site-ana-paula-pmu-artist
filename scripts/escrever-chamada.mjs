// Converte a chamada em desenho (SVG), uma peça por letra, para a animação de escrita à mão.
// Cada letra guarda onde começa e onde termina (x0, x1): na animação ela aparece já cheia,
// da esquerda para a direita, com o tempo proporcional à largura (velocidade de caneta
// constante). Animar o contorno não serve: a fonte é um carimbo com borda, e a caneta
// passaria pela borda, não pelo meio da letra.
// Uso: node scripts/escrever-chamada.mjs   → gera src/data/chamada-escrita.json
import opentype from 'opentype.js';
import { writeFileSync } from 'node:fs';

const FONTE = 'node_modules/@fontsource/allura/files/allura-latin-400-normal.woff';
const LINHAS = ['Milhares de clientes', 'já passaram por aqui.', 'A próxima pode ser você.'];
const TAM = 100, ENTRELINHA = 118;

const font = opentype.loadSync(FONTE);
const linhas = LINHAS.map((texto, l) => {
  const glifos = [];
  let x = 0;
  const gs = font.stringToGlyphs(texto);
  gs.forEach((g, i) => {
    const p = g.getPath(x, TAM + l * ENTRELINHA, TAM);
    const d = p.toPathData(1);
    if (d) { const bb = p.getBoundingBox(); glifos.push({ d, x0: Math.round(bb.x1), x1: Math.round(bb.x2) }); }
    x += g.advanceWidth * TAM / font.unitsPerEm;
    if (i < gs.length - 1) x += font.getKerningValue(g, gs[i + 1]) * TAM / font.unitsPerEm;
  });
  return { texto, largura: Math.ceil(x), glifos };
});
const largura = Math.max(...linhas.map((l) => l.largura));
// centraliza cada linha
const saida = {
  largura: largura + 20, altura: TAM + ENTRELINHA * (LINHAS.length - 1) + 40,
  linhas: linhas.map((l) => ({ ...l, dx: Math.round((largura - l.largura) / 2) + 10 })),
};
writeFileSync('src/data/chamada-escrita.json', JSON.stringify(saida));
console.log('letras:', linhas.map((l) => l.glifos.length).join(' + '), '| viewBox', saida.largura, 'x', saida.altura, '|', (JSON.stringify(saida).length / 1024).toFixed(1), 'KB');

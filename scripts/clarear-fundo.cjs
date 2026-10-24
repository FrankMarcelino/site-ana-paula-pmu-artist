// Clareia a foto da primavera para o fundo dos combos: parede e céu quase viram pó de arroz;
// as flores (magenta, matiz 318–353°: a faixa de sombra da parede e a varanda ficam em ~0°/358°
// e saem) e as folhas mantêm a cor.
// Uso: node scripts/clarear-fundo.cjs midia-original/primavera.jpeg src/assets/espaco/primavera-fundo.jpeg 0.93 0.75
//      (lavagem do fundo, quanto da cor da planta fica)
const sharp = require('sharp');
const [,, entrada, saida, lavagem = '0.86', vivo = '0.80'] = process.argv;
const PO = [247, 238, 236];
const W_ = +lavagem, V = +vivo;
const suave = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
(async () => {
  const { data, info } = await sharp(entrada).rotate().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const m = Buffer.alloc(n);
  for (let p = 0; p < n; p++) {
    const i = p * 3, r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, s = mx ? d / mx : 0;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
    // flores: magenta/vermelho bem saturado (a parede rosa tem saturação baixa, ~0,3)
    const flor = (h > 318 && h < 353) ? suave(0.48, 0.64, s) * suave(0.22, 0.38, mx) : 0; // magenta claro; telhado (marrom, escuro) e sombra da parede ficam de fora
    // folhas: verde, mesmo escuro
    const folha = (h > 55 && h < 170) ? suave(0.10, 0.24, s) * suave(0.06, 0.16, mx) : 0;
    m[p] = Math.round(255 * Math.max(flor, folha));
  }
  const mb = await sharp(m, { raw: { width: info.width, height: info.height, channels: 1 } }).blur(2).extractChannel(0).raw().toBuffer();
  const out = Buffer.alloc(n * 3);
  for (let p = 0; p < n; p++) {
    const k = mb[p] / 255;            // 1 = planta
    const lav = W_ * (1 - k) + (1 - V) * k; // quanto vai para o pó de arroz
    for (let c = 0; c < 3; c++) out[p * 3 + c] = Math.round(data[p * 3 + c] * (1 - lav) + PO[c] * lav);
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).jpeg({ quality: 82, mozjpeg: true }).toFile(saida);
})();

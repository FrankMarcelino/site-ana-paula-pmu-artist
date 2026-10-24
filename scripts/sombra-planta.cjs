// Gera a "sombra" da primavera: só a forma das flores e folhas, borrada, em tons de cinza
// gravada como transparência (opaco = sombra), num WebP. No site ela é a mask-image de uma
// camada: a cor e a intensidade saem do CSS.
// Uso: node scripts/sombra-planta.cjs midia-original/primavera.jpeg src/assets/espaco/sombra-primavera.webp [borrão]
const sharp = require('sharp');
const [,, entrada, saida, borrao = '7'] = process.argv;
const suave = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
(async () => {
  const { data, info } = await sharp(entrada).rotate().resize(720).raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height, m = Buffer.alloc(n);
  for (let p = 0; p < n; p++) {
    const i = p * 3, r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, s = mx ? d / mx : 0;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
    // as mesmas regras do clarear-fundo: flor magenta (318–353°), folha verde
    const flor = (h > 318 && h < 353) ? suave(0.48, 0.64, s) * suave(0.22, 0.38, mx) : 0;
    const folha = (h > 55 && h < 170) ? suave(0.10, 0.24, s) * suave(0.06, 0.16, mx) : 0;
    m[p] = Math.round(255 * Math.max(flor, folha));
  }
  const a = await sharp(m, { raw: { width: info.width, height: info.height, channels: 1 } }).blur(+borrao).extractChannel(0).raw().toBuffer();
  const rgba = Buffer.alloc(n * 4);
  for (let p = 0; p < n; p++) rgba[p * 4 + 3] = a[p];
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).webp({ quality: 60, alphaQuality: 60 }).toFile(saida);
})();

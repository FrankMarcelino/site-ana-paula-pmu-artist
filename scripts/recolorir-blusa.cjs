// Troca a cor da blusa preta da foto do topo por um tom da marca, mantendo a luz do tecido.
// Uso: node scripts/recolorir-blusa.cjs midia-original/topo-blusa-preta.jpeg src/assets/ana/topo.jpeg '#882E4E'
// Máscara: pixel escuro e quase sem cor abaixo do queixo (y >= 620), mais a sombra muito escura
// do cabelo sobre a blusa. A cor é DESLOCADA (soma a diferença preto médio → tom), não
// multiplicada: assim os fios de cabelo por cima da blusa não viram rosa-neon.
const sharp = require('sharp');
const [,, entrada, saida, hex] = process.argv;
const alvo = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
(async () => {
  const { data, info } = await sharp(entrada).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  // Máscara da blusa: escuro e quase sem cor, abaixo do queixo.
  const m = Buffer.alloc(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3, r = data[i], g = data[i + 1], b = data[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), sat = mx ? (mx - mn) / mx : 0;
    if (y < 620) continue;
    const escuro = 1 - Math.min(1, Math.max(0, (mx - 70) / 40));   // 70→1, 110→0
    const cinza = 1 - Math.min(1, Math.max(0, (sat - 0.30) / 0.2)); // sat<.30→1, >.50→0
    const muitoEscuro = 1 - Math.min(1, Math.max(0, (mx - 45) / 25)); // sombra do cabelo sobre a blusa
    m[y * W + x] = Math.round(255 * escuro * Math.max(cinza, muitoEscuro));
  }
  const mb = await sharp(m, { raw: { width: W, height: H, channels: 1 } }).blur(1.5).extractChannel(0).raw().toBuffer();
  const out = Buffer.from(data);
  // Deslocamento de cor: soma a diferença entre o preto médio da blusa e o tom-alvo.
  // A textura do tecido e os fios de cabelo por cima mantêm a própria luz (não viram neon).
  let soma = [0, 0, 0], n = 0;
  for (let p = 0; p < W * H; p++) if (m[p] === 255) { for (let c = 0; c < 3; c++) soma[c] += data[p * 3 + c]; n++; }
  const preto = soma.map((v) => v / n);
  const desloc = alvo.map((v, c) => v * 0.92 - preto[c]);
  for (let p = 0; p < W * H; p++) {
    const a = mb[p] / 255; if (!a) continue;
    const i = p * 3;
    for (let c = 0; c < 3; c++) out[i + c] = Math.max(0, Math.min(255, Math.round(data[i + c] + desloc[c] * a)));
  }
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 92 }).toFile(saida);
})();

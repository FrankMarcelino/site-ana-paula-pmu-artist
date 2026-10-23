// Prepara os vídeos para o site: 720p, H.264, sem áudio, com "faststart" (o celular
// começa a tocar antes de baixar tudo) e uma capa .jpg do 1º segundo.
// Os originais ficam em midia-original/videos (fora do git); o resultado vai para public/videos.
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const ORIGEM = 'midia-original/videos';
const DESTINO = 'public/videos';

for (const f of readdirSync(ORIGEM).filter((n) => n.endsWith('.mp4'))) {
  const nome = f.replace(/\.mp4$/, '');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', `${ORIGEM}/${f}`,
    '-vf', "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'",
    '-c:v', 'libx264', '-profile:v', 'high', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p',
    '-an', '-movflags', '+faststart', `${DESTINO}/${nome}.mp4`]);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '1', '-i', `${ORIGEM}/${f}`,
    '-frames:v', '1', '-vf', "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'", '-q:v', '3', `${ORIGEM}/${nome}-capa.jpg`]);
  // A capa aparece antes de qualquer clique: em WebP ela pesa um terço do JPG.
  await sharp(`${ORIGEM}/${nome}-capa.jpg`).resize({ width: 480 }).webp({ quality: 68 }).toFile(`${DESTINO}/${nome}.webp`);
  const kb = (p) => (statSync(p).size / 1024).toFixed(0);
  console.log(`${f}: ${kb(`${ORIGEM}/${f}`)} KB → ${kb(`${DESTINO}/${nome}.mp4`)} KB (capa ${kb(`${DESTINO}/${nome}.webp`)} KB)`);
}

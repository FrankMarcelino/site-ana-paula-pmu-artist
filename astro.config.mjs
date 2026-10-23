// @ts-check
import { defineConfig } from 'astro/config';

// Publicado pela Vercel (o repositório está ligado lá). Na Vercel o endereço de
// produção vem de VERCEL_PROJECT_PRODUCTION_URL; fora dela, o domínio abaixo.
const producao = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: producao ? `https://${producao}` : 'https://anapaulapmu.vercel.app',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});

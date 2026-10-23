// @ts-check
import { defineConfig } from 'astro/config';

// O site é servido pelo GitHub Pages em /site-ana-paula-pmu-artist/.
// Quando houver domínio próprio, troque `site` e tire o `base`.
export default defineConfig({
  site: 'https://frankmarcelino.github.io',
  base: '/site-ana-paula-pmu-artist',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});

# Site da Ana Paula Almeida — micropigmentação

Feito com [Astro](https://astro.build): gera HTML puro, sem JavaScript no navegador além do
estritamente necessário (o chat da LIVIA, que carrega depois da primeira interação).

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:4321/site-ana-paula-pmu-artist/
npm run build      # gera em dist/
npm run preview    # serve o que foi gerado
```

## Onde mudar cada coisa

- **Preços, serviços, horário, endereço, vídeos:** `src/data/ana.ts`.
- **Fotos:** `src/assets/` (o Astro gera as versões leves sozinho na publicação).
- **Vídeos novos:** ponha o original em `midia-original/videos/` (fora do git) e rode `npm run midia`:
  ele gera o MP4 em 720p e a capa em WebP em `public/videos/`. Depois cadastre em `VIDEOS` no `ana.ts`.
- **Cores e tipografia:** `src/styles/global.css`.

## Publicação

A Action `.github/workflows/publicar.yml` gera e publica no GitHub Pages a cada push na `main`.

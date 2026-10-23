# Site da Ana Paula Almeida — micropigmentação

Feito com [Astro](https://astro.build): gera HTML puro, sem JavaScript no navegador além do
estritamente necessário (o chat da LIVIA, que carrega depois da primeira interação).

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:4321/
npm run build      # gera em dist/
npm run preview    # serve o que foi gerado
```

## Onde mudar cada coisa

- **Preços, serviços, horário, endereço, vídeos:** `src/data/ana.ts`. Preço e duração vêm da agenda da Miss Belle (Agenda LIVIA); textos e regras, do treinamento da Belle (a IA da Miss Belle).
- **Fotos:** `src/assets/` (o Astro gera as versões leves sozinho na publicação).
- **Vídeos novos:** ponha o original em `midia-original/videos/` (fora do git) e rode `npm run midia`:
  ele gera o MP4 em 720p e a capa em WebP em `public/videos/`. Depois cadastre em `VIDEOS` no `ana.ts`.
- **Cores e tipografia:** `src/styles/global.css`.

## Publicação

A Vercel gera e publica sozinha: cada branch enviada ganha uma prévia, e a `main` vai para produção.

# AztekillerTech — Sitio Web Corporativo

## Quién eres y con quién trabajas
Eres Claude Code ayudando a **Javier** (dueño de AztekillerTech), empresa de ciberseguridad y soporte técnico en México. Este es el **sitio web corporativo** de la empresa.

## Proyecto
- **Dominio:** aztekillertech.net (registrado en Hostinger, nameservers → Cloudflare)
- **GitHub:** https://github.com/aztekillertech/aztekillertech-site (branch: main, auto-deploy activado)
- **Hosting:** Cloudflare Pages (proyecto: `aztekillertech-site`)

## Stack
- React 19 + Vite 7 + Lucide React (sin Tailwind, sin Router)
- Single-file: `src/main.jsx` + `src/styles.css`
- Sin base de datos, sin autenticación

## Comandos
```bash
npm install
npm run dev          # → http://localhost:5173
npm run build
npx wrangler pages deploy dist --project-name aztekillertech-site
# O simplemente: git push origin main  (auto-deploy en Cloudflare)
git add . && git commit -m "Mensaje" && git push origin main
```

## Diseño
- Hero oscuro: fondo #0d0d1a, acento púrpura #7c3aed
- Secciones claras debajo del hero
- Font: Inter (Google Fonts)

## Contenido actual
- WhatsApp contacto: +5214561175410
- 4 servicios: Protección Digital, Ciberseguridad, Soporte Técnico, Software Original
- Software: Office 365 + Windows 11 Pro
- 3 testimoniales: Dana Padron, Estela García, Zeniff
- Redes: YouTube, TikTok, Facebook
- Formulario de contacto → redirige a WhatsApp con datos

## Deploy
- Auto-deploy: push a GitHub main → Cloudflare Pages despliega automáticamente
- DNS: nameservers de Cloudflare en Hostinger
- Si caché DNS viejo en Mac: `sudo dscacheutil -flushcache`

# Apex Legends Cheats (apexlegendscheats.org)

Static Astro site for Apex Legends cheats — Cloudflare Pages ready.

## Stack

- Astro 5 (static output)
- React islands (`@astrojs/react`)
- Tailwind CSS
- Custom split sitemaps (`npm run generate:sitemaps`)

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev on port 5174 |
| `npm run build` | Generate sitemaps + `astro build` → `dist/` |
| `npm run preview` | Preview production build |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm run lint` | Oxlint |

## Cloudflare Workers (static assets + `workers/site.js`)

Workers Builds must **install dependencies and build Astro** before `wrangler deploy`.  
If the deploy command is only `npx wrangler deploy`, the build fails with *“Could not detect a directory containing static files”* because `./dist` does not exist yet.

In the Cloudflare dashboard (**Workers & Pages → your worker → Settings → Builds**), set:

| Setting | Value |
| --- | --- |
| **Root directory** | `/` (repo root) |
| **Node version** | 22 |
| **Deploy command** | `npm run deploy:cloudflare` |

Or, if the UI has separate install/build/deploy fields:

| Setting | Value |
| --- | --- |
| **Install command** | `npm ci` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |

Local production deploy:

```bash
npm run deploy
```

`wrangler.toml` serves static files from `./dist` and custom domains `apexlegendscheats.org` / `www`.

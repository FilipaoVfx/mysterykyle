# mysterykyle

**ISA TE AMO — ATT PHILIPAO.**
Una carta de amor hecha landing page: corazón 3D, rosas, lluvia de corazones
y una animación renderizada con [Remotion](https://remotion.dev).

Mobile-first: la página se diseña a 390px y recién a partir de 760px el
corazón se va al costado. Sin build, sin dependencias en tiempo de ejecución.

## Estructura

```
.
├── public/                     # ← esto es lo que publica Cloudflare Pages
│   ├── index.html              # la landing entera, en un archivo
│   ├── 404.html
│   ├── _headers                # seguridad + caché
│   ├── _redirects              # una sola URL canónica
│   ├── robots.txt  sitemap.xml  manifest.webmanifest
│   ├── favicon.svg  apple-touch-icon.png  icon-192.png  icon-512.png
│   ├── og.jpg                  # tarjeta social 1200x630
│   └── assets/
│       ├── isa-te-amo.mp4          # animación vertical 1080x1920
│       └── isa-te-amo-cuadrado.mp4 # misma animación 1080x1080
├── remotion/                   # proyecto Remotion (no se despliega)
│   └── src/
│       ├── Root.tsx            # HeartStorm, HeartStormSquare, OgCard, IconMark
│       ├── HeartStorm.tsx      # la tormenta de corazones
│       ├── OgCard.tsx          # tarjeta social e icono
│       ├── Heart.tsx           # corazón 3D y rosa en SVG
│       └── fonts.ts            # espera a las tipografías antes del primer frame
├── reference/landing-valentines.jpg
└── scripts/
    ├── set-dominio.mjs         # pone tu dominio en los metadatos
    └── build-artifact.mjs      # fragmento para publicar la página como Artifact
```

## Desplegar en Cloudflare Pages

1. **El dominio ya está puesto** (`pastty.com`) en canonical, Open Graph, sitemap y robots. Si algún día cambia:

   ```bash
   node scripts/set-dominio.mjs pastty.com   # ya aplicado
   git commit -am "Dominio real en los metadatos" && git push
   ```

2. **Cloudflare Pages → Create a project → Connect to Git**, elige este repo y:

   | Campo | Valor |
   | --- | --- |
   | Framework preset | None |
   | Build command | *(vacío)* |
   | Build output directory | `public` |
   | Root directory | `/` |

   Con el output en `public/`, ni `remotion/` ni `scripts/` ni `reference/`
   llegan al sitio: solo se sirve lo que debe servirse.

3. **Custom domains → Set up a domain**, escribe el tuyo. Si el DNS ya está en
   Cloudflare, el registro `CNAME` se crea solo y el certificado sale en
   minutos.

### Qué trae ya resuelto

- **`_headers`** — `Content-Security-Policy` (solo `self` + Google Fonts),
  `Strict-Transport-Security`, `X-Frame-Options: DENY`, `nosniff`,
  `Referrer-Policy` y `Permissions-Policy` con cámara, micrófono y ubicación
  apagados. Caché de un año e `immutable` para `assets/`, revalidación siempre
  para el HTML.
- **`_redirects`** — `/index.html` y `/home` caen en `/` con 301.
- **Open Graph y Twitter Card** con `og.jpg` renderizado por Remotion, para que
  al mandar el enlace por WhatsApp se vea la tarjeta y no una URL pelada.
- **`manifest.webmanifest`** + iconos: se puede añadir a la pantalla de inicio.
- **`404.html`**, que Cloudflare Pages sirve solo.
- **`sitemap.xml`** y `robots.txt`. Si prefieres que Google **no** la indexe,
  cambia `Allow: /` por `Disallow: /` en `robots.txt` y añade
  `<meta name="robots" content="noindex">` en `index.html`.

## La estética

Sale del mockup en `reference/`: rayas verticales rosas, corazón 3D brillante,
rosas rojas y blancas, y un rojo acento para todo lo que grita.

| Token | Valor | Para qué |
| --- | --- | --- |
| `--blush` / `--blush-2` | `#fde8ee` / `#f9d2de` | las rayas del fondo |
| `--candy` | `#ff4f79` | acento, el "amo" |
| `--crimson` | `#d31a46` | el nombre, los botones |
| `--wine` | `#8d0f31` | sombra de pétalo |
| `--plum` | `#2b0c17` | la carta nocturna |

Tipografías: **Great Vibes** para el nombre, **Archivo Black** para los gritos,
**Jost** para leer.

## La animación

El título entra letra por letra con un `spring()` físico (damping / stiffness /
mass, el mismo modelo que usa Remotion) implementado dentro de `index.html`,
así la página no depende de ningún bundle. Las mismas funciones gobiernan la
lluvia de corazones en canvas: cada corazón se dibuja con bézier y gradiente,
flota, y al tocar el botón estallan 80 de golpe.

Toda la página respeta `prefers-reduced-motion`.

### Regenerar los videos y las imágenes

```bash
cd remotion
npm install
npm run studio    # previsualizar
npm run render    # -> ../public/assets/isa-te-amo.mp4
npx remotion still src/index.ts OgCard ../public/og.jpg
```

## Verla en local

```bash
cd public && python3 -m http.server 8000   # http://localhost:8000
```

Ojo: `_headers` y `_redirects` solo los aplica Cloudflare, en local no hacen nada.

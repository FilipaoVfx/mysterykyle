# mysterykyle

**ISA TE AMO — ATT PHILIPAO.**
Una carta de amor hecha landing page: corazón 3D, rosas, lluvia de corazones
y una animación renderizada con [Remotion](https://remotion.dev).

Mobile-first: la página se diseña a 390px y recién a partir de 760px el
corazón se va al costado.

## Qué hay dentro

```
.
├── index.html                  # la landing completa (un solo archivo, sin build)
├── assets/
│   ├── isa-te-amo.mp4          # animación vertical 1080x1920 (Remotion)
│   └── isa-te-amo-cuadrado.mp4 # misma animación 1080x1080
├── remotion/                   # proyecto Remotion
│   └── src/
│       ├── Root.tsx            # composiciones HeartStorm y HeartStormSquare
│       ├── HeartStorm.tsx      # la tormenta de corazones
│       ├── Heart.tsx           # corazón 3D y rosa en SVG
│       └── fonts.ts            # espera a las tipografías antes del primer frame
├── reference/
│   └── landing-valentines.jpg  # mockup del que sale la estética
└── scripts/build-artifact.mjs  # genera el fragmento para publicar la página
```

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
mass, el mismo modelo que usa Remotion) implementado en el propio `index.html`,
así la página no depende de ningún bundle. Las mismas funciones gobiernan la
lluvia de corazones en canvas: cada corazón se dibuja con bézier y gradiente,
flota, y al tocar el botón estallan 80 de golpe.

Toda la página respeta `prefers-reduced-motion`.

### Renderizar el video

```bash
cd remotion
npm install
npm run studio    # previsualizar en el navegador
npm run render    # -> ../assets/isa-te-amo.mp4
```

## Ver la página

Abrirla directo funciona, no hay build:

```bash
python3 -m http.server 8000   # luego http://localhost:8000
```

Para publicarla en GitHub Pages: Settings → Pages → Deploy from branch → `main` / `root`.

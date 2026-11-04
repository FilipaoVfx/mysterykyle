import { continueRender, delayRender } from "remotion";

// Carga Great Vibes + Archivo Black + Jost antes de que Remotion pinte el primer frame.
const HREF =
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Great+Vibes&family=Jost:wght@300;500&display=swap";

let started = false;

export const useFonts = () => {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("Cargando tipografías");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = HREF;
  document.head.appendChild(link);
  link.onload = () => {
    document.fonts.ready.then(() => continueRender(handle));
  };
  link.onerror = () => continueRender(handle);
};

import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeartSVG, RoseSVG } from "./Heart";
import { useFonts } from "./fonts";

type Props = { nombre: string; firma: string };

const PALETA = ["#ff4f79", "#d31a46", "#ff87a8", "#8d0f31", "#ffc2d2"];

export const HeartStorm: React.FC<Props> = ({ nombre, firma }) => {
  useFonts();
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const vertical = height > width;
  const base = Math.min(width, height);

  // latido continuo del corazón central
  const beatPhase = (frame % 45) / 45;
  const beat =
    1 +
    0.07 * Math.exp(-14 * beatPhase) +
    0.045 * Math.exp(-14 * Math.abs(beatPhase - 0.22));

  const entrada = spring({ frame, fps, config: { damping: 11, stiffness: 90, mass: 1.1 } });

  const salida = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0.82],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titulo = "TE AMO".split("");

  return (
    <AbsoluteFill
      style={{
        background:
          "repeating-linear-gradient(90deg,#fde8ee 0 26px,#f9d2de 26px 52px)",
        overflow: "hidden",
      }}
    >
      {/* resplandor que respira */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(45% 32% at 50% 40%, rgba(255,120,160,.42), rgba(255,120,160,0) 72%)",
          transform: `scale(${1 + 0.1 * Math.sin((frame / fps) * 0.9)})`,
        }}
      />

      {/* tormenta de corazones */}
      {new Array(64).fill(0).map((_, i) => {
        const seed = `h${i}`;
        const x = random(seed + "x") * width;
        const size = base * (0.03 + random(seed + "s") * 0.075);
        const speed = 0.9 + random(seed + "v") * 2.4;
        const delay = Math.floor(random(seed + "d") * 55);
        const pop = spring({
          frame,
          fps,
          delay,
          config: { damping: 9, stiffness: 150, mass: 0.7 },
        });
        const y =
          height +
          size -
          ((frame - delay) * speed * (height / 260) +
            random(seed + "o") * height) %
            (height + size * 2);
        const sway = Math.sin((frame + i * 9) / 26) * base * 0.022;
        const rot = (random(seed + "r") - 0.5) * 40 + Math.sin(frame / 40 + i) * 7;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              transform: `rotate(${rot}deg) scale(${pop})`,
              opacity: 0.2 + random(seed + "a") * 0.6,
              filter: `drop-shadow(0 6px 14px rgba(141,15,49,.18))`,
            }}
          >
            <HeartSVG size={size} />
          </div>
        );
      })}

      {/* rosas alrededor del centro */}
      {[
        { a: -150, d: 0.32, s: 0.21, c: "#d31a46" },
        { a: -40, d: 0.34, s: 0.185, c: "#a30f38" },
        { a: 35, d: 0.29, s: 0.235, c: "#fff1f4" },
        { a: 125, d: 0.33, s: 0.17, c: "#ff4f79" },
        { a: 180, d: 0.28, s: 0.145, c: "#fde8ee" },
        { a: 80, d: 0.4, s: 0.13, c: "#8d0f31" },
      ].map((r, i) => {
        const pop = spring({
          frame,
          fps,
          delay: 10 + i * 4,
          config: { damping: 12, stiffness: 110, mass: 0.9 },
        });
        const rad = (r.a * Math.PI) / 180;
        const flot = Math.sin((frame + i * 20) / 30) * base * 0.012;
        const size = base * r.s;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width / 2 + Math.cos(rad) * base * r.d - size / 2,
              top:
                height / 2 +
                Math.sin(rad) * base * r.d -
                size / 2 +
                flot -
                (vertical ? height * 0.06 : 0),
              transform: `scale(${pop}) rotate(${Math.sin(frame / 50 + i) * 8}deg)`,
              filter: "drop-shadow(0 10px 22px rgba(141,15,49,.25))",
            }}
          >
            <RoseSVG size={size} color={r.c} />
          </div>
        );
      })}

      {/* corazón central */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${vertical ? -height * 0.06 : 0}px) scale(${
            entrada * beat * salida
          })`,
        }}
      >
        <div style={{ filter: "drop-shadow(0 30px 60px rgba(141,15,49,.32))" }}>
          <HeartSVG size={base * 0.46} />
        </div>
      </AbsoluteFill>

      {/* texto */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: vertical ? "flex-end" : "center",
          paddingBottom: vertical ? height * 0.1 : 0,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: base * 0.26,
            lineHeight: 0.8,
            color: "#d31a46",
            textShadow: "0 1px 0 #fff, 0 18px 40px rgba(211,26,70,.3)",
            transform: `scale(${spring({
              frame,
              fps,
              delay: 6,
              config: { damping: 13, stiffness: 100 },
            })})`,
          }}
        >
          {nombre}
        </div>
        <div style={{ display: "flex", gap: base * 0.012, marginTop: base * 0.02 }}>
          {titulo.map((ch, i) => {
            const p = spring({
              frame,
              fps,
              delay: 20 + i * 3,
              config: { damping: 12, stiffness: 130, mass: 0.8 },
            });
            return (
              <span
                key={i}
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: base * 0.135,
                  lineHeight: 1,
                  color: i > 2 ? "#ff4f79" : "#4a1224",
                  display: "inline-block",
                  opacity: Math.min(1, p * 1.4),
                  transform: `translateY(${(1 - p) * base * 0.09}px) rotate(${
                    (1 - p) * -8
                  }deg)`,
                  whiteSpace: "pre",
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: base * 0.035,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            letterSpacing: base * 0.008,
            textTransform: "uppercase",
            fontSize: base * 0.026,
            color: "#8a4c5f",
            opacity: interpolate(frame, [55, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          att — {firma}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

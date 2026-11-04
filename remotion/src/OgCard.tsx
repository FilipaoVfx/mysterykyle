import { AbsoluteFill, useVideoConfig } from "remotion";
import { HeartSVG, RoseSVG } from "./Heart";
import { useFonts } from "./fonts";

// Tarjeta social 1200x630 y marca cuadrada para los iconos.
export const OgCard: React.FC = () => {
  useFonts();
  const { width, height } = useVideoConfig();
  const base = Math.min(width, height);
  return (
    <AbsoluteFill
      style={{
        background: "repeating-linear-gradient(90deg,#fde8ee 0 18px,#f9d2de 18px 36px)",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(40% 55% at 72% 50%, rgba(255,120,160,.42), rgba(255,120,160,0) 70%)",
        }}
      />
      <div style={{ flex: 1, paddingLeft: base * 0.11, zIndex: 2 }}>
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: base * 0.032,
            letterSpacing: base * 0.009,
            textTransform: "uppercase",
            color: "#d31a46",
          }}
        >
          Una carta que late
        </div>
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: base * 0.33,
            lineHeight: 0.82,
            color: "#d31a46",
            marginTop: base * 0.075,
            textShadow: "0 1px 0 #fff",
          }}
        >
          Isa
        </div>
        <div
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: base * 0.2,
            lineHeight: 1,
            color: "#4a1224",
            marginTop: base * 0.01,
          }}
        >
          TE <span style={{ color: "#ff4f79" }}>AMO</span>
        </div>
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: base * 0.034,
            letterSpacing: base * 0.012,
            textTransform: "uppercase",
            color: "#8a4c5f",
            marginTop: base * 0.035,
          }}
        >
          att — Philipao
        </div>
      </div>
      <div
        style={{
          position: "relative",
          width: base * 0.95,
          height: "100%",
          zIndex: 2,
        }}
      >
        {[
          { x: 0.06, y: 0.14, s: 0.2, c: "#d31a46" },
          { x: 0.62, y: 0.06, s: 0.16, c: "#a30f38" },
          { x: 0.68, y: 0.6, s: 0.22, c: "#fff1f4" },
          { x: 0.02, y: 0.66, s: 0.15, c: "#ff4f79" },
          { x: 0.38, y: 0.82, s: 0.12, c: "#fde8ee" },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${r.x * 100}%`,
              top: `${r.y * 100}%`,
              filter: "drop-shadow(0 10px 22px rgba(141,15,49,.25))",
            }}
          >
            <RoseSVG size={base * r.s} color={r.c} />
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            filter: "drop-shadow(0 26px 50px rgba(141,15,49,.34))",
          }}
        >
          <HeartSVG size={base * 0.62} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const IconMark: React.FC = () => {
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: "repeating-linear-gradient(90deg,#fde8ee 0 26px,#f9d2de 26px 52px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ filter: "drop-shadow(0 14px 26px rgba(141,15,49,.3))" }}>
        <HeartSVG size={width * 0.78} />
      </div>
    </AbsoluteFill>
  );
};

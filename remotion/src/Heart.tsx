export const HeartSVG: React.FC<{ size: number; opacity?: number }> = ({
  size,
  opacity = 1,
}) => (
  <svg
    width={size}
    height={size * 0.92}
    viewBox="0 0 100 92"
    style={{ opacity, display: "block" }}
  >
    <defs>
      <radialGradient id={`h${size}`} cx="34%" cy="26%" r="78%">
        <stop offset="0%" stopColor="#ffd3e0" />
        <stop offset="28%" stopColor="#ff87a8" />
        <stop offset="62%" stopColor="#f1436f" />
        <stop offset="100%" stopColor="#a30f38" />
      </radialGradient>
      <radialGradient id={`g${size}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
        <stop offset="70%" stopColor="#fff" stopOpacity=".12" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path
      d="M50 88 C20 66 4 47 4 30 C4 14 17 4 31 4 C40 4 47 9 50 16 C53 9 60 4 69 4 C83 4 96 14 96 30 C96 47 80 66 50 88 Z"
      fill={`url(#h${size})`}
    />
    <ellipse
      cx="33"
      cy="24"
      rx="15"
      ry="11"
      fill={`url(#g${size})`}
      transform="rotate(-24 33 24)"
    />
  </svg>
);

const PETAL = "M50 52 C30 50 21 35 30 21 C38 8 62 8 70 21 C79 35 70 50 50 52 Z";

export const RoseSVG: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
    <g fill={color}>
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r} 50 50)`} />
      ))}
    </g>
    <g fill="#5e0a20" opacity=".16" transform="translate(50 50) scale(.68) translate(-50 -50)">
      {[36, 108, 180, 252, 324].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r} 50 50)`} />
      ))}
    </g>
    <g fill={color} transform="translate(50 50) rotate(22) scale(.44) translate(-50 -50)">
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r} 50 50)`} />
      ))}
    </g>
    <g fill="#5e0a20" opacity=".10" transform="translate(50 50) rotate(50) scale(.26) translate(-50 -50)">
      {[0, 120, 240].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r} 50 50)`} />
      ))}
    </g>
    <g fill={color} transform="translate(50 50) rotate(-14) scale(.2) translate(-50 -50)">
      {[0, 120, 240].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r} 50 50)`} />
      ))}
    </g>
    <circle cx="50" cy="49" r="2.6" fill="#5e0a20" opacity=".2" />
  </svg>
);

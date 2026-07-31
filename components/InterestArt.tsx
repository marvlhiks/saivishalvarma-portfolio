/**
 * Original artwork for the things I play and read.
 *
 * Deliberately not logos or screenshots: those are trademarked and this repo is
 * public. These are mood pieces built from scratch, each keyed to the palette
 * and shape language the title is known for, so they read as a set.
 */

export type ArtKey = "rdr2" | "clairobscur" | "skyrim" | "assassins" | "onepiece";

export function InterestArt({ art }: { art: ArtKey }) {
  switch (art) {
    case "rdr2":
      return <RedDead />;
    case "clairobscur":
      return <ClairObscur />;
    case "skyrim":
      return <Skyrim />;
    case "assassins":
      return <Assassins />;
    case "onepiece":
      return <OnePiece />;
  }
}

const svg = "h-full w-full";

/**
 * Three distant birds. Two shallow curves per bird reads as a bird at this
 * size, where anything more detailed turns into a smudge.
 */
function Birds({ stroke, opacity }: { stroke: string; opacity: number }) {
  const flock: [number, number, number][] = [
    [78, 92, 1],
    [128, 68, 0.78],
    [300, 84, 0.9],
  ];
  return (
    <g stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" opacity={opacity}>
      {flock.map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x},${y} q${5 * s},${-4 * s} ${10 * s},0 q${5 * s},${-4 * s} ${10 * s},0`}
        />
      ))}
    </g>
  );
}

/** Low sun over open plains. */
function RedDead() {
  return (
    <svg viewBox="0 0 400 300" className={svg} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="rdr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d1508" />
          <stop offset="45%" stopColor="#9c3d11" />
          <stop offset="72%" stopColor="#d9741f" />
          <stop offset="100%" stopColor="#f0a542" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#rdr-sky)" />
      <circle cx="200" cy="196" r="46" fill="#ffd28a" opacity="0.9" />
      {/* Mesas */}
      <path d="M0,214 L54,214 L54,186 L96,186 L96,214 L150,214 L150,300 L0,300 Z" fill="#2a0d05" opacity="0.85" />
      <path d="M262,214 L262,178 L318,178 L318,214 L400,214 L400,300 L262,300 Z" fill="#2a0d05" opacity="0.85" />
      {/* Plain, then a nearer ridge for depth */}
      <path d="M0,216 L400,216 L400,300 L0,300 Z" fill="#1d0803" opacity="0.75" />
      <path d="M0,262 C70,246 130,272 200,258 C270,244 330,268 400,254 L400,300 L0,300 Z" fill="#150502" />
      {/* Birds */}
      <Birds stroke="#2a0d05" opacity={0.5} />
    </svg>
  );
}

/** Belle Époque arch, gilt on deep violet. */
function ClairObscur() {
  return (
    <svg viewBox="0 0 400 300" className={svg} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="co-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0f2e" />
          <stop offset="55%" stopColor="#3b1c52" />
          <stop offset="100%" stopColor="#120a22" />
        </linearGradient>
        <linearGradient id="co-gilt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4d79a" />
          <stop offset="100%" stopColor="#b98b3c" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#co-bg)" />
      {/* Arch */}
      <path
        d="M140,300 L140,150 A60,60 0 0 1 260,150 L260,300"
        fill="none"
        stroke="url(#co-gilt)"
        strokeWidth="3"
      />
      <path
        d="M162,300 L162,156 A38,38 0 0 1 238,156 L238,300"
        fill="none"
        stroke="url(#co-gilt)"
        strokeWidth="1.2"
        opacity="0.6"
      />
      {/* Floating monolith */}
      <rect x="186" y="96" width="28" height="46" rx="3" fill="url(#co-gilt)" opacity="0.85" />
      {/* Motes */}
      {[
        [92, 108], [312, 88], [128, 66], [280, 190], [76, 214], [332, 236],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 ? 2.4 : 1.6} fill="#f4d79a" opacity="0.55" />
      ))}
    </svg>
  );
}

/** Cold peaks and aurora. Sits closest to this site's own palette. */
function Skyrim() {
  return (
    <svg viewBox="0 0 400 300" className={svg} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#05131f" />
          <stop offset="60%" stopColor="#123449" />
          <stop offset="100%" stopColor="#2b5d74" />
        </linearGradient>
        <linearGradient id="sk-aurora" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ce0b3" stopOpacity="0" />
          <stop offset="45%" stopColor="#5ff0c4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7fe3f0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sk-sky)" />
      <path d="M0,86 C90,44 150,110 220,74 C290,40 344,92 400,66 L400,116 C340,140 286,92 218,124 C146,158 88,96 0,132 Z" fill="url(#sk-aurora)" />
      {/* Peaks */}
      <path d="M0,300 L74,158 L124,222 L176,124 L246,238 L300,176 L400,300 Z" fill="#0a1f2e" />
      <path d="M176,124 L196,156 L166,168 Z" fill="#dceef5" opacity="0.9" />
      <path d="M74,158 L88,182 L60,190 Z" fill="#dceef5" opacity="0.7" />
      <path d="M0,300 L400,300 L400,268 C300,246 120,282 0,258 Z" fill="#061722" />
    </svg>
  );
}

/** A blade's angle, crimson on bone. */
function Assassins() {
  return (
    <svg viewBox="0 0 400 300" className={svg} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="ac-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8e2d6" />
          <stop offset="100%" stopColor="#b7ae9d" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ac-bg)" />
      {/* Rooftops */}
      <path d="M0,232 L58,232 L58,206 L104,206 L104,232 L168,232 L168,190 L216,190 L216,232 L286,232 L286,212 L336,212 L336,232 L400,232 L400,300 L0,300 Z" fill="#8d8474" opacity="0.55" />
      {/* Abstract blade chevron */}
      <path d="M200,58 L246,178 L200,150 L154,178 Z" fill="#a81f2d" />
      <path d="M200,58 L200,150 L154,178 Z" fill="#8c1622" />
      {/* Birds over the rooftops */}
      <Birds stroke="#5c5346" opacity={0.6} />
    </svg>
  );
}

/** Open sea, a ship, and a sun that will not quit. */
function OnePiece() {
  return (
    <svg viewBox="0 0 400 300" className={svg} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        {/* Brighter than the page it sits on, or the tile disappears into it. */}
        <linearGradient id="op-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b8ec9" />
          <stop offset="46%" stopColor="#6cc2ea" />
          <stop offset="100%" stopColor="#ffd98a" />
        </linearGradient>
        <linearGradient id="op-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a86c4" />
          <stop offset="100%" stopColor="#0a4f7d" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#op-sky)" />
      <circle cx="286" cy="176" r="40" fill="#ffe9a8" opacity="0.92" />
      <rect y="196" width="400" height="104" fill="url(#op-sea)" />
      {/* Ship */}
      <g transform="translate(112 132)">
        <path d="M-34,64 L34,64 L24,80 L-24,80 Z" fill="#5a3418" />
        <rect x="-2" y="6" width="4" height="58" fill="#5a3418" />
        <path d="M2,10 L34,44 L2,44 Z" fill="#f4efe2" />
        <path d="M-2,14 L-28,44 L-2,44 Z" fill="#e6dfcd" />
      </g>
      {/* Swell */}
      <path d="M0,206 q30,-9 60,0 t60,0 t60,0 t60,0 t60,0 t60,0" fill="none" stroke="#bfe4f7" strokeWidth="2.5" opacity="0.5" />
      <path d="M0,226 q30,-9 60,0 t60,0 t60,0 t60,0 t60,0 t60,0" fill="none" stroke="#bfe4f7" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

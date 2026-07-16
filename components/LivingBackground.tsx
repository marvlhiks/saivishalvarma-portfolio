"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

type Speck = {
  x: number;
  y: number;
  r: number;
  a: number;
};

type Cluster = {
  cx: number;
  cy: number;
  specks: Speck[];
  hue: number;
};

function makeClusters(count: number): Cluster[] {
  return Array.from({ length: count }, () => {
    const cx = Math.random() * 100;
    const cy = Math.random() * 100;
    const speckCount = 18 + Math.floor(Math.random() * 40);
    const hue = 212 + Math.random() * 18;
    const specks: Speck[] = Array.from({ length: speckCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() ** 0.55 * (4 + Math.random() * 14);
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist * 0.75,
        r: 0.15 + Math.random() * 1.4,
        a: 0.12 + Math.random() * 0.45,
      };
    });
    return { cx, cy, specks, hue };
  });
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion() {
  return false;
}

export function LivingBackground() {
  const reduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const raf = useRef(0);
  const sprayFilterId = useId().replace(/:/g, "");

  useEffect(() => {
    let alive = true;
    const id = requestAnimationFrame(() => {
      if (!alive) return;
      setClusters(makeClusters(reduce ? 5 : 9));
    });
    return () => {
      alive = false;
      cancelAnimationFrame(id);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const el = cursorRef.current;
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      if (el) {
        el.style.transform = `translate3d(${current.current.x - 90}px, ${current.current.y - 90}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#f8fafc]" />

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <filter id={sprayFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <g filter={`url(#${sprayFilterId})`}>
          {clusters.map((c, i) => (
            <g key={i} className={reduce ? undefined : "soft-pulse"} style={{ animationDelay: `${i * 0.4}s` } as CSSProperties}>
              {/* Soft wash under the spray */}
              <circle
                cx={`${c.cx}%`}
                cy={`${c.cy}%`}
                r="7%"
                fill={`hsla(${c.hue}, 85%, 52%, 0.04)`}
              />
              {c.specks.map((s, j) => (
                <circle
                  key={j}
                  cx={`${s.x}%`}
                  cy={`${s.y}%`}
                  r={`${s.r * 0.85}%`}
                  fill={`hsla(${c.hue}, 90%, ${45 + (j % 5) * 3}%, ${s.a * 0.55})`}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>

      {!reduce && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed top-0 left-0 h-[180px] w-[180px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(47,123,255,0.16) 0%, rgba(21,87,224,0.06) 40%, transparent 72%)",
          }}
        />
      )}
    </div>
  );
}

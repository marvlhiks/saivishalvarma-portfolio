"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The water the whole site sits in. One fixed stack of layers: ice on top for
 * the surface page, caustics just under it, light shafts that die off with
 * depth, rising marine snow, and a void that closes in near the seabed.
 *
 * Only the home page starts above the waterline. Everywhere else you are
 * already under.
 */
export function WaterColumn() {
  const pathname = usePathname();
  const surface = pathname === "/";
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const viewport = useRef(900);

  useEffect(() => {
    const measure = () => {
      viewport.current = window.innerHeight || 900;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 0 at the waterline, 1 once fully submerged — one viewport of crossing.
  const crossing = useTransform(scrollY, (y) =>
    clamp(y / (viewport.current * 0.85)),
  );
  const submerged = useMotionValue(1);
  const cross = surface ? crossing : submerged;

  const iceOpacity = useTransform(cross, [0, 0.75], [1, 0]);
  // Caustics only exist in the thin band right beneath the surface.
  const causticOpacity = useTransform(cross, [0.15, 0.5, 1], [0, 0.8, 0]);
  const shaftOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.55, 0.85],
    surface ? [0, 0.55, 0.22, 0] : [0.5, 0.45, 0.18, 0],
  );
  const voidOpacity = useTransform(scrollYProgress, [0.25, 1], [0, 0.9]);
  const snowOpacity = useTransform(cross, [0.3, 1], [0, 1]);

  return (
    <div aria-hidden className="dither pointer-events-none fixed inset-0 -z-10">
      {/*
        Open water: shallow at the top of the column, abyss below. Extra stops
        keep the falloff smooth rather than stepping between two far-apart
        colours.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2f86ae 0%, #1f6c93 12%, #14567f 24%, #0f4a6d 35%, #0c3a58 47%, #082c44 59%, #052032 71%, #031521 83%, #010d15 92%, #010a11 100%)",
        }}
      />

      {/* Light shafts breaking through from the surface */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[85vh]"
        style={{
          opacity: shaftOpacity,
          background:
            "repeating-linear-gradient(101deg, transparent 0 6vw, rgba(223,246,251,0.06) 6vw 8.5vw, transparent 8.5vw 15vw)",
          // Blur turns hard stripes into light, which is the whole point.
          filter: "blur(22px)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.95), transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.95), transparent)",
        }}
      />

      {/* Marine snow, rising past you as you sink */}
      <motion.div className="absolute inset-0" style={{ opacity: snowOpacity }}>
        <MarineSnow reduce={!!reduce} />
      </motion.div>

      {/* The dark closing in near the seabed */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: voidOpacity,
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(1,10,17,0) 0%, rgba(1,10,17,0.5) 45%, #010a11 100%)",
        }}
      />

      {/* Caustics — surface light rippling on the underside of the water */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[55vh]"
        style={{ opacity: causticOpacity }}
      >
        <div
          className="caustic h-full w-full"
          style={{
            background:
              "repeating-linear-gradient(84deg, transparent 0 34px, rgba(223,246,251,0.18) 34px 44px, transparent 44px 92px), repeating-linear-gradient(-78deg, transparent 0 48px, rgba(127,227,240,0.14) 48px 56px, transparent 56px 120px)",
            filter: "blur(9px)",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.9), transparent)",
            WebkitMaskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9), transparent)",
          }}
        />
      </motion.div>

      {/* Above the waterline — daylight on snow. Only on surface pages. */}
      {surface && (
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: iceOpacity,
            background:
              "linear-gradient(178deg, #fbfdfe 0%, #f4f9fc 22%, #eef6fa 40%, #e6f1f7 56%, #dcecf4 70%, #d2e6f0 85%, #c6dfec 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(80% 55% at 72% 8%, rgba(255,255,255,0.95) 0%, transparent 60%), radial-gradient(60% 45% at 12% 30%, rgba(127,227,240,0.18) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

type Flake = { x: number; y: number; r: number; v: number; drift: number };

/**
 * Particulate drifting upward — the cheapest honest cue that you are sinking.
 * Canvas rather than DOM nodes so a few hundred particles cost nothing.
 */
function MarineSnow({ reduce }: { reduce: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 26000);
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.7 + 0.4,
        v: Math.random() * 0.22 + 0.06,
        drift: Math.random() * Math.PI * 2,
      }));
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 246, 251, ${0.1 + f.r * 0.14})`;
        ctx.fill();
      }
    };

    const step = () => {
      for (const f of flakes) {
        f.y -= f.v;
        f.drift += 0.004;
        f.x += Math.sin(f.drift) * 0.16;
        if (f.y < -4) {
          f.y = height + 4;
          f.x = Math.random() * width;
        }
      }
      paint();
      frame = requestAnimationFrame(step);
    };

    seed();
    if (reduce) {
      paint();
    } else {
      frame = requestAnimationFrame(step);
    }

    const onResize = () => {
      seed();
      paint();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [ready, reduce]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}

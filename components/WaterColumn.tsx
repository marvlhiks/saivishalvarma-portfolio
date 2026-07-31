"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IcebergSilhouette } from "@/components/IcebergSilhouette";
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
  // Sunset colour reaches a little way under the surface, then the water
  // takes it. Red goes first in water, which is why the deep stays blue.
  const roseOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.45, 0]);
  /*
    Slower than the page, so it reads as something you are moving past.
    On the surface page it starts low, so the peaks sit in the white band of
    the hero rather than up in the pink, and the mass runs down into the blue.
    Pages that open underwater start it higher, since there is no sky to avoid.
  */
  const bergDrift = useTransform(
    scrollYProgress,
    [0, 1],
    surface ? ["19%", "-34%"] : ["-7%", "-38%"],
  );
  // Barely a suggestion. Strong enough to feel, too faint to read as an image.
  // A pale line on dark water carries far further than a grey one on pink, so
  // the submerged state is dialled back to keep the berg equally quiet in both.
  const bergBase = useTransform(cross, [0, 1], [0.18, 0.075]);
  const bergFade = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.28]);
  const bergOpacity = useTransform(
    [bergBase, bergFade],
    ([base, fade]: number[]) => base * fade,
  );
  // Dark enough to sit on the pink sky, pale enough to sit in the abyss.
  const bergColor = useTransform(cross, [0, 1], ["#7d6470", "#dff6fb"]);

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

      {/* Sunset bleeding down through the first stretch of water */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          opacity: roseOpacity,
          background:
            "linear-gradient(180deg, rgba(247,184,205,0.3) 0%, rgba(226,132,163,0.16) 24%, rgba(163,78,107,0.07) 48%, transparent 76%)",
          // Soft-light tints the water without lifting it toward grey the way
          // screen does.
          mixBlendMode: "soft-light",
        }}
      />

      {/* Light shafts breaking through from the surface */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[85vh]"
        style={{
          opacity: shaftOpacity,
          background:
            "repeating-linear-gradient(101deg, transparent 0 6vw, rgba(255,235,238,0.07) 6vw 8.5vw, transparent 8.5vw 15vw)",
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
              // Warm ripples nearer the surface, cool ones under them.
              "repeating-linear-gradient(84deg, transparent 0 34px, rgba(255,226,232,0.2) 34px 44px, transparent 44px 92px), repeating-linear-gradient(-78deg, transparent 0 48px, rgba(127,227,240,0.14) 48px 56px, transparent 56px 120px)",
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
            // Alpenglow: rose sky at the top, white through the ice, cold blue
            // by the time you reach the water.
            background:
              "linear-gradient(178deg, #f7b8cd 0%, #fac7d5 12%, #fcd8dd 24%, #fde7e4 36%, #fdf2ee 48%, #f9fafc 60%, #f0f6fa 72%, #e2eff6 86%, #cfe4ef 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                // A low sun off to one side, and its warmth pooling on the snow.
                "radial-gradient(38% 26% at 74% 12%, rgba(255,246,240,0.95) 0%, rgba(255,214,222,0.45) 45%, transparent 72%), radial-gradient(70% 45% at 20% 4%, rgba(247,184,205,0.5) 0%, transparent 65%), radial-gradient(55% 40% at 8% 46%, rgba(127,227,240,0.16) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}

      {/*
        The berg, in outline, over everything else in the backdrop so it reads
        on the pink sky as well as in the deep. Its colour crosses with you:
        warm grey against the ice, pale meltwater once under. It drifts up as
        you scroll, so descending uncovers more of the mass below the line.
      */}
      <motion.div
        className="absolute inset-0 flex justify-center"
        style={{ y: bergDrift, opacity: bergOpacity, color: bergColor }}
      >
        <div className="h-[150vh] w-[min(150vw,1300px)]">
          <IcebergSilhouette />
        </div>
      </motion.div>
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

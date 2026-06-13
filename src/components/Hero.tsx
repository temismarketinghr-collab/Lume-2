"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-synced hero.
 *
 * Instead of scrubbing video.currentTime (which seeks from sparse keyframes and
 * stutters on many devices), we drive an image sequence:
 *
 * - A tiny fallback video (~720KB) shows instantly and is the reduced-motion
 *   experience, so the hero is never blank/black.
 * - 120 WebP frames are preloaded, then a <canvas> crossfades in and we draw the
 *   frame matching scroll progress. No video seeking → smooth & consistent.
 */
const FRAME_COUNT = 120;
const framePath = (i: number) =>
  `/frames/frame-${String(i).padStart(3, "0")}.webp`;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    let trigger: ScrollTrigger | null = null;
    let currentIndex = -1;
    let disposed = false;
    const images: HTMLImageElement[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = (index: number, force = false) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (!force && index === currentIndex) return;
      currentIndex = index;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      draw(currentIndex < 0 ? 0 : currentIndex, true);
    };

    const start = () => {
      if (disposed) return;
      resize();
      draw(0, true);
      setReady(true);
      videoRef.current?.pause();

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1))),
          );
          draw(idx);
        },
      });
      ScrollTrigger.refresh();
      window.addEventListener("resize", resize);
    };

    // Preload every frame, then hand over to the canvas.
    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === FRAME_COUNT) start();
      };
      img.src = framePath(i);
      images[i - 1] = img;
    }

    return () => {
      disposed = true;
      trigger?.kill();
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[400vh] w-full bg-cream">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        {/* Lightweight base video: instant paint + reduced-motion experience */}
        <video
          ref={videoRef}
          src="/hero-fallback.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video absolute inset-0 h-full w-full object-cover"
        />

        {/* Frame-sequence canvas: crossfades in once frames are ready */}
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={[
              "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        )}

        {/* Soft cream scrim — fades only the left edge so the peripheral video
            content recedes instead of distracting. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--cream) 0%, rgba(254,251,240,0.4) 13%, rgba(254,251,240,0) 32%)",
          }}
        />
      </div>
    </section>
  );
}

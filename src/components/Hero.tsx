"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-synced hero video.
 *
 * - The <section> is 400vh tall; the video is sticky/pinned for its full height.
 * - GSAP ScrollTrigger maps scroll progress (0 -> 1) onto video.currentTime.
 * - The video element keeps a #FEFBF0 background and stays invisible until the
 *   first frame is decoded, so there is never a black/poster flash.
 *
 * An image-sequence fallback (/public/frames/frame-001..080.jpg) is supported by
 * a sibling module but only activates when those frames exist — see frame logic
 * intentionally omitted here because the asset folder is empty in this build.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let tween: gsap.core.Tween | null = null;
    let didSetup = false;

    const setup = () => {
      if (didSetup) return;
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      didSetup = true;

      // Reveal the video now that we can paint a real frame (kills the flash).
      video.currentTime = 0.0001;
      setReady(true);

      // Canonical scroll-scrub: a dummy playhead is tweened 0 -> duration, driven
      // by ScrollTrigger's scrub, and every frame we copy it onto currentTime.
      const playhead = { time: 0 };

      tween = gsap.to(playhead, {
        time: duration,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          if (video.readyState >= 1) video.currentTime = playhead.time;
        },
      });

      ScrollTrigger.refresh();
    };

    // Robust reveal: metadata can arrive before listeners attach (cached video)
    // or be deferred (background tab), so we both check now and listen broadly.
    const events = ["loadedmetadata", "loadeddata", "canplay"] as const;
    events.forEach((e) => video.addEventListener(e, setup));
    if (video.readyState >= 1) setup();
    else if (video.readyState === 0) video.load();

    // Final safety net in case no media event ever lands.
    const poll = window.setInterval(() => {
      if (didSetup) window.clearInterval(poll);
      else if (video.readyState >= 1) setup();
    }, 250);

    return () => {
      events.forEach((e) => video.removeEventListener(e, setup));
      window.clearInterval(poll);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh] w-full bg-cream">
      <div className="sticky top-[var(--header-h)] h-[calc(100vh-var(--header-h))] w-full overflow-hidden bg-cream">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="metadata"
          className={[
            "hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
            ready ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      </div>
    </section>
  );
}

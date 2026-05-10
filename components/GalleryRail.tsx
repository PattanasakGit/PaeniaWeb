"use client";

import { useEffect, useRef, type ReactNode } from "react";

type GalleryRailProps = {
  children: ReactNode;
  ariaLabel: string;
};

export function GalleryRail({ children, ariaLabel }: GalleryRailProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const update = () => {
      const isDesktop = window.matchMedia("(min-width: 769px)").matches;
      if (!isDesktop) {
        section.style.removeProperty("--gallery-rail-height");
        track.style.removeProperty("--gallery-rail-x");
        return;
      }
      const viewportHeight = window.innerHeight || 1;
      const travel = Math.max(0, track.scrollWidth - section.clientWidth);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / Math.max(1, travel)));
      section.style.setProperty("--gallery-rail-height", `${Math.round(travel + viewportHeight)}px`);
      track.style.setProperty("--gallery-rail-x", `${Math.round(-travel * progress * 1000) / 1000}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={sectionRef} className="gallery-rail-section" data-gallery-rail-section>
      <div className="gallery-rail-sticky" aria-label={ariaLabel}>
        <div ref={trackRef} className="gallery-rail-track" data-gallery-rail-track>
          {children}
        </div>
      </div>
    </div>
  );
}

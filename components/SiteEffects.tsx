"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mainEl = document.getElementById("main-content");
    const skip = document.querySelector<HTMLAnchorElement>(".skip-link");
    const onSkip = () => window.requestAnimationFrame(() => mainEl?.focus({ preventScroll: true }));
    skip?.addEventListener("click", onSkip);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    document.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 8) * 60}ms`);
      io.observe(el);
    });

    const onFaqToggle = (ev: Event) => {
      const detail = ev.target as HTMLDetailsElement;
      if (!detail.open) return;
      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== detail) other.removeAttribute("open");
      });
    };
    document.querySelectorAll(".faq-list details").forEach((d) => d.addEventListener("toggle", onFaqToggle));

    return () => {
      skip?.removeEventListener("click", onSkip);
      io.disconnect();
      document.querySelectorAll(".faq-list details").forEach((d) => d.removeEventListener("toggle", onFaqToggle));
    };
  }, [pathname]);

  return null;
}

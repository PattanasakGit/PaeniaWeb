"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { screenshots, storySteps } from "@/lib/product";

type ScreenshotId = (typeof screenshots)[number]["id"];

export function ScreenshotStory() {
  const [active, setActive] = useState<ScreenshotId>("dark");
  const activeStep = useMemo(
    () => storySteps.find((step) => step.screenshotId === active) ?? storySteps[0],
    [active]
  );

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-story-step]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const next = visible?.target.getAttribute("data-story-step") as ScreenshotId | null;
        if (next) setActive(next);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-22% 0px -38% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="story-section" aria-label="Paenia workflow screenshots">
      <div className="story-copy">
        {storySteps.map((step) => (
          <article
            key={step.screenshotId}
            className="story-step"
            data-story-step={step.screenshotId}
            onMouseEnter={() => setActive(step.screenshotId)}
          >
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <div className="story-stage-wrap">
        <div className="story-stage" data-active={active}>
          {screenshots.map((screenshot) => (
            <button
              key={screenshot.id}
              className="story-shot"
              data-shot={screenshot.id}
              type="button"
              onClick={() => setActive(screenshot.id)}
              aria-pressed={active === screenshot.id}
            >
              <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 900px) 88vw, 640px" />
              <span>{screenshot.capTitle}</span>
            </button>
          ))}
          <div className="story-meta" aria-live="polite">
            <h3>{activeStep.title}</h3>
            <p>{activeStep.body}</p>
          </div>
          <div className="story-picker" aria-label="Choose screenshot">
            {screenshots.map((screenshot) => (
              <button
                key={screenshot.id}
                type="button"
                className="story-picker-button"
                data-active={active === screenshot.id}
                onClick={() => setActive(screenshot.id)}
                aria-label={`Show ${screenshot.capTitle}`}
              >
                <span />
                {screenshot.capTitle}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { workflowShowcases } from "@/lib/product";

const imageDimensions = (src: string) =>
  src.includes("overrides") || src.includes("original-backups")
    ? { width: 1920, height: 1268 }
    : { width: 1920, height: 1286 };

export function WorkflowShowcases() {
  return (
    <section className="workflow-section wrap reveal" aria-labelledby="workflow-eyebrow">
      <div className="workflow-heading">
        <h2 id="workflow-eyebrow">From preset to production settings.</h2>
        <p>
          The page follows the product: pick a direction, refine keys, choose targets, and keep backups
          visible — so trust is part of the story, not a footnote.
        </p>
      </div>

      <div className="workflow-list">
        {workflowShowcases.map((showcase, index) => (
          <article
            key={showcase.title}
            className="workflow-card"
            data-layout={index % 2 === 0 ? undefined : "right"}
          >
            <div className="workflow-copy">
              <span className="wf-label">{showcase.label}</span>
              <h3>{showcase.title}</h3>
              <p>{showcase.body}</p>
            </div>
            <div className="workflow-media" data-count={showcase.images.length}>
              {showcase.images.map((image) => (
                <figure key={image.src} className="workflow-image">
                  <div className="screen-card">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={imageDimensions(image.src).width}
                      height={imageDimensions(image.src).height}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 900px) 92vw, 720px"
                    />
                  </div>
                  <figcaption className="media-cap">
                    <span className="media-cap__kicker">{image.kicker}</span>
                    <span className="media-cap__title">{image.capTitle}</span>
                    <p className="media-cap__desc">{image.capDesc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

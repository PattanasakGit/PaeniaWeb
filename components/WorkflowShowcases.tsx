import Image from "next/image";
import { workflowShowcases } from "@/lib/product";

export function WorkflowShowcases() {
  return (
    <section className="workflow-section" aria-labelledby="workflow-title">
      <div className="workflow-heading">
        <h2 id="workflow-title">See the real Paenia workflows.</h2>
        <p>
          The page uses actual app screenshots as product evidence, arranged by task so each image
          supports the story instead of becoming a generic gallery.
        </p>
      </div>

      <div className="workflow-list">
        {workflowShowcases.map((showcase, index) => (
          <article key={showcase.title} className="workflow-card" data-layout={index % 2 === 0 ? "left" : "right"}>
            <div className="workflow-copy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{showcase.title}</h3>
              <p>{showcase.body}</p>
            </div>
            <div className="workflow-media" data-count={showcase.images.length}>
              {showcase.images.map((image) => (
                <figure key={image.src} className="workflow-image">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 88vw, 720px" />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

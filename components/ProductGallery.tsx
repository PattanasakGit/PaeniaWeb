import Image from "next/image";
import { galleryImages } from "@/lib/product";

export function ProductGallery() {
  const [featuredImage, ...railImages] = galleryImages;

  return (
    <section id="story" className="product-gallery" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <h2 id="gallery-title">A real look at Paenia.</h2>
        <p>
          Every image is an actual app screen, shown at its natural shape so visitors can inspect
          the workflow instead of seeing cropped product decoration.
        </p>
      </div>

      <div className="gallery-grid">
        <figure className="gallery-item" data-size="featured">
          <Image
            src={featuredImage.src}
            alt={featuredImage.alt}
            width={featuredImage.width}
            height={featuredImage.height}
            loading="eager"
            sizes="(max-width: 900px) 92vw, 1120px"
          />
          <figcaption>
            <span>{featuredImage.label}</span>
            <small>{featuredImage.tone}</small>
          </figcaption>
        </figure>

        <div className="gallery-rail-section" data-gallery-rail-section suppressHydrationWarning>
          <div className="gallery-rail-sticky" aria-label="Paenia screenshot gallery">
            <div className="gallery-rail-track" data-gallery-rail-track suppressHydrationWarning>
              {railImages.map((image) => (
                <figure key={image.src} className="gallery-item" data-size="rail">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="eager"
                    sizes="(max-width: 900px) 84vw, 760px"
                  />
                  <figcaption>
                    <span>{image.label}</span>
                    <small>{image.tone}</small>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  const section = document.querySelector('.gallery-rail-section');
  const track = document.querySelector('.gallery-rail-track');
  if (!section || !track || window.__paeniaGalleryRailReady) return;

  window.__paeniaGalleryRailReady = true;
  let frame = 0;

  const update = () => {
    const viewportHeight = window.innerHeight || 1;
    const travel = Math.max(0, track.scrollWidth - section.clientWidth);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / Math.max(1, travel)));

    section.style.setProperty('--gallery-rail-height', Math.round(travel + viewportHeight) + 'px');
    track.style.setProperty('--gallery-rail-x', Math.round(-travel * progress * 1000) / 1000 + 'px');
  };

  const tick = () => {
    update();
    frame = window.requestAnimationFrame(tick);
  };

  window.addEventListener('resize', update);
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
  frame = window.requestAnimationFrame(tick);
})();
`
          }}
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import { galleryImages } from "@/lib/product";
import { GalleryRail } from "@/components/GalleryRail";

export function ProductGallery() {
  const [featuredImage, ...railImages] = galleryImages;

  return (
    <section id="story" className="product-gallery wrap reveal" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <h2 id="gallery-title">Every frame is the real app.</h2>
        <p>
          No mock UI — only Paenia as it ships. Keep scrolling to browse screenshots; on small screens,
          swipe the row.
        </p>
      </div>

      <div className="gallery-grid">
        <figure className="gallery-item" data-size="featured">
          <div className="screen-card">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              width={featuredImage.width}
              height={featuredImage.height}
              loading="eager"
              sizes="(max-width: 900px) 92vw, 1120px"
            />
          </div>
          <figcaption className="media-cap">
            <span className="media-cap__kicker">{featuredImage.kicker}</span>
            <span className="media-cap__title">{featuredImage.capTitle}</span>
            <p className="media-cap__desc">{featuredImage.capDesc}</p>
          </figcaption>
        </figure>

        <GalleryRail ariaLabel="Screenshot gallery">
          {railImages.map((image) => (
            <figure key={image.src} className="gallery-item" data-size="rail">
              <div className="screen-card">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  sizes="(max-width: 900px) 84vw, 760px"
                />
              </div>
              <figcaption className="media-cap">
                <span className="media-cap__kicker">{image.kicker}</span>
                <span className="media-cap__title">{image.capTitle}</span>
                <p className="media-cap__desc">{image.capDesc}</p>
              </figcaption>
            </figure>
          ))}
        </GalleryRail>
      </div>
    </section>
  );
}

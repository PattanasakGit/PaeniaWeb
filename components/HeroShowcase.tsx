import Image from "next/image";
import { screenshots } from "@/lib/product";

const heroDimensions = {
  dark: { width: 2838, height: 2012 },
  light: { width: 2838, height: 2012 },
  palette: { width: 2926, height: 2100 }
} as const;

export function HeroShowcase() {
  const [primary, ...supporting] = screenshots;
  const primaryDimensions = heroDimensions[primary.id];

  return (
    <div className="hero-showcase" aria-label="Product screenshots">
      <figure className="hero-shot hero-shot-main">
        <div className="screen-card">
          <Image
            src={primary.src}
            alt={primary.alt}
            width={primaryDimensions.width}
            height={primaryDimensions.height}
            sizes="(max-width: 900px) 92vw, 720px"
            priority
          />
        </div>
        <figcaption className="media-cap">
          <span className="media-cap__kicker">{primary.kicker}</span>
          <span className="media-cap__title">{primary.capTitle}</span>
          <p className="media-cap__desc">{primary.capDesc}</p>
        </figcaption>
      </figure>
      <div className="hero-shot-row" aria-label="Additional Paenia screenshots">
        {supporting.map((screenshot) => (
          <figure key={screenshot.id} className="hero-shot">
            <div className="screen-card">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={heroDimensions[screenshot.id].width}
                height={heroDimensions[screenshot.id].height}
                sizes="(max-width: 900px) 44vw, 340px"
              />
            </div>
            <figcaption className="media-cap">
              <span className="media-cap__kicker">{screenshot.kicker}</span>
              <span className="media-cap__title">{screenshot.capTitle}</span>
              <p className="media-cap__desc">{screenshot.capDesc}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

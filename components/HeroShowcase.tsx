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
    <div className="hero-showcase" aria-label="Paenia product screenshots">
      <figure className="hero-shot hero-shot-main">
        <Image
          src={primary.src}
          alt={primary.alt}
          width={primaryDimensions.width}
          height={primaryDimensions.height}
          sizes="(max-width: 900px) 92vw, 720px"
          priority
        />
        <figcaption>{primary.label}</figcaption>
      </figure>
      <div className="hero-shot-row" aria-label="Additional Paenia screenshots">
        {supporting.map((screenshot) => (
          <figure key={screenshot.id} className="hero-shot">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={heroDimensions[screenshot.id].width}
              height={heroDimensions[screenshot.id].height}
              sizes="(max-width: 900px) 44vw, 340px"
            />
            <figcaption>{screenshot.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

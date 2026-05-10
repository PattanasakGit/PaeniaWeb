import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ProductGallery } from "@/components/ProductGallery";
import { WorkflowShowcases } from "@/components/WorkflowShowcases";
import { faqs, features, proofPoints, safetyPillars, supportedEditors } from "@/lib/product";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="hero-section wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">Native macOS · Theme studio</p>
            <h1 id="hero-title">Design your editor color system.</h1>
            <p>
              Paenia shapes Cursor, VS Code, Antigravity, Trae, and other VS Code-family themes with live
              preview, curated presets, and writes you can trust.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/download">
                Download for macOS
              </Link>
            </div>
            <div className="proof-row" role="list">
              {proofPoints.map((point) => (
                <div key={point.title} className="proof-pill" role="listitem">
                  <strong>{point.title}</strong>
                  <span>{point.body}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroShowcase />
        </section>

        <div className="band">
          <ProductGallery />
        </div>

        <WorkflowShowcases />

        <section className="section-shell wrap reveal" id="what-is-paenia" aria-labelledby="what-title">
          <div className="what-minimal">
            <figure className="what-minimal__figure">
              <Image
                src="/images/paenia/screenshot-palette.png"
                alt="Paenia palette editing with live IDE preview"
                width={2926}
                height={2100}
                loading="lazy"
                sizes="(max-width: 1024px) 92vw, 45vw"
              />
            </figure>
            <div className="what-minimal__text">
              <h2 id="what-title">What is Paenia?</h2>
              <p className="what-minimal__p">
                A native macOS app for theme colors in Cursor, VS Code, Antigravity, Trae, and other VS
                Code-family editors. You work in a visual UI; Paenia writes validated patches to each
                editor&apos;s <code>settings.json</code>, with presets, live preview, backups, and restore
                when you need to undo.
              </p>
              <p className="what-minimal__p what-minimal__p--sub">
                It maps to the same keys you would edit by hand — <code>workbench.colorCustomizations</code>{" "}
                and <code>editor.tokenColorCustomizations</code> — without leaving the comfort of a
                structured editor.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell wrap reveal" id="features" aria-labelledby="feat-title">
          <div className="section-heading">
            <h2 id="feat-title">Built for precise theme work</h2>
            <p>
              Visual editing on top of real VS Code-compatible keys — approachable without hiding the system
              underneath.
            </p>
          </div>
          <div className="feature-list">
            {features.map((feature, index) => (
              <article key={feature.title} className="feature-item">
                <span className="num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell wrap reveal" id="safety" aria-labelledby="safety-title">
          <div className="section-heading">
            <h2 id="safety-title">Safe apply by design</h2>
            <p>
              Your <code>settings.json</code> files stay yours. Paenia confirms targets, snapshots, patches in
              place, and shows a clear result.
            </p>
          </div>
          <ul className="safety-pillars">
            {safetyPillars.map((pillar) => (
              <li key={pillar.title}>
                <span className="safety-pillars__title">{pillar.title}</span>
                <span className="safety-pillars__hint">{pillar.hint}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section-shell wrap reveal" id="editors" aria-labelledby="ed-title">
          <div className="section-heading">
            <h2 id="ed-title">For Cursor, VS Code, and AI editors</h2>
            <p>
              Works with editors that read a VS Code-style User <code>settings.json</code> and support
              workbench color customizations.
            </p>
          </div>
          <ul className="editor-cloud" aria-label="Supported editors">
            {supportedEditors.map((name) => (
              <li key={name}>
                <span className="editor-cloud__name">{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section-shell wrap reveal" id="faq" aria-labelledby="faq-title">
          <div className="section-heading">
            <h2 id="faq-title">FAQ</h2>
            <p>Short answers for people and search engines.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

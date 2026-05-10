import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ProductGallery } from "@/components/ProductGallery";
import { SectionShell } from "@/components/SectionShell";
import { WorkflowShowcases } from "@/components/WorkflowShowcases";
import { faqs, features, proofPoints, safetyItems, supportedEditors } from "@/lib/product";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <h1>Design your editor color system.</h1>
            <p>
              Paenia is a native macOS app for shaping Cursor, VS Code, Antigravity, Trae and other
              VS Code-family themes with live preview, presets, and safe apply.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/download">
                Download for macOS
              </Link>
              <a className="button secondary" href="#story">
                Explore features
              </a>
            </div>
            <div className="proof-grid">
              {proofPoints.map((point) => (
                <div key={point.title} className="proof-card">
                  <strong>{point.title}</strong>
                  <span>{point.body}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroShowcase />
        </section>

        <ProductGallery />

        <WorkflowShowcases />

        <SectionShell
          id="ai-search"
          title="What is Paenia?"
          intro="Paenia is a native macOS app for editing theme colors in Cursor, VS Code, Antigravity, Trae, and other VS Code-family editors."
        >
          <div className="answer-block">
            <p>
              Paenia writes safe color customizations to each editor&apos;s <code>settings.json</code>,
              supports presets and live preview, and creates backups before applying changes. It is
              designed for people who want precise editor color control without manually editing{" "}
              <code>workbench.colorCustomizations</code> and{" "}
              <code>editor.tokenColorCustomizations</code>.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          id="features"
          title="Built for precise theme work"
          intro="Paenia combines visual preset editing with real VS Code-compatible theme keys, so the interface stays approachable without hiding the system underneath."
        >
          <div className="card-grid">
            {features.map((feature) => (
              <article key={feature.title} className="info-card">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="safety"
          title="Safe apply by design"
          intro="Paenia treats editor settings as user-owned files. The apply flow confirms targets, snapshots settings, patches carefully, and reports the result."
        >
          <ul className="safety-list">
            {safetyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell
          id="editors"
          title="For Cursor, VS Code, and AI editors"
          intro="Paenia targets editors that use VS Code-compatible User/settings.json files and support workbench color customizations."
        >
          <div className="editor-grid">
            {supportedEditors.map((editor) => (
              <span key={editor}>{editor}</span>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="faq" title="FAQ" intro="Short answers for people and search engines.">
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} open={faq.question === "What is Paenia?"}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionShell>
      </main>
      <Footer />
    </>
  );
}

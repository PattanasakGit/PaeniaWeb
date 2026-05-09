import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function SectionShell({ id, title, intro, children }: SectionShellProps) {
  return (
    <section id={id} className="section-shell">
      <div className="section-heading">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

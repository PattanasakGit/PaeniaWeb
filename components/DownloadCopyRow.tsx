"use client";

import { useCallback, useState } from "react";

type DownloadCopyRowProps = {
  label: string;
  command: string;
};

export function DownloadCopyRow({ label, command }: DownloadCopyRowProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [command]);

  return (
    <div className="download-page-minimal__row">
      <p className="download-page-minimal__label">{label}</p>
      <pre className="download-page-minimal__cmd">
        <code>{command}</code>
      </pre>
      <button type="button" className="download-page-minimal__btn" onClick={onCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

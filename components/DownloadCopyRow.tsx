"use client";

import { useCallback, useState } from "react";

type DownloadCopyRowProps = {
  label: string;
  command: string;
  variant?: "install" | "uninstall";
};

export function DownloadCopyRow({ label, command, variant = "install" }: DownloadCopyRowProps) {
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
    <div className={`download-luxe__row download-luxe__row--${variant}`}>
      <div className="download-luxe__row-top">
        <span className="download-luxe__row-label">{label}</span>
        <button type="button" className="download-luxe__copy" onClick={onCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="download-luxe__snippet">
        <code>{command}</code>
      </pre>
    </div>
  );
}

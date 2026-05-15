"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export function CopyButton({ text }: { text: string }) {
  const { user, openAuthModal } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (!user) {
      openAuthModal("login");
      return;
    }
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="copy-mini" onClick={handleClick}>
      {copied ? "Copied!" : "Copy prompt"}
    </button>
  );
}

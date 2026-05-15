"use client";
import { useAuth } from "@/lib/auth-context";
import { Prompt } from "@/types";
import { Sparkles } from "lucide-react";

export function TailorButton({ prompt }: { prompt: Prompt }) {
  const { openRefineModal, user, openAuthModal } = useAuth();

  const handleClick = () => {
    if (!user) {
      openAuthModal("login");
      return;
    }
    openRefineModal(prompt);
  };

  return (
    <button 
      onClick={handleClick}
      className="tailor-btn"
      title="Tailor this prompt with AI"
    >
      <span>Tailor Prompt</span>
    </button>
  );
}

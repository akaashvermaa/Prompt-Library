"use client";
import { useAuth } from "@/lib/auth-context";
import { useLikes } from "@/lib/use-likes";

export function LikeButton({ promptId }: { promptId: string }) {
  const { user, openAuthModal } = useAuth();
  const { likedIds, toggle } = useLikes();
  const liked = likedIds.has(promptId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { openAuthModal("login"); return; }
    await toggle(promptId);
  };

  return (
    <button
      className={`like-btn${liked ? " liked" : ""}`}
      onClick={handleClick}
      aria-label={liked ? "Remove from saved" : "Save prompt"}
      title={liked ? "Remove from saved" : "Save prompt"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useLikes() {
  const { user } = useAuth();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setLikedIds(new Set()); return; }
    setLoading(true);
    supabase
      .from("user_likes")
      .select("prompt_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setLikedIds(new Set(data.map((r: any) => r.prompt_id)));
        setLoading(false);
      });
  }, [user]);

  const toggle = useCallback(async (promptId: string) => {
    if (!user) return false;
    const isLiked = likedIds.has(promptId);
    // Optimistic update
    setLikedIds(prev => {
      const next = new Set(prev);
      isLiked ? next.delete(promptId) : next.add(promptId);
      return next;
    });
    if (isLiked) {
      await supabase.from("user_likes").delete().eq("user_id", user.id).eq("prompt_id", promptId);
    } else {
      await supabase.from("user_likes").insert({ user_id: user.id, prompt_id: promptId });
    }
    return !isLiked;
  }, [user, likedIds]);

  return { likedIds, toggle, loading };
}

"use client";
import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; el.classList.add("visible"); };
    const onLeave = () => el.classList.remove("visible");

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    const targets = document.querySelectorAll("a, button, .pcard, .cat, .chip, .bcard");
    const big = () => el.classList.add("big");
    const small = () => el.classList.remove("big");
    targets.forEach(t => { t.addEventListener("mouseenter", big); t.addEventListener("mouseleave", small); });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor" />;
}

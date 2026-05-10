"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark"><span>P</span></span>
          <span className="logo-text">Prompt<em>Vault</em></span>
        </Link>
        <div className="nav-links">
          <Link href="/browse">Browse</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#featured">Featured</Link>
          <Link href="#">Submit</Link>
          <Link href="#">About</Link>
        </div>
        <div className="nav-cta">
          <span className="pill">
            <span className="dot" />
            242 prompts indexed
          </span>
        </div>
      </div>
    </nav>
  );
}

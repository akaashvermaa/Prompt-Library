"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [submissionsCount, setSubmissionsCount] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    fetchSubmissionsCount();
  }, []);

  const fetchSubmissionsCount = async () => {
    try {
      // Use fetch API to get submissions count
      const response = await fetch('/api/submit', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSubmissionsCount(data.length);
    } catch (error) {
      console.error('Error fetching submissions count:', error);
    }
  };

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
          <Link href="/submit">Submit</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="nav-cta">
          <span className="pill">
            <span className="dot" />
            96 prompts indexed
          </span>
          {submissionsCount > 0 && (
            <span className="pill" style={{ background: 'rgba(244, 167, 56, 0.15)', borderColor: 'var(--amber)', color: 'var(--amber)' }}>
              {submissionsCount} submission{submissionsCount > 1 ? 's' : ''} pending
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

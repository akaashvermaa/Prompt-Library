"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, openAuthModal } = useAuth();

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
          <Link href="/liked">Saved</Link>
          <Link href="/submit">Submit</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="nav-cta">
          <span className="pill">
            <span className="dot" />
            Library Live
          </span>
          {user ? (
            <div className="nav-user">
              <span className="nav-user-email">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>
              <button className="nav-signout" onClick={signOut}>Sign out</button>
            </div>
          ) : (
            <button className="nav-login-btn" onClick={() => openAuthModal("login")}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

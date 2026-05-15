"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, openAuthModal } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(authModalMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sync mode when the modal is opened with a specific mode
  useEffect(() => {
    if (authModalOpen) setMode(authModalMode);
  }, [authModalOpen, authModalMode]);

  if (!authModalOpen) return null;

  const reset = () => { setError(""); setSuccess(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    reset();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) setError(error.message);
      else setSuccess("Account created! Check your email to confirm.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  const switchMode = (m: "login" | "signup") => {
    setMode(m);
    reset();
  };

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && closeAuthModal()}>
      <div className="auth-modal">
        {/* Close */}
        <button className="auth-close" onClick={closeAuthModal} aria-label="Close">&#x2715;</button>

        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-mark"><span>P</span></span>
            <span className="logo-text">Prompt<em>Vault</em></span>
          </div>
          <h2 className="auth-title">
            {mode === "login" ? (
              <><span>Welcome</span> <span className="it">back.</span></>
            ) : (
              <><span>Join the</span> <span className="it">library.</span></>
            )}
          </h2>
          <p className="auth-sub">
            {mode === "login"
              ? "Sign in to copy prompts and access the full collection."
              : "Free forever. Copy, save, and explore 400+ curated prompts."}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`auth-tab${mode === "login" ? " active" : ""}`} onClick={() => switchMode("login")}>Sign In</button>
          <button className={`auth-tab${mode === "signup" ? " active" : ""}`} onClick={() => switchMode("signup")}>Create Account</button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={mode === "signup" ? 8 : 1}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>


        <p className="auth-footer">
          {mode === "login" ? (
            <>No account? <button onClick={() => switchMode("signup")}>Create one free</button></>
          ) : (
            <>Already a member? <button onClick={() => switchMode("login")}>Sign in</button></>
          )}
        </p>
      </div>
    </div>
  );
}

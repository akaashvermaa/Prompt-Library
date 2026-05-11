"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple authentication - in production, use proper authentication
    if (email === "admin123@gmail.com" && password === "admin1999") {
      // Store authentication state in sessionStorage
      sessionStorage.setItem("isAdminAuthenticated", "true");
      sessionStorage.setItem("adminEmail", email);

      // Redirect to admin panel
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="page-pt" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Admin Access</div>
              <h2>Enter <span className="it">credentials</span></h2>
            </div>
            <p className="lede">Authorized personnel only</p>
          </div>

          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  padding: '16px 24px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  background: 'rgba(212, 108, 108, 0.1)',
                  border: '1px solid #d46c6c',
                  color: '#d46c6c',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      color: 'var(--text)',
                      fontFamily: 'inherit'
                    }}
                    placeholder="admin123@gmail.com"
                  />
                </div>

                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      color: 'var(--text)',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '16px 32px',
                    background: 'var(--amber)',
                    color: 'var(--amber-ink)',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
                </button>
              </div>
            </form>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <Link href="/browse" style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontSize: '14px'
              }}>
                ← Back to Browse
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
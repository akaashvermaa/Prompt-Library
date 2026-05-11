"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  platforms: string[];
  tags: string[];
  imagePlatforms?: string[];
  submittedAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [action, setAction] = useState<"approve" | "reject">("approve");

  useEffect(() => {
    const checkAuth = async () => {
      // Check authentication on client side
      const authenticated = sessionStorage.getItem("isAdminAuthenticated");
      if (authenticated !== "true") {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
        fetchSubmissions();
      }
    };
    checkAuth();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submit');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    sessionStorage.removeItem("adminEmail");
    router.push("/browse");
  };

  const handleAction = async (id: string, actionType: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: actionType }),
      });

      if (response.ok) {
        // Remove the submission from the list
        setSubmissions(prev => prev.filter(s => s.id !== id));
        setSelectedSubmission(null);
      } else {
        const error = await response.json();
        alert(`Failed to ${actionType} submission: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error ${actionType}ing submission:`, error);
      alert(`Failed to ${actionType} submission`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="page-pt">
        <section>
          <div className="wrap">
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'monospace', color: 'var(--muted)' }}>Loading submissions...</div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-pt">
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div>
                <div className="eyebrow">Admin Panel</div>
                <h2>Review <span className="it">submissions</span></h2>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
                  Welcome, {sessionStorage.getItem('adminEmail') || 'Admin'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  borderRadius: '999px',
                  fontSize: '14px',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--muted)';
                  e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                Logout
              </button>
            </div>
            <p className="lede">Review and approve or reject user-submitted prompts</p>
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
              {/* Submissions List */}
              <div>
                <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>
                  Pending Submissions ({submissions.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {submissions.length === 0 ? (
                    <div style={{
                      padding: '40px',
                      textAlign: 'center',
                      color: 'var(--muted)',
                      background: 'var(--surface)',
                      borderRadius: '8px'
                    }}>
                      No submissions to review
                    </div>
                  ) : (
                    submissions.map(submission => (
                      <div
                        key={submission.id}
                        onClick={() => setSelectedSubmission(submission)}
                        style={{
                          padding: '20px',
                          background: selectedSubmission?.id === submission.id ? 'var(--bg-2)' : 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ marginBottom: '8px' }}>{submission.title}</h4>
                            <p style={{
                              fontSize: '14px',
                              color: 'var(--muted)',
                              marginBottom: '8px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {submission.description}
                            </p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{
                                padding: '4px 8px',
                                background: 'var(--line-2)',
                                borderRadius: '4px',
                                fontSize: '12px',
                                color: 'var(--muted)'
                              }}>
                                {submission.category}
                              </span>
                              {submission.platforms.map(p => (
                                <span key={p} style={{
                                  padding: '4px 8px',
                                  background: 'var(--line-2)',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  color: 'var(--muted)'
                                }}>
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: 'var(--muted-2)',
                            marginLeft: '16px'
                          }}>
                            {formatDate(submission.submittedAt)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Submission Details */}
              <div>
                {selectedSubmission ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '24px' }}>{selectedSubmission.title}</h3>
                      <span style={{
                        padding: '8px 16px',
                        background: 'var(--line-2)',
                        borderRadius: '999px',
                        fontSize: '14px',
                        color: 'var(--muted)'
                      }}>
                        {selectedSubmission.category}
                      </span>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Description</h4>
                      <p style={{ color: 'var(--text)', lineHeight: '1.5' }}>
                        {selectedSubmission.description}
                      </p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Compatible Models</h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {selectedSubmission.platforms.map(p => (
                          <span key={p} style={{
                            padding: '8px 16px',
                            background: 'var(--line-2)',
                            borderRadius: '999px',
                            fontSize: '14px',
                            color: 'var(--text)'
                          }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedSubmission.tags.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Tags</h4>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {selectedSubmission.tags.map(tag => (
                            <span key={tag} style={{
                              padding: '4px 12px',
                              background: 'var(--line-2)',
                              borderRadius: '999px',
                              fontSize: '12px',
                              color: 'var(--muted)'
                            }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ marginBottom: '32px' }}>
                      <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Prompt</h4>
                      <div style={{
                        padding: '20px',
                        background: 'var(--bg-2)',
                        border: '1px solid var(--line)',
                        borderRadius: '8px',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'var(--text)',
                        overflow: 'auto',
                        maxHeight: '300px'
                      }}>
                        {selectedSubmission.prompt}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => handleAction(selectedSubmission.id, "approve")}
                        style={{
                          padding: '12px 24px',
                          background: 'var(--amber)',
                          color: 'var(--amber-ink)',
                          border: 'none',
                          borderRadius: '999px',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        Approve & Add to Library
                      </button>
                      <button
                        onClick={() => handleAction(selectedSubmission.id, "reject")}
                        style={{
                          padding: '12px 24px',
                          background: 'transparent',
                          color: 'var(--text)',
                          border: '1px solid var(--line)',
                          borderRadius: '999px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--muted)';
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--line)';
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        Reject
                      </button>
                    </div>

                    <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--muted-2)' }}>
                      Submitted on {formatDate(selectedSubmission.submittedAt)}
                    </div>
                  </>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '80px 40px',
                    color: 'var(--muted)',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px'
                  }}>
                    <p>Select a submission to review</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <Link href="/browse" style={{
              color: 'var(--text)',
              textDecoration: 'none',
              padding: '12px 24px',
              background: 'var(--line-2)',
              borderRadius: '999px',
              display: 'inline-block',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--muted-2)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--line-2)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            >
              ← Back to Browse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
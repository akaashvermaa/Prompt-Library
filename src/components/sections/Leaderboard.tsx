"use client";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/prompts";
import { Trophy, Star } from "lucide-react";

export function Leaderboard() {
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(data => {
      setContributors(data.slice(0, 5));
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading-text">Loading top contributors...</div>;
  if (contributors.length === 0) return null;

  return (
    <div className="leaderboard-card" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Trophy size={24} style={{ color: 'var(--amber)' }} />
        <h3 style={{ fontSize: '20px', fontFamily: '"Instrument Serif", serif' }}>Hall of <span className="it">Contributors</span></h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {contributors.map((c, i) => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-2)', borderRadius: '12px', border: '1px solid var(--line-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i === 0 ? 'var(--amber)' : 'var(--line)', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 600, color: i === 0 ? 'var(--amber-ink)' : 'var(--muted)' }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px', display: 'flex', gap: '8px' }}>
                  <span>{c.count} contributions</span>
                  {c.quality > 0 && <span style={{ color: 'var(--amber)', display: 'flex', alignItems: 'center', gap: '2px' }}><Star size={10} fill="currentColor" /> {c.quality} featured</span>}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {c.github && (
                <a href={c.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-2)' }} className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>
              )}
              {c.linkedin && (
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted-2)' }} className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

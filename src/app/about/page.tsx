"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [submissionsCount, setSubmissionsCount] = useState(0);

  useEffect(() => {
    fetch('/api/submit')
      .then(res => res.json())
      .then(data => setSubmissionsCount(data.length))
      .catch(() => {});
  }, []);

  return (
    <div className="page-pt">
      {/* Hero */}
      <section className="hero" style={{ padding: '40px 0 60px' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">A humble mission</div>
              <h1>
                Built for <span className="it">humans</span>,<br />
                powered by community.
              </h1>
            </div>
            <p className="lede">
              PromptVault isn't just a library. It's a humble attempt to make the future of AI accessible, one shared prompt at a time.
            </p>
          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="feat-grid">
            <div className="pcard large">
              <div className="top">
                <span className="num">01 / PHILOSOPHY</span>
              </div>
              <h3 className="serif">The belief in <span className="it">helping.</span></h3>
              <p style={{ fontSize: '16px', color: 'var(--text)', opacity: 0.9 }}>
                We started PromptVault with a simple realization: the gap between "AI is cool" and "AI is useful" is usually just a few well-chosen words. 
              </p>
              <p>
                There is a unique joy in seeing someone finally get the result they were looking for. We believe that by sharing our best prompt architectures, we aren't just giving away code—we're helping people save time, reduce stress, and focus on what they actually love doing.
              </p>
            </div>

            <div className="pcard tall">
              <div className="top">
                <span className="num">02 / CORE</span>
              </div>
              <h3 className="serif">Always <span className="it">open.</span></h3>
              <p>
                Knowledge shouldn't be gated behind complex paywalls or confusing interfaces. 
              </p>
              <p>
                PromptVault is designed to be a friction-less experience. Whether you are an expert engineer or someone opening ChatGPT for the first time, you are welcome here. We are here to help you get the most out of these machines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '40px' }}>
             <div>
               <div className="eyebrow">Growing together</div>
               <h2>A small project with <span className="it">big</span> heart.</h2>
             </div>
          </div>

          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div className="pcard" style={{ padding: '32px' }}>
              <div className="serif" style={{ fontSize: '48px', color: 'var(--amber)' }}>100+</div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>CURATED PROMPTS</div>
            </div>
            <div className="pcard" style={{ padding: '32px' }}>
              <div className="serif" style={{ fontSize: '48px', color: 'var(--amber)' }}>{submissionsCount}</div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>COMMUNITY SUBMISSIONS</div>
            </div>
            <div className="pcard" style={{ padding: '32px' }}>
              <div className="serif" style={{ fontSize: '48px', color: 'var(--amber)' }}>Open</div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>ACCESS FOR ALL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Helping Section */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>How we help</div>
            <h2 className="serif" style={{ fontSize: '42px', marginBottom: '24px' }}>Every click is a <span className="it">shared success.</span></h2>
            <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '40px' }}>
              Our mission is to take the guesswork out of prompting. We test every submission, refine the variables, and package them so they work for you instantly. If we can save you even five minutes today, our job is done.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link href="/browse" className="btn-prim">Browse the Library</Link>
              <Link href="/submit" className="btn-sec">Contribute a Prompt</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
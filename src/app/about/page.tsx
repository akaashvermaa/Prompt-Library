"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  const [submissionsCount, setSubmissionsCount] = useState(0);

  useEffect(() => {
    fetchSubmissionsCount();
  }, []);

  const fetchSubmissionsCount = async () => {
    try {
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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-meta">
            <span>About</span>

            <span>Learn more about PromptVault</span>
          </div>
          <h1>
            Your community-driven<br />
            <span className="it">prompt</span> library
          </h1>
          <div className="hero-row">
            <div>
              <p className="hero-sub">
                PromptVault is the <strong>curated repository</strong> of AI prompts, built and maintained by the community. Save time and unlock the true potential of your favorite AI models.
              </p>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="n">100+</div>
                <div className="l">PROMPTS</div>
              </div>
              <div className="stat">
                <div className="n">{submissionsCount}</div>
                <div className="l">PENDING</div>
              </div>
              <div className="stat">
                <div className="n">50+</div>
                <div className="l">CONTRIBUTORS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="strip">
        <div className="strip-track">
          <div className="strip-item">
            <span>Think bigger</span>
            <span className="star"></span>
            <span className="it">Build faster</span>
          </div>
          <div className="strip-item">
            <span>Precision prompts</span>
            <span className="star"></span>
            <span className="it">Perfect outputs</span>
          </div>
          <div className="strip-item">
            <span>Unlock AI</span>
            <span className="star"></span>
            <span className="it">Without limits</span>
          </div>
          <div className="strip-item">
            <span>Think bigger</span>
            <span className="star"></span>
            <span className="it">Build faster</span>
          </div>
          <div className="strip-item">
            <span>Precision prompts</span>
            <span className="star"></span>
            <span className="it">Perfect outputs</span>
          </div>
          <div className="strip-item">
            <span>Unlock AI</span>
            <span className="star"></span>
            <span className="it">Without limits</span>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Our mission</div>
              <h2>
                Building the world's<br />
                <span className="it">best prompt</span> library
              </h2>
            </div>
            <p className="lede">
              We're creating a living library of prompts that evolve with the AI landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="hero-card">
              <div className="card-head">
                <span>Why we built this</span>
              </div>
              <p>
                PromptVault was created to solve a simple problem: everyone needs good prompts, but finding them is hard. We believe great AI tools deserve equally great prompts.
              </p>
            </div>

            <div className="hero-card">
              <div className="card-head">
                <span>What makes us different</span>
                <div className="live">
                  <span className="ping"></span>
                  <span>Live</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <span>+</span>
                  <span style={{ lineHeight: '1.6' }}>Community-curated content</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <span>+</span>
                  <span style={{ lineHeight: '1.6' }}>One-click copy functionality</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <span>+</span>
                  <span style={{ lineHeight: '1.6' }}>Platform-specific optimization</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span>+</span>
                  <span style={{ lineHeight: '1.6' }}>Zero friction experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="cats-section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Platform features</div>
              <h2>
                Everything you need<br />
                <span className="it">to master</span> AI
              </h2>
            </div>
            <p className="lede">
                Built with prompt engineers and power users in mind.
            </p>
          </div>

          <div className="cats">
            <Link href="/browse" className="cat">
              <div className="idx">01</div>
              <div className="name">
                <span className="it">Browse</span>
              </div>
              <div className="count">100+ prompts</div>
              
            </Link>

            <Link href="/browse" className="cat">
              <div className="idx">02</div>
              <div className="name">
                <span className="it">Categories</span>
              </div>
              <div className="count">10+ types</div>
              
            </Link>

            <Link href="#" className="cat">
              <div className="idx">03</div>
              <div className="name">
                <span className="it">Search</span>
              </div>
              <div className="count">Smart find</div>
              
            </Link>

            <Link href="#" className="cat">
              <div className="idx">04</div>
              <div className="name">
                <span className="it">Save</span>
              </div>
              <div className="count">Quick access</div>
              
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="wrap">
          <h2>
            Ready to level up<br />
            your AI <span className="it">workflow</span>?
          </h2>
          <p className="sub">
            Join thousands of professionals who are using PromptVault to supercharge their AI interactions.
          </p>
          <div className="actions">
            <Link href="/browse" className="btn-prim">
              Browse prompts
              
            </Link>
            <Link href="/submit" className="btn-sec">Submit your prompt</Link>
          </div>
        </div>
      </section>

          </div>
  );
}
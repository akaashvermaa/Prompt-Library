"use client";
import { useState } from "react";
import Link from "next/link";
import { Leaderboard } from "@/components/sections/Leaderboard";

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
  authorName?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

const CATEGORIES = ["study-learn", "write-create", "code-dev", "teaching", "business-marketing", "review-test", "testing", "career-brand", "image"];
const PLATFORMS = ["claude", "chatgpt", "gemini", "grok", "any"];
const IMAGE_PLATFORMS = ["midjourney", "dalle3", "imagen4", "stablediffusion"];

const CATEGORY_LABELS: Record<string, string> = {
  "study-learn": "Academic Study",
  "write-create": "Creative Writing",
  "code-dev": "Software Engineering",
  teaching: "Educational Teaching",
  "business-marketing": "Strategic Marketing",
  "review-test": "Critical Review",
  testing: "Quality Assurance",
  "career-brand": "Professional Growth",
  image: "Visual Generation"
};

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prompt: "",
    category: "study-learn",
    platforms: ["any"] as string[],
    tags: "",
    imagePlatforms: [] as string[],
    authorName: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handlePlatformToggle = (platform: string) => {
    if (platform === "any") {
      setFormData(prev => ({ ...prev, platforms: ["any"] }));
    } else {
      setFormData(prev => {
        const updatedPlatforms = prev.platforms.filter(p => p !== "any");
        const finalPlatforms = updatedPlatforms.includes(platform)
          ? updatedPlatforms.filter(p => p !== platform)
          : [...updatedPlatforms, platform];
        return { ...prev, platforms: finalPlatforms };
      });
    }
  };

  const handleImagePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      imagePlatforms: prev.imagePlatforms.includes(platform)
        ? prev.imagePlatforms.filter(p => p !== platform)
        : [...prev.imagePlatforms, platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.prompt.trim()) {
      setSubmitMessage({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }
    setIsSubmitting(true);
    const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const newSubmission: Submission = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      prompt: formData.prompt.trim(),
      category: formData.category,
      platforms: formData.platforms,
      tags: tagsArray,
      imagePlatforms: formData.imagePlatforms.length > 0 ? formData.imagePlatforms : undefined,
      submittedAt: new Date().toISOString(),
      authorName: formData.authorName.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      linkedinUrl: formData.linkedinUrl.trim() || undefined,
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubmission),
      });
      if (response.ok) {
        setSubmitMessage({ type: 'success', message: 'Prompt submitted successfully! Admin will review it.' });
        setFormData({
          title: "", description: "", prompt: "", category: "study-learn",
          platforms: ["any"], tags: "", imagePlatforms: [],
          authorName: "", githubUrl: "", linkedinUrl: ""
        });
      } else {
        const error = await response.json();
        setSubmitMessage({ type: 'error', message: error.message || 'Failed to submit prompt' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', message: 'Failed to submit prompt. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-pt page-fade">
      <section>
        <div className="wrap">
          <div className="sec-head" style={{ display: 'block', marginBottom: '64px' }}>
            <div className="eyebrow">Submit & Contribute</div>
            <h2 style={{ marginBottom: '24px' }}>Build the <span className="it">archive.</span></h2>
            <p className="lede" style={{ maxWidth: '600px' }}>
              Your submissions help grow the most curated library of dense prompts. 
              Top contributors are recognized in our global Hall of Contributors.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '80px', alignItems: 'start' }}>
            <div className="submit-form-container">
              {submitMessage && (
                <div style={{
                  padding: '16px 24px', borderRadius: '12px', marginBottom: '40px',
                  background: submitMessage.type === 'success' ? 'rgba(118, 184, 156, 0.1)' : 'rgba(212, 108, 108, 0.1)',
                  border: `1px solid ${submitMessage.type === 'success' ? '#76b89c' : '#d46c6c'}`,
                  color: submitMessage.type === 'success' ? '#76b89c' : '#d46c6c',
                  fontSize: '14px'
                }}>
                  {submitMessage.message}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Section 1: Contributor Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>01. Contributor Information</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="refine-label">Display Name <span style={{ opacity: 0.5, textTransform: 'none', marginLeft: '4px' }}>(Optional)</span></label>
                      <input
                        type="text"
                        className="refine-textarea"
                        style={{ minHeight: 'auto', width: '100%', padding: '14px' }}
                        value={formData.authorName}
                        onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="refine-label">GitHub URL <span style={{ opacity: 0.5, textTransform: 'none', marginLeft: '4px' }}>(Optional)</span></label>
                      <input
                        type="url"
                        className="refine-textarea"
                        style={{ minHeight: 'auto', width: '100%', padding: '14px' }}
                        value={formData.githubUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="refine-label">LinkedIn URL <span style={{ opacity: 0.5, textTransform: 'none', marginLeft: '4px' }}>(Optional)</span></label>
                    <input
                      type="url"
                      className="refine-textarea"
                      style={{ minHeight: 'auto', width: '100%', padding: '14px' }}
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      placeholder="https://linkedin.com/in/..."
                    />
                    <p style={{ fontSize: '11px', color: 'var(--amber)', marginTop: '8px', opacity: 0.8 }}>
                      Provide these and we'll give you a shoutout on the website if your prompt is featured!
                    </p>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--line)', opacity: 0.5 }} />

                {/* Section 2: Prompt Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>02. Prompt Details</div>
                  
                  <div className="form-group">
                    <label className="refine-label">Prompt Title *</label>
                    <input
                      type="text" required
                      className="refine-textarea" style={{ minHeight: 'auto', width: '100%', padding: '14px' }}
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., The Study System Builder"
                    />
                  </div>

                  <div className="form-group">
                    <label className="refine-label">Short Description *</label>
                    <textarea
                      required className="refine-textarea" style={{ minHeight: '100px', width: '100%' }}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Briefly describe what this prompt does and its purpose"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="form-group">
                      <label className="refine-label">Category *</label>
                      <select
                        required className="refine-textarea" style={{ minHeight: 'auto', padding: '14px', width: '100%' }}
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="refine-label">Compatible Models *</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {PLATFORMS.map(platform => (
                          <button
                            key={platform} type="button"
                            onClick={() => handlePlatformToggle(platform)}
                            className={`ftab ${formData.platforms.includes(platform) ? 'active' : ''}`}
                            style={{ padding: '6px 12px', fontSize: '11px', minHeight: 'auto' }}
                          >
                            {platform === 'any' ? 'Any' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="refine-label">Full Prompt Architecture *</label>
                    <textarea
                      required className="refine-textarea" style={{ minHeight: '300px', width: '100%', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px' }}
                      value={formData.prompt}
                      onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                      placeholder="Paste your complete prompt here..."
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={isSubmitting}
                  className="refine-primary-btn" style={{ margin: 0, padding: '20px', borderRadius: '12px' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Architecture for Review'}
                </button>
              </form>
            </div>

            <aside style={{ position: 'sticky', top: '120px' }}>
              <Leaderboard />
              
              <div style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', marginTop: '32px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--amber)' }}>Contributor Guidelines</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
                  <p>• High-density architectures only.</p>
                  <p>• Ensure all variables are clearly marked.</p>
                  <p>• Provide a clear description of the persona and task.</p>
                  <p>• Links will be verified before listing on the Hall of Contributors.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
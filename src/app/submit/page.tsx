"use client";
import { useState } from "react";
import Link from "next/link";

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

const CATEGORIES = ["study-learn", "write-create", "code-dev", "teaching", "business-marketing", "review-test", "testing", "career-brand", "image"];
const PLATFORMS = ["claude", "chatgpt", "gemini", "grok", "any"];
const IMAGE_PLATFORMS = ["midjourney", "dalle3", "imagen4", "stablediffusion"];

const CATEGORY_LABELS: Record<string, string> = {
  "study-learn": "Study & Learn",
  "write-create": "Write & Create",
  "code-dev": "Code & Dev",
  teaching: "Teaching",
  "business-marketing": "Business & Marketing",
  "review-test": "Review & Test",
  testing: "QA",
  "career-brand": "Career & Brand",
  image: "Image"
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
      });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handlePlatformToggle = (platform: string) => {
    if (platform === "any") {
      setFormData(prev => ({
        ...prev,
        platforms: ["any"]
      }));
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

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];

    const newSubmission: Submission = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      prompt: formData.prompt.trim(),
      category: formData.category,
      platforms: formData.platforms,
      tags: tagsArray,
      imagePlatforms: formData.imagePlatforms.length > 0 ? formData.imagePlatforms : undefined,
      submittedAt: new Date().toISOString()
    };

    try {
      // Save to submissions.json
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubmission),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', message: 'Prompt submitted successfully! Admin will review it.' });
        setFormData({
          title: "",
          description: "",
          prompt: "",
          category: "study-learn",
          platforms: ["any"],
          tags: "",
          imagePlatforms: [],
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
    <div className="page-pt">
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="eyebrow">Submit a Prompt</div>
              <h2>Share your <span className="it">favorite</span> prompt</h2>
            </div>
            <p className="lede">Your submission will be reviewed by admin before being added to the library.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {submitMessage && (
              <div style={{
                padding: '16px 24px',
                borderRadius: '8px',
                marginBottom: '24px',
                background: submitMessage.type === 'success'
                  ? 'rgba(118, 184, 156, 0.1)'
                  : 'rgba(212, 108, 108, 0.1)',
                border: `1px solid ${submitMessage.type === 'success' ? '#76b89c' : '#d46c6c'}`,
                color: submitMessage.type === 'success' ? '#76b89c' : '#d46c6c'
              }}>
                {submitMessage.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '32px' }}>
                {/* Title */}
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Prompt Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                    placeholder="e.g., The Study System Builder"
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    placeholder="Briefly describe what this prompt does and its purpose"
                  />
                </div>

                {/* Category */}
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                    display: 'block'
                  }}>
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
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
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                    ))}
                  </select>
                </div>

                {/* Platforms */}
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                    display: 'block'
                  }}>
                    Compatible Models *
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {PLATFORMS.map(platform => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => handlePlatformToggle(platform)}
                        style={{
                          padding: '8px 16px',
                          border: `1px solid ${formData.platforms.includes(platform) ? 'var(--amber)' : 'var(--line)'}`,
                          borderRadius: '999px',
                          fontSize: '14px',
                          background: formData.platforms.includes(platform)
                            ? 'var(--amber)'
                            : 'var(--surface)',
                          color: formData.platforms.includes(platform)
                            ? 'var(--amber-ink)'
                            : 'var(--muted)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {platform === 'any' ? 'Any Model' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Platforms (conditionally shown) */}
                {formData.category === 'image' && (
                  <div>
                    <label style={{
                      fontSize: '14px',
                      color: 'var(--muted)',
                      marginBottom: '12px',
                      display: 'block'
                    }}>
                      Image Generation Platforms
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {IMAGE_PLATFORMS.map(platform => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => handleImagePlatformToggle(platform)}
                          style={{
                            padding: '8px 16px',
                            border: `1px solid ${formData.imagePlatforms.includes(platform) ? 'var(--amber)' : 'var(--line)'}`,
                            borderRadius: '999px',
                            fontSize: '14px',
                            background: formData.imagePlatforms.includes(platform)
                              ? 'var(--amber)'
                              : 'var(--surface)',
                            color: formData.imagePlatforms.includes(platform)
                              ? 'var(--amber-ink)'
                              : 'var(--muted)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
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
                    placeholder="e.g., planning, productivity, organization"
                  />
                </div>

                {/* Prompt */}
                <div>
                  <label style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Prompt Text *
                  </label>
                  <textarea
                    required
                    value={formData.prompt}
                    onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                    rows={10}
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: 'var(--text)',
                      fontFamily: '"JetBrains Mono", monospace',
                      resize: 'vertical',
                      lineHeight: '1.6'
                    }}
                    placeholder="Paste your complete prompt here..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '16px 32px',
                      background: 'var(--amber)',
                      color: 'var(--amber-ink)',
                      border: 'none',
                      borderRadius: '999px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.2s',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Prompt for Review'}
                  </button>
                </div>
              </div>
            </form>

            <div style={{ marginTop: '40px', textAlign: 'center', color: 'var(--muted)' }}>
              <p>Your submission will be reviewed by admin before being added to the public library.</p>
              <p style={{ marginTop: '8px' }}>
                <Link href="/browse" style={{ color: 'var(--amber)', textDecoration: 'none' }}>
                  ← Back to Browse
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
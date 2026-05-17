import React, { useState, useEffect, useMemo } from 'react';
import { roles } from '../data/topicsData';
import { interviewCategories } from '../data/interviewStore';
import { personalInfo, projects, homeFeatures } from '../data/profileData';
import '../styles/Home.css';
import JavaCodeAnimation from './JavaCodeAnimation';

const TECH_STACK = ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Kafka', 'React', 'AWS'];
const STAT_ICONS = ['📚', '❓', '💻', '🚀'];
const FEATURED_PROJECTS = projects.slice(0, 3);

export default function Home({ onTopicSelect, onPageChange }) {
  const [typedText, setTypedText] = useState('');
  const [typedIdx, setTypedIdx] = useState(0);
  const [typedChar, setTypedChar] = useState(0);
  const [typedDel, setTypedDel] = useState(false);

  const startLearning = () => {
    const first = interviewCategories[0];
    if (first) onTopicSelect(first.id, first.subs[0]);
  };

  return (
    <div className="main home-page">
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero-bg" aria-hidden="true">
          <div className="home-orb home-orb-1" />
          <div className="home-orb home-orb-2" />
          <div className="home-grid-pattern" />
        </div>

        <div className="home-hero-inner">
          <div className="home-hero-left">
            <div className="badge">
              <span className="dot" />
              {personalInfo.tagline}
            </div>

            <p className="hero-subtitle">Hi, I&apos;m</p>
            <h1 className="home-title">
              <span className="name">{personalInfo.name}</span>
            </h1>

            <div className="home-hero-row">
              <div className="home-hero-copy">
                <div className="typed-wrap">
              <span className="typed-label">I am a Full Stack Developer with Angular/React and Spring Boot.</span>
              <div className="typed">
                <span>{typedText}</span>
                <span className="cursor">|</span>
              </div>
            </div>

            <p className="hero-desc hero-desc-primary">{personalInfo.summary.slice(0, 180)}…</p>

            <div className="tech-stack">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="hero-btns">
              <button type="button" className="btn-p" onClick={startLearning}>
                Start Learning
                <span className="btn-arrow">→</span>
              </button>
              <button type="button" className="btn-g" onClick={() => onPageChange('about')}>
                View Full Profile
              </button>
            </div>

                <div className="hero-contact-info">
                  <span className="contact-pill">📍 {personalInfo.location.split(',')[0]}</span>
                  <a
                    className="contact-pill contact-pill-link"
                    href={`mailto:${personalInfo.email}`}
                  >
                    📧 {personalInfo.email}
                  </a>
                </div>
              </div>

              <ProfilePhoto />
            </div>
          </div>

          <div className="home-hero-code">
            <div className="home-code-panel">
              <JavaCodeAnimation />
            </div>
          </div>
        </div>
      </section>
      <section className="home-projects" aria-label="Featured projects">
        <header className="home-section-header">
          <div>
            <p className="section-eyebrow">Portfolio highlights</p>
            <h2 className="section-title">Enterprise Projects</h2>
            <p className="section-subtitle">
              Real-world delivery across telecom, e-commerce, and healthcare — see full details on the About page.
            </p>
          </div>
          <button type="button" className="btn-outline" onClick={() => onPageChange('about')}>
            View all projects
          </button>
        </header>
        <div className="home-projects-grid">
          {FEATURED_PROJECTS.map((p) => (
            <article
              key={p.id}
              className="home-project-card"
              style={{ '--project-color': p.color }}
              onClick={() => onPageChange('about')}
              onKeyDown={(e) => e.key === 'Enter' && onPageChange('about')}
              role="button"
              tabIndex={0}
            >
              <div className="home-project-icon" style={{ background: `${p.color}20` }}>
                {p.icon}
              </div>
              <h3>{p.name}</h3>
              <p className="home-project-client">{p.client}</p>
              <p className="home-project-desc">{p.description.slice(0, 120)}…</p>
              <div className="home-project-tech">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfilePhoto() {
  return (
    <div className="hero-photo-wrapper">
      <div className="hero-photo-ring" aria-hidden="true" />
      <div className="hero-photo">
        <img
          src="/profile.png"
          alt={personalInfo.name}
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%2306a8e9%22 rx=%2250%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 font-size=%2240%22 fill=%22white%22>AK</text></svg>';
          }}
        />
      </div>
      <div className="hero-years-badge">
        <div className="hero-years-badge-num">{personalInfo.yearsExperience}</div>
        <div className="hero-years-badge-lbl">Years Exp.</div>
      </div>
    </div>
  );
}

import React from 'react';
import { experience, education } from '../data/topicsData';
import { personalInfo, projects } from '../data/profileData';
import '../styles/About.css';

const skills = [
  {
    cat: 'Backend',
    col: '#06a8e9',
    list: ['Java 8+', 'Spring Boot', 'Spring Security', 'JPA', 'Hibernate', 'REST API', 'Microservices', 'Redis', 'Kafka'],
  },
  {
    cat: 'Frontend',
    col: '#06b6d4',
    list: ['Angular 9', 'Angular 17', 'React JS', 'JavaScript', 'TypeScript'],
  },
  {
    cat: 'DevOps',
    col: '#f97316',
    list: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'AWS', 'Git'],
  },
  {
    cat: 'Tools',
    col: '#a855f7',
    list: ['IntelliJ IDEA', 'VS Code', 'Maven', 'Jira', 'GitHub Copilot', 'Cursor AI'],
  },
];

export default function About() {
  return (
    <div className="main cv-container about-page">
      {/* Header */}
      <header className="cv-header">
        <div className="cv-profile-img">
          <img
            src="/profile.png"
            alt={personalInfo.name}
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'cv-profile-placeholder';
              placeholder.textContent = 'AK';
              e.parentElement.appendChild(placeholder);
            }}
          />
        </div>
        <div className="cv-header-content">
          <h1 className="cv-name">{personalInfo.name}</h1>
          <p className="cv-title">{personalInfo.title}</p>
          <p className="cv-tagline">{personalInfo.tagline}</p>
          <div className="cv-contact-list">
            <a className="cv-contact-item cv-contact-link" href={`mailto:${personalInfo.email}`}>
              <span>📧</span>
              <span>{personalInfo.email}</span>
            </a>
            <a className="cv-contact-item cv-contact-link" href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}>
              <span>📞</span>
              <span>{personalInfo.phone}</span>
            </a>
            <div className="cv-contact-item">
              <span>📍</span>
              <span>{personalInfo.location}</span>
            </div>
            <a
              className="cv-contact-item cv-contact-link"
              href={personalInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💼</span>
              <span>{personalInfo.linkedInLabel}</span>
            </a>
          </div>
        </div>
        <div className="cv-stats">
          <div className="cv-stat-item">
            <span className="cv-stat-num">{personalInfo.yearsExperience}</span>
            <span className="cv-stat-label">Years Exp.</span>
          </div>
          <div className="cv-stat-item">
            <span className="cv-stat-num">{personalInfo.projectsCount}</span>
            <span className="cv-stat-label">Projects</span>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="cv-section">
        <h2 className="cv-section-title">Professional Summary</h2>
        <div className="cv-summary-card">
          <p>{personalInfo.summary}</p>
          <ul className="cv-highlights">
            {personalInfo.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Personal information */}
      <section className="cv-section">
        <h2 className="cv-section-title">Personal Information</h2>
        <div className="personal-info-grid">
          <InfoCard label="Full Name" value={personalInfo.name} />
          <InfoCard label="Designation" value={personalInfo.title} />
          <InfoCard label="Location" value={personalInfo.location} />
          <InfoCard label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
          <InfoCard label="Phone" value={personalInfo.phone} href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} />
          <InfoCard label="LinkedIn" value={personalInfo.linkedInLabel} href={personalInfo.linkedIn} external />
          <InfoCard label="Languages" value={personalInfo.languages.join(', ')} />
          <InfoCard label="Interests" value={personalInfo.interests.join(' · ')} />
        </div>
      </section>

      {/* Projects */}
      <section className="cv-section">
        <h2 className="cv-section-title">Key Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              style={{ '--project-color': project.color }}
            >
              <div className="project-card-header">
                <div className="project-icon" style={{ background: `${project.color}18` }}>
                  {project.icon}
                </div>
                <div className="project-meta">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-client">{project.client}</p>
                  <div className="project-role-period">
                    <span>{project.role}</span>
                    <span className="project-dot">·</span>
                    <span>{project.period}</span>
                  </div>
                </div>
              </div>
              <p className="project-desc">{project.description}</p>
              <ul className="project-highlights">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {project.subProjects.length > 0 && (
                <div className="project-subs">
                  <span className="project-subs-label">Modules delivered:</span>
                  <div className="project-subs-tags">
                    {project.subProjects.map((s) => (
                      <span key={s} className="project-sub-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="cv-section">
        <h2 className="cv-section-title">Technical Skills</h2>
        <div className="skills-categories">
          {skills.map((skill) => (
            <div key={skill.cat} className="skill-category" style={{ '--skill-color': skill.col }}>
              <h3 className="skill-category-title">
                <span className="skill-category-dot" />
                {skill.cat}
              </h3>
              <div className="skills-tags">
                {skill.list.map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="cv-section">
        <h2 className="cv-section-title">Work Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx} className="exp-card">
            <div className="exp-header">
              <div>
                <h3 className="exp-title">{exp.role}</h3>
                <p className="exp-company">{exp.co}</p>
              </div>
              <span className="exp-period">{exp.period}</span>
            </div>
            <ul className="exp-description">
              {exp.pts.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="exp-tech">
              {exp.tech.map((t) => (
                <span key={t} className="exp-tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="cv-section">
        <h2 className="cv-section-title">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="edu-card">
            <div className="edu-icon">🎓</div>
            <div className="edu-content">
              <h3 className="edu-degree">{edu.deg}</h3>
              <p className="edu-school">{edu.inst}</p>
            </div>
            <div className="edu-info">
              <div className="edu-score">{edu.gpa}</div>
              <div className="edu-year">{edu.yr}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function InfoCard({ label, value, href, external }) {
  const content = <span className="info-card-value">{value}</span>;
  return (
    <div className="info-card">
      <span className="info-card-label">{label}</span>
      {href ? (
        <a
          className="info-card-value info-card-link"
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {value}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

import React from 'react';
import '../styles/Navigation.css';

export default function Navigation({ currentPage, onPageChange, darkMode, onToggleDark }) {
  return (
    <nav className="nav">
      <div className="logo">
        <img src="/logo.png" alt="FSMaster.in Logo" className="logo-image" />
      </div>
      <div className="nav-links">
        <button
          className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onPageChange('home')}
        >
          Home
        </button>
        <button
          className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          About
        </button>
        <button
          className={`nav-link ${currentPage === 'interview' ? 'active' : ''}`}
          onClick={() => onPageChange('interview')}
        >
          Backend
        </button>
        <button
          className={`nav-link ${currentPage === 'coding' ? 'active' : ''}`}
          onClick={() => onPageChange('coding')}
        >
          Coding
        </button>
        <button
          className={`nav-link ${currentPage === 'questions' ? 'active' : ''}`}
          onClick={() => onPageChange('questions')}
        >
          UI
        </button>
        <button
          className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => onPageChange('contact')}
        >
          Contact
        </button>
        </div>
      <div className="nav-right">
        <button
          className="icon-btn"
          onClick={onToggleDark}
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

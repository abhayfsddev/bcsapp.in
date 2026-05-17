import React from 'react';
import { codingCategories, codingQuestions } from '../data/codingStore';
import '../styles/Questions.css';

export default function Coding() {
  return (
    <div className="main questions-page">
      <header className="questions-header">
        <div>
          <p className="page-label">Coding Question Bank</p>
          <h1>SQL, Java, Backend, Frontend & System Design Coding Problems</h1>
          <p className="page-description">
            A curated list of coding and backend interview problems for practice. No answers are included here — just clean, readable questions.
          </p>
        </div>
      </header>

      {codingCategories.map((category) => {
        const questions = codingQuestions[category.id] || [];
        return (
          <div key={category.id} className="question-section">
            <h2>{category.label}</h2>
            <ol className="question-list">
              {questions.map((question, index) => (
                <li key={`${category.id}-${index}`}>{question}</li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

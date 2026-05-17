import React from 'react';
import { interviewCategories, interviewQuestions } from '../data/interviewStore';
import '../styles/Questions.css';

export default function Interview() {
  return (
    <div className="main questions-page">
      <header className="questions-header">
        <div>
          <p className="page-label">Backend Question Bank</p>
          <h1>Java, Spring, Microservices & Backend Architecture Questions</h1>
          <p className="page-description">
            A curated list of backend and system design questions for interview preparation. No answers are included here — just clean, readable questions.
          </p>
        </div>
      </header>

      {interviewCategories.map((category) => {
        const questions = interviewQuestions[category.id] || [];
        return (
          <div key={category.id} className="question-section">
            <h2>{category.label}</h2>
            <ol className="question-list">
              {questions.map((item, index) => (
                <li key={`${category.id}-${index}`}>{item.q}</li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

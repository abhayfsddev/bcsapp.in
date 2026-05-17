import React from 'react';
import { interviewCategories } from '../data/interviewStore';
import '../styles/Sidebar.css';

export default function Sidebar({ currentTopic, currentSub, onTopicSelect, isVisible }) {
  if (!isVisible) return null;

  return (
    <nav className="sidebar" aria-label="Interview categories">
      {interviewCategories.map((topic) => (
        <div className="sidebar-group" key={topic.id}>
          <button
            type="button"
            className={`sidebar-item ${currentTopic === topic.id ? 'active' : ''}`}
            onClick={() => onTopicSelect(topic.id, topic.subs[0])}
            style={{ '--topic-color': topic.color }}
          >
            <div className="topic-icon">{topic.icon}</div>
            <span className="sidebar-item-flex">{topic.label}</span>
            <span className="sidebar-item-arrow">›</span>
          </button>
          {currentTopic === topic.id && (
            <div className="sidebar-sub">
              {topic.subs.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className={`sidebar-sub-item ${currentSub === sub ? 'active' : ''}`}
                  onClick={() => onTopicSelect(topic.id, sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

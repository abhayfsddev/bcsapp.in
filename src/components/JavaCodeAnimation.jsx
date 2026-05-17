import React, { useState, useEffect } from 'react';
import '../styles/JavaCodeAnimation.css';

const javaCode = `public class Main {
  public static void main(String[] args) {
    String name = "Abhay";
    System.out.println("Hello, " + name + "!");
    System.out.println("FS Master — Java Prep");
  }
}`;

const runOutput = 'Hello, Abhay!\nFS Master — Java Prep\nProcess finished. exit 0';

export default function JavaCodeAnimation() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [phase, setPhase] = useState('typing');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (phase === 'typing') {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < javaCode.length) {
          setDisplayedCode(javaCode.slice(0, i + 1));
          i += 1;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setPhase('running'), 600);
        }
      }, 25);
      return () => clearInterval(typingInterval);
    }

    if (phase === 'running') {
      setOutput(runOutput);
      const resetTimer = setTimeout(() => {
        setDisplayedCode('');
        setOutput('');
        setPhase('typing');
      }, 2800);
      return () => clearTimeout(resetTimer);
    }
  }, [phase]);

  return (
    <div className="code-animation-container code-animation-compact">
      <div className="code-window">
        <div className="code-window-header">
          <div className="window-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="window-title">Main.java</span>
        </div>
        <div className="code-content">
          <pre className="code-text">
            <code>{displayedCode}</code>
            {phase === 'typing' && <span className="cursor">|</span>}
          </pre>
        </div>
        {phase === 'running' && (
          <div className="code-output-bar">
            <pre className="code-output-text">{output}</pre>
          </div>
        )}
      </div>
      <div className="phase-indicator">
        <span className={`phase ${phase === 'typing' ? 'active' : ''}`}>Typing</span>
        <span className={`phase ${phase === 'running' ? 'active' : ''}`}>Running</span>
      </div>
    </div>
  );
}

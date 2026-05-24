import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Interview from './components/Interview';
import Coding from './components/Coding';
import Questions from './components/Questions';
import Analytics from './components/Analytics';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSub, setCurrentSub] = useState(null);

  // Track website visit on app mount
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://mail.bcsapp.in';
        await fetch(
          `${apiUrl}/api/track-visit`,
          { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTopicSelect = (topic, sub) => {
    // Navigate to the interview/questions view when a topic is selected
    setCurrentPage('interview');
    setCurrentTopic(topic);
    setCurrentSub(sub);
  };

  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div id="app" className={darkMode ? 'dark-mode' : ''}>
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        darkMode={darkMode}
        onToggleDark={toggleDarkMode}
      />
      <div className="body">
        {currentPage === 'home' && (
          <Home onTopicSelect={handleTopicSelect} onPageChange={handlePageChange} />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'interview' && <Interview />}
        {currentPage === 'coding' && <Coding />}
        {currentPage === 'questions' && <Questions />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'analytics' && <Analytics />}
        
       
      </div>
      <Footer />
    </div>
  );
}

export default App;

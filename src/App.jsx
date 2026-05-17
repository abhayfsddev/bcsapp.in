import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Interview from './components/Interview';
import Coding from './components/Coding';
import Questions from './components/Questions';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSub, setCurrentSub] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTopicSelect = (topic, sub) => {
    setCurrentPage('topic');
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
        
       
      </div>
      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import cvProfessional from '../assets/Tahsin_Tajwar_Tanni_ProfessionalCV.pdf';
import cvAcademic from '../assets/Tahsin_Tajwar_Tanni_AcademicCV.pdf';
import VariableProximity from './VariableProximity';

const tagline = "AI & Automation Engineer • ML Researcher • Full-Stack Developer";

function Typing({ text }) {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{typed}<span className="cursor">|</span></span>;
}

function handleScrollToProjects() {
  const el = document.getElementById('projects');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDownload = (file, name) => {
    const link = document.createElement('a');
    link.href = file;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <section className="hero-bg fade-in" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-greeting">Hi, I'm </span>
            <span className="hero-name-wrapper">
              <VariableProximity
                label="Tahsin Tanni"
                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                toFontVariationSettings="'wght' 900, 'wdth' 125"
                containerRef={heroRef}
                radius={150}
                falloff="gaussian"
                className="hero-name-variable"
              />
            </span>
          </h1>
          <p className="typing"><Typing text={tagline} /></p>
          <div className="hero-btns">
            <button
              className="gradient-btn"
              onClick={handleScrollToProjects}
              aria-label="Scroll to projects section"
            >
              View Projects
            </button>
            <div className="cv-dropdown-container" ref={dropdownRef}>
              <button
                className="gradient-btn cv-dropdown-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Download CV options"
              >
                Download CV <span className={`caret ${isOpen ? 'open' : ''}`}>▼</span>
              </button>
              {isOpen && (
                <ul className="cv-dropdown-menu">
                  <li>
                    <button
                      onClick={() => handleDownload(cvProfessional, 'Tahsin_Tajwar_Tanni_ProfessionalCV.pdf')}
                      aria-label="Download Professional CV"
                    >
                      Professional CV
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleDownload(cvAcademic, 'Tahsin_Tajwar_Tanni_AcademicCV.pdf')}
                      aria-label="Download Academic CV"
                    >
                      Academic CV
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <img
            src={`${process.env.PUBLIC_URL}/pic.jpg`}
            alt="Tahsin Tanni Profile"
            className="profile-pic"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '20px',
              objectFit: 'cover',
              boxShadow: '0 8px 24px rgba(108, 99, 255, 0.2)',
              border: '3px solid rgba(108, 99, 255, 0.1)'
            }}
            onLoad={() => {
              console.log('Profile image loaded successfully in Home');
            }}
            onError={(e) => {
              console.log('Failed to load image in Home, showing fallback');
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;

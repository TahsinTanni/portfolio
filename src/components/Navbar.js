import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  // { id: 'cv', label: 'CV' },
  { id: 'contact', label: 'Contact' },
];

function getOffset() {
  // Adjust this value if your navbar height changes
  return 70;
}

function Navbar({ theme, setTheme, scrollToSection }) {
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef();

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      let found = 'home';
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - getOffset() <= 0) {
            found = link.id;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with offset
  const handleNavClick = (id) => {
    setActive(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Close mobile menu on resize
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 700) setMobileOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  return (
    <nav className={`navbar ${theme}`} ref={navRef}>
      <div className="navbar-logo">Tahsin Tanni</div>
      <ul className="navbar-links desktop">
        {NAV_LINKS.map(link => (
          <li key={link.id}>
            <button
              className={active === link.id ? 'active' : ''}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="theme-switch-wrapper">
        <label className="theme-switch" aria-label="Toggle theme">
          <input
            type="checkbox"
            checked={theme === 'light'}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <div className="back">
            <div className="but">
              <div className="on">I</div>
              <div className="off">O</div>
            </div>
          </div>
        </label>
      </div>
      <button
        className="hamburger"
        aria-label="Open menu"
        onClick={() => setMobileOpen(v => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={`mobile-menu ${theme}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    className={active === link.id ? 'active' : ''}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
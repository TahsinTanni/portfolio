import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import ragSlackbotImg from '../assets/rag-slackbot.jpg';
import thesisFlowImg from '../assets/thesis-flow.png';
import stockForecastingImg from '../assets/stock-forecasting.jpg';
import aiProfessorFinderImg from '../assets/ai-professor-finder.png';
import collabPlaylistImg from '../assets/collab-playlist.png';
import profMailImg from '../assets/profmail.png';
import vaeClusteringImg from '../assets/vae-clustering.jpg';
import disasterRecoveryImg from '../assets/disaster-recovery.jpg';
import propertyTrackerImg from '../assets/property-tracker.jpg';
import { FiExternalLink, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "RAG-Slackbot",
    image: ragSlackbotImg,
    description: "RAG Slackbot – Knowledge Base Assistant\nA Slack-integrated RAG chatbot built with n8n that enables real-time querying of internal PDF knowledge bases. It performs automated document ingestion, vector search using Supabase, and generates context-aware responses with Gemini. Includes confidence-based escalation, source attribution, and query logging, with privacy-focused local embeddings via Ollama.",
    tech: ["n8n", "Supabase", "Ollama", "Google Gemini"],
    code: "https://github.com/TahsinTanni/RAG-slackbot"
  },
  {
    title: "ThesisFlow - Thesis Management System",
    image: thesisFlowImg,
    description: "A web application to manage thesis submissions, reviews, and approvals. Features include student-supervisor collaboration, document management, progress tracking, and automated workflow for thesis evaluation and defense scheduling.",
    tech: ["React", "Express", "MongoDB", "Node.js"],
    code: "https://github.com/Faishal-Monir/Thesis-Management-System",
    live: "https://thesis-flow-delta.vercel.app/"
  },
  {
    title: "ProfMail - AI-Powered Academic Cold Email Generator",
    image: profMailImg,
    description: "An AI-driven web application that automates personalized cold email generation for graduate school applicants. Features include real-time professor lab scraping, research overlap analysis between student thesis and faculty publications, customizable tone and length controls, and an interactive editing workspace with local email history.",
    tech: ["React", "TypeScript", "Vite 6", "Tailwind CSS", "AI", "Web Scraping"],
    code: "https://github.com/TahsinTanni/ProfMail",
    live: "https://prof-mail.vercel.app/"
  },
  {
    title: "AI Professor Finder",
    image: aiProfessorFinderImg,
    description: "An automated n8n workflow that discovers and evaluates potential MSc/PhD supervisors using Google Scholar and Gemini AI. The workflow reads professor information from Google Sheets, retrieves their recent publications via SerpAPI, compares their research against a student's thesis, and produces AI-generated compatibility scores and funding recommendations.",
    tech: ["n8n", "Google Scholar", "SerpAPI", "Gemini AI", "Google Sheets"],
    code: "https://github.com/TahsinTanni/AI-Professor-Finder"
  },
  {
    title: "Stock-Forecasting-and-Analysis-Toolkit",
    image: stockForecastingImg,
    description: "Developed an interactive Hugging Face Space demonstrating data synthesis using generative AI techniques for job-related analytics. Enabled dynamic user interaction for synthetic data generation and visualization through a web-based interface.",
    tech: ["pandas", "numpy", "matplotlib", "statsmodels", "scikit-learn", "prophet", "tensorflow", "gradio", "Hugging Face Hub"],  
    live: "https://huggingface.co/spaces/tahsintajwar/DataSynthis_Job_task"
  },
  {
    title: "Realtime Collaborative Playlist",
    image: collabPlaylistImg,
    description: "Built a real-time collaborative music playlist application with Server-Sent Events (SSE) for live synchronization, drag-and-drop reordering using fractional indexing, voting system, and now playing simulation.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "SQLite", "Tailwind CSS 4", "Framer Motion"],
    code: "https://github.com/Nafiz68/Realtime-Collaborative-Playlist",
    live: "https://realtime-collaborative-playlist.vercel.app/"
  },
  {
    title: "VAE-based Deep Clustering with Uncertainty",
    image: vaeClusteringImg,
    description: "Research project on deep clustering using Variational Autoencoders with uncertainty quantification. Implements advanced neural network architectures for unsupervised learning and cluster analysis with probabilistic modeling.",
    tech: ["Python", "TensorFlow", "Keras", "scikit-learn", "pyTorch"],
    code: "https://github.com/TahsinTanni/vae-dec-clustering-uncertainty"
  },
  {
    title: "Disaster Recovery Training Smart Contract",
    image: disasterRecoveryImg,
    description: "Smart contract for managing disaster recovery training programs on the Ethereum blockchain. Enables transparent tracking of training sessions, certification issuance, and participant verification with decentralized record-keeping.",
    tech: ["Solidity", "Ethereum", "Web3.js", "Metamask"],
    code: "https://github.com/TahsinTanni/Disaster-Recovery-Training-Smart-Contract"
  },
  
  {
    title: "Property Tracker",
    image: propertyTrackerImg,
    description: "A web application to track property prices, market trends, and real estate analytics. Built on Hyperledger Fabric blockchain for secure and immutable property transaction records and ownership history.",
    tech: ["React", "Express", "MongoDB", "Node.js", "Hyperledger Fabric"],
    code: "https://github.com/TahsinTanni/property-tracker-fabric"
  },
  
];

const initialCards = [
  ...projects.map((proj, idx) => ({ ...proj, id: `proj-${idx}` })),
  { id: 'see-more', isSeeMore: true, title: "See More", code: "https://github.com/TahsinTanni?tab=repositories" }
];

function Projects() {
  const [cards, setCards] = useState(initialCards);
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollRight = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
  };

  const handleScrollLeft = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
  };

  // Auto-scroll loop effect (every 3 seconds, pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleScrollRight();
    }, 3000); // 3 seconds per project
    return () => clearInterval(interval);
  }, [isHovered]);

  const cardShift = 20;    // Stack vertical shift in pixels
  const scaleStep = 0.04;  // Scale step for layering
  const dimStep = 0.15;    // Dimming factor per layered card
  const spring = { type: "spring", stiffness: 170, damping: 26 };

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div 
        className="horizontal-carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="horizontal-scroll-btn-left"
          onClick={handleScrollLeft}
          aria-label="Scroll Left"
        >
          <FiChevronLeft size={32} />
        </button>
        <div className="horizontal-carousel card-stack">
          {cards.map((proj, i) => {
            const front = i === 0;
            const styleIndex = Math.min(i, 3);
            const brightness = Math.max(0.1, 1 - styleIndex * dimStep);
            const baseZ = cards.length - i;

            if (proj.isSeeMore) {
              return (
                <motion.a
                  key={proj.id}
                  href={proj.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="horizontal-carousel-card see-more-card"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: baseZ,
                    cursor: front ? "pointer" : "default",
                    touchAction: "none"
                  }}
                  animate={{
                    y: styleIndex * -cardShift,
                    scale: 1 - styleIndex * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ
                  }}
                  transition={spring}
                  drag={front ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragMomentum={false}
                  onDragEnd={handleScrollRight}
                  whileDrag={front ? {
                    zIndex: cards.length + 1,
                    scale: 1 + 0.02,
                    rotate: 2
                  } : {}}
                >
                  <span className="see-more-text">See More</span>
                  <FiExternalLink size={32} />
                </motion.a>
              );
            }

            return (
              <motion.div
                key={proj.id}
                className="horizontal-carousel-card"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: baseZ,
                  cursor: front ? "grab" : "default",
                  touchAction: "none"
                }}
                animate={{
                  y: styleIndex * -cardShift,
                  scale: 1 - styleIndex * scaleStep,
                  filter: `brightness(${brightness})`,
                  zIndex: baseZ
                }}
                transition={spring}
                drag={front ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragMomentum={false}
                onDragEnd={handleScrollRight}
                whileDrag={front ? {
                  zIndex: cards.length + 1,
                  cursor: "grabbing",
                  scale: 1 + 0.02,
                  rotate: 2
                } : {}}
              >
                <div className="project-img-wrap">
                  {proj.image && (
                    <img src={proj.image} alt={proj.title} className="project-img" />
                  )}
                </div>
                <div className="project-info">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>
                  <div className="project-tech">
                    {proj.tech.map(tag => (
                      <span className="tech-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-btns">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn live-btn"
                        onClick={(e) => {
                          if (!front) e.preventDefault();
                        }}
                      >
                        <FiExternalLink size={18} className="live-icon" />
                      </a>
                    )}
                    {proj.code && (
                      <a
                        href={proj.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn github-btn"
                        onClick={(e) => {
                          if (!front) e.preventDefault();
                        }}
                      >
                        <FaGithub size={18} className="github-icon" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <button
          className="horizontal-scroll-btn"
          onClick={handleScrollRight}
          aria-label="Scroll Right"
        >
          <FiChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}

export default Projects;

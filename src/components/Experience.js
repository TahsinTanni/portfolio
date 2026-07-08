import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    role: "AI & Automation Engineer",
    company: "180 RE, Toronto, Canada",
    duration: "May 2026 – Present",
    description: "• Built LLM-powered workflows using OpenAI and Anthropic APIs, automating multi-step business processes via n8n and third-party service integrations.\n• Developed and deployed AI-powered chatbots, integrating them into websites to automate user interactions and support.\n• Applied prompt engineering techniques to optimise LLM outputs for accuracy and safety across use cases.",
  },
  {
    role: "Python tutor",
    company: "Zentorra",
    duration: "February 2025 - May 2025",
    description: "Tutored high school students in Python programming, covering basics to advanced topics. Helped students with coding assignments and projects.",
  },
  {
    role: "Junior Web Developer (Part-time)",
    company: "Weabers",
    duration: "February 2023 – July 2024",
    description: "Developed and maintained responsive web applications, built reusable UI components, integrated APIs with backend systems, and supported debugging and feature deployment.",
  },
  {
    role: "Junior Executive, IT Department",
    company: "Robotics Club of BRAC University",
    duration: "June 2022 - August 2023",
    description: "Maintained and supported technical infrastructure for workshops, competitions, and robotics events, assisting with software configuration, development tools, and network setups while collaborating with the team to ensure smooth technical operations and manage internal digital resources.",
  }
];

const researchExperience = {
  role: "Undergraduate Researcher",
  company: "BRAC University, Department of Computer Science and Engineering",
  duration: "January 2025 – January 2026",
  title: "Anchor-guided repair: A Defense Mechanism for Enhancing Stability of Compromised Pretrained Language Models Against Low-Precision and Weight Noise Attacks",
  publicationUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=JfVqCU8AAAAJ&authuser=1&citation_for_view=JfVqCU8AAAAJ:9yKSN-GCB0IC",
  points: [
    "Large Language Models (LLMs) are vulnerable to post-release attacks such as weight noise injection and low-precision quantization, which degrade stability and performance. Users may unknowingly download compromised models without access to clean weights.",
    "We propose Anchor-Guided Repair, a defense that fine-tunes attacked models on clean text while limiting parameter changes via an anchor loss that penalizes deviation from a clean, task-adapted baseline.",
    "The method jointly optimizes language modeling loss and anchor regularization, reducing instability without distorting previously learned knowledge.",
    "Tested on various architectures and attack types (Gaussian noise, low-bit quantization), Anchor-Guided Repair consistently outperforms compromised models, restoring reliability close to the clean baseline.",
    "This approach demonstrates that anchoring provides a practical post-deployment defense, enabling safer and more trustworthy reuse of open-source LLMs without proprietary training data."
  ]
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.8, type: "spring" }
  }),
};

function Experience() {
  return (
    <div className="experience-container">
      <section id="experience" className="experience-section">
        <h2 className="experience-heading">Experience</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              className="timeline-card"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(56, 189, 248, 0.3)" }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3 className="role">{exp.role}</h3>
                <span className="company">{exp.company}</span>
                <span className="duration">{exp.duration}</span>
                <p className="description">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="research" className="experience-section" style={{ marginTop: '4rem' }}>
        <h2 className="experience-heading">Research Experience</h2>
        <div className="timeline">
          <motion.div
            className="timeline-card research-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
            custom={0}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(56, 189, 248, 0.3)" }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3 className="role">{researchExperience.role}</h3>
              <span className="company">{researchExperience.company}</span>
              <span className="duration">{researchExperience.duration}</span>
              <p className="research-title">{researchExperience.title}</p>
              <a
                href={researchExperience.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="research-link"
              >
                View publication
              </a>
              <ul className="research-points">
                {researchExperience.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Experience;

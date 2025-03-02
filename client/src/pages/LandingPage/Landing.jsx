import React, { useState, useEffect } from 'react';
import './landing.css';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-container">
      
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="logo">
          <span className="github-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </span>
          <h1>GitRecruit</h1>
        </div>
        
        <button 
          className="mobile-menu-button" 
          onClick={toggleMenu} 
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
          <a href="/signin" className="btn-secondary">Sign In</a>
          <a href="/signup" className="btn-primary">Sign Up</a>
        </div>
      </nav>

      <main id="main-content">
        <header className={`hero ${isVisible ? 'visible' : ''}`}>
          <div className="hero-content">
            <h2 className="hero-title">Find Perfect Developer Matches With AI-Powered GitHub Analysis</h2>
            <p>GitRecruit analyzes candidate commit histories against your standards, creating vector embeddings that reveal true coding capabilities and compatibility with your team.</p>
            <div className="hero-buttons">
              <a href="/signup" className="btn-primary">Get Started</a>
              <a href="#features" className="btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="code-box" aria-hidden="true">
              <div className="code-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="code-content">
                <pre>
                  <code>
                    <span className="purple">function</span> <span className="blue">matchCandidate</span>(candidateRepo, standardRepo) &#123;
                      <span className="comment">// Create vector embeddings</span>
                      <span className="purple">const</span> candidateVector = <span className="blue">createEmbeddings</span>(candidateRepo);
                      <span className="purple">const</span> standardVector = <span className="blue">createEmbeddings</span>(standardRepo);
                      
                      <span className="comment">// Calculate similarity score</span>
                      <span className="purple">const</span> score = <span className="blue">calculateSimilarity</span>(candidateVector, standardVector);
                      
                      <span className="purple">return</span> score > 0.85 ? <span className="green">'Hire'</span> : <span className="red">'Review Further'</span>;
                    &#125;
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </header>

        <section id="features" className="features animate-on-scroll">
          <div className="container">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-7h2v2h-2v-2zm0-8h2v6h-2V5z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>AI-Powered Analysis</h3>
                <p>Advanced algorithms create vector embeddings from commit history to match coding patterns and quality.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path d="M13 10h7a1 1 0 0 1 0 2h-7v7a1 1 0 0 1-2 0v-7H4a1 1 0 0 1 0-2h7V3a1 1 0 0 1 2 0v7z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Customizable Standards</h3>
                <p>Create your ideal developer profile based on your top performers or project requirements.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Fast Decision Making</h3>
                <p>Reduce screening time by 80% with instant hire/no-hire recommendations based on real code contributions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Team Compatibility</h3>
                <p>Identify candidates whose coding style and approaches align with your existing team dynamics.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works animate-on-scroll">
          <div className="container">
            <h2>How It Works</h2>
            <div className="process-steps">
              <div className="step">
                <div className="step-number" aria-hidden="true">1</div>
                <h3>Connect Your GitHub</h3>
                <p>Link your company's standard repositories and define your ideal developer profile.</p>
              </div>
              <div className="step-arrow" aria-hidden="true">→</div>
              <div className="step">
                <div className="step-number" aria-hidden="true">2</div>
                <h3>Add Candidates</h3>
                <p>Upload candidate GitHub profiles or let them connect directly through your custom portal.</p>
              </div>
              <div className="step-arrow" aria-hidden="true">→</div>
              <div className="step">
                <div className="step-number" aria-hidden="true">3</div>
                <h3>Review Analysis</h3>
                <p>Get detailed matching scores, specific strengths, and clear hire/no-hire recommendations.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials animate-on-scroll">
          <div className="container">
            <h2>What Our Clients Say</h2>
            <div className="testimonial-cards">
              <div className="testimonial-card">
                <div className="testimonial-text">
                  "GitRecruit reduced our hiring time by 65% and improved our technical team quality dramatically. The vector embedding technology catches nuances our manual reviews missed."
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true"></div>
                  <div className="author-info">
                    <h4>Sarah Johnson</h4>
                    <p>CTO, TechInnovate</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-text">
                  "The GitHub pattern matching identified several star developers we would have missed through traditional interview processes. Game-changer for our technical recruiting."
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true"></div>
                  <div className="author-info">
                    <h4>Michael Chen</h4>
                    <p>Head of Engineering, DataFlow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="cta animate-on-scroll">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Technical Hiring?</h2>
              <p>Join thousands of companies finding their perfect developer matches using AI-powered GitHub analysis.</p>
              <div className="cta-buttons">
                <a href="/signup" className="btn-primary">Sign Up Now</a>
                <a href="/signin" className="btn-secondary">Sign In</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>GitRecruit</h2>
              <p>AI-Powered Developer Matching</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h3>Product</h3>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#integrations">Integrations</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>Resources</h3>
                <ul>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#guides">Guides</a></li>
                  <li><a href="#case-studies">Case Studies</a></li>
                  <li><a href="#documentation">Documentation</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>Company</h3>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#legal">Legal</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GitRecruit. All rights reserved.</p>
            <div className="social-links">
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="currentColor"/>
                  <rect x="2" y="9" width="4" height="12" fill="currentColor"/>
                  <circle cx="4" cy="4" r="2" fill="currentColor"/>
                </svg>
              </a>
              <a href="#github" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
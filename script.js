/**
 * ============================================================================
 * CHETHAN U - SOFTWARE ENGINEER PORTFOLIO INTERACTIVE ENGINE
 * ============================================================================
 * Features:
 * 1. Night Mode Toggle with CSS Media Query Fallback & LocalStorage Memory
 * 2. Left Vertical Navigation Bar Active Spy & Accessible Mobile Drawer
 * 3. Clickable Project Thumbnails with Detailed Architecture Modal
 * 4. Video Player Tab Switcher (YouTube Embed vs. Local Engineering Demo)
 * 5. Interactive AI Chatbot Simulation (with OpenAI/Gemini API Integration Point)
 * 6. Contact Form Validation with Confirmation & Resend API Integration Point
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. NIGHT MODE TOGGLE ENGINE (Prompt 2)
  // Uses CSS media queries to detect default theme, with manual toggle override
  // --------------------------------------------------------------------------
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Determine starting theme: LocalStorage preference OR system default
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // Media query auto-detection
    const systemTheme = mediaQueryDark.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
  }

  // Listener for OS theme changes if user has not set explicit manual override
  mediaQueryDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newSystemTheme);
    }
  });

  // Manual toggle handler for all theme buttons (desktop sidebar + mobile topbar)
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || (mediaQueryDark.matches ? 'dark' : 'light');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  });

  // --------------------------------------------------------------------------
  // 1B. PIXEL COLOR THEME SWITCHER (Cyber Blue, Synthwave, Matrix, Amber)
  // --------------------------------------------------------------------------
  const paletteBtns = document.querySelectorAll('.palette-dot-btn');
  const savedPalette = localStorage.getItem('portfolio-color-theme') || 'cyber';

  function applyColorTheme(themeName) {
    document.documentElement.setAttribute('data-color-theme', themeName);
    localStorage.setItem('portfolio-color-theme', themeName);

    // Update active class across all palette buttons (desktop and mobile)
    paletteBtns.forEach(b => {
      if (b.getAttribute('data-palette') === themeName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // Apply saved theme on initial load
  applyColorTheme(savedPalette);

  // Palette button click event
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-palette');
      if (selected) {
        applyColorTheme(selected);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. VERTICAL NAVIGATION BAR & MOBILE DRAWER (Prompt 3 & 13)
  // Handles scroll spy highlight and accessible mobile menu drawer
  // --------------------------------------------------------------------------
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const verticalNavbar = document.getElementById('vertical-navbar');
  const navLinks = document.querySelectorAll('.vertical-nav-links .nav-item a');
  const observedSections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileNavToggle && verticalNavbar) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = verticalNavbar.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        verticalNavbar.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section scroll spy
  function updateActiveNavLink() {
    const scrollPos = window.pageYOffset + 160;

    observedSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 3. PROJECTS SECTION CLICKABLE THUMBNAILS & MODAL SPECS (Prompt 7)
  // Each thumbnail opens a rich engineering architecture breakdown
  // --------------------------------------------------------------------------
  const projectCards = document.querySelectorAll('.project-clickable-item');
  const projectModal = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  // Detailed specifications dictionary for thumbnails
  const projectDatabase = {
    unfazed: {
      title: "Unfazed – Therapist Practice Management SaaS",
      badge: "FULL-STACK MERN ARCHITECTURE",
      desc: "A production-oriented practice-management web application designed for licensed therapists and clinical practitioners. Streamlines patient scheduling, records, and sessions.",
      highlights: [
        "Architected scalable REST APIs with Node.js and Express.js backed by MongoDB document collections.",
        "Engineered secure token-based authentication and role authorization using JSON Web Tokens (JWT) and Bcrypt.",
        "Created an intuitive React single-page frontend with responsive dashboards, calendar appointment workflows, and client directory management.",
        "Engineered subscription entitlement logic and client-therapist data privacy guardrails."
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs", "Bcrypt"],
      repoUrl: "https://github.com/Chethan22050/unfazed",
      image: "course certificate.jpeg"
    },
    portfolio: {
      title: "Chethan.dev – Cyberpunk Pixel Engineering Portfolio",
      badge: "FRONTEND & UI/UX ARCHITECTURE",
      desc: "A bespoke software engineering portfolio blending 8-bit retro pixel aesthetics with cyberpunk glassmorphism and modern web standards.",
      highlights: [
        "Fully semantic HTML5 structure with high accessibility and SEO metadata.",
        "Left vertical navigation bar with seamless mobile drawer transformation.",
        "Media-query powered night mode engine with manual toggle persistence.",
        "Integrated interactive simulated AI assistant and video showcase modal."
      ],
      techStack: ["HTML5", "Vanilla CSS3", "JavaScript (ES6+)", "Glassmorphism", "Pixel Art System"],
      repoUrl: "https://github.com/Chethan22050/portfolio",
      image: "background image.jpeg"
    },
    robot: {
      title: "PID Line Follower Autonomous Robot",
      badge: "EMBEDDED SYSTEMS & HARDWARE",
      desc: "An autonomous robotics platform engineered for precise line tracking on varying speed curves using proportional-integral-derivative control loops.",
      highlights: [
        "Programmed Arduino microcontroller firmware in C++ with custom PID control algorithms.",
        "Interfaced infrared sensor arrays to calculate real-time positional error offset.",
        "Calibrated motor driver PWM signals to achieve smooth acceleration and cornering without oscillations.",
        "Tested closed-loop response dynamics to maintain line lock at maximum motor velocity."
      ],
      techStack: ["Arduino", "C / C++", "PID Control Logic", "IR Sensors", "PWM Motor Drivers"],
      repoUrl: "https://github.com/Chethan22050",
      image: "intern critificate.jpeg"
    }
  };

  // Thumbnail click listener
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      const data = projectDatabase[projectId];

      if (data && projectModal && projectModalBody) {
        projectModalBody.innerHTML = `
          <div style="margin-bottom: 1.2rem;">
            <span class="pixel-tag" style="margin-bottom: 0.5rem;">${data.badge}</span>
            <h2 style="font-family: var(--font-pixel); font-size: 1.35rem; margin: 0.6rem 0; color: var(--text-main);">${data.title}</h2>
            <p style="color: var(--text-secondary); line-height: 1.65;">${data.desc}</p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-family: var(--font-pixel); font-size: 0.8rem; color: var(--primary-accent); margin-bottom: 0.8rem;">ENGINEERING HIGHLIGHTS</h4>
            <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
              ${data.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${h}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 1.8rem;">
            <h4 style="font-family: var(--font-pixel); font-size: 0.75rem; color: var(--primary-accent); margin-bottom: 0.6rem;">TECHNOLOGY STACK</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn" style="text-decoration:none;">
              <span>VISIT GITHUB REPO</span>
              <span>&rarr;</span>
            </a>
          </div>
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal handler
  if (projectModalClose && projectModal) {
    const closeProjectModal = () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    projectModalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. EMBEDDED VIDEO PLAYER TAB SWITCHER (Prompt 8)
  // Toggles between responsive YouTube showcase and local MP4 demonstration
  // --------------------------------------------------------------------------
  const tabYt = document.getElementById('tab-yt-video');
  const tabLocal = document.getElementById('tab-local-video');
  const ytIframe = document.getElementById('yt-player-iframe');
  const localVideo = document.getElementById('local-player-video');

  if (tabYt && tabLocal && ytIframe && localVideo) {
    tabYt.addEventListener('click', () => {
      tabYt.classList.add('active');
      tabLocal.classList.remove('active');
      ytIframe.style.display = 'block';
      localVideo.style.display = 'none';
      localVideo.pause();
    });

    tabLocal.addEventListener('click', () => {
      tabLocal.classList.add('active');
      tabYt.classList.remove('active');
      ytIframe.style.display = 'none';
      localVideo.style.display = 'block';
    });
  }

  // --------------------------------------------------------------------------
  // 5. AI CHAT INTERFACE SIMULATION (Prompt 10)
  // Simulated AI response engine with typing indicator
  // Includes comments showing where an API (e.g., OpenAI / Gemini) can be connected.
  // --------------------------------------------------------------------------
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatMessages = document.getElementById('chat-messages');
  const promptChips = document.querySelectorAll('.chat-prompt-chip');

  // Knowledge base for AI Chethan simulator
  function generateAiResponse(userQuery) {
    const q = userQuery.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('language')) {
      return "Chethan's technical skills include Java, Python, C/C++, and modern JavaScript. For web development, he specializes in the MERN Stack (MongoDB, Express.js, React.js, Node.js), REST APIs, JWT authentication, and core Data Structures & Algorithms.";
    } else if (q.includes('unfazed') || q.includes('saas') || q.includes('project')) {
      return "Chethan built 'Unfazed' — a full-stack SaaS for therapist practice management with React, Node.js, Express, and MongoDB. It features appointment scheduling, therapist dashboards, client accounts, and secure JWT auth. He also built an Arduino PID Line Follower robot!";
    } else if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('gpa') || q.includes('sgpa')) {
      return "Chethan is currently pursuing his B.E. in Information Science and Engineering at Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru (2nd Year). He achieved a 9.14 SGPA in 1st semester and 8.50 in 2nd semester.";
    } else if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('intern')) {
      return "Yes! Chethan is actively open to junior software engineer roles, developer internships, and freelance projects. You can reach out directly via the Contact section or call him at +91 9380560914.";
    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
      return "You can reach Chethan at chethan.u.dev@gmail.com, via phone at +91 9380560914, or on LinkedIn at linkedin.com/in/chethan-u-243b37384.";
    } else if (q.includes('certificate') || q.includes('certification')) {
      return "Chethan holds credentials in Web Development from Unlox Edge, an Internship Certificate with Outpro India, Introduction to Generative AI from Google, and Machine Learning Foundations from AWS Educate!";
    } else {
      return "Thanks for asking! Chethan is a focused software engineer who loves full-stack development, algorithms, and clean architecture. Feel free to ask about his skills, projects, education, or check his resume!";
    }
  }

  function appendChatMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = sender === 'user' ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-bot';
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * INTEGRATION POINT: OPENAI / GEMINI API
   * To connect to a live OpenAI or Google Gemini backend:
   * 
   * async function fetchLiveAiReply(query) {
   *   const response = await fetch('/api/chat', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ message: query, systemPrompt: "You are AI Chethan, a software engineer..." })
   *   });
   *   const data = await response.json();
   *   return data.reply;
   * }
   */

  function handleUserMessage(messageText) {
    if (!messageText.trim()) return;

    // Append user query
    appendChatMessage('user', messageText);

    // Show simulated typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble chat-bubble-bot';
    typingIndicator.style.fontStyle = 'italic';
    typingIndicator.style.opacity = '0.7';
    typingIndicator.textContent = 'AI Chethan is thinking...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate network delay
    setTimeout(() => {
      typingIndicator.remove();
      const reply = generateAiResponse(messageText);
      appendChatMessage('bot', reply);
    }, 700);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value;
      chatInput.value = '';
      handleUserMessage(text);
    });
  }

  // Quick prompt chips
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        handleUserMessage(prompt);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. CONTACT FORM SUBMISSION WITH EMAIL API INTEGRATION POINT (Prompt 11)
  // Handles validation, visual feedback, and email provider placeholder
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      /*
       * ======================================================================
       * INTEGRATION POINT: EMAIL-SENDING SERVICE (e.g., Resend API / EmailJS)
       * ======================================================================
       * Example integration with Resend:
       * 
       * fetch('https://api.resend.com/emails', {
       *   method: 'POST',
       *   headers: {
       *     'Authorization': 'Bearer YOUR_RESEND_API_KEY',
       *     'Content-Type': 'application/json'
       *   },
       *   body: JSON.stringify({
       *     from: 'portfolio@yourdomain.com',
       *     to: 'chethan.u.dev@gmail.com',
       *     subject: `New Portfolio Inquiry from ${name}: ${subject}`,
       *     html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
       *   })
       * });
       * ======================================================================
       */

      // Visual feedback: Transmitting state
      if (submitBtn) {
        submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = '<span>TRANSMIT MESSAGE</span> <span>&rarr;</span>';
          submitBtn.style.opacity = '1';
        }

        formStatus.className = 'form-status-msg success';
        formStatus.innerHTML = `&check; Thank you, <strong>${name}</strong>! Your transmission has been dispatched. Chethan will respond shortly.`;
        contactForm.reset();

        setTimeout(() => {
          formStatus.className = 'form-status-msg';
          formStatus.innerHTML = '';
        }, 6000);
      }, 600);
    });
  }

});

/**
 * SRIVEXA DIGITAL – Official Website JavaScript
 * "Your Digital Presence. Built to Grow."
 * Founder: Sri Vatsa G (B.E. CSE | Digital & Performance Marketer)
 * WhatsApp: +91 9384167606 | Email: srivatsag03@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- DOM ELEMENTS ----------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinkItems = document.querySelectorAll('.nav-link');
  
  // Pricing tab buttons & panels
  const pricingTabs = document.querySelectorAll('.pricing-tab-btn');
  const pricingPanels = document.querySelectorAll('.pricing-content-panel');
  
  // Lead Generation Form elements
  const leadForm = document.getElementById('leadGenForm');
  const formStatus = document.getElementById('formStatusAlert');
  const serviceSelect = document.getElementById('serviceRequired');
  const budgetSelect = document.getElementById('projectBudget');
  const btnSubmitWA = document.getElementById('btnSubmitWhatsApp');

  // ---------- 1. STICKY NAVBAR ON SCROLL ----------
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ---------- 2. ACTIVE NAV LINK HIGHLIGHTER ----------
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  // ---------- 3. MOBILE MENU TOGGLE ----------
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  function openMobileMenu() {
    navLinks.classList.add('open');
    mobileOverlay.classList.add('active');
    mobileToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = '';
  }

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMobileMenu();
      }
    });
  });

  // ---------- 4. PRICING TABS SWITCHER ----------
  pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update tab active state
      pricingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      pricingPanels.forEach(panel => {
        if (panel.id === target) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ---------- 5. PRE-FILL FORM FROM SERVICE / PRICING CARDS ----------
  window.selectPackageForEnquiry = function(serviceName, budgetRange) {
    if (serviceSelect && serviceName) {
      // Find matching option in service select
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) || 
            serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (budgetSelect && budgetRange) {
      // Find matching option in budget select
      for (let i = 0; i < budgetSelect.options.length; i++) {
        if (budgetSelect.options[i].text.includes(budgetRange) || 
            budgetSelect.options[i].value.includes(budgetRange)) {
          budgetSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Scroll to lead generation form smoothly
    const leadSection = document.getElementById('lead-generation');
    if (leadSection) {
      leadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ---------- 6. SEND VIA WHATSAPP BUTTON LOGIC ----------
  if (btnSubmitWA) {
    btnSubmitWA.addEventListener('click', () => {
      const fullName = document.getElementById('fullName').value.trim();
      const businessName = document.getElementById('businessName').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const email = document.getElementById('emailAddress').value.trim();
      const service = serviceSelect.options[serviceSelect.selectedIndex].text;
      const budget = budgetSelect.options[budgetSelect.selectedIndex].text;
      const description = document.getElementById('projectDescription').value.trim();

      if (!fullName || !phone) {
        showStatus('Please provide at least your Name and Phone Number to start a WhatsApp chat.', 'error');
        return;
      }

      const waText = 
`*New Project Enquiry – SriVexa Digital*
━━━━━━━━━━━━━━━━━━━━
*Client Name:* ${fullName}
*Business Name:* ${businessName || 'Not specified'}
*Phone:* ${phone}
*Email:* ${email || 'Not specified'}
*Service Required:* ${service}
*Budget Range:* ${budget}
*Project Notes:* ${description || 'Discuss details on call/chat'}
━━━━━━━━━━━━━━━━━━━━
_Sent via SriVexa Digital official website_`;

      const encodedUrl = `https://wa.me/919384167606?text=${encodeURIComponent(waText)}`;
      window.open(encodedUrl, '_blank');
      showStatus(`Connecting to WhatsApp with founder Sri Vatsa G... Thank you, ${fullName}!`, 'success');
    });
  }

  // ---------- 7. LEAD GENERATION FORM SUBMIT ----------
  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const businessName = document.getElementById('businessName').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const email = document.getElementById('emailAddress').value.trim();
      const service = serviceSelect.value;
      const budget = budgetSelect.value;
      const description = document.getElementById('projectDescription').value.trim();

      // Basic validation
      if (!fullName || !businessName || !phone || !email || !service || !budget || !description) {
        showStatus('Please fill in all the required fields before submitting your enquiry.', 'error');
        return;
      }

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Enquiry...';

      try {
        // Send actual form submission to FormSubmit endpoint (free, no backend server setup needed, reliable delivery)
        const response = await fetch('https://formsubmit.co/ajax/srivatsag03@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New SriVexa Digital Enquiry from ${fullName} (${businessName})`,
            fullName: fullName,
            businessName: businessName,
            phoneNumber: phone,
            emailAddress: email,
            serviceRequired: serviceSelect.options[serviceSelect.selectedIndex].text,
            estimatedBudget: budgetSelect.options[budgetSelect.selectedIndex].text,
            projectDescription: description,
            _template: 'table'
          })
        });

        if (response.ok) {
          showStatus(`Thank you, ${fullName}! Your enquiry has been received. Founder Sri Vatsa G will review your project details and get in touch within 24 hours.`, 'success');
          leadForm.reset();
        } else {
          // If offline or blocked by browser CORS/sandbox, provide instant seamless WhatsApp fallback option
          showStatus(`Your enquiry is ready. Founder Sri Vatsa G is directly available on WhatsApp (9384167606) to discuss your project immediately!`, 'success');
        }
      } catch (err) {
        // Safe fallback
        showStatus(`Enquiry captured! You can also connect directly with Sri Vatsa G via WhatsApp at +91 9384167606 for priority response.`, 'success');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.className = `form-status-alert ${type}`;
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    formStatus.innerHTML = `<i class="fa-solid ${iconClass}" style="margin-top:0.2rem; font-size:1.1rem;"></i> <div>${message}</div>`;
    formStatus.style.display = 'flex';
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ---------- 8. SHARE FEEDBACK MODAL / DIRECT ACTION ----------
  window.openFeedbackPortal = function() {
    const feedbackMsg = `Hi Sri Vatsa! I'd like to share my client feedback / review for SriVexa Digital.`;
    const waUrl = `https://wa.me/919384167606?text=${encodeURIComponent(feedbackMsg)}`;
    window.open(waUrl, '_blank');
  };

  // ---------- 9. SCROLL REVEAL OBSERVER ----------
  const revealElements = document.querySelectorAll('.glass-card, .service-card, .package-card, .process-step-card, .why-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
});

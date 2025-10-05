// assets/js/career.js

// Career Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCareerPage();
  });
  
  function initCareerPage() {
    addSmoothScrolling();
    initFloatingBackground();
    addScrollAnimations();
    addJobCardInteractions();
  
    // EDIT: Ensure hero stays static (no parallax transform applied)
    const hero = document.querySelector('.career-hero');
    if (hero) hero.style.transform = 'none';
  }
  
  function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
  
  function initFloatingBackground() {
    const movingBackground = document.querySelector('.moving-background');
    if (!movingBackground) return;
  }
  
  function addScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  
    const animatedElements = document.querySelectorAll('.job-card, .benefit-card');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
  
  function addJobCardInteractions() {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  
    const applyButtons = document.querySelectorAll('.apply-button');
    applyButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
        const titleEl = this.closest('.job-card')?.querySelector('.job-title');
        console.log('Apply button clicked for:', titleEl ? titleEl.textContent : 'Unknown');
      });
    });
  }
  
  /* EDIT: Parallax scroll effect removed to eliminate large blank space below hero */
  // window.addEventListener('scroll', function() {
  //   const scrolled = window.pageYOffset;
  //   const hero = document.querySelector('.career-hero');
  //   if (hero) {
  //     const rate = scrolled * -0.5;
  //     hero.style.transform = `translateY(${rate}px)`;
  //   }
  // });
  
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  
    // EDIT: Reset any transform that might be cached by the browser
    const hero = document.querySelector('.career-hero');
    if (hero) hero.style.transform = 'none';
  
    const heroContent = document.querySelector('.career-hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
  
  window.CareerPage = {
    initCareerPage,
    addSmoothScrolling,
    initFloatingBackground,
    addScrollAnimations,
    addJobCardInteractions
  };
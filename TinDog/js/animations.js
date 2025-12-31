// TinDog - Optimized Anime.js Animations
// Performance-focused version

class TinDogAnimations {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.activeAnimations = [];
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Skip heavy animations if user prefers reduced motion
    if (this.isReducedMotion) {
      this.setupMinimalAnimations();
      return;
    }

    this.heroAnimations();
    this.setupScrollAnimations();
    this.setupButtonEffects();
    this.createFloatingElements(); // Reduced count
    this.animateStats();
  }

  setupMinimalAnimations() {
    // Simple fade-ins only for accessibility
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ===== HERO ANIMATIONS (Optimized) =====
  heroAnimations() {
    const phoneImage = document.querySelector('.hero-phone');
    if (phoneImage) {
      // Simple CSS animation instead of JS - more performant
      phoneImage.style.animation = 'float 4s ease-in-out infinite';
    }

    // Hero title - simple fade in (no letter wrapping for performance)
    anime({
      targets: '.hero-title',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutCubic'
    });

    // Subtitle
    anime({
      targets: '.hero-subtitle',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: 200,
      easing: 'easeOutCubic'
    });

    // Buttons - simple stagger
    anime({
      targets: '.hero-buttons .btn',
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 400,
      delay: anime.stagger(100, { start: 400 }),
      easing: 'easeOutCubic'
    });
  }

  // ===== SCROLL ANIMATIONS (Throttled) =====
  setupScrollAnimations() {
    // Use IntersectionObserver for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .feature-card, .pricing-card, .testimonial-card').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  revealElement(element) {
    const animations = {
      'reveal': { translateY: [40, 0] },
      'reveal-left': { translateX: [-60, 0] },
      'reveal-right': { translateX: [60, 0] },
      'reveal-scale': { scale: [0.9, 1] },
      'feature-card': { translateY: [50, 0] },
      'pricing-card': { translateY: [50, 0] },
      'testimonial-card': { scale: [0.95, 1] }
    };

    let animProps = { translateY: [30, 0] }; // default

    for (const [className, props] of Object.entries(animations)) {
      if (element.classList.contains(className)) {
        animProps = props;
        break;
      }
    }

    anime({
      targets: element,
      ...animProps,
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutCubic'
    });

    // Animate icon inside feature card
    if (element.classList.contains('feature-card')) {
      const icon = element.querySelector('.feature-icon');
      if (icon) {
        anime({
          targets: icon,
          scale: [0.5, 1],
          duration: 400,
          delay: 150,
          easing: 'easeOutCubic'
        });
      }
    }
  }

  // ===== BUTTON EFFECTS (Simplified) =====
  setupButtonEffects() {
    // Use CSS for hover states - much more performant
    // Only add JS for special action buttons
    this.setupActionButtons();
  }

  setupActionButtons() {
    const btnLike = document.querySelector('.btn-like');
    const btnNope = document.querySelector('.btn-nope');
    const btnSuperLike = document.querySelector('.btn-super-like');

    if (btnLike) {
      btnLike.addEventListener('click', () => this.quickPulse(btnLike, '#4ade80'));
    }

    if (btnNope) {
      btnNope.addEventListener('click', () => this.quickShake(btnNope));
    }

    if (btnSuperLike) {
      btnSuperLike.addEventListener('click', () => this.quickPulse(btnSuperLike, '#3b82f6'));
    }
  }

  // Lightweight pulse animation
  quickPulse(element, color) {
    anime({
      targets: element,
      scale: [1, 1.2, 1],
      duration: 300,
      easing: 'easeOutCubic'
    });
  }

  // Lightweight shake animation
  quickShake(element) {
    anime({
      targets: element,
      translateX: [-8, 8, -6, 6, -4, 4, 0],
      duration: 400,
      easing: 'easeOutCubic'
    });
  }

  // ===== FLOATING ELEMENTS (Reduced) =====
  createFloatingElements() {
    const swipeSection = document.querySelector('.swipe-section');
    if (!swipeSection) return;

    const emojis = ['🐕', '🐱', '💕', '✨'];

    // Only 5 emojis instead of 12
    for (let i = 0; i < 5; i++) {
      const emoji = document.createElement('div');
      emoji.className = 'floating-emoji';
      emoji.textContent = emojis[i % emojis.length];
      emoji.style.cssText = `
        position: absolute;
        font-size: ${22 + Math.random() * 12}px;
        opacity: 0.4;
        pointer-events: none;
        z-index: 1;
        left: ${10 + Math.random() * 80}%;
        will-change: transform;
      `;
      swipeSection.appendChild(emoji);

      // Use CSS animation instead of JS for floating
      emoji.style.animation = `floatUp ${12 + Math.random() * 8}s linear infinite`;
      emoji.style.animationDelay = `${Math.random() * 10}s`;
    }
  }

  // ===== STATS COUNTER =====
  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseInt(stat.dataset.count) || 0;

          anime({
            targets: stat,
            innerHTML: [0, target],
            round: 1,
            duration: 1500,
            easing: 'easeOutCubic'
          });

          observer.unobserve(stat);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  // ===== CARD ANIMATIONS (For swipe system) =====
  cardSwipeRight(card, callback) {
    anime({
      targets: card,
      translateX: window.innerWidth + 100,
      rotate: 20,
      opacity: 0,
      duration: 300,
      easing: 'easeOutCubic',
      complete: callback
    });
  }

  cardSwipeLeft(card, callback) {
    anime({
      targets: card,
      translateX: -window.innerWidth - 100,
      rotate: -20,
      opacity: 0,
      duration: 300,
      easing: 'easeOutCubic',
      complete: callback
    });
  }

  cardSwipeUp(card, callback) {
    anime({
      targets: card,
      translateY: -window.innerHeight - 100,
      scale: 0.8,
      opacity: 0,
      duration: 300,
      easing: 'easeOutCubic',
      complete: callback
    });
  }

  cardStackUpdate(cards) {
    if (cards.length > 0 && cards[0]) {
      anime({
        targets: cards[0],
        scale: [0.95, 1],
        translateY: [10, 0],
        duration: 250,
        easing: 'easeOutCubic'
      });
    }
  }

  // ===== MATCH CELEBRATION (Simplified) =====
  matchCelebration() {
    // Only 10 particles instead of 30
    const particles = [];
    const emojis = ['❤️', '💕', '✨'];

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.innerHTML = emojis[i % emojis.length];
      particle.style.cssText = `
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 9999;
        left: 50%;
        top: 50%;
        will-change: transform, opacity;
      `;
      document.body.appendChild(particle);
      particles.push(particle);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-250, 250),
      translateY: () => anime.random(-250, 150),
      scale: [1, 0],
      opacity: [1, 0],
      duration: 800,
      easing: 'easeOutCubic',
      complete: () => particles.forEach(p => p.remove())
    });
  }

  // ===== CLEANUP =====
  destroy() {
    this.activeAnimations.forEach(anim => anim.pause());
    this.activeAnimations = [];
  }
}

// Create global instance
const tinDogAnimations = new TinDogAnimations();
window.tinDogAnimations = tinDogAnimations;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TinDogAnimations;
}

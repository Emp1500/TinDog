// TinDog - Main Application Controller

// Global instances
let swipeCards = null;
let matchSystem = null;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  console.log('🐕 TinDog App Initializing...');

  // Initialize match system
  matchSystem = new MatchSystem({
    matchProbability: 0.35, // 35% chance of match
    onMatch: (profile) => {
      console.log(`🎉 Matched with ${profile.name}!`);
    }
  });

  // Initialize swipe cards
  const cardContainer = document.querySelector('.card-container');
  if (cardContainer) {
    swipeCards = new SwipeCards('.card-container', {
      threshold: 100,
      rotationMultiplier: 0.1,
      maxRotation: 20,

      likeCallback: (profile) => {
        console.log(`❤️ Liked ${profile.name}`);
        matchSystem.addLike(profile);

        // Check for match with animation
        setTimeout(() => {
          matchSystem.checkForMatch(profile);
        }, 300);
      },

      nopeCallback: (profile) => {
        console.log(`👎 Passed on ${profile.name}`);
      },

      superLikeCallback: (profile) => {
        console.log(`⭐ Super Liked ${profile.name}`);
        // Super likes always match!
        matchSystem.addMatch(profile);
      },

      emptyCallback: () => {
        console.log('📭 No more profiles');
      }
    });
  }

  // Setup action buttons
  setupActionButtons();

  // Setup keyboard shortcuts
  setupKeyboardShortcuts();

  // Setup header navigation
  setupNavigation();

  // Initialize any remaining animations
  initPageAnimations();

  console.log('✅ TinDog App Ready!');
}

function setupActionButtons() {
  const btnNope = document.querySelector('.btn-nope');
  const btnLike = document.querySelector('.btn-like');
  const btnSuperLike = document.querySelector('.btn-super-like');

  if (btnNope) {
    btnNope.addEventListener('click', () => {
      if (swipeCards) swipeCards.nope();
    });
  }

  if (btnLike) {
    btnLike.addEventListener('click', () => {
      if (swipeCards) swipeCards.like();
    });
  }

  if (btnSuperLike) {
    btnSuperLike.addEventListener('click', () => {
      if (swipeCards) swipeCards.superLikeAction();
    });
  }
}

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Don't trigger if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (swipeCards) swipeCards.nope();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (swipeCards) swipeCards.like();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (swipeCards) swipeCards.superLikeAction();
        break;
      case 'Escape':
        closeProfileModal();
        break;
    }
  });
}

function setupNavigation() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.app-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // Navigation toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
}

function initPageAnimations() {
  // Animate swipe section entrance
  anime({
    targets: '.swipe-section',
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo'
  });

  // Animate card container
  anime({
    targets: '.card-container',
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 600,
    delay: 300,
    easing: 'easeOutElastic(1, .5)'
  });

  // Animate action buttons
  anime({
    targets: '.action-btn',
    scale: [0, 1],
    opacity: [0, 1],
    delay: anime.stagger(100, { start: 500 }),
    duration: 400,
    easing: 'easeOutElastic(1, .5)'
  });

  // Stats counter animation
  const stats = document.querySelectorAll('[data-count]');
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.count);
    anime({
      targets: stat,
      innerHTML: [0, target],
      round: 1,
      duration: 2000,
      delay: 1000,
      easing: 'easeOutExpo'
    });
  });
}

// Filter functionality
function filterByAnimalType(type) {
  const filtered = type === 'all'
    ? animals
    : animals.filter(a => a.type === type);

  if (swipeCards) {
    swipeCards.cards = filtered.map((animal, index) => ({
      element: swipeCards.createCardElement(animal, index),
      data: animal,
      index
    }));
    swipeCards.createCards();
  }
}

// Expose functions globally
window.swipeCards = null;
window.matchSystem = null;
window.filterByAnimalType = filterByAnimalType;
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;

// Update global references after init
document.addEventListener('DOMContentLoaded', () => {
  window.swipeCards = swipeCards;
  window.matchSystem = matchSystem;
});

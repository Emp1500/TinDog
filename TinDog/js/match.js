// TinDog - Match System with Confetti Celebration

class MatchSystem {
  constructor(options = {}) {
    this.options = {
      matchProbability: 0.3, // 30% chance of match
      userProfile: {
        name: 'You',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
      },
      onMatch: () => {},
      ...options
    };

    this.matches = [];
    this.likedProfiles = [];
    this.init();
  }

  init() {
    this.loadMatches();
    this.renderMatchesTray();
  }

  // Check if swiped profile is a match
  checkForMatch(profile) {
    // Random match based on probability
    const isMatch = Math.random() < this.options.matchProbability;

    if (isMatch) {
      this.addMatch(profile);
      return true;
    }

    return false;
  }

  addMatch(profile) {
    if (!this.matches.find(m => m.id === profile.id)) {
      this.matches.push({
        ...profile,
        matchedAt: new Date().toISOString()
      });
      this.saveMatches();
      this.renderMatchesTray();
      this.options.onMatch(profile);
    }
  }

  // Render matches tray in sidebar
  renderMatchesTray() {
    let tray = document.querySelector('.matches-tray');

    if (!tray) {
      tray = document.createElement('div');
      tray.className = 'matches-tray';
      document.body.appendChild(tray);
    }

    if (this.matches.length === 0) {
      tray.innerHTML = '';
      return;
    }

    const recentMatches = this.matches.slice(-5).reverse();
    const remainingCount = Math.max(0, this.matches.length - 5);

    tray.innerHTML = `
      ${recentMatches.map(match => `
        <img
          src="${match.image}"
          alt="${match.name}"
          class="match-avatar"
          title="${match.name}"
          data-id="${match.id}"
        >
      `).join('')}
      ${remainingCount > 0 ? `
        <div class="matches-count" title="View all matches">
          +${remainingCount}
        </div>
      ` : ''}
    `;

    // Animate new match avatars
    anime({
      targets: '.match-avatar',
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 400,
      easing: 'easeOutElastic(1, .5)'
    });

    // Add click handlers
    tray.querySelectorAll('.match-avatar').forEach(avatar => {
      avatar.addEventListener('click', () => {
        const matchId = parseInt(avatar.dataset.id);
        const match = this.matches.find(m => m.id === matchId);
        if (match && typeof openProfileModal === 'function') {
          openProfileModal(match);
        }
      });
    });
  }

  // Local storage persistence
  saveMatches() {
    try {
      localStorage.setItem('tindog_matches', JSON.stringify(this.matches));
    } catch (e) {
      console.warn('Could not save matches to localStorage');
    }
  }

  loadMatches() {
    try {
      const saved = localStorage.getItem('tindog_matches');
      if (saved) {
        this.matches = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load matches from localStorage');
    }
  }

  // Add to liked profiles (for potential future mutual matching)
  addLike(profile) {
    if (!this.likedProfiles.find(p => p.id === profile.id)) {
      this.likedProfiles.push(profile);
    }
  }

  // Get all matches
  getMatches() {
    return this.matches;
  }

  // Clear all matches (for testing)
  clearMatches() {
    this.matches = [];
    this.saveMatches();
    this.renderMatchesTray();
  }

  // Get match count
  getMatchCount() {
    return this.matches.length;
  }
}

// Profile Modal functionality
function openProfileModal(profile) {
  let modal = document.querySelector('.profile-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'profile-modal';
    document.body.appendChild(modal);
  }

  const animalIcons = {
    dog: '🐕',
    cat: '🐱',
    bird: '🦜',
    rabbit: '🐰'
  };

  modal.innerHTML = `
    <div class="profile-modal-content">
      <button class="modal-close">&times;</button>
      <img src="${profile.image}" alt="${profile.name}" class="modal-image">
      <div class="modal-info">
        <div class="card-name-row">
          <h2>${profile.name}</h2>
          <span class="card-age">${profile.age}</span>
          ${profile.verified ? '<span class="verified-badge"><i class="fas fa-check"></i></span>' : ''}
        </div>
        <p class="breed">
          ${animalIcons[profile.type] || '🐾'} ${profile.breed}
        </p>
        <p class="card-location">
          <i class="fas fa-map-marker-alt"></i>
          ${profile.location} • ${profile.distance}
        </p>
        <p class="bio">${profile.bio}</p>
        <div class="card-interests">
          ${profile.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
        </div>
      </div>
      <div class="modal-actions">
        <button class="action-btn btn-nope modal-nope">
          <i class="fas fa-times"></i>
        </button>
        <button class="action-btn btn-super-like modal-super">
          <i class="fas fa-star"></i>
        </button>
        <button class="action-btn btn-like modal-like">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  `;

  // Show modal
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  // Animate content
  anime({
    targets: '.profile-modal-content',
    scale: [0.9, 1],
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutCubic'
  });

  // Animate interest tags
  anime({
    targets: '.profile-modal .interest-tag',
    scale: [0, 1],
    opacity: [0, 1],
    delay: anime.stagger(50, { start: 300 }),
    duration: 300,
    easing: 'easeOutElastic(1, .5)'
  });

  // Close handlers
  modal.querySelector('.modal-close').addEventListener('click', closeProfileModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProfileModal();
  });

  // Action button handlers
  modal.querySelector('.modal-nope').addEventListener('click', () => {
    closeProfileModal();
    if (window.swipeCards) swipeCards.nope();
  });

  modal.querySelector('.modal-like').addEventListener('click', () => {
    closeProfileModal();
    if (window.swipeCards) swipeCards.like();
  });

  modal.querySelector('.modal-super').addEventListener('click', () => {
    closeProfileModal();
    if (window.swipeCards) swipeCards.superLikeAction();
  });
}

function closeProfileModal() {
  const modal = document.querySelector('.profile-modal');
  if (!modal) return;

  anime({
    targets: '.profile-modal-content',
    scale: [1, 0.9],
    opacity: [1, 0],
    duration: 300,
    easing: 'easeInCubic',
    complete: () => {
      modal.classList.remove('active');
    }
  });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MatchSystem, openProfileModal, closeProfileModal };
}

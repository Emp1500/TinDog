// TinDog - Swipe Card System with Hammer.js

class SwipeCards {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.cardStack = this.container.querySelector('.card-stack');
    this.options = {
      threshold: 100,
      rotationMultiplier: 0.1,
      maxRotation: 20,
      likeCallback: () => {},
      nopeCallback: () => {},
      superLikeCallback: () => {},
      emptyCallback: () => {},
      ...options
    };

    this.cards = [];
    this.currentIndex = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.init();
  }

  init() {
    this.createCards();
    this.attachEventListeners();
  }

  createCards() {
    // Clear existing cards
    this.cardStack.innerHTML = '';
    this.cards = [];

    // Get shuffled animals
    const shuffledAnimals = shuffleAnimals();

    // Create cards (show max 3 at a time for performance)
    const visibleCount = Math.min(3, shuffledAnimals.length);

    for (let i = 0; i < shuffledAnimals.length; i++) {
      const animal = shuffledAnimals[i];
      const card = this.createCardElement(animal, i);

      if (i < visibleCount) {
        card.style.display = 'block';
        this.cardStack.appendChild(card);
      }

      this.cards.push({ element: card, data: animal, index: i });
    }

    this.updateCardPositions();
  }

  createCardElement(animal, index) {
    const card = document.createElement('div');
    card.className = 'swipe-card';
    card.dataset.id = animal.id;
    card.dataset.index = index;

    const animalIcons = {
      dog: '🐕',
      cat: '🐱',
      bird: '🦜',
      rabbit: '🐰'
    };

    card.innerHTML = `
      <div class="card-image-container">
        <img src="${animal.image}" alt="${animal.name}" class="card-image" loading="lazy">
        <div class="swipe-overlay like">LIKE</div>
        <div class="swipe-overlay nope">NOPE</div>
        <div class="swipe-overlay super-like">SUPER LIKE</div>
      </div>
      <div class="card-info">
        <div class="card-name-row">
          <h2 class="card-name">${animal.name}</h2>
          <span class="card-age">${animal.age}</span>
          ${animal.verified ? '<span class="verified-badge"><i class="fas fa-check"></i></span>' : ''}
        </div>
        <p class="card-breed">
          <span class="animal-icon">${animalIcons[animal.type] || '🐾'}</span>
          ${animal.breed}
        </p>
        <p class="card-location">
          <i class="fas fa-map-marker-alt"></i>
          ${animal.location} • ${animal.distance}
        </p>
        <p class="card-bio">${animal.bio}</p>
        <div class="card-interests">
          ${animal.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
        </div>
      </div>
    `;

    return card;
  }

  attachEventListeners() {
    // Use Hammer.js for touch gestures
    this.setupHammer();

    // Mouse events for desktop
    this.cardStack.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onDragMove.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));

    // Card click for profile details
    this.cardStack.addEventListener('click', this.onCardClick.bind(this));
  }

  setupHammer() {
    const topCard = this.getTopCard();
    if (!topCard) return;

    // Remove existing hammer instance
    if (this.hammer) {
      this.hammer.destroy();
    }

    this.hammer = new Hammer(topCard.element);
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    this.hammer.on('panstart', (e) => {
      this.isDragging = true;
      topCard.element.style.transition = 'none';
    });

    this.hammer.on('panmove', (e) => {
      if (!this.isDragging) return;

      const x = e.deltaX;
      const y = e.deltaY;
      const rotation = x * this.options.rotationMultiplier;
      const clampedRotation = Math.max(-this.options.maxRotation, Math.min(this.options.maxRotation, rotation));

      topCard.element.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${clampedRotation}deg)`;

      // Update overlay opacity
      this.updateOverlays(x, y);
    });

    this.hammer.on('panend', (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;

      const x = e.deltaX;
      const y = e.deltaY;
      const velocity = Math.abs(e.velocityX);

      topCard.element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

      // Determine swipe direction
      if (x > this.options.threshold || (x > 50 && velocity > 0.5)) {
        this.swipeRight();
      } else if (x < -this.options.threshold || (x < -50 && velocity > 0.5)) {
        this.swipeLeft();
      } else if (y < -this.options.threshold) {
        this.superLike();
      } else {
        this.resetCard();
      }
    });
  }

  onDragStart(e) {
    if (e.target.closest('.action-btn')) return;

    const topCard = this.getTopCard();
    if (!topCard) return;

    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    topCard.element.style.transition = 'none';
  }

  onDragMove(e) {
    if (!this.isDragging) return;

    const topCard = this.getTopCard();
    if (!topCard) return;

    this.currentX = e.clientX - this.startX;
    this.currentY = e.clientY - this.startY;

    const rotation = this.currentX * this.options.rotationMultiplier;
    const clampedRotation = Math.max(-this.options.maxRotation, Math.min(this.options.maxRotation, rotation));

    topCard.element.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotate(${clampedRotation}deg)`;

    this.updateOverlays(this.currentX, this.currentY);
  }

  onDragEnd(e) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const topCard = this.getTopCard();
    if (!topCard) return;

    topCard.element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    if (this.currentX > this.options.threshold) {
      this.swipeRight();
    } else if (this.currentX < -this.options.threshold) {
      this.swipeLeft();
    } else if (this.currentY < -this.options.threshold) {
      this.superLike();
    } else {
      this.resetCard();
    }

    this.currentX = 0;
    this.currentY = 0;
  }

  onCardClick(e) {
    if (this.isDragging) return;
    if (Math.abs(this.currentX) > 5 || Math.abs(this.currentY) > 5) return;

    const topCard = this.getTopCard();
    if (!topCard) return;

    // Open profile modal
    if (typeof openProfileModal === 'function') {
      openProfileModal(topCard.data);
    }
  }

  updateOverlays(x, y) {
    const topCard = this.getTopCard();
    if (!topCard) return;

    const likeOverlay = topCard.element.querySelector('.swipe-overlay.like');
    const nopeOverlay = topCard.element.querySelector('.swipe-overlay.nope');
    const superLikeOverlay = topCard.element.querySelector('.swipe-overlay.super-like');

    // Reset all overlays
    likeOverlay.style.opacity = 0;
    nopeOverlay.style.opacity = 0;
    superLikeOverlay.style.opacity = 0;

    if (x > 30) {
      likeOverlay.style.opacity = Math.min(x / this.options.threshold, 1);
    } else if (x < -30) {
      nopeOverlay.style.opacity = Math.min(-x / this.options.threshold, 1);
    }

    if (y < -30) {
      superLikeOverlay.style.opacity = Math.min(-y / this.options.threshold, 1);
    }
  }

  resetCard() {
    const topCard = this.getTopCard();
    if (!topCard) return;

    topCard.element.style.transform = 'translateX(0) translateY(0) rotate(0)';

    // Reset overlays
    const overlays = topCard.element.querySelectorAll('.swipe-overlay');
    overlays.forEach(overlay => overlay.style.opacity = 0);
  }

  swipeRight() {
    const topCard = this.getTopCard();
    if (!topCard) return;

    // Fast, smooth animation
    anime({
      targets: topCard.element,
      translateX: window.innerWidth + 100,
      rotate: 15,
      opacity: 0,
      duration: 280,
      easing: 'easeOutQuad',
      complete: () => {
        this.removeTopCard();
        this.options.likeCallback(topCard.data);
      }
    });
  }

  swipeLeft() {
    const topCard = this.getTopCard();
    if (!topCard) return;

    anime({
      targets: topCard.element,
      translateX: -window.innerWidth - 100,
      rotate: -15,
      opacity: 0,
      duration: 280,
      easing: 'easeOutQuad',
      complete: () => {
        this.removeTopCard();
        this.options.nopeCallback(topCard.data);
      }
    });
  }

  superLike() {
    const topCard = this.getTopCard();
    if (!topCard) return;

    anime({
      targets: topCard.element,
      translateY: -window.innerHeight - 100,
      scale: 0.9,
      opacity: 0,
      duration: 280,
      easing: 'easeOutQuad',
      complete: () => {
        this.removeTopCard();
        this.options.superLikeCallback(topCard.data);
      }
    });
  }

  removeTopCard() {
    if (this.cards.length === 0) return;

    const topCard = this.cards.shift();
    topCard.element.remove();

    // Update positions of remaining cards
    this.updateCardPositions();

    // Reinitialize hammer for new top card
    this.setupHammer();

    // Check if empty
    if (this.cards.length === 0) {
      this.showEmptyState();
      this.options.emptyCallback();
    }
  }

  updateCardPositions() {
    this.cards.forEach((card, index) => {
      if (index < 3) {
        card.element.style.display = 'block';
        card.element.style.zIndex = this.cards.length - index;

        if (index === 0) {
          card.element.style.transform = 'scale(1) translateY(0)';
          card.element.style.opacity = 1;
        } else if (index === 1) {
          card.element.style.transform = 'scale(0.95) translateY(12px)';
          card.element.style.opacity = 0.7;
        } else if (index === 2) {
          card.element.style.transform = 'scale(0.9) translateY(24px)';
          card.element.style.opacity = 0.5;
        }
      } else {
        card.element.style.display = 'none';
      }
    });

    // Quick stack animation
    if (this.cards.length > 0) {
      anime({
        targets: this.cards[0].element,
        scale: [0.95, 1],
        translateY: [12, 0],
        duration: 200,
        easing: 'easeOutQuad'
      });
    }
  }

  getTopCard() {
    return this.cards[0] || null;
  }

  showEmptyState() {
    this.cardStack.innerHTML = `
      <div class="empty-state fade-in">
        <h2>No more profiles!</h2>
        <p>You've seen everyone in your area. Check back later for new furry friends!</p>
        <button class="reload-btn" onclick="location.reload()">
          <i class="fas fa-redo"></i> Start Over
        </button>
      </div>
    `;
  }

  // Public methods for button controls
  like() {
    this.swipeRight();
  }

  nope() {
    this.swipeLeft();
  }

  superLikeAction() {
    this.superLike();
  }

  // Reload cards
  reload() {
    this.currentIndex = 0;
    this.createCards();
    this.setupHammer();
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwipeCards;
}

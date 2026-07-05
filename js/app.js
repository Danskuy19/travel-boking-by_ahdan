// ================================================
// MAIN APPLICATION
// ================================================

class TravelHub {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.themeToggle = document.getElementById('theme-toggle');
        this.menuToggle = document.getElementById('menu-toggle');
        this.navbarMenu = document.getElementById('navbar-menu');
        this.navbar = document.querySelector('.navbar');
        this.backToTop = document.getElementById('back-to-top');
        this.slider = null;
        this.testimonialsSlider = null;
        this.init();
    }

    /**
     * Initialize app
     */
    init() {
        this.setupTheme();
        this.setupNavbar();
        this.setupBackToTop();
        this.setupScrollProgress();
        this.setupOfflineDetection();
        this.setupHeroCarousel();
        this.setupCounters();
        this.setupCountdown();
        this.setupTestimonials();
        this.setupDestinations();
        this.setupHotels();
        this.setupNewsletterForm();
        this.setupModals();
        this.setupFloatingChat();
        this.hideLoadingScreen();
    }

    /**
     * Setup theme toggle
     */
    setupTheme() {
        const currentTheme = storage.get('theme') || 'light';
        this.setTheme(currentTheme);

        this.themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            storage.set('theme', newTheme);
        });
    }

    /**
     * Set theme
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    /**
     * Setup navbar
     */
    setupNavbar() {
        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.menuToggle.classList.toggle('active');
            this.navbarMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        this.navbarMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.menuToggle.classList.remove('active');
                this.navbarMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    /**
     * Setup back to top
     */
    setupBackToTop() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.backToTop.classList.add('visible');
            } else {
                this.backToTop.classList.remove('visible');
            }
        });

        this.backToTop.addEventListener('click', () => {
            smoothScroll(document.documentElement);
        });
    }

    /**
     * Setup scroll progress
     */
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    /**
     * Setup offline detection
     */
    setupOfflineDetection() {
        const offlineBanner = document.getElementById('offline-banner');

        window.addEventListener('online', () => {
            offlineBanner.style.display = 'none';
            showSuccess('You are back online!');
        });

        window.addEventListener('offline', () => {
            offlineBanner.style.display = 'block';
        });
    }

    /**
     * Setup hero carousel
     */
    setupHeroCarousel() {
        this.slider = new Slider('.hero-carousel');
    }

    /**
     * Setup counters
     */
    setupCounters() {
        initializeCounters();
    }

    /**
     * Setup countdown
     */
    setupCountdown() {
        initializeCountdown();
    }

    /**
     * Setup testimonials
     */
    setupTestimonials() {
        const testimonials = [
            {
                name: 'John Doe',
                country: 'USA',
                avatar: 'https://i.pravatar.cc/80?img=1',
                rating: 5,
                comment: 'Amazing platform! Found the perfect hotel for my vacation.',
            },
            {
                name: 'Emma Wilson',
                country: 'UK',
                avatar: 'https://i.pravatar.cc/80?img=2',
                rating: 5,
                comment: 'Great customer service and easy booking process.',
            },
            {
                name: 'Maria Garcia',
                country: 'Spain',
                avatar: 'https://i.pravatar.cc/80?img=3',
                rating: 5,
                comment: 'Best travel booking experience ever!',
            },
        ];

        const slider = new TestimonialsSlider('#testimonials-slider');
        let index = 0;
        slider.show(testimonials);
        setInterval(() => {
            index = (index + 1) % testimonials.length;
            slider.show([testimonials[index]]);
        }, 4000);
    }

    /**
     * Setup destinations
     */
    setupDestinations() {
        const destinations = [
            {
                id: 1,
                name: 'Bali',
                country: 'Indonesia',
                image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=400&h=300&fit=crop',
                price: 350,
                rating: 4.8,
                reviews: 2410,
            },
            {
                id: 2,
                name: 'Paris',
                country: 'France',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
                price: 450,
                rating: 4.9,
                reviews: 3210,
            },
            {
                id: 3,
                name: 'Tokyo',
                country: 'Japan',
                image: 'https://images.unsplash.com/photo-1534599936562-3331a6ad7256?w=400&h=300&fit=crop',
                price: 520,
                rating: 4.7,
                reviews: 2890,
            },
        ];

        const grid = document.getElementById('destinations-grid');
        grid.innerHTML = destinations.map(dest => `
            <div class="destination-card">
                <img src="${dest.image}" alt="${dest.name}" class="destination-card-image">
                <div class="destination-card-content">
                    <h3>${dest.name}</h3>
                    <div class="destination-card-meta">
                        <span>${dest.country}</span>
                    </div>
                    <div class="destination-card-price">From ${formatCurrency(dest.price)}</div>
                    <div class="destination-card-rating">
                        <span class="star">★</span>
                        <span>${dest.rating} (${dest.reviews} reviews)</span>
                    </div>
                    <button class="btn-primary destination-card-btn">Explore</button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Setup hotels
     */
    setupHotels() {
        const hotels = [
            {
                id: 1,
                name: 'Luxury Beach Resort',
                location: 'Bali, Indonesia',
                image: 'https://images.unsplash.com/photo-1551632786-de41eccfccce?w=400&h=300&fit=crop',
                price: 250,
                rating: 5,
                facilities: ['WiFi', 'Swimming Pool', 'Breakfast', 'Parking'],
            },
            {
                id: 2,
                name: 'Paris City Hotel',
                location: 'Paris, France',
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
                price: 320,
                rating: 5,
                facilities: ['WiFi', 'Breakfast', 'Parking', 'Pet Friendly'],
            },
            {
                id: 3,
                name: 'Tokyo Premium Suite',
                location: 'Tokyo, Japan',
                image: 'https://images.unsplash.com/photo-1606402961290-142acbe0aacd?w=400&h=300&fit=crop',
                price: 280,
                rating: 4,
                facilities: ['WiFi', 'Swimming Pool', 'Breakfast', 'Parking'],
            },
        ];

        const grid = document.getElementById('hotels-grid');
        grid.innerHTML = hotels.map(hotel => `
            <div class="hotel-card">
                <div class="hotel-card-image">
                    <img src="${hotel.image}" alt="${hotel.name}">
                    <button class="hotel-favorite-btn ${favoritesManager.isFavorite(hotel.id) ? 'active' : ''}" data-hotel-id="${hotel.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="hotel-card-content">
                    <div class="hotel-card-header">
                        <h3>${hotel.name}</h3>
                        <div class="hotel-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${hotel.location}
                        </div>
                    </div>
                    <div class="hotel-stars">
                        ${Array(hotel.rating).fill('<span class="star">★</span>').join('')}
                    </div>
                    <div class="hotel-price">${formatCurrency(hotel.price)} <small>/night</small></div>
                    <div class="hotel-facilities">
                        ${hotel.facilities.map(f => `<span class="facility-tag">${f}</span>`).join('')}
                    </div>
                    <div class="hotel-card-actions">
                        <button class="btn-outline">Details</button>
                        <button class="btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Setup favorite buttons
        document.querySelectorAll('.hotel-favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const hotelId = parseInt(btn.dataset.hotelId);
                const hotel = hotels.find(h => h.id === hotelId);
                const isFavorited = favoritesManager.toggle(hotel);
                btn.classList.toggle('active', isFavorited);
                this.updateFavoritesCount();
                showSuccess(isFavorited ? 'Added to favorites!' : 'Removed from favorites!');
            });
        });
    }

    /**
     * Setup newsletter form
     */
    setupNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            if (validateEmail(email)) {
                showSuccess('Thank you for subscribing!');
                form.reset();
            } else {
                showError('Please enter a valid email address');
            }
        });
    }

    /**
     * Setup modals
     */
    setupModals() {
        // Login button
        document.getElementById('login-btn').addEventListener('click', () => {
            document.getElementById('login-modal').classList.add('active');
        });

        // Favorites button
        document.getElementById('favorites-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showFavoritesModal();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.remove('active');
            });
        });

        // Close modal on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Search booking form
        document.getElementById('search-booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            showSuccess('Searching for hotels...');
            setTimeout(() => {
                window.location.href = 'pages/hotels.html';
            }, 1000);
        });
    }

    /**
     * Show favorites modal
     */
    showFavoritesModal() {
        const modal = document.getElementById('favorites-modal');
        const body = document.getElementById('favorites-modal-body');
        const favorites = favoritesManager.getAll();

        if (favorites.length === 0) {
            body.innerHTML = '<p style="text-align: center; padding: 2rem;">No favorites yet!</p>';
        } else {
            body.innerHTML = favorites.map(hotel => `
                <div class="hotel-card" style="margin-bottom: 1rem;">
                    <div class="hotel-card-content">
                        <h3>${hotel.name}</h3>
                        <p>${hotel.location}</p>
                        <p><strong>${formatCurrency(hotel.price)}</strong></p>
                    </div>
                </div>
            `).join('');
        }

        modal.classList.add('active');
    }

    /**
     * Update favorites count
     */
    updateFavoritesCount() {
        const count = favoritesManager.getAll().length;
        document.getElementById('favorites-count').textContent = count;
    }

    /**
     * Setup floating chat
     */
    setupFloatingChat() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatWidget = document.getElementById('chat-widget');
        const chatClose = document.getElementById('chat-close');
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        chatToggle.addEventListener('click', () => {
            chatWidget.style.display = chatWidget.style.display === 'none' ? 'flex' : 'none';
        });

        chatClose.addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });

        chatSend.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message user';
                userMessage.innerHTML = `<p>${message}</p>`;
                chatMessages.appendChild(userMessage);

                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Bot response
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-message bot';
                    botMessage.innerHTML = '<p>Thanks for your message! Our team will respond shortly.</p>';
                    chatMessages.appendChild(botMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 500);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') chatSend.click();
        });
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
        }, 1000);
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TravelHub();
    });
} else {
    new TravelHub();
}

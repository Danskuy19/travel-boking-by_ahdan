// ================================================
// HERO CAROUSEL / SLIDER
// ================================================

class Slider {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.slides = this.container.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        this.init();
    }

    /**
     * Initialize slider
     */
    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        this.autoPlay();
    }

    /**
     * Show slide
     */
    show(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        this.currentIndex = index;
    }

    /**
     * Next slide
     */
    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.show(nextIndex);
        this.resetAutoPlay();
    }

    /**
     * Previous slide
     */
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.show(prevIndex);
        this.resetAutoPlay();
    }

    /**
     * Go to specific slide
     */
    goTo(index) {
        this.show(index);
        this.resetAutoPlay();
    }

    /**
     * Auto play
     */
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }

    /**
     * Reset auto play
     */
    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlay();
    }
}

// ================================================
// TESTIMONIALS SLIDER
// ================================================

class TestimonialsSlider {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.currentIndex = 0;
        this.autoPlayDelay = 4000;
        this.init();
    }

    /**
     * Initialize testimonials slider
     */
    init() {
        this.autoPlay();
    }

    /**
     * Show testimonial
     */
    show(testimonials) {
        if (testimonials.length === 0) return;

        const testimonial = testimonials[this.currentIndex];
        const html = `
            <div class="testimonial-card">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-stars">${'★'.repeat(testimonial.rating)}</div>
                <p class="testimonial-text">"${testimonial.comment}"</p>
                <div class="testimonial-author">${testimonial.name}</div>
                <div class="testimonial-country">${testimonial.country}</div>
            </div>
        `;
        this.container.innerHTML = html;
    }

    /**
     * Next testimonial
     */
    next(testimonials) {
        this.currentIndex = (this.currentIndex + 1) % testimonials.length;
        this.show(testimonials);
    }

    /**
     * Auto play
     */
    autoPlay() {
        // Will be called from app.js with testimonials data
    }
}

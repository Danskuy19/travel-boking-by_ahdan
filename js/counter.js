// ================================================
// ANIMATED COUNTER
// ================================================

class Counter {
    constructor(element, target) {
        this.element = element;
        this.target = parseInt(target);
        this.current = 0;
        this.duration = 2000;
        this.increment = this.target / (this.duration / 16);
    }

    /**
     * Start counter animation
     */
    animate() {
        const updateCounter = () => {
            if (this.current < this.target) {
                this.current += this.increment;
                if (this.current > this.target) {
                    this.current = this.target;
                }
                this.element.textContent = Math.floor(this.current).toLocaleString();
                requestAnimationFrame(updateCounter);
            }
        };
        updateCounter();
    }
}

// ================================================
// COUNTER INITIALIZATION
// ================================================

function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = new Counter(entry.target, entry.target.dataset.target);
                counter.animate();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ================================================
// COUNTDOWN TIMER
// ================================================

class CountdownTimer {
    constructor(endDate) {
        this.endDate = new Date(endDate).getTime();
        this.updateInterval = null;
    }

    /**
     * Start countdown
     */
    start() {
        this.updateInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.endDate - now;

            if (distance < 0) {
                this.stop();
                this.onComplete();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.onUpdate(days, hours, minutes, seconds);
        }, 1000);
    }

    /**
     * Stop countdown
     */
    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    /**
     * On update callback
     */
    onUpdate(days, hours, minutes, seconds) {
        // Override in subclass
    }

    /**
     * On complete callback
     */
    onComplete() {
        // Override in subclass
    }
}

// ================================================
// COUNTDOWN INITIALIZATION
// ================================================

function initializeCountdown() {
    class PromoCountdown extends CountdownTimer {
        onUpdate(days, hours, minutes, seconds) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        onComplete() {
            showWarning('Flash sale has ended!');
        }
    }

    // Set end date to 24 hours from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const countdown = new PromoCountdown(endDate);
    countdown.start();
}

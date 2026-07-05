// ================================================
// GALLERY & LIGHTBOX
// ================================================

class Gallery {
    constructor(selector) {
        this.gallery = document.querySelector(selector);
        this.lightbox = null;
        this.currentImageIndex = 0;
        this.images = [];
        this.init();
    }

    /**
     * Initialize gallery
     */
    init() {
        if (!this.gallery) return;

        this.images = Array.from(this.gallery.querySelectorAll('img'));
        this.gallery.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
        this.createLightbox();
    }

    /**
     * Create lightbox
     */
    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
            </div>
            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        `;
        document.body.appendChild(this.lightbox);

        // Event listeners
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
            if (e.key === 'Escape') this.closeLightbox();
        });
    }

    /**
     * Open lightbox
     */
    openLightbox(index) {
        this.currentImageIndex = index;
        this.lightbox.classList.add('active');
        this.showImage();
    }

    /**
     * Close lightbox
     */
    closeLightbox() {
        this.lightbox.classList.remove('active');
    }

    /**
     * Show image
     */
    showImage() {
        const img = this.lightbox.querySelector('.lightbox-image');
        img.src = this.images[this.currentImageIndex].src;
    }

    /**
     * Next image
     */
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.showImage();
    }

    /**
     * Previous image
     */
    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.showImage();
    }
}

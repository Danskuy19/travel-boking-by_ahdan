// ================================================
// TOAST NOTIFICATIONS
// ================================================

class Toast {
    constructor(message, type = 'info', duration = 4000) {
        this.message = message;
        this.type = type; // success, error, warning, info
        this.duration = duration;
        this.element = null;
    }

    /**
     * Show toast
     */
    show() {
        const container = document.getElementById('toast-container') || this.createContainer();
        this.element = document.createElement('div');
        this.element.className = `toast ${this.type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle',
        };

        this.element.innerHTML = `
            <i class="${iconMap[this.type]} toast-icon"></i>
            <div class="toast-message">${this.message}</div>
            <button class="toast-close">&times;</button>
        `;

        container.appendChild(this.element);

        // Close button
        this.element.querySelector('.toast-close').addEventListener('click', () => {
            this.close();
        });

        // Auto close
        if (this.duration > 0) {
            setTimeout(() => this.close(), this.duration);
        }
    }

    /**
     * Close toast
     */
    close() {
        if (this.element) {
            this.element.classList.add('closing');
            setTimeout(() => this.element.remove(), 300);
        }
    }

    /**
     * Create container
     */
    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
}

// ================================================
// TOAST HELPER FUNCTIONS
// ================================================

function showToast(message, type = 'info', duration = 4000) {
    const toast = new Toast(message, type, duration);
    toast.show();
}

function showSuccess(message, duration = 4000) {
    showToast(message, 'success', duration);
}

function showError(message, duration = 4000) {
    showToast(message, 'error', duration);
}

function showWarning(message, duration = 4000) {
    showToast(message, 'warning', duration);
}

function showInfo(message, duration = 4000) {
    showToast(message, 'info', duration);
}

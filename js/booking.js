// ================================================
// BOOKING FORM VALIDATION & SUBMISSION
// ================================================

class BookingForm {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;
        this.init();
    }

    /**
     * Initialize booking form
     */
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    /**
     * Handle form submission
     */
    handleSubmit(event) {
        event.preventDefault();

        if (!this.validate()) {
            showError('Please fill in all required fields correctly');
            return;
        }

        const formData = this.getFormData();
        const booking = bookingManager.add(formData);
        
        showSuccess('Booking confirmed! Check your email for confirmation.');
        this.form.reset();

        // Redirect to booking confirmation page after 2 seconds
        setTimeout(() => {
            // Could redirect to booking confirmation page
            console.log('Booking:', booking);
        }, 2000);
    }

    /**
     * Validate form
     */
    validate() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                this.markFieldError(input);
            } else {
                this.clearFieldError(input);
            }
        });

        // Validate email if present
        const emailInput = this.form.querySelector('input[type="email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            isValid = false;
            this.markFieldError(emailInput);
        }

        // Validate phone if present
        const phoneInput = this.form.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value && !validatePhone(phoneInput.value)) {
            isValid = false;
            this.markFieldError(phoneInput);
        }

        return isValid;
    }

    /**
     * Get form data
     */
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    /**
     * Mark field error
     */
    markFieldError(field) {
        field.style.borderColor = 'var(--danger)';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

/**
 * Debounce function - delays execution until after wait ms have elapsed since last call
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limits function execution to once every wait ms
 */
function throttle(func, wait) {
    let timeout;
    let previous = 0;
    return function executedFunction(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func(...args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func(...args);
            }, remaining);
        }
    };
}

/**
 * Format currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

/**
 * Format date
 */
function formatDate(date, format = 'DD/MM/YYYY') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
    if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    return d.toLocaleDateString();
}

/**
 * Parse date string to Date object
 */
function parseDate(dateString) {
    return new Date(dateString);
}

/**
 * Calculate days between two dates
 */
function daysBetween(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((new Date(date2) - new Date(date1)) / msPerDay);
}

/**
 * Validate email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number
 */
function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone);
}

/**
 * Capitalize string
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Slugify string
 */
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Generate random ID
 */
function generateID() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Clone object
 */
function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep merge objects
 */
function mergeObjects(target, source) {
    const output = cloneObject(target);
    if (typeof target === 'object' && target !== null) {
        Object.keys(source).forEach(key => {
            if (typeof source[key] === 'object' && source[key] !== null) {
                output[key] = mergeObjects(output[key] || {}, source[key]);
            } else {
                output[key] = source[key];
            }
        });
    }
    return output;
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScroll(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

/**
 * Get query parameter
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Check online status
 */
function isOnline() {
    return navigator.onLine;
}

/**
 * Sleep function (promise-based)
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

/**
 * Lazy load images
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Get element by selector
 */
function query(selector) {
    return document.querySelector(selector);
}

/**
 * Get all elements by selector
 */
function queryAll(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add event listener
 */
function on(element, event, callback) {
    if (element.length) {
        Array.from(element).forEach(el => el.addEventListener(event, callback));
    } else {
        element.addEventListener(event, callback);
    }
}

/**
 * Remove event listener
 */
function off(element, event, callback) {
    if (element.length) {
        Array.from(element).forEach(el => el.removeEventListener(event, callback));
    } else {
        element.removeEventListener(event, callback);
    }
}

/**
 * Add class
 */
function addClass(element, className) {
    if (element.length) {
        Array.from(element).forEach(el => el.classList.add(className));
    } else {
        element.classList.add(className);
    }
}

/**
 * Remove class
 */
function removeClass(element, className) {
    if (element.length) {
        Array.from(element).forEach(el => el.classList.remove(className));
    } else {
        element.classList.remove(className);
    }
}

/**
 * Toggle class
 */
function toggleClass(element, className) {
    if (element.length) {
        Array.from(element).forEach(el => el.classList.toggle(className));
    } else {
        element.classList.toggle(className);
    }
}

/**
 * Set HTML
 */
function setHTML(element, html) {
    if (element.length) {
        Array.from(element).forEach(el => (el.innerHTML = html));
    } else {
        element.innerHTML = html;
    }
}

/**
 * Get HTML
 */
function getHTML(element) {
    return element.innerHTML;
}

/**
 * Set text
 */
function setText(element, text) {
    if (element.length) {
        Array.from(element).forEach(el => (el.textContent = text));
    } else {
        element.textContent = text;
    }
}

/**
 * Get text
 */
function getText(element) {
    return element.textContent;
}

/**
 * Set attributes
 */
function setAttr(element, attr, value) {
    if (element.length) {
        Array.from(element).forEach(el => el.setAttribute(attr, value));
    } else {
        element.setAttribute(attr, value);
    }
}

/**
 * Get attribute
 */
function getAttr(element, attr) {
    return element.getAttribute(attr);
}

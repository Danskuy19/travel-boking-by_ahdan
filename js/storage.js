// ================================================
// LOCAL STORAGE MANAGEMENT
// ================================================

class Storage {
    constructor(prefix = 'travelhub_') {
        this.prefix = prefix;
    }

    /**
     * Set item in localStorage
     */
    set(key, value) {
        try {
            const data = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(this.prefix + key, data);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    /**
     * Get item from localStorage
     */
    get(key, parse = true) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (!item) return null;
            return parse ? JSON.parse(item) : item;
        } catch (error) {
            return localStorage.getItem(this.prefix + key);
        }
    }

    /**
     * Remove item from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    /**
     * Clear all items with prefix
     */
    clear() {
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith(this.prefix))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    /**
     * Check if key exists
     */
    has(key) {
        return localStorage.getItem(this.prefix + key) !== null;
    }

    /**
     * Get all items
     */
    getAll() {
        const items = {};
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => {
                const cleanKey = key.replace(this.prefix, '');
                items[cleanKey] = this.get(cleanKey);
            });
        return items;
    }
}

// Initialize Storage
const storage = new Storage();

// ================================================
// FAVORITES MANAGEMENT
// ================================================

class FavoritesManager {
    constructor() {
        this.favorites = storage.get('favorites') || [];
    }

    /**
     * Add favorite
     */
    add(hotel) {
        if (!this.favorites.find(h => h.id === hotel.id)) {
            this.favorites.push(hotel);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Remove favorite
     */
    remove(hotelId) {
        this.favorites = this.favorites.filter(h => h.id !== hotelId);
        this.save();
    }

    /**
     * Toggle favorite
     */
    toggle(hotel) {
        if (this.favorites.find(h => h.id === hotel.id)) {
            this.remove(hotel.id);
            return false;
        } else {
            this.add(hotel);
            return true;
        }
    }

    /**
     * Get all favorites
     */
    getAll() {
        return this.favorites;
    }

    /**
     * Check if hotel is favorite
     */
    isFavorite(hotelId) {
        return this.favorites.some(h => h.id === hotelId);
    }

    /**
     * Clear all favorites
     */
    clear() {
        this.favorites = [];
        this.save();
    }

    /**
     * Save to localStorage
     */
    save() {
        storage.set('favorites', this.favorites);
    }
}

// Initialize Favorites Manager
const favoritesManager = new FavoritesManager();

// ================================================
// BOOKING HISTORY MANAGEMENT
// ================================================

class BookingManager {
    constructor() {
        this.bookings = storage.get('bookings') || [];
    }

    /**
     * Add booking
     */
    add(booking) {
        booking.id = generateID();
        booking.date = new Date().toISOString();
        this.bookings.unshift(booking);
        this.save();
        return booking;
    }

    /**
     * Get all bookings
     */
    getAll() {
        return this.bookings;
    }

    /**
     * Get booking by ID
     */
    getById(id) {
        return this.bookings.find(b => b.id === id);
    }

    /**
     * Update booking
     */
    update(id, data) {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
            Object.assign(booking, data);
            this.save();
            return booking;
        }
        return null;
    }

    /**
     * Delete booking
     */
    delete(id) {
        this.bookings = this.bookings.filter(b => b.id !== id);
        this.save();
    }

    /**
     * Clear all bookings
     */
    clear() {
        this.bookings = [];
        this.save();
    }

    /**
     * Save to localStorage
     */
    save() {
        storage.set('bookings', this.bookings);
    }
}

// Initialize Booking Manager
const bookingManager = new BookingManager();

// ================================================
// SEARCH HISTORY MANAGEMENT
// ================================================

class SearchHistoryManager {
    constructor(maxItems = 10) {
        this.maxItems = maxItems;
        this.history = storage.get('searchHistory') || [];
    }

    /**
     * Add search
     */
    add(query) {
        this.history = this.history.filter(q => q !== query);
        this.history.unshift(query);
        this.history = this.history.slice(0, this.maxItems);
        this.save();
    }

    /**
     * Get all searches
     */
    getAll() {
        return this.history;
    }

    /**
     * Clear history
     */
    clear() {
        this.history = [];
        this.save();
    }

    /**
     * Save to localStorage
     */
    save() {
        storage.set('searchHistory', this.history);
    }
}

// Initialize Search History Manager
const searchHistoryManager = new SearchHistoryManager();

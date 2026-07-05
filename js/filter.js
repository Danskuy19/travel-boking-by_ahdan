// ================================================
// FILTER FUNCTIONALITY
// ================================================

class FilterManager {
    constructor() {
        this.filters = {
            price: { min: 0, max: 5000 },
            rating: 0,
            facilities: [],
        };
    }

    /**
     * Filter hotels
     */
    filterHotels(hotels) {
        return hotels.filter(hotel => {
            // Price filter
            if (hotel.price < this.filters.price.min || hotel.price > this.filters.price.max) {
                return false;
            }

            // Rating filter
            if (hotel.rating < this.filters.rating) {
                return false;
            }

            // Facilities filter
            if (this.filters.facilities.length > 0) {
                const hasFacilities = this.filters.facilities.every(facility =>
                    hotel.facilities.includes(facility)
                );
                if (!hasFacilities) return false;
            }

            return true;
        });
    }

    /**
     * Set price filter
     */
    setPriceFilter(min, max) {
        this.filters.price = { min, max };
    }

    /**
     * Set rating filter
     */
    setRatingFilter(rating) {
        this.filters.rating = rating;
    }

    /**
     * Toggle facility filter
     */
    toggleFacility(facility) {
        const index = this.filters.facilities.indexOf(facility);
        if (index > -1) {
            this.filters.facilities.splice(index, 1);
        } else {
            this.filters.facilities.push(facility);
        }
    }

    /**
     * Reset filters
     */
    reset() {
        this.filters = {
            price: { min: 0, max: 5000 },
            rating: 0,
            facilities: [],
        };
    }
}

const filterManager = new FilterManager();

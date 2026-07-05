// ================================================
// SEARCH FUNCTIONALITY
// ================================================

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('navbar-search-input');
        this.searchSuggestions = document.getElementById('search-suggestions');
        this.destinations = [
            'Bali, Indonesia',
            'Paris, France',
            'Tokyo, Japan',
            'New York, USA',
            'Dubai, UAE',
            'London, UK',
            'Barcelona, Spain',
            'Rome, Italy',
            'Amsterdam, Netherlands',
            'Bangkok, Thailand',
        ];
        this.init();
    }

    /**
     * Initialize search
     */
    init() {
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        this.searchInput.addEventListener('blur', () => {
            setTimeout(() => this.searchSuggestions.classList.remove('active'), 200);
        });
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcut(e));
    }

    /**
     * Handle search input
     */
    handleSearch(event) {
        const query = event.target.value.toLowerCase();

        if (query.length === 0) {
            this.searchSuggestions.classList.remove('active');
            return;
        }

        const suggestions = this.destinations.filter(d => d.toLowerCase().includes(query));
        this.showSuggestions(suggestions, query);
    }

    /**
     * Show suggestions
     */
    showSuggestions(suggestions, query) {
        if (suggestions.length === 0) {
            this.searchSuggestions.innerHTML = '<div class="search-suggestion-item">No results found</div>';
            this.searchSuggestions.classList.add('active');
            return;
        }

        const html = suggestions
            .map(suggestion => `
                <div class="search-suggestion-item">
                    <i class="fas fa-map-marker-alt"></i> ${suggestion}
                </div>
            `)
            .join('');

        this.searchSuggestions.innerHTML = html;
        this.searchSuggestions.classList.add('active');

        // Add click handlers
        this.searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                this.searchInput.value = item.textContent.trim();
                this.searchSuggestions.classList.remove('active');
                searchHistoryManager.add(item.textContent.trim());
            });
        });
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcut(event) {
        // Ctrl+K or Cmd+K to open search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            this.searchInput.focus();
        }

        // Esc to close
        if (event.key === 'Escape') {
            this.searchSuggestions.classList.remove('active');
            this.searchInput.blur();
        }
    }
}

// Initialize search manager
const searchManager = new SearchManager();

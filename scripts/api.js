/**
 * API integration for Jamaica Raphael Ajemina's Resume Website
 * Handles visitor counter and Azure Function integration
 */

class VisitorAPI {
    constructor() {
        // Configuration
        this.config = {
            apiBaseUrl: 'https://your-azure-function-app.azurewebsites.net',
            endpoints: {
                visitorCount: '/api/GetVisitorCount',
                updateCount: '/api/UpdateVisitorCount'
            },
            retryAttempts: 3,
            retryDelay: 1000,
            timeout: 10000,
            cacheKey: 'visitor-count-cache',
            cacheExpiry: 300000 // 5 minutes
        };

        // State
        this.isLoading = false;
        this.lastCount = null;
        this.retryCount = 0;
        this.cache = new Map();

        // DOM elements
        this.counterElement = null;

        // Bind methods
        this.updateVisitorCount = this.updateVisitorCount.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    /**
     * Initialize the API
     */
    init() {
        this.counterElement = document.getElementById('visitorCount');

        if (!this.counterElement) {
            console.warn('Visitor counter element not found');
            return;
        }

        // Load initial count
        this.loadVisitorCount();

        // Setup event listeners
        this.bindEvents();

        // Setup periodic updates
        this.setupPeriodicUpdates();

        console.log('Visitor API initialized');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Update count when page becomes visible
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        // Update count on page focus
        window.addEventListener('focus', () => {
            if (!this.isLoading) {
                this.loadVisitorCount();
            }
        });

        // Custom events
        window.addEventListener('updateVisitorCount', this.updateVisitorCount);
    }

    /**
     * Handle visibility change
     */
    handleVisibilityChange() {
        if (!document.hidden && !this.isLoading) {
            // Page became visible, update count
            this.updateVisitorCount();
        }
    }

    /**
     * Load visitor count from API or cache
     */
    async loadVisitorCount() {
        // Check cache first
        const cachedData = this.getFromCache(this.config.cacheKey);
        if (cachedData) {
            this.displayCount(cachedData.count);
            this.lastCount = cachedData.count;

            // Still fetch fresh data in background
            this.fetchVisitorCount(false);
            return;
        }

        // No cache, fetch immediately
        await this.fetchVisitorCount(true);
    }

    /**
     * Fetch visitor count from API
     */
    async fetchVisitorCount(updateUI = true) {
        if (this.isLoading) return;

        this.isLoading = true;

        if (updateUI) {
            this.setLoadingState();
        }

        try {
            const response = await this.makeRequest('GET', this.config.endpoints.visitorCount);
            const data = await response.json();

            if (response.ok && data.count !== undefined) {
                const count = parseInt(data.count, 10);
                this.lastCount = count;

                // Cache the result
                this.setCache(this.config.cacheKey, { count, timestamp: Date.now() });

                if (updateUI) {
                    this.displayCount(count);
                }

                this.retryCount = 0;
                console.log('Visitor count fetched:', count);
            } else {
                throw new Error(`API Error: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Failed to fetch visitor count:', error);
            await this.handleError(error, updateUI);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Update visitor count (increment)
     */
    async updateVisitorCount() {
        if (this.isLoading) return;

        try {
            const response = await this.makeRequest('POST', this.config.endpoints.updateCount);
            const data = await response.json();

            if (response.ok && data.count !== undefined) {
                const count = parseInt(data.count, 10);
                this.lastCount = count;

                // Update cache
                this.setCache(this.config.cacheKey, { count, timestamp: Date.now() });

                // Update display with animation
                this.animateCountUpdate(count);

                console.log('Visitor count updated:', count);
            } else {
                throw new Error(`API Error: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Failed to update visitor count:', error);
            // Don't show error for background updates
        }
    }

    /**
     * Make HTTP request with timeout and retry logic
     */
    async makeRequest(method, endpoint, data = null) {
        const url = `${this.config.apiBaseUrl}${endpoint}`;

        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'
        };

        if (data) {
            requestOptions.body = JSON.stringify(data);
        }

        // Add timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            requestOptions.signal = controller.signal;
            const response = await fetch(url, requestOptions);
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }

            throw error;
        }
    }

    /**
     * Handle API errors with retry logic
     */
    async handleError(error, updateUI = true) {
        this.retryCount++;

        if (this.retryCount <= this.config.retryAttempts) {
            console.log(`Retrying API call (${this.retryCount}/${this.config.retryAttempts})...`);

            // Exponential backoff
            const delay = this.config.retryDelay * Math.pow(2, this.retryCount - 1);
            await this.sleep(delay);

            return this.fetchVisitorCount(updateUI);
        }

        // Max retries reached
        if (updateUI) {
            this.displayError();
        }

        // Try to show cached data as fallback
        const cachedData = this.getFromCache(this.config.cacheKey);
        if (cachedData && updateUI) {
            this.displayCount(cachedData.count, true);
        }
    }

    /**
     * Display visitor count
     */
    displayCount(count, isStale = false) {
        if (!this.counterElement) return;

        this.counterElement.textContent = this.formatCount(count);
        this.counterElement.classList.remove('loading', 'error');

        if (isStale) {
            this.counterElement.classList.add('stale');
            this.counterElement.title = 'Count may be outdated';
        } else {
            this.counterElement.classList.remove('stale');
            this.counterElement.title = '';
        }
    }

    /**
     * Animate count update
     */
    animateCountUpdate(newCount) {
        if (!this.counterElement || !this.lastCount) {
            this.displayCount(newCount);
            return;
        }

        const startCount = this.lastCount;
        const difference = newCount - startCount;

        if (difference === 0) return;

        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentCount = Math.floor(startCount + (difference * this.easeOutQuart(progress)));
            this.counterElement.textContent = this.formatCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.counterElement.textContent = this.formatCount(newCount);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Set loading state
     */
    setLoadingState() {
        if (!this.counterElement) return;

        this.counterElement.textContent = 'Loading...';
        this.counterElement.classList.add('loading');
        this.counterElement.classList.remove('error', 'stale');
    }

    /**
     * Display error state
     */
    displayError() {
        if (!this.counterElement) return;

        this.counterElement.textContent = 'Error';
        this.counterElement.classList.add('error');
        this.counterElement.classList.remove('loading', 'stale');
        this.counterElement.title = 'Failed to load visitor count';
    }

    /**
     * Format count for display
     */
    formatCount(count) {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count.toLocaleString();
    }

    /**
     * Cache management
     */
    setCache(key, value) {
        this.cache.set(key, {
            ...value,
            expiry: Date.now() + this.config.cacheExpiry
        });

        // Also store in localStorage for persistence
        try {
            localStorage.setItem(key, JSON.stringify({
                ...value,
                expiry: Date.now() + this.config.cacheExpiry
            }));
        } catch (error) {
            console.warn('Failed to store in localStorage:', error);
        }
    }

    /**
     * Get from cache
     */
    getFromCache(key) {
        // Check memory cache first
        let cached = this.cache.get(key);

        // Fallback to localStorage
        if (!cached) {
            try {
                const stored = localStorage.getItem(key);
                if (stored) {
                    cached = JSON.parse(stored);
                    this.cache.set(key, cached);
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            }
        }

        // Check if expired
        if (cached && cached.expiry > Date.now()) {
            return cached;
        }

        // Remove expired cache
        if (cached) {
            this.cache.delete(key);
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.warn('Failed to remove from localStorage:', error);
            }
        }

        return null;
    }

    /**
     * Setup periodic updates
     */
    setupPeriodicUpdates() {
        // Update every 5 minutes when page is visible
        setInterval(() => {
            if (!document.hidden && !this.isLoading) {
                this.loadVisitorCount();
            }
        }, 300000); // 5 minutes
    }

    /**
     * Utility functions
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    /**
     * Get current visitor count
     */
    getCurrentCount() {
        return this.lastCount;
    }

    /**
     * Manually refresh count
     */
    refresh() {
        this.retryCount = 0;
        return this.fetchVisitorCount(true);
    }

    /**
     * Check if API is available
     */
    async checkHealth() {
        try {
            const response = await this.makeRequest('GET', '/api/health');
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    /**
     * Mock API for development/testing
     */
    enableMockMode() {
        console.warn('Mock mode enabled for Visitor API');

        this.makeRequest = async (method, endpoint) => {
            // Simulate network delay
            await this.sleep(Math.random() * 1000 + 500);

            // Simulate occasional failures
            if (Math.random() < 0.1) {
                throw new Error('Mock network error');
            }

            let count = parseInt(localStorage.getItem('mock-visitor-count')) || 1247;

            if (method === 'POST' && endpoint.includes('update')) {
                count++;
                localStorage.setItem('mock-visitor-count', count.toString());
            }

            return {
                ok: true,
                json: async () => ({ count })
            };
        };
    }

    /**
     * Destroy API (cleanup)
     */
    destroy() {
        // Remove event listeners
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('updateVisitorCount', this.updateVisitorCount);

        // Clear cache
        this.cache.clear();

        // Reset state
        this.isLoading = false;
        this.lastCount = null;
        this.retryCount = 0;
    }

    /**
     * Static method to create instance
     */
    static create() {
        return new VisitorAPI();
    }
}

// Create and export API instance
window.VisitorAPI = VisitorAPI.create();

// Enable mock mode in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.VisitorAPI.enableMockMode();
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.VisitorAPI.init();
    });
} else {
    window.VisitorAPI.init();
}
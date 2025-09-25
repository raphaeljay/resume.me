/**
 * Main JavaScript file for Jamaica Raphael Ajemina's Resume Website
 * Handles core functionality and initialization
 */

class ResumeApp {
    constructor() {
        this.isLoaded = false;
        this.isMobile = window.innerWidth <= 768;

        // Bind methods
        this.handleResize = this.handleResize.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

        // Initialize app
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.handleLoad);
        } else {
            this.handleLoad();
        }

        // Add event listeners
        this.addEventListeners();
    }

    /**
     * Handle page load
     */
    handleLoad() {
        this.isLoaded = true;

        // Hide loading screen
        this.hideLoadingScreen();

        // Initialize all modules
        this.initializeModules();

        // Set up performance monitoring
        this.setupPerformanceMonitoring();

        console.log('Resume website loaded successfully');
    }

    /**
     * Add global event listeners
     */
    addEventListeners() {
        // Window resize
        window.addEventListener('resize', this.handleResize);

        // Window load
        window.addEventListener('load', () => {
            this.optimizePerformance();
        });

        // Visibility change (for analytics)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isLoaded) {
                this.trackPageView();
            }
        });

        // Error handling
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handleError.bind(this));
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        // If mobile state changed, reinitialize responsive components
        if (wasMobile !== this.isMobile) {
            this.handleMobileStateChange();
        }

        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateLayout();
        }, 250);
    }

    /**
     * Handle mobile state change
     */
    handleMobileStateChange() {
        // Update navigation if it exists
        if (window.Navigation) {
            window.Navigation.updateMobileState(this.isMobile);
        }

        // Update animations if they exist
        if (window.ScrollAnimations) {
            window.ScrollAnimations.updateViewport();
        }
    }

    /**
     * Update layout after resize
     */
    updateLayout() {
        // Trigger custom resize event for other modules
        window.dispatchEvent(new CustomEvent('appResize', {
            detail: { isMobile: this.isMobile }
        }));
    }

    /**
     * Hide loading screen with smooth transition
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            // Add fade out class
            loadingScreen.classList.add('hidden');

            // Remove from DOM after transition
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }
    }

    /**
     * Initialize all modules
     */
    initializeModules() {
        // Initialize navigation
        if (window.Navigation) {
            window.Navigation.init();
        }

        // Initialize scroll animations
        if (window.ScrollAnimations) {
            window.ScrollAnimations.init();
        }

        // Initialize visitor counter API
        if (window.VisitorAPI) {
            window.VisitorAPI.init();
        }

        // Initialize smooth scrolling
        this.initSmoothScrolling();

        // Initialize form handlers
        this.initFormHandlers();

        // Initialize accessibility features
        this.initAccessibility();
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if it's just '#'
                if (href === '#') return;

                const targetId = href.substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    e.preventDefault();
                    this.smoothScrollTo(target);

                    // Update URL
                    history.replaceState(null, null, href);
                }
            });
        });
    }

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = element.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Initialize form handlers
     */
    initFormHandlers() {
        // Contact form handling (if exists)
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Newsletter form (if exists)
        const newsletterForm = document.querySelector('#newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterForm.bind(this));
        }
    }

    /**
     * Handle contact form submission
     */
    handleContactForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!this.validateContactForm(data)) {
            return;
        }

        // Show loading state
        this.showFormLoading(e.target);

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showFormSuccess(e.target);
            e.target.reset();
        }, 1500);
    }

    /**
     * Validate contact form
     */
    validateContactForm(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name is required and must be at least 2 characters');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Valid email is required');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters');
        }

        if (errors.length > 0) {
            this.showFormErrors(errors);
            return false;
        }

        return true;
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show form loading state
     */
    showFormLoading(form) {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
    }

    /**
     * Show form success message
     */
    showFormSuccess(form) {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }

        this.showNotification('Message sent successfully!', 'success');
    }

    /**
     * Show form errors
     */
    showFormErrors(errors) {
        const errorMessage = errors.join('\n');
        this.showNotification(errorMessage, 'error');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    /**
     * Initialize accessibility features
     */
    initAccessibility() {
        // Skip to main content link
        this.createSkipLink();

        // Focus management
        this.manageFocus();

        // Keyboard navigation
        this.initKeyboardNavigation();

        // ARIA updates
        this.updateAriaLabels();
    }

    /**
     * Create skip to main content link
     */
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';

        // Style the skip link
        Object.assign(skipLink.style, {
            position: 'absolute',
            top: '-40px',
            left: '6px',
            background: '#000',
            color: '#fff',
            padding: '8px',
            textDecoration: 'none',
            borderRadius: '0 0 4px 4px',
            zIndex: '10001'
        });

        // Show on focus
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Manage focus for better accessibility
     */
    manageFocus() {
        // Add focus styles for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-focus');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-focus');
        });
    }

    /**
     * Initialize keyboard navigation
     */
    initKeyboardNavigation() {
        // ESC key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (window.Navigation) {
                    window.Navigation.closeMobileMenu();
                }
            }
        });
    }

    /**
     * Update ARIA labels dynamically
     */
    updateAriaLabels() {
        // Update visitor counter
        const visitorCount = document.getElementById('visitorCount');
        if (visitorCount) {
            visitorCount.setAttribute('aria-live', 'polite');
            visitorCount.setAttribute('aria-label', 'Visitor count');
        }

        // Update loading states
        const loadingElements = document.querySelectorAll('[data-loading]');
        loadingElements.forEach(element => {
            element.setAttribute('aria-live', 'polite');
        });
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor page load performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page load performance:', {
                            loadTime: perfData.loadEventEnd - perfData.fetchStart,
                            domReady: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                            firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
                        });
                    }
                }, 1000);
            });
        }
    }

    /**
     * Optimize performance after load
     */
    optimizePerformance() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadResources();

        // Clean up unused event listeners
        this.cleanupEventListeners();
    }

    /**
     * Lazy load images
     */
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    /**
     * Preload critical resources
     */
    preloadResources() {
        // Preload fonts
        const fonts = [
            'Inter-Regular.woff2',
            'Inter-Medium.woff2',
            'Inter-SemiBold.woff2'
        ];

        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = `/fonts/${font}`;
            document.head.appendChild(link);
        });
    }

    /**
     * Clean up unused event listeners
     */
    cleanupEventListeners() {
        // Remove any temporary event listeners
        // This is a placeholder for cleanup logic
    }

    /**
     * Track page view (placeholder for analytics)
     */
    trackPageView() {
        // Placeholder for analytics tracking
        console.log('Page view tracked');
    }

    /**
     * Handle JavaScript errors
     */
    handleError(event) {
        console.error('Application error:', event.error || event.reason);

        // You can send errors to a logging service here
        // Example: sendErrorToService(event.error);
    }

    /**
     * Newsletter form handler
     */
    handleNewsletterForm(e) {
        e.preventDefault();

        const email = e.target.querySelector('[type="email"]').value;

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate newsletter signup
        this.showFormLoading(e.target);

        setTimeout(() => {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            e.target.reset();

            const submitBtn = e.target.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }
        }, 1000);
    }

    /**
     * Get device info for responsive features
     */
    getDeviceInfo() {
        return {
            isMobile: this.isMobile,
            isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
            isDesktop: window.innerWidth > 1024,
            hasTouch: 'ontouchstart' in window,
            pixelRatio: window.devicePixelRatio || 1
        };
    }

    /**
     * Public API for other modules
     */
    static getInstance() {
        if (!window.ResumeAppInstance) {
            window.ResumeAppInstance = new ResumeApp();
        }
        return window.ResumeAppInstance;
    }
}

// Initialize the application
const app = ResumeApp.getInstance();

// Export for other modules
window.ResumeApp = app;
/**
 * Navigation functionality for Jamaica Raphael Ajemina's Resume Website
 * Handles navbar behavior, mobile menu, and scroll effects
 */

class Navigation {
    constructor() {
        // DOM elements
        this.navbar = null;
        this.navMenu = null;
        this.navToggle = null;
        this.navLinks = [];

        // State
        this.isMobileMenuOpen = false;
        this.isScrolled = false;
        this.currentSection = 'home';
        this.isMobile = window.innerWidth <= 768;

        // Throttling
        this.scrollTimeout = null;
        this.resizeTimeout = null;

        // Bind methods
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    /**
     * Initialize navigation
     */
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.setupIntersectionObserver();
        this.updateActiveSection();

        console.log('Navigation initialized');
    }

    /**
     * Cache DOM elements
     */
    cacheDOM() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = Array.from(document.querySelectorAll('.nav-link'));

        if (!this.navbar) {
            console.warn('Navigation elements not found');
            return;
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Scroll events
        window.addEventListener('scroll', this.handleScroll, { passive: true });

        // Resize events
        window.addEventListener('resize', this.handleResize);

        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', this.toggleMobileMenu);
        }

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick);
        });

        // Keyboard events
        document.addEventListener('keydown', this.handleKeydown);

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen &&
                !this.navMenu.contains(e.target) &&
                !this.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Custom app events
        window.addEventListener('appResize', (e) => {
            this.updateMobileState(e.detail.isMobile);
        });
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        // Throttle scroll events
        if (this.scrollTimeout) return;

        this.scrollTimeout = setTimeout(() => {
            this.updateNavbarState();
            this.updateActiveSection();
            this.scrollTimeout = null;
        }, 16); // ~60fps
    }

    /**
     * Handle resize events
     */
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;

            if (wasMobile !== this.isMobile) {
                this.updateMobileState(this.isMobile);
            }
        }, 250);
    }

    /**
     * Update mobile state
     */
    updateMobileState(isMobile) {
        this.isMobile = isMobile;

        if (!isMobile && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Update ARIA attributes
        this.updateAriaAttributes();
    }

    /**
     * Update navbar state based on scroll position
     */
    updateNavbarState() {
        const scrollY = window.scrollY;
        const shouldBeScrolled = scrollY > 100;

        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;

            if (this.navbar) {
                this.navbar.classList.toggle('scrolled', this.isScrolled);
            }
        }
    }

    /**
     * Setup intersection observer for section detection
     */
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');

        if (!sections.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    /**
     * Set active section
     */
    setActiveSection(sectionId) {
        if (this.currentSection === sectionId) return;

        this.currentSection = sectionId;
        this.updateActiveNavLink();
    }

    /**
     * Update active section manually (fallback)
     */
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        let currentSection = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        this.setActiveSection(currentSection);
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink() {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${this.currentSection}`;

            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.isMobileMenuOpen = true;

        if (this.navMenu) {
            this.navMenu.classList.add('active');
        }

        if (this.navToggle) {
            this.navToggle.classList.add('active');
            this.navToggle.setAttribute('aria-expanded', 'true');
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus first menu item
        setTimeout(() => {
            const firstLink = this.navLinks[0];
            if (firstLink) {
                firstLink.focus();
            }
        }, 100);

        // Trap focus in mobile menu
        this.trapFocus();
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.isMobileMenuOpen = false;

        if (this.navMenu) {
            this.navMenu.classList.remove('active');
        }

        if (this.navToggle) {
            this.navToggle.classList.remove('active');
            this.navToggle.setAttribute('aria-expanded', 'false');
        }

        // Restore body scroll
        document.body.style.overflow = '';

        // Remove focus trap
        this.removeFocusTrap();
    }

    /**
     * Handle navigation link clicks
     */
    handleNavClick(e) {
        const link = e.target;
        const href = link.getAttribute('href');

        // Only handle internal links
        if (!href || !href.startsWith('#')) return;

        e.preventDefault();

        // Close mobile menu if open
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Scroll to section
        const targetId = href.substring(1);
        this.scrollToSection(targetId);

        // Update URL
        if (history.replaceState) {
            history.replaceState(null, null, href);
        }

        // Update active state immediately
        this.setActiveSection(targetId);
    }

    /**
     * Scroll to section with offset
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
        const offset = 20;
        const targetPosition = section.offsetTop - navbarHeight - offset;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }

    /**
     * Handle keyboard events
     */
    handleKeydown(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && this.isMobileMenuOpen) {
            this.closeMobileMenu();
            if (this.navToggle) {
                this.navToggle.focus();
            }
        }

        // Handle focus trap in mobile menu
        if (this.isMobileMenuOpen) {
            this.handleFocusTrap(e);
        }
    }

    /**
     * Trap focus in mobile menu
     */
    trapFocus() {
        if (!this.navMenu) return;

        this.focusableElements = this.navMenu.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );

        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    }

    /**
     * Handle focus trap
     */
    handleFocusTrap(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    }

    /**
     * Remove focus trap
     */
    removeFocusTrap() {
        this.focusableElements = null;
        this.firstFocusable = null;
        this.lastFocusable = null;
    }

    /**
     * Update ARIA attributes
     */
    updateAriaAttributes() {
        if (this.navToggle) {
            this.navToggle.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
            this.navToggle.setAttribute('aria-label',
                this.isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            );
        }

        if (this.navMenu) {
            this.navMenu.setAttribute('aria-hidden', (!this.isMobile || !this.isMobileMenuOpen).toString());
        }
    }

    /**
     * Get current section
     */
    getCurrentSection() {
        return this.currentSection;
    }

    /**
     * Navigate to section programmatically
     */
    navigateToSection(sectionId) {
        this.scrollToSection(sectionId);
        this.setActiveSection(sectionId);
    }

    /**
     * Show/hide navigation
     */
    setVisible(visible) {
        if (this.navbar) {
            this.navbar.style.transform = visible ? 'translateY(0)' : 'translateY(-100%)';
        }
    }

    /**
     * Destroy navigation (cleanup)
     */
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeydown);

        if (this.navToggle) {
            this.navToggle.removeEventListener('click', this.toggleMobileMenu);
        }

        this.navLinks.forEach(link => {
            link.removeEventListener('click', this.handleNavClick);
        });

        // Disconnect intersection observer
        if (this.sectionObserver) {
            this.sectionObserver.disconnect();
        }

        // Clear timeouts
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
    }

    /**
     * Static method to create instance
     */
    static create() {
        return new Navigation();
    }
}

// Create and export navigation instance
window.Navigation = Navigation.create();

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.Navigation.navbar) {
            window.Navigation.init();
        }
    });
} else {
    if (!window.Navigation.navbar) {
        window.Navigation.init();
    }
}
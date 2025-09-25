/**
 * Scroll animations and effects for Jamaica Raphael Ajemina's Resume Website
 * Handles entrance animations, parallax effects, and interactive animations
 */

class ScrollAnimations {
    constructor() {
        // Configuration
        this.config = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px',
            animationDelay: 100,
            staggerDelay: 150,
            animationDuration: 600
        };

        // State
        this.observers = new Map();
        this.animatedElements = new Set();
        this.isReducedMotion = this.checkReducedMotion();

        // Animation queues
        this.animationQueue = [];
        this.isProcessingQueue = false;

        // Performance tracking
        this.lastScrollY = 0;
        this.ticking = false;

        // Bind methods
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.processAnimationQueue = this.processAnimationQueue.bind(this);
    }

    /**
     * Initialize scroll animations
     */
    init() {
        // Check for reduced motion preference
        if (this.isReducedMotion) {
            this.showAllElements();
            return;
        }

        this.setupIntersectionObservers();
        this.setupScrollEffects();
        this.setupCounterAnimations();
        this.setupTypewriterEffects();
        this.bindEvents();

        console.log('Scroll animations initialized');
    }

    /**
     * Check for reduced motion preference
     */
    checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Show all elements immediately (reduced motion)
     */
    showAllElements() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            element.classList.add('animated');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }

    /**
     * Setup intersection observers for different animation types
     */
    setupIntersectionObservers() {
        // Main scroll animations
        this.setupMainScrollObserver();

        // Stagger animations
        this.setupStaggerObserver();

        // Parallax elements
        this.setupParallaxObserver();

        // Counter animations
        this.setupCounterObserver();
    }

    /**
     * Setup main scroll animation observer
     */
    setupMainScrollObserver() {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.stagger-children)');

        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.queueAnimation(entry.target, 'fadeInUp');
                }
            });
        }, this.config);

        elements.forEach(element => {
            observer.observe(element);
            // Prepare element for animation
            this.prepareElement(element, 'fadeInUp');
        });

        this.observers.set('main', observer);
    }

    /**
     * Setup stagger animation observer
     */
    setupStaggerObserver() {
        const containers = document.querySelectorAll('.stagger-children');

        if (!containers.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateStaggerChildren(entry.target);
                }
            });
        }, this.config);

        containers.forEach(container => {
            observer.observe(container);
            this.prepareStaggerChildren(container);
        });

        this.observers.set('stagger', observer);
    }

    /**
     * Setup parallax observer
     */
    setupParallaxObserver() {
        const elements = document.querySelectorAll('[data-parallax]');

        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.enableParallax(entry.target);
                } else {
                    this.disableParallax(entry.target);
                }
            });
        }, { threshold: 0 });

        elements.forEach(element => {
            observer.observe(element);
        });

        this.observers.set('parallax', observer);
    }

    /**
     * Setup counter observer
     */
    setupCounterObserver() {
        const counters = document.querySelectorAll('[data-counter]');

        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateCounter(entry.target);
                }
            });
        }, this.config);

        counters.forEach(counter => {
            observer.observe(counter);
        });

        this.observers.set('counter', observer);
    }

    /**
     * Prepare element for animation
     */
    prepareElement(element, animationType) {
        const animations = {
            fadeInUp: {
                opacity: '0',
                transform: 'translateY(30px)'
            },
            fadeInLeft: {
                opacity: '0',
                transform: 'translateX(-30px)'
            },
            fadeInRight: {
                opacity: '0',
                transform: 'translateX(30px)'
            },
            fadeIn: {
                opacity: '0'
            },
            scaleIn: {
                opacity: '0',
                transform: 'scale(0.8)'
            }
        };

        const styles = animations[animationType] || animations.fadeInUp;

        Object.assign(element.style, {
            ...styles,
            transition: `all ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        });
    }

    /**
     * Prepare stagger children
     */
    prepareStaggerChildren(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            this.prepareElement(child, 'fadeInUp');
            child.style.transitionDelay = `${index * this.config.staggerDelay}ms`;
        });
    }

    /**
     * Queue animation for performance
     */
    queueAnimation(element, animationType, delay = 0) {
        this.animationQueue.push({
            element,
            animationType,
            delay,
            timestamp: performance.now()
        });

        if (!this.isProcessingQueue) {
            requestAnimationFrame(this.processAnimationQueue);
        }
    }

    /**
     * Process animation queue
     */
    processAnimationQueue() {
        this.isProcessingQueue = true;

        while (this.animationQueue.length > 0) {
            const animation = this.animationQueue.shift();
            this.executeAnimation(animation);
        }

        this.isProcessingQueue = false;
    }

    /**
     * Execute animation
     */
    executeAnimation({ element, animationType, delay }) {
        if (this.animatedElements.has(element)) return;

        setTimeout(() => {
            this.animateElement(element, animationType);
            this.animatedElements.add(element);
        }, delay);
    }

    /**
     * Animate element
     */
    animateElement(element, animationType) {
        const animations = {
            fadeInUp: {
                opacity: '1',
                transform: 'translateY(0)'
            },
            fadeInLeft: {
                opacity: '1',
                transform: 'translateX(0)'
            },
            fadeInRight: {
                opacity: '1',
                transform: 'translateX(0)'
            },
            fadeIn: {
                opacity: '1'
            },
            scaleIn: {
                opacity: '1',
                transform: 'scale(1)'
            }
        };

        const styles = animations[animationType] || animations.fadeInUp;

        Object.assign(element.style, styles);

        // Add animated class
        element.classList.add('animated');

        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('animated', {
            detail: { animationType }
        }));
    }

    /**
     * Animate stagger children
     */
    animateStaggerChildren(container) {
        if (this.animatedElements.has(container)) return;

        const children = Array.from(container.children);

        children.forEach((child, index) => {
            this.queueAnimation(child, 'fadeInUp', index * this.config.staggerDelay);
        });

        this.animatedElements.add(container);
    }

    /**
     * Setup scroll effects
     */
    setupScrollEffects() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        this.lastScrollY = window.scrollY;

        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallaxElements();
                this.updateProgressBars();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    /**
     * Enable parallax for element
     */
    enableParallax(element) {
        element.dataset.parallaxActive = 'true';
    }

    /**
     * Disable parallax for element
     */
    disableParallax(element) {
        element.dataset.parallaxActive = 'false';
    }

    /**
     * Update parallax elements
     */
    updateParallaxElements() {
        const elements = document.querySelectorAll('[data-parallax][data-parallax-active="true"]');

        elements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const rect = element.getBoundingClientRect();
            const translateY = (rect.top - window.innerHeight) * speed;

            element.style.transform = `translateY(${translateY}px)`;
        });
    }

    /**
     * Update progress bars
     */
    updateProgressBars() {
        const progressBars = document.querySelectorAll('[data-progress]');

        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && !bar.dataset.animated) {
                this.animateProgressBar(bar);
                bar.dataset.animated = 'true';
            }
        });
    }

    /**
     * Animate progress bar
     */
    animateProgressBar(bar) {
        const progress = parseFloat(bar.dataset.progress) || 0;
        const fill = bar.querySelector('.progress-fill') || bar;

        let currentProgress = 0;
        const increment = progress / (this.config.animationDuration / 16);

        const animate = () => {
            currentProgress += increment;

            if (currentProgress <= progress) {
                fill.style.width = `${currentProgress}%`;
                requestAnimationFrame(animate);
            } else {
                fill.style.width = `${progress}%`;
            }
        };

        animate();
    }

    /**
     * Setup counter animations
     */
    setupCounterAnimations() {
        // Counters are handled by the observer
    }

    /**
     * Animate counter
     */
    animateCounter(element) {
        const target = parseFloat(element.dataset.counter) || 0;
        const duration = parseInt(element.dataset.counterDuration) || this.config.animationDuration;
        const suffix = element.dataset.counterSuffix || '';

        let current = 0;
        const increment = target / (duration / 16);
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            current = target * this.easeOutQuart(progress);

            // Format number
            let displayValue = Math.floor(current);
            if (target % 1 !== 0) {
                displayValue = current.toFixed(1);
            }

            element.textContent = displayValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Setup typewriter effects
     */
    setupTypewriterEffects() {
        const elements = document.querySelectorAll('[data-typewriter]');

        elements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                        this.startTypewriter(entry.target);
                    }
                });
            }, this.config);

            observer.observe(element);
        });
    }

    /**
     * Start typewriter animation
     */
    startTypewriter(element) {
        const text = element.dataset.typewriter || element.textContent;
        const speed = parseInt(element.dataset.typewriterSpeed) || 50;

        element.textContent = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        setTimeout(type, 500); // Initial delay
        this.animatedElements.add(element);
    }

    /**
     * Easing function
     */
    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    /**
     * Bind events
     */
    bindEvents() {
        window.addEventListener('resize', this.handleResize);

        // Listen for reduced motion changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            if (this.isReducedMotion) {
                this.disableAllAnimations();
            }
        });
    }

    /**
     * Handle resize
     */
    handleResize() {
        // Recalculate positions for parallax elements
        this.updateParallaxElements();
    }

    /**
     * Disable all animations
     */
    disableAllAnimations() {
        this.observers.forEach(observer => observer.disconnect());
        this.showAllElements();
    }

    /**
     * Update viewport (for responsive changes)
     */
    updateViewport() {
        // Re-setup observers if needed
        this.observers.forEach(observer => observer.disconnect());
        this.setupIntersectionObservers();
    }

    /**
     * Manually trigger animation
     */
    triggerAnimation(element, animationType = 'fadeInUp') {
        if (!this.animatedElements.has(element)) {
            this.prepareElement(element, animationType);
            setTimeout(() => {
                this.animateElement(element, animationType);
            }, 50);
        }
    }

    /**
     * Reset animation (for testing)
     */
    resetAnimation(element) {
        this.animatedElements.delete(element);
        element.classList.remove('animated');
        this.prepareElement(element, 'fadeInUp');
    }

    /**
     * Get animation state
     */
    isAnimated(element) {
        return this.animatedElements.has(element);
    }

    /**
     * Destroy animations (cleanup)
     */
    destroy() {
        // Disconnect all observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();

        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);

        // Clear queues
        this.animationQueue = [];
        this.animatedElements.clear();
    }

    /**
     * Static method to create instance
     */
    static create() {
        return new ScrollAnimations();
    }
}

// Create and export animations instance
window.ScrollAnimations = ScrollAnimations.create();

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ScrollAnimations.init();
    });
} else {
    window.ScrollAnimations.init();
}
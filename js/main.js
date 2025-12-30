/**
 * خودروبان - Landing Page JavaScript
 * Main functionality for interactions and animations
 */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with custom settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }

  // Mobile menu toggle functionality
  initMobileMenu();

  // Header scroll effect
  initHeaderScroll();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  // FAQ accordion functionality
  initFAQ();

  // Intersection Observer for fade-in animations
  initFadeInObserver();

  // Lazy loading for images (if needed)
  initLazyLoading();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      }
    });
  }
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed header

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu after clicking
        const navLinks = document.getElementById('navLinks');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
        }
      }
    });
  });
}

/**
 * FAQ Accordion Functionality
 */
function initFAQ() {
  window.toggleFAQ = function(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.classList.remove('active');
      btn.parentElement.querySelector('.faq-answer').classList.remove('show');
    });

    // Open clicked FAQ if it wasn't already open
    if (!isActive) {
      button.classList.add('active');
      answer.classList.add('show');
    }
  };
}

/**
 * Intersection Observer for Fade-in Animations
 */
function initFadeInObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  document.querySelectorAll('.feature-card, .stat-card, .step, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Lazy Loading for Images (Performance Optimization)
 */
function initLazyLoading() {
  // Simple lazy loading for testimonial avatars
  const images = document.querySelectorAll('.testimonial-avatar');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('fade-in');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => img.classList.add('fade-in'));
  }
}

/**
 * Utility Functions
 */

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Performance monitoring (optional)
function initPerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener('load', function() {
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0];
      const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;

      console.log(`Page load time: ${pageLoadTime}ms`);

      // You can send this data to analytics if needed
      // sendAnalytics('page_load_time', pageLoadTime);
    }
  });
}

// Initialize performance monitoring
initPerformanceMonitoring();

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);

  // You can send error reports to a service here
  // reportError(e.error, e.filename, e.lineno, e.colno);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);

  // Handle unhandled promise rejections
  // reportError(e.reason);
});

/**
 * Accessibility Improvements
 */

// Add keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.classList.contains('faq-question')) {
      e.preventDefault();
      window.toggleFAQ(focusedElement);
    }
  }
});

/**
 * Progressive Enhancement
 */

// Add CSS classes for JavaScript-enabled features
document.documentElement.classList.add('js-enabled');

// Add loading states
function showLoading(element) {
  element.classList.add('loading');
}

function hideLoading(element) {
  element.classList.remove('loading');
}

// Export functions for potential use in other scripts
window.KhodrobanLanding = {
  initMobileMenu,
  initHeaderScroll,
  initSmoothScrolling,
  initFAQ,
  initFadeInObserver,
  initLazyLoading,
  debounce,
  throttle
};

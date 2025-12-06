document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .screenshot-item');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Screenshots Slideshow
    const slides = document.querySelectorAll('.screenshot-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        // Wrap around if index is out of bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for navigation
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-play slideshow
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        slideshowContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetAutoPlay();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            resetAutoPlay();
        }
    }

    // Download Modal
    const downloadModal = document.getElementById('downloadModal');
    const downloadButtons = document.querySelectorAll('[data-modal="download"]');
    const modalClose = document.querySelector('.modal-close');
    const androidDownload = document.getElementById('androidDownload');

    // Open modal
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            downloadModal.classList.add('active');
            document.body.classList.add('menu-open');
        });
    });

    // Close modal
    const closeModal = () => {
        downloadModal.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    modalClose.addEventListener('click', closeModal);
    downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            closeModal();
        }
    });

    // Android download
    androidDownload.addEventListener('click', (e) => {
        e.preventDefault();
        // Download from GitHub Releases
        window.location.href = 'https://github.com/docavailable/maganyu-landinhg-page/releases/download/1.2.0/maganyu.apk';
        // Close modal
        closeModal();
    });

    // Premium Mobile Side Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileToggle && navLinks) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        body.appendChild(overlay);

        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-container';

        // Add Logo
        const logo = document.querySelector('.logo');
        if (logo) {
            const mobileLogo = logo.cloneNode(true);
            mobileLogo.classList.add('mobile-menu-logo');
            mobileMenu.appendChild(mobileLogo);
        }

        // Clone links
        const linksContainer = document.createElement('div');
        linksContainer.className = 'mobile-links-wrapper';
        linksContainer.innerHTML = navLinks.innerHTML;
        mobileMenu.appendChild(linksContainer);

        body.appendChild(mobileMenu);

        // Toggle menu
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Animate hamburger icon
            mobileToggle.classList.toggle('active');
        });

        // Close menu function
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            mobileToggle.classList.remove('active');
        };

        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});

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

    const animatedElements = document.querySelectorAll('.fade-in-up');
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

    // Android download - replace with your actual APK URL
    androidDownload.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace this URL with your actual Android APK download link
        window.location.href = 'https://your-app-download-url.com/maganyu.apk';
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

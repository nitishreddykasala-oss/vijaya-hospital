/* ========================================
   VIJAYA HOSPITAL - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // Mobile toggle
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 150;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============ COUNTER ANIMATION ============
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(function (counter) {
            if (counter.dataset.animated) return;
            var rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counter.dataset.animated = 'true';
                var target = parseInt(counter.dataset.count);
                var duration = 2000;
                var step = target / (duration / 16);
                var current = 0;

                function update() {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }

                requestAnimationFrame(update);
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ============ FAQ ACCORDION ============
    var faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            var faqItem = this.parentElement;
            var isActive = faqItem.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function (item) {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============ SCROLL ANIMATIONS ============
    var animateElements = document.querySelectorAll(
        '.service-card, .why-feature, .dept-card, .doctor-card, .package-card, ' +
        '.facility-card, .gallery-item, .testimonial-card, .faq-item, .contact-card'
    );

    animateElements.forEach(function (el) {
        el.classList.add('animate-on-scroll');
    });

    function checkAnimations() {
        animateElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkAnimations);
    checkAnimations();

    // ============ APPOINTMENT FORM ============
    var appointmentForm = document.getElementById('appointmentForm');
    var formSuccess = document.getElementById('formSuccess');

    if (appointmentForm) {
        // Set min date to today
        var dateInput = document.getElementById('date');
        if (dateInput) {
            var today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(this);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            // Simple validation
            if (!data.name || !data.phone || !data.department || !data.date) {
                alert('Please fill in all required fields.');
                return;
            }

            // Phone validation
            var phoneClean = data.phone.replace(/[\s\-\(\)]/g, '');
            if (phoneClean.length < 10) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Build WhatsApp message
            var message = 'Hello, I would like to book an appointment.\n\n';
            message += 'Name: ' + data.name + '\n';
            message += 'Phone: ' + data.phone + '\n';
            if (data.email) message += 'Email: ' + data.email + '\n';
            message += 'Department: ' + data.department + '\n';
            message += 'Date: ' + data.date + '\n';
            if (data.doctor) message += 'Doctor: ' + data.doctor + '\n';
            if (data.message) message += 'Message: ' + data.message + '\n';

            // Show success
            appointmentForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Open WhatsApp
            var whatsappUrl = 'https://wa.me/919919913369?text=' + encodeURIComponent(message);
            window.open(whatsappUrl, '_blank');

            // Reset after delay
            setTimeout(function () {
                appointmentForm.reset();
                appointmentForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }

    // ============ BACK TO TOP ============
    var backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ LIGHTBOX ============
    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.getElementById('lightboxContent');
    var lightboxClose = document.querySelector('.lightbox-close');
    var galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var placeholder = this.querySelector('.gallery-placeholder');
            if (placeholder) {
                lightboxContent.innerHTML = placeholder.outerHTML;
                lightboxContent.querySelector('.gallery-placeholder').style.cssText =
                    'width:100%;max-width:600px;height:400px;font-size:4rem;background:linear-gradient(135deg, #e0e7ff, #d1fae5);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--primary);border-radius:12px;';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = '';
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ EMERGENCY BANNER AUTO HIDE ============
    var banner = document.getElementById('emergencyBanner');
    if (banner) {
        setTimeout(function () {
            // Keep banner visible - user can close manually
        }, 10000);
    }

    // ============ STAGGER ANIMATION DELAY ============
    var gridContainers = document.querySelectorAll(
        '.services-grid, .dept-grid, .doctors-grid, .packages-grid, .facilities-grid, .testimonials-grid'
    );

    gridContainers.forEach(function (grid) {
        var cards = grid.querySelectorAll('.animate-on-scroll');
        cards.forEach(function (card, index) {
            card.style.transitionDelay = (index * 0.08) + 's';
        });
    });

});

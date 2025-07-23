// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const hero = document.querySelector('.hero');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    function handleNavbarScroll() {
        const heroHeight = hero ? hero.offsetHeight : 0;
        if (window.scrollY > heroHeight - 70) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run on load
});

// Hero Text Fade Out
document.addEventListener('DOMContentLoaded', () => {
    const heroContainer = document.querySelector('.hero-container');
    
    // Wait 7 seconds then fade out
    setTimeout(() => {
        heroContainer.classList.add('fade-out');
    }, 7000);
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels
    document.querySelectorAll('.experience-carousel, .key-features-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const pauseBtn = carousel.querySelector('.carousel-btn.pause');
        const indicators = carousel.querySelectorAll('.indicator');
        let current = 0;
        let autoAdvanceInterval;
        let isPaused = false;

        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            
            // Update indicators if they exist
            if (indicators.length > 0) {
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === idx);
                });
            }
        }

        // Button controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current - 1 + slides.length) % slides.length;
                showSlide(current);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current + 1) % slides.length;
                showSlide(current);
            });
        }

        // Pause button control
        if (pauseBtn) {
            pauseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                isPaused = !isPaused;
                const icon = this.querySelector('i');
                
                if (isPaused) {
                    // Change to play icon
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    // Stop auto-advance
                    clearInterval(autoAdvanceInterval);
                } else {
                    // Change to pause icon
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    // Resume auto-advance
                    startAutoAdvance();
                }
            });
        }

        // Indicator controls
        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', function() {
                current = idx;
                showSlide(current);
            });
        });

        // Auto-advance function
        function startAutoAdvance() {
            // Clear any existing interval first
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
            }
            // Start new interval
            autoAdvanceInterval = setInterval(() => {
                if (!isPaused) {
                    current = (current + 1) % slides.length;
                    showSlide(current);
                }
            }, 5000);
        }

        // Initialize first slide and start auto-advance
        showSlide(0);
        startAutoAdvance();
    });
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.email || !data.firstName || !data.lastName) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the data to your backend
            console.log('Form submitted:', data);
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Newsletter signup
    const newsletterForm = document.querySelector('.newsletter-signup');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (emailInput && emailInput.value) {
                    console.log('Newsletter signup:', emailInput.value);
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .testimonial-card, .team-member, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Stats counter animation
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const target = counter.textContent;
            const isCurrency = target.includes('$');
            const isPercentage = target.includes('%');
            
            let numericValue = target.replace(/[^0-9.]/g, '');
            if (numericValue.includes('.')) {
                numericValue = parseFloat(numericValue);
            } else {
                numericValue = parseInt(numericValue);
            }
            
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue;
                if (isCurrency) {
                    displayValue = '$' + current.toLocaleString();
                } else if (isPercentage) {
                    displayValue = Math.round(current) + '%';
                } else {
                    displayValue = Math.round(current).toLocaleString();
                }
                
                counter.textContent = displayValue;
            }, 20);
        });
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Smooth reveal animations for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
});

// Add CSS for section animations
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('aboutTeamVideo');
    const btn = document.getElementById('aboutTeamAudioBtn');
    const icon = document.getElementById('audioIcon');
    if (video && btn && icon) {
        btn.addEventListener('click', function() {
            video.muted = !video.muted;
            icon.textContent = video.muted ? '🔇' : '🔊';
        });
    }
}); 

// Economics carousel functionality
(function() {
    document.querySelectorAll('.economics-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const indicators = carousel.querySelectorAll('.indicator');
        let current = 0;

        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === idx);
            });
        }

        // Button controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current - 1 + slides.length) % slides.length;
                showSlide(current);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current + 1) % slides.length;
                showSlide(current);
            });
        }

        // Indicator controls
        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', function() {
                current = idx;
                showSlide(current);
            });
        });

        // Auto-advance carousel
        setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);

        // Fullscreen functionality
        const images = carousel.querySelectorAll('.economics-image');
        images.forEach((img, imgIdx) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                let fsIdx = imgIdx;
                
                // Hide navbar
                const navbar = document.querySelector('.navbar');
                if (navbar) navbar.style.display = 'none';
                
                // Create overlay
                const overlay = document.createElement('div');
                overlay.className = 'economics-carousel-fullscreen-bg';
                document.body.appendChild(overlay);
                
                // Create fullscreen image
                const fullscreenImg = document.createElement('img');
                fullscreenImg.src = images[fsIdx].src;
                fullscreenImg.alt = images[fsIdx].alt;
                fullscreenImg.className = 'economics-carousel-image fullscreen';
                document.body.appendChild(fullscreenImg);
                
                // Create arrows
                const leftArrow = document.createElement('button');
                leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
                leftArrow.className = 'economics-carousel-btn fullscreen-arrow left';
                leftArrow.style.position = 'fixed';
                leftArrow.style.top = '50%';
                leftArrow.style.left = '32px';
                leftArrow.style.transform = 'translateY(-50%)';
                leftArrow.style.zIndex = '10000';
                document.body.appendChild(leftArrow);
                
                const rightArrow = document.createElement('button');
                rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
                rightArrow.className = 'economics-carousel-btn fullscreen-arrow right';
                rightArrow.style.position = 'fixed';
                rightArrow.style.top = '50%';
                rightArrow.style.right = '32px';
                rightArrow.style.transform = 'translateY(-50%)';
                rightArrow.style.zIndex = '10000';
                document.body.appendChild(rightArrow);
                
                // Create exit button
                const exitBtn = document.createElement('button');
                exitBtn.innerHTML = '<i class="fas fa-times"></i>';
                exitBtn.setAttribute('aria-label', 'Exit fullscreen');
                exitBtn.className = 'economics-carousel-btn fullscreen-exit';
                exitBtn.style.position = 'fixed';
                exitBtn.style.top = '32px';
                exitBtn.style.right = '32px';
                exitBtn.style.zIndex = '10001';
                exitBtn.style.background = '#23283a';
                exitBtn.style.color = '#fff';
                exitBtn.style.fontSize = '2rem';
                exitBtn.style.border = 'none';
                exitBtn.style.borderRadius = '50%';
                exitBtn.style.width = '48px';
                exitBtn.style.height = '48px';
                exitBtn.style.display = 'flex';
                exitBtn.style.alignItems = 'center';
                exitBtn.style.justifyContent = 'center';
                exitBtn.style.cursor = 'pointer';
                document.body.appendChild(exitBtn);
                
                // Show image by index
                function showFs(idx) {
                    fsIdx = (idx + images.length) % images.length;
                    fullscreenImg.src = images[fsIdx].src;
                    fullscreenImg.alt = images[fsIdx].alt;
                }
                
                // Arrow events
                leftArrow.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showFs(fsIdx - 1);
                });
                rightArrow.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showFs(fsIdx + 1);
                });
                
                // Close on click or exit
                function closeFullscreen() {
                    fullscreenImg.remove();
                    overlay.remove();
                    leftArrow.remove();
                    rightArrow.remove();
                    exitBtn.remove();
                    if (navbar) navbar.style.display = '';
                }
                
                fullscreenImg.addEventListener('click', closeFullscreen);
                overlay.addEventListener('click', closeFullscreen);
                exitBtn.addEventListener('click', closeFullscreen);
            });
        });

        // Initialize first slide
        showSlide(0);
    });
})();

// Key Features carousel functionality
(function() {
    document.querySelectorAll('.key-features-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const indicators = carousel.querySelectorAll('.indicator');
        let current = 0;

        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === idx);
            });
        }

        // Button controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current - 1 + slides.length) % slides.length;
                showSlide(current);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current + 1) % slides.length;
                showSlide(current);
            });
        }

        // Indicator controls
        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', function() {
                current = idx;
                showSlide(current);
            });
        });

        // Auto-advance carousel
        setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);

        // Initialize first slide
        showSlide(0);
    });
})(); 

// Info Blocks Toggle
function toggleBlock(block) {
    // Simply toggle the active class on the clicked block
    block.classList.toggle('active');
} 

// Audio toggle functionality
function toggleAudio(button) {
    const video = button.parentElement.querySelector('video');
    const icon = button.querySelector('i');
    
    if (video.muted) {
        video.muted = false;
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    } else {
        video.muted = true;
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
} 

// Bio toggle functionality
function toggleBio(button) {
    const teamMember = button.closest('.team-member');
    const bioContent = teamMember.querySelector('.bio-content');
    const isExpanded = teamMember.classList.contains('expanded');
    
    // Get all team members
    const allTeamMembers = document.querySelectorAll('.team-member');
    
    if (!isExpanded) {
        // If not expanded, expand all bios
        allTeamMembers.forEach(member => {
            member.classList.add('expanded');
            member.querySelector('.bio-content').classList.remove('collapsed');
        });
    } else {
        // If expanded, collapse all bios
        allTeamMembers.forEach(member => {
            member.classList.remove('expanded');
            member.querySelector('.bio-content').classList.add('collapsed');
        });
    }
    
    // Scroll into view if expanding
    if (!isExpanded) {
        setTimeout(() => {
            bioContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
} 

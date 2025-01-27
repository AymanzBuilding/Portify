document.addEventListener("DOMContentLoaded", () => {
    // Select all elements to animate
    const animatableElements = document.querySelectorAll(
        'h2:not(.no-animation), h3:not(.no-animation), h4:not(.no-animation), p:not(.no-animation), .experience-card, .bio-section, .skills-list, .contact-info a, .skill-bar div'
    );

    // Set initial hidden state for all elements
    animatableElements.forEach(el => {
        el.style.opacity = 0; // Hide the element
        el.style.transform = "translateY(20px)"; // Apply a small offset for animation
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"; // Animation styles
    });

    // Create IntersectionObserver to manage animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When in viewport, make visible and animate
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            } else {
                // When out of viewport, reset to hidden state
                entry.target.style.opacity = 0;
                entry.target.style.transform = "translateY(20px)";
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    // Observe all animatable elements
    animatableElements.forEach(el => observer.observe(el));

    // Profile image hover effect
    const profileImage = document.querySelector('.profile-img');
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = "scale(1.1)";
        profileImage.style.transition = "transform 0.3s ease-in-out";
    });
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = "scale(1)";
    });

    // Contact links bounce effect
    const contactLinks = document.querySelectorAll('.contact-info a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('bounce');
        });
        link.addEventListener('animationend', () => {
            link.classList.remove('bounce');
        });
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar div');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = "scaleX(1)";
            } else {
                entry.target.style.transform = "scaleX(0)"; // Reset when out of viewport
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
        bar.style.transform = "scaleX(0)"; // Initial state (hidden)
    });

    // ========================= Contact Phone Random Movement =========================
    const phones = document.querySelectorAll('.contact-phone');
    phones.forEach(phone => {
        // Generate random values for swimming movement
        const randomXStart = (Math.random() * 20 - 10) + 'px';
        const randomYStart = (Math.random() * 20 - 10) + 'px';
        const randomX1 = (Math.random() * 20 - 10) + 'px';
        const randomY1 = (Math.random() * 20 - 10) + 'px';
        const randomX2 = (Math.random() * 20 - 10) + 'px';
        const randomY2 = (Math.random() * 20 - 10) + 'px';
        const randomX3 = (Math.random() * 20 - 10) + 'px';
        const randomY3 = (Math.random() * 20 - 10) + 'px';
        const randomX4 = randomXStart;
        const randomY4 = randomYStart;

        // Set CSS custom properties for movement
        phone.style.setProperty('--randomXStart', randomXStart);
        phone.style.setProperty('--randomYStart', randomYStart);
        phone.style.setProperty('--randomX1', randomX1);
        phone.style.setProperty('--randomY1', randomY1);
        phone.style.setProperty('--randomX2', randomX2);
        phone.style.setProperty('--randomY2', randomY2);
        phone.style.setProperty('--randomX3', randomX3);
        phone.style.setProperty('--randomY3', randomY3);
        phone.style.setProperty('--randomX4', randomX4);
        phone.style.setProperty('--randomY4', randomY4);
    });

    let phonesCurrentIndex = 0;

    // Activate next phone card for swimming effect
    function activateNextPhone() {
        let currentIndex = phonesCurrentIndex;
        phones[currentIndex].classList.add('active');

        setTimeout(() => {
            phones[currentIndex].classList.remove('active');
        }, 2000); // Duration of active class

        phonesCurrentIndex = (phonesCurrentIndex + 1) % phones.length;
    }

    // Start swimming effect cycle
    setInterval(activateNextPhone, 2500);
});
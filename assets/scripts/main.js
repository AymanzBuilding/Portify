// ========================= Scroll Event Handler =========================
document.addEventListener('scroll', () => {
    const header = document.querySelector('header.main');
    const placeholder = document.querySelector('.header-placeholder');

    // Adjust placeholder height to match header height on scroll
    placeholder.style.height = `${header.offsetHeight}px`;

    const scrollPosition = window.scrollY;

    // Handle header appearance on scroll
    if (scrollPosition > 0) {
        header.classList.add('scrolled');
        placeholder.classList.add('active'); // Show placeholder
    } else {
        header.classList.remove('scrolled');
        placeholder.classList.remove('active'); // Hide placeholder
    }

    // ========================= Smooth Scroll for Links =========================
    const links = document.querySelectorAll('a[href^="#"], a[data-href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            // Check if link has data-href, then scroll to top
            if (link.getAttribute('data-href')) {
                document.body.scrollTop = 0; // Safari
                document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
                return;
            }

            // Smooth scroll to target section
            const targetId = link.getAttribute('href') || link.getAttribute('data-href');
            const targetElement = document.getElementById(targetId.substring(1));

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    adjustHeader(); // Adjust header after scroll
                }, 0);
            }
        });
    });

    // ========================= Social Icons Scroll Effects =========================
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon) => {
        if (scrollPosition > 0) {
            icon.classList.add('scrolled');
        } else {
            icon.classList.remove('scrolled');
        }
    });

    // ========================= Active Navigation Links =========================
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add 'active' class to clicked link
            event.target.classList.add('active');
        });
    });
});

// ========================= Portfolio Card Slider =========================
document.addEventListener('DOMContentLoaded', () => {
    // Portfolio project data
    const portfolioData = [
        {
            image: 'assets/images/project1.jpg',
            title: 'Java Firebase-based Social Media Android Application',
            description: `An engaging social media platform crafted using Java and Firebase.`,
        },
        {
            image: 'assets/images/project2.PNG',
            title: 'Immersive VR Product Showcase Template',
            description: `A visually stunning template designed to showcase a VR headset.`,
        }
    ];

    const imageContainer = document.querySelector('.image-container img');
    const projectTitle = document.querySelector('.project-title');
    const projectDescription = document.querySelector('.project-description');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Update portfolio card content
    function updateCard(index) {
        const project = portfolioData[index];
        imageContainer.classList.add('fade-out');
        projectTitle.classList.add('fade-out');
        projectDescription.classList.add('fade-out');

        setTimeout(() => {
            imageContainer.src = project.image;
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;

            // Fade in new content
            imageContainer.classList.remove('fade-out');
            projectTitle.classList.remove('fade-out');
            projectDescription.classList.remove('fade-out');
            imageContainer.classList.add('fade-in');
            projectTitle.classList.add('fade-in');
            projectDescription.classList.add('fade-in');
            imageContainer.classList.add('pulse');

            setTimeout(() => {
                imageContainer.classList.remove('fade-in');
                projectTitle.classList.remove('fade-in');
                projectDescription.classList.remove('fade-in');
            }, 800);
        }, 800);
    }

    // Event listeners for previous/next buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
        updateCard(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % portfolioData.length;
        updateCard(currentIndex);
    });

    updateCard(currentIndex);

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

// ========================= Image Overlay (Portfolio Click) =========================
const overlay = document.getElementById('image-overlay');
const overlayImage = document.getElementById('overlay-image');
const portfolioImage = document.querySelector('.portfolio-image');

portfolioImage.addEventListener('click', () => {
    overlay.style.display = 'grid';
    overlayImage.src = portfolioImage.src;
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Close overlay on Esc key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        overlay.style.display = 'none';
    }
});

// ========================= Testimonial Slider =========================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.testimonial-card-container');
let currentTestimonialIndex = 0;

// Adjust container height based on active testimonial card
function adjustContainerHeight() {
    const activeCard = document.querySelector('.testimonial-card.active');
    if (activeCard) {
        container.style.height = `${activeCard.offsetHeight}px`;
    }
}

// Show specific testimonial based on index
function showTestimonial(index) {
    testimonialCards.forEach((card, idx) => {
        card.classList.remove('active');
        dots[idx].classList.remove('active');
    });

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    adjustContainerHeight();
}

// Auto slide testimonials every 5 seconds
function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(currentTestimonialIndex);
}

// Event listeners for dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentTestimonialIndex = parseInt(dot.dataset.index);
        showTestimonial(currentTestimonialIndex);
    });
});

// Initial setup
showTestimonial(currentTestimonialIndex);
adjustContainerHeight(); // Set initial height

// Re-adjust on window resize
window.addEventListener('resize', adjustContainerHeight);

// Start auto slide
setInterval(nextTestimonial, 5000);

// ========================= Mobile Navigation =========================
document.getElementById('menu-btn').addEventListener('click', function () {
    document.getElementById('mobile-nav').classList.add('active');
});

document.querySelectorAll('#mobile-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
        document.getElementById('mobile-nav').classList.remove('active');
    });
});

// // ========================= Intersection Observer (Animate on Scroll) =========================
// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('element-in-view');
//         } else {
//             entry.target.classList.remove('element-in-view');
//         }
//     });
// }, { threshold: 0.2 });

// const elementsToAnimate = document.querySelectorAll('.about-left, .about-right, .cards-container, .card, .services-header-container, .services-cards-container, .transparent-card, .skills-row, .skills-left, .skills-right, .skill');

// // Observe elements for animation
// elementsToAnimate.forEach(element => {
//     observer.observe(element);
// });
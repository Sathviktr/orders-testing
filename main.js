// Price constants for each item
 function createParticles() {
            const particles = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particles.appendChild(particle);
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
        function fadeInOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Header background change on scroll
        function updateHeader() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        }

        // Initialize
        window.addEventListener('load', () => {
            createParticles();
            fadeInOnScroll();
        });

        window.addEventListener('scroll', () => {
            fadeInOnScroll();
            updateHeader();
        });

        // Add floating animation to WhatsApp button
        const whatsappButton = document.querySelector('.whatsapp-float');
        setInterval(() => {
            whatsappButton.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                whatsappButton.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
        document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = reviewForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Handle form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(reviewForm);
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // Show success message
            successMessage.style.display = 'flex';
            
            // Reset form
            reviewForm.reset();
            
            // Reset star ratings
            const stars = document.querySelectorAll('.stars-input .star');
            stars.forEach(star => {
                star.style.color = 'rgba(255, 215, 0, 0.3)';
                star.style.transform = 'scale(1)';
            });
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Sorry, there was an error submitting your review. Please try again.');
        })
        .finally(() => {
            // Reset button state
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        });
    });

    // Close success message when clicked
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            successMessage.style.display = 'none';
        }
    });

    // Add interactive hover effects to review cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
const PRICES = {
    uggani: 70,
    couple: 130,
    family: 250
};

// Function to update quantity and total
function updateQuantity(itemId, change) {
    const input = document.getElementById(itemId);
    const currentValue = parseInt(input.value) || 0;
    const newValue = Math.max(0, currentValue + change);
    input.value = newValue;
    updateTotal();
}

// Function to calculate and update total amount
function updateTotal() {
    const ugganiQuantity = parseInt(document.getElementById('uggani').value) || 0;
    const coupleQuantity = parseInt(document.getElementById('couple').value) || 0;
    const familyQuantity = parseInt(document.getElementById('family').value) || 0;
    
    const total = (ugganiQuantity * PRICES.uggani) + 
                 (coupleQuantity * PRICES.couple) + 
                 (familyQuantity * PRICES.family);
    
    document.getElementById('totalAmount').textContent = `₹${total}`;
}

// Update datetime display
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    document.getElementById('current-datetime').textContent = formattedDate;
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial total
    updateTotal();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial update
    
    // Set up form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Set up datetime validation
    setupDateTimeValidation();
});

// Form submission handler
function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Get total amount
    const total = document.getElementById('totalAmount').textContent;
    const totalValue = parseInt(total.replace('₹', ''));
    
    // Validate order
    if (totalValue === 0) {
        alert('Please select at least one item to order.');
        return;
    }

    // Show loading state
    const btnText = e.target.querySelector('.btn-text');
    const btnLoader = e.target.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';

    // Submit form
    const formData = new FormData(e.target);
    formData.append('total', total);

    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            alert('Order placed successfully! We will contact you on WhatsApp to confirm your order.');
            e.target.reset();
            updateTotal();
        } else {
            throw new Error('Order submission failed');
        }
    })
    .catch(error => {
        alert('There was a problem submitting your order. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        btnLoader.style.display = 'none';
        btnText.style.display = 'block';
    });
}

// Set up datetime validation
function setupDateTimeValidation() {
    const dateInput = document.querySelector('input[type="date"]');
    const timeInput = document.querySelector('input[type="time"]');
    
    if (dateInput) {
        // Set minimum date to current date
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Add date validation for weekends only
        dateInput.addEventListener('change', function(e) {
            const selected = new Date(this.value);
            const day = selected.getDay();
            
            // 0 is Sunday, 6 is Saturday
            if (day !== 0 && day !== 6) {
                alert('Please select a weekend day (Saturday or Sunday)');
                this.value = '';
            }
        });
    }
    
    if (timeInput) {
        // Add time validation for allowed hours
        timeInput.addEventListener('change', function(e) {
            const time = this.value;
            const hour = parseInt(time.split(':')[0]);
            
            // Check if time is within allowed ranges (7-11 AM or 4-7 PM)
            if ((hour < 7 || (hour > 11 && hour < 16) || hour > 19)) {
                alert('Please select a time between 7:00 AM - 11:00 AM or 4:00 PM - 7:00 PM');
                this.value = '';
            }
        });
    }
}
const REVIEWS_PER_PAGE = 2; // Adjust as needed
const reviewsGrid = document.getElementById('reviewsGrid');
const reviewCards = reviewsGrid.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevReviews');
const nextBtn = document.getElementById('nextReviews');
let currentPage = 0;

function updateReviews() {
    const totalPages = Math.ceil(reviewCards.length / REVIEWS_PER_PAGE);
    // Calculate the width to shift (assuming each card is the same width)
    const shift = currentPage * reviewsGrid.offsetWidth;
    reviewsGrid.style.transform = `translateX(-${currentPage * 100}%)`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateReviews();
    }
});
nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(reviewCards.length / REVIEWS_PER_PAGE);
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateReviews();
    }
});

updateReviews();

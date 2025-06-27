// Price constants for each item and variant
const PRICES = {
    // Packed items
    borugula_250: 70,
    borugula_500: 140,
    chudva_250: 120,
    chudva_500: 240,
    chudvaborugulu_250: 100,
    chudvaborugulu_500: 190,
    nallakaram_100: 65,
    nallakaram_250: 140,
    pappula_100: 65,
    pappula_250: 140,
    kobbarivelluli_100: 80,
    kobbarivelluli_250: 160,
    sununda_250: 190,
    sununda_500: 380,
    
    // Fresh items with variants
    uggani_single: 70,
    uggani_couple: 130,
    uggani_family: 250,
    dosa_plain: 60,
    dosa_karam: 70,
    dosa_ghee: 80,
    dosa_egg: 90,
    poha: 70,
    
    // Fixed price items
    guntha: 60,
    guddu: 60,
    ugganiponganalu: 120,
    ugganiguddu: 130,
    extrabajji: 10
};

// Item names mapping with variants
const ITEM_NAMES = {
    // Packed items
    borugula_250: "Borugula Mixture (250gm)",
    borugula_500: "Borugula Mixture (500gm)",
    chudva_250: "Chudva (250gm)",
    chudva_500: "Chudva (500gm)",
    chudvaborugulu_250: "Chudva Borugulu (250gm)",
    chudvaborugulu_500: "Chudva Borugulu (500gm)",
    nallakaram_100: "Nalla Karam Podi (100gm)",
    nallakaram_250: "Nalla Karam Podi (250gm)",
    pappula_100: "Pappula Podi (100gm)",
    pappula_250: "Pappula Podi (250gm)",
    kobbarivelluli_100: "Kobbari Velluli Karam (100gm)",
    kobbarivelluli_250: "Kobbari Velluli Karam (250gm)",
    sununda_250: "Sununda (250gm)",
    sununda_500: "Sununda (500gm)",
    
    // Fresh items
    uggani_single: "Uggani & Bajji (Single)",
    uggani_couple: "Uggani & Bajji (Couple)",
    uggani_family: "Uggani & Bajji (Family)",
    dosa_plain: "Plain Dosa",
    dosa_karam:"Karam Dosa",
    dosa_ghee:"Ghee Karam Dosa",
    dosa_egg:"Egg Dosa",
    guntha: "Guntha Ponganalu (8pc)",
    guddu: "Guddu Ponganalu (6pc)",
    ugganiponganalu: "Uggani Bajji & Ponganalu",
    ugganiguddu: "Uggani Bajji & Guddu Ponganalu",
    poha: "Poha",
    extrabajji: "Extra Bajji"
};

// Create floating particles
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

// Toggle packed items section
function togglePackedItems() {
    const packedList = document.getElementById('packedItemsList');
    const arrow = document.querySelector('.dropdown-arrow');
    const isVisible = packedList.style.display === 'block';
    
    if (isVisible) {
        packedList.style.opacity = '0';
        arrow.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            packedList.style.display = 'none';
        }, 300);
    } else {
        packedList.style.display = 'block';
        packedList.style.opacity = '0';
        arrow.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            packedList.style.opacity = '1';
        }, 10);
    }
}

// Update quantity for any item
function updateQuantity(itemId, change) {
    const input = document.getElementById(itemId);
    const currentValue = parseInt(input.value) || 0;
    const newValue = Math.max(0, currentValue + change);
    input.value = newValue;
    updateTotal();
}

// Calculate and update total amount
function updateTotal() {
    let grandTotal = 0;
    let orderDetails = [];
    
    // Calculate total for all items and variants
    for (const [itemId, price] of Object.entries(PRICES)) {
        const quantity = parseInt(document.getElementById(itemId)?.value) || 0;
        if (quantity > 0) {
            const subtotal = quantity * price;
            grandTotal += subtotal;
            orderDetails.push(`${ITEM_NAMES[itemId]} × ${quantity} = ₹${subtotal}`);
        }
    }
    
    // Update total display
    document.getElementById('totalAmount').textContent = `₹${grandTotal}`;
    
    // Update hidden form fields with current timestamp and user
    document.getElementById('form-total-amount').value = `₹${grandTotal}`;
    document.getElementById('form-order-items').value = orderDetails.join('\n');
    document.getElementById('form-timestamp').value = "2025-06-11 16:32:34";
    document.getElementById('form-user-login').value = "Sathviktr";
}

// Check if any fresh items are selected
function hasFreshItems() {
    const freshItemIds = [
        'uggani_single', 'uggani_couple', 'uggani_family',
        'guntha', 'guddu', 'ugganiponganalu', 'ugganiguddu','poha', 'extrabajji','dosa_plain','dosa_karam','dosa_ghee','dosa_egg'
    ];
    
    return freshItemIds.some(id => 
        parseInt(document.getElementById(id)?.value) || 0 > 0
    );
}

// Setup datetime validation
function setupDateTimeValidation() {
    const dateInput = document.querySelector('input[type="date"]');
    const timeInput = document.querySelector('input[type="time"]');
    
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        dateInput.addEventListener('change', function() {
            const selected = new Date(this.value);
            const day = selected.getDay();
            
            if (hasFreshItems() && (day !== 0 && day !== 6)) {
                alert('Fresh items can only be delivered on weekends (Saturday or Sunday). Packed items can be delivered any day.');
                this.value = '';
            }
        });
    }
    
    if (timeInput) {
        timeInput.addEventListener('change', function() {
            const time = this.value;
            const hour = parseInt(time.split(':')[0]);
            
            if (hasFreshItems() && (hour < 7 || (hour > 11 && hour < 16) || hour > 19)) {
                alert('Fresh items delivery time: 7:00 AM - 11:00 AM or 4:00 PM - 7:00 PM. Packed items have flexible timing.');
                this.value = '';
            }
        });
    }
}

// Handle form submission
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const totalValue = parseInt(document.getElementById('totalAmount').textContent.replace('₹', ''));
    
    if (totalValue === 0) {
        alert('Please select at least one item to order.');
        return;
    }

    const btnText = e.target.querySelector('.btn-text');
    const btnLoader = e.target.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';

    if (hasFreshItems()) {
        const dateInput = document.querySelector('input[name="preferred_date"]');
        const timeInput = document.querySelector('input[name="preferred_time"]');
        
        if (!dateInput.value || !timeInput.value) {
            alert('Please select delivery date and time for fresh items.');
            btnLoader.style.display = 'none';
            btnText.style.display = 'block';
            return;
        }
    }

    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(e.target)).toString()
    })
    .then(response => {
        if (response.ok) {
            alert('Order placed successfully! We will contact you on WhatsApp to confirm your order.');
            resetForm(e.target);
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

// Reset form
function resetForm(form) {
    form.reset();
    
    Object.keys(PRICES).forEach(itemId => {
        const input = document.getElementById(itemId);
        if (input) input.value = '0';
    });
    
    updateTotal();
    
    const packedList = document.getElementById('packedItemsList');
    const arrow = document.querySelector('.dropdown-arrow');
    if (packedList.style.display === 'block') {
        packedList.style.opacity = '0';
        arrow.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            packedList.style.display = 'none';
        }, 300);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    updateTotal();
    
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    setupDateTimeValidation();
    
    // Close packed items when clicking outside
    document.addEventListener('click', function(event) {
        const packedSection = document.querySelector('.menu-section');
        const packedList = document.getElementById('packedItemsList');
        const arrow = document.querySelector('.dropdown-arrow');
        
        if (packedList.style.display === 'block' && 
            !packedSection.contains(event.target)) {
            packedList.style.opacity = '0';
            arrow.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                packedList.style.display = 'none';
            }, 300);
        }
    });
});

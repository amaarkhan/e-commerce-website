// Global Variables
let cart = [];
let products = [];
let currentFilter = 'all';

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        badge: "New"
    },
    {
        id: 3,
        name: "Premium Leather Jacket",
        price: 159.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        badge: "Sale"
    },
    {
        id: 4,
        name: "Designer Sunglasses",
        price: 89.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        badge: ""
    },
    {
        id: 5,
        name: "Ergonomic Office Chair",
        price: 199.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        badge: "Best Seller"
    },
    {
        id: 6,
        name: "Smartphone Case",
        price: 24.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.2,
        badge: ""
    },
    {
        id: 7,
        name: "Casual Cotton T-Shirt",
        price: 29.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.1,
        badge: ""
    },
    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        price: 49.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        badge: "New"
    },
    {
        id: 9,
        name: "Plant Pot Set",
        price: 34.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        badge: ""
    },
    {
        id: 10,
        name: "Gaming Mechanical Keyboard",
        price: 129.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.9,
        badge: "Best Seller"
    },
    {
        id: 11,
        name: "Vintage Denim Jeans",
        price: 69.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        badge: "Sale"
    },
    {
        id: 12,
        name: "Minimalist Desk Lamp",
        price: 45.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        badge: ""
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    animateOnScroll();
});

// Initialize Application
function initializeApp() {
    products = [...sampleProducts];
    loadProducts();
    updateCartDisplay();
    loadCartFromStorage();
    
    // Initialize EmailJS
    initializeEmailJS();
}

// Initialize EmailJS
function initializeEmailJS() {
    // EmailJS configuration
    const EMAILJS_PUBLIC_KEY = '5nivqhNinSfXdeTU5';
    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS initialized successfully');
    } else {
        console.warn('⚠️ EmailJS library not found. Email functionality will not work.');
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter subscription
    const newsletter = document.querySelector('.newsletter');
    if (newsletter) {
        newsletter.addEventListener('submit', handleNewsletterSubscription);
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

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Load Products
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Show loading spinner
    productsGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    // Simulate loading delay for better UX
    setTimeout(() => {
        const filteredProducts = currentFilter === 'all' 
            ? products 
            : products.filter(product => product.category === currentFilter);

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search" style="font-size: 2rem; color: #ddd; margin-bottom: 1rem;"></i>
                    <p>No products found in this category.</p>
                    <button onclick="filterProducts('all')" style="margin-top: 1rem; padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">View All Products</button>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card fade-in">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        <span class="stars">${generateStars(product.rating)}</span>
                        <span>(${product.rating})</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        // Trigger animation for new products
        setTimeout(() => {
            document.querySelectorAll('.product-card.fade-in').forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }, 500);
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Load filtered products
    loadProducts();
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToStorage();
    showAddToCartAnimation();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

// Update Cart Quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        saveCartToStorage();
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartCount || !cartItems || !cartTotal) return;

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (!cartSidebar || !cartOverlay) return;

    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    
    // Prevent body scroll when cart is open
    if (cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Search Functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    if (searchTerm === '') {
        // If search is cleared, show all products or current filter
        loadProducts();
        return;
    }

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 2rem; color: #ddd; margin-bottom: 1rem;"></i>
                <p>No products found matching your search.</p>
                <button onclick="document.getElementById('search-input').value=''; loadProducts();" style="margin-top: 1rem; padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Clear Search</button>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span>(${product.rating})</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Trigger animation for search results
    setTimeout(() => {
        document.querySelectorAll('.product-card.fade-in').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;

    // Simulate form submission
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        event.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Newsletter Subscription Handler
function handleNewsletterSubscription(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const button = event.target.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        alert(`Thank you for subscribing with email: ${email}`);
        event.target.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Save Cart to Local Storage
function saveCartToStorage() {
    localStorage.setItem('shophub-cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shophub-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Add to Cart Animation
function showAddToCartAnimation() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Item added to cart!</span>
    `;
    
    // Add styles for the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1002;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Animate on Scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Window Resize Handler
window.addEventListener('resize', function() {
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
            toggleCart();
        }
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }
});

// Performance: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Smooth scrolling for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Initialize polyfill
smoothScrollPolyfill();

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleCart = toggleCart;
window.filterProducts = filterProducts;
window.scrollToSection = scrollToSection;

// Order Management System
let orders = [];
let currentStep = 1;
let orderData = {
    customer: {},
    payment: {},
    items: [],
    totals: {}
};

// Load orders from localStorage
function loadOrdersFromStorage() {
    const savedOrders = localStorage.getItem('shophub_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Save orders to localStorage
function saveOrdersToStorage() {
    localStorage.setItem('shophub_orders', JSON.stringify(orders));
}

// Start Checkout Process
function startCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checkout.');
        return;
    }
    
    // Reset checkout data
    currentStep = 1;
    orderData = {
        customer: {},
        payment: {},
        items: [...cart],
        totals: calculateOrderTotals()
    };
    
    // Show checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset steps
    showStep(1);
    updateStepIndicators();
    
    // Setup payment method change listeners
    setupPaymentMethodListeners();
}

// Close Checkout Modal
function closeCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('checkout-form').reset();
    currentStep = 1;
}

// Calculate Order Totals
function calculateOrderTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    return {
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
    };
}

// Show Step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(stepDiv => {
        stepDiv.classList.add('hidden');
    });
    
    // Show current step
    document.getElementById(`step-${step}`).classList.remove('hidden');
    currentStep = step;
    
    // Update step 3 (review) content when shown
    if (step === 3) {
        updateOrderReview();
    }
}

// Update Step Indicators
function updateStepIndicators() {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

// Next Step
function nextStep() {
    if (currentStep === 1) {
        if (validateShippingInfo()) {
            saveShippingInfo();
            showStep(2);
            updateStepIndicators();
        }
    } else if (currentStep === 2) {
        if (validatePaymentInfo()) {
            savePaymentInfo();
            showStep(3);
            updateStepIndicators();
        }
    }
}

// Previous Step
function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
        updateStepIndicators();
    }
}

// Validate Shipping Information
function validateShippingInfo() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode', 'state'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    // Validate email format
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email').style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

// Validate Payment Information
function validatePaymentInfo() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            alert('Please fill in all card details.');
            return false;
        }
    }
    
    return true;
}

// Save Shipping Information
function saveShippingInfo() {
    orderData.customer = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipCode: document.getElementById('zipCode').value,
        state: document.getElementById('state').value
    };
}

// Save Payment Information
function savePaymentInfo() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    orderData.payment = {
        method: paymentMethod
    };
    
    if (paymentMethod === 'card') {
        orderData.payment.cardDetails = {
            cardNumber: '****-****-****-' + document.getElementById('cardNumber').value.slice(-4),
            cardName: document.getElementById('cardName').value
        };
    }
}

// Setup Payment Method Listeners
function setupPaymentMethodListeners() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const bankDetails = document.getElementById('bank-details');
            const cardDetails = document.getElementById('card-details');
            
            // Hide all payment details
            bankDetails.classList.add('hidden');
            cardDetails.classList.add('hidden');
            
            // Show relevant payment details
            if (this.value === 'bank-transfer') {
                bankDetails.classList.remove('hidden');
            } else if (this.value === 'card') {
                cardDetails.classList.remove('hidden');
            }
        });
    });
}

// Update Order Review
function updateOrderReview() {
    // Update order items
    const orderItemsContainer = document.getElementById('order-items-review');
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">Quantity: ${item.quantity}</div>
            </div>
            <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    // Update totals
    const totals = calculateOrderTotals();
    document.getElementById('order-subtotal').textContent = `$${totals.subtotal.toFixed(2)}`;
    document.getElementById('order-shipping').textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
    document.getElementById('order-tax').textContent = `$${totals.tax.toFixed(2)}`;
    document.getElementById('order-grand-total').textContent = `$${totals.total.toFixed(2)}`;
    
    // Update shipping address
    const shippingAddress = `
        ${orderData.customer.firstName} ${orderData.customer.lastName}<br>
        ${orderData.customer.address}<br>
        ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zipCode}<br>
        ${orderData.customer.phone}<br>
        ${orderData.customer.email}
    `;
    document.getElementById('shipping-address-review').innerHTML = shippingAddress;
    
    // Update payment method
    let paymentMethodText = '';
    switch (orderData.payment.method) {
        case 'cod':
            paymentMethodText = 'Cash on Delivery';
            break;
        case 'bank-transfer':
            paymentMethodText = 'Bank Transfer';
            break;
        case 'card':
            paymentMethodText = `Credit/Debit Card (${orderData.payment.cardDetails?.cardNumber || '****-****-****-****'})`;
            break;
    }
    document.getElementById('payment-method-review').textContent = paymentMethodText;
}

// Place Order
function placeOrder(event) {
    event.preventDefault();
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now();
    
    // Create order object
    const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        customer: orderData.customer,
        payment: orderData.payment,
        items: orderData.items,
        totals: calculateOrderTotals(),
        status: 'confirmed'
    };
    
    // Save order
    orders.push(order);
    saveOrdersToStorage();
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
    
    // Close checkout modal
    closeCheckout();
    
    // Show order confirmation
    showOrderConfirmation(order);
    
    // Send order confirmation email (simulated)
    sendOrderConfirmationEmail(order);
}

// Show Order Confirmation
function showOrderConfirmation(order) {
    const confirmationModal = document.getElementById('order-confirmation-modal');
    
    // Populate order details
    document.getElementById('order-number').textContent = order.orderNumber;
    document.getElementById('confirmation-total').textContent = `$${order.totals.total.toFixed(2)}`;
    
    let paymentText = '';
    switch (order.payment.method) {
        case 'cod':
            paymentText = 'Cash on Delivery';
            break;
        case 'bank-transfer':
            paymentText = 'Bank Transfer';
            break;
        case 'card':
            paymentText = 'Credit/Debit Card';
            break;
    }
    document.getElementById('confirmation-payment').textContent = paymentText;
    
    // Calculate estimated delivery (3-7 business days)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    document.getElementById('estimated-delivery').textContent = deliveryDate.toLocaleDateString();
    
    // Show modal
    confirmationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Order Confirmation
function closeOrderConfirmation() {
    const confirmationModal = document.getElementById('order-confirmation-modal');
    confirmationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// View Order Details
function viewOrderDetails() {
    closeOrderConfirmation();
    
    // Here you could implement a detailed order view
    // For now, we'll just show an alert with order info
    const lastOrder = orders[orders.length - 1];
    let orderDetails = `Order Details:\n\n`;
    orderDetails += `Order Number: ${lastOrder.orderNumber}\n`;
    orderDetails += `Date: ${new Date(lastOrder.date).toLocaleDateString()}\n`;
    orderDetails += `Customer: ${lastOrder.customer.firstName} ${lastOrder.customer.lastName}\n`;
    orderDetails += `Email: ${lastOrder.customer.email}\n`;
    orderDetails += `Total: $${lastOrder.totals.total.toFixed(2)}\n`;
    orderDetails += `Payment: ${lastOrder.payment.method}\n`;
    orderDetails += `Status: ${lastOrder.status}\n\n`;
    orderDetails += `Items:\n`;
    lastOrder.items.forEach(item => {
        orderDetails += `- ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    alert(orderDetails);
}

// Track Current Order - redirect to tracking page with order number
function trackCurrentOrder() {
    if (orders.length > 0) {
        const lastOrder = orders[orders.length - 1];
        // Redirect to tracking page with order number as URL parameter
        window.open(`tracking.html?order=${lastOrder.orderNumber}`, '_blank');
    } else {
        alert('No order found to track.');
    }
}

// Send Order Confirmation Email (Real Email with EmailJS)
function sendOrderConfirmationEmail(order) {
    // Initialize EmailJS (you need to get these from emailjs.com)
    // REPLACE THESE WITH YOUR ACTUAL VALUES FROM EMAILJS DASHBOARD:
    const EMAILJS_SERVICE_ID = 'service_9n2rlr5';    // Replace with your Service ID (e.g., service_abc123)
    const EMAILJS_TEMPLATE_ID = 'template_icysguc';  // Replace with your Template ID (e.g., template_xyz789)
    const EMAILJS_PUBLIC_KEY = '5nivqhNinSfXdeTU5';    // Replace with your Public Key (e.g., user_abcdefghijk)
    
    // Debug: Log the configuration
    console.log('EmailJS Configuration:');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', EMAILJS_PUBLIC_KEY);
    
    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not loaded. Make sure the EmailJS script is included in your HTML.');
        alert('Email service not available. Please check the configuration.');
        return;
    }
    
    console.log('✅ EmailJS library loaded successfully');
    
    // If not configured, fall back to simulation
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
        console.log('EmailJS not configured. Order confirmation email simulation:', order.customer.email);
        console.log('Order details:', order);
        
        // Show user that email would be sent
        setTimeout(() => {
            alert(`Order confirmation email would be sent to: ${order.customer.email}\n\nTo enable real emails, configure EmailJS in script.js`);
        }, 1000);
        return;
    }
    
    try {
        // Prepare email template parameters to match your EmailJS template
        const estimatedDelivery = new Date(order.date);
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 business days
        
        // Create orders array for the template (your template expects {{#orders}} loop)
        const ordersArray = order.items.map(item => ({
            name: item.name,
            image_url: item.image,
            units: item.quantity,
            price: (item.price * item.quantity).toFixed(2)
        }));
        
        const templateParams = {
            // Email recipient
            email: order.customer.email,
            to_name: `${order.customer.firstName} ${order.customer.lastName}`,
            
            // Order details
            order_id: order.orderNumber,
            
            // Orders array for the loop in your template
            orders: ordersArray,
            
            // Cost breakdown
            cost: {
                shipping: order.totals.shipping.toFixed(2),
                tax: order.totals.tax.toFixed(2),
                total: order.totals.total.toFixed(2)
            },
            
            // Additional info
            order_date: new Date(order.date).toLocaleDateString(),
            estimated_delivery: estimatedDelivery.toLocaleDateString(),
            customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
            shipping_address: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zipCode}`,
            payment_method: formatPaymentMethodForEmail(order.payment.method),
            
            // Tracking information
            tracking_url: `${window.location.origin}/tracking.html?order=${order.orderNumber}`,
            website_url: window.location.origin
        };
        
        // Debug: Log template parameters
        console.log('📧 Email template parameters:', templateParams);
        
        // Show user that email is being sent
        console.log('📤 Sending order confirmation email...');
        
        // Send email
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('✅ Order confirmation email sent successfully!', response.status, response.text);
                // Show success message to user
                setTimeout(() => {
                    alert(`✅ Order confirmation email sent to: ${order.customer.email}`);
                }, 1000);
            })
            .catch(function(error) {
                console.error('❌ Failed to send order confirmation email:', error);
                console.error('Error details:', {
                    name: error.name,
                    message: error.message,
                    text: error.text,
                    status: error.status
                });
                
                // Show detailed error to user
                let errorMessage = 'Order placed successfully! However, we couldn\'t send the confirmation email.\n\n';
                
                if (error.status === 400) {
                    errorMessage += 'Error: Invalid template or missing required fields. Please check your EmailJS template.';
                } else if (error.status === 401) {
                    errorMessage += 'Error: Invalid EmailJS credentials. Please check your Service ID, Template ID, and Public Key.';
                } else if (error.status === 402) {
                    errorMessage += 'Error: EmailJS quota exceeded. Please check your EmailJS account limits.';
                } else if (error.status === 404) {
                    errorMessage += 'Error: EmailJS service or template not found. Please check your Service ID and Template ID.';
                } else {
                    errorMessage += `Error: ${error.message || error.text || 'Unknown error occurred'}`;
                }
                
                errorMessage += '\n\nPlease contact support if needed.';
                alert(errorMessage);
            });
            
    } catch (error) {
        console.error('❌ Error in email function:', error);
        alert('Order placed successfully! However, there was an error with the email service. Please contact support if needed.');
    }
}

// Test EmailJS Configuration (call this from browser console)
function testEmailJS() {
    const testParams = {
        // Email recipient
        email: "your.email@gmail.com", // CHANGE THIS TO YOUR EMAIL FOR TESTING
        to_name: "Test User",
        
        // Order details
        order_id: "TEST-001",
        
        // Orders array for the loop in your template
        orders: [
            {
                name: "Test Product 1",
                image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                units: 2,
                price: "159.98"
            },
            {
                name: "Test Product 2", 
                image_url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                units: 1,
                price: "79.99"
            }
        ],
        
        // Cost breakdown
        cost: {
            shipping: "5.99",
            tax: "19.20",
            total: "265.16"
        },
        
        // Additional info
        order_date: new Date().toLocaleDateString(),
        estimated_delivery: new Date().toLocaleDateString(),
        customer_name: "Test User",
        shipping_address: "123 Test St, Test City, TC 12345",
        payment_method: "Credit Card"
    };
    
    console.log('Testing EmailJS with parameters:', testParams);
    
    emailjs.send('service_9n2rlr5', 'template_icysguc', testParams)
        .then(function(response) {
            console.log('✅ Test email sent successfully!', response);
            alert('✅ Test email sent successfully! Check your email.');
        })
        .catch(function(error) {
            console.error('❌ Test email failed:', error);
            alert('❌ Test email failed. Check console for details.');
        });
}

// Helper function to format payment method for email
function formatPaymentMethodForEmail(method) {
    switch (method) {
        case 'cod': return 'Cash on Delivery';
        case 'bank-transfer': return 'Bank Transfer';
        case 'card': return 'Credit/Debit Card';
        default: return method;
    }
}

// Initialize order system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadOrdersFromStorage();
    
    // Setup checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', placeOrder);
    }
});

// Export order-related functions for global access
window.startCheckout = startCheckout;
window.closeCheckout = closeCheckout;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.closeOrderConfirmation = closeOrderConfirmation;
window.viewOrderDetails = viewOrderDetails;
window.trackCurrentOrder = trackCurrentOrder;

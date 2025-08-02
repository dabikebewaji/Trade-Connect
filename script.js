document.addEventListener('DOMContentLoaded', function() {
    console.log('TradeConnect Website Loaded - Modern UI');
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Enhanced form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Better validation with visual feedback
            const inputs = [
                { el: document.getElementById('name'), value: name },
                { el: document.getElementById('email'), value: email },
                { el: document.getElementById('subject'), value: subject },
                { el: document.getElementById('message'), value: message }
            ];
            
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value) {
                    input.el.classList.add('error');
                    isValid = false;
                    
                    // Clear error class after user starts typing
                    input.el.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                } else {
                    input.el.classList.remove('error');
                }
            });
            
            if (!isValid) {
                // Show elegant error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error fade-in';
                errorMsg.textContent = 'Please fill in all required fields';
                
                // Remove existing error message if any
                const existingError = contactForm.querySelector('.form-error');
                if (existingError) {
                    existingError.remove();
                }
                
                contactForm.prepend(errorMsg);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMsg.classList.add('fade-out');
                    setTimeout(() => errorMsg.remove(), 300);
                }, 3000);
                
                return;
            }
            
            // Simulating form submission with modern UI feedback
            const submitBtn = contactForm.querySelector('[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate server delay
            setTimeout(() => {
                // Reset form and show success message
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Modern success feedback
                const formContainer = contactForm.parentElement;
                
                // Hide the form
                contactForm.style.display = 'none';
                
                // Create success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message fade-in';
                successMsg.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll respond to your message soon.</p>
                    <button class="btn send-another">Send Another Message</button>
                `;
                
                formContainer.appendChild(successMsg);
                
                // Handle "Send Another Message" button
                successMsg.querySelector('.send-another').addEventListener('click', function() {
                    successMsg.classList.add('fade-out');
                    setTimeout(() => {
                        successMsg.remove();
                        contactForm.style.display = 'block';
                    }, 300);
                });
            }, 1500);
        });
    }
    
    // Enhanced search functionality with visual feedback
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const serviceInput = document.querySelector('.search-container input:first-child');
            const locationInput = document.querySelector('.search-container input:last-child');
            
            let isValid = true;
            
            // Validate service input
            if (!serviceInput.value.trim()) {
                serviceInput.classList.add('error');
                isValid = false;
                
                serviceInput.addEventListener('input', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
            
            // Validate location input
            if (!locationInput.value.trim()) {
                locationInput.classList.add('error');
                isValid = false;
                
                locationInput.addEventListener('input', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
            
            if (!isValid) {
                // Show error tooltip
                const searchContainer = document.querySelector('.search-container');
                const errorMsg = document.createElement('div');
                errorMsg.className = 'search-error fade-in';
                errorMsg.textContent = 'Please fill in both fields';
                
                // Remove existing error if any
                const existingError = searchContainer.querySelector('.search-error');
                if (existingError) {
                    existingError.remove();
                }
                
                searchContainer.appendChild(errorMsg);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    errorMsg.classList.add('fade-out');
                    setTimeout(() => errorMsg.remove(), 300);
                }, 3000);
                
                return;
            }
            
            // Show searching animation
            const originalBtnText = searchBtn.textContent;
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            
            // Simulate search delay
            setTimeout(() => {
                // In a real app, this would redirect to search results
                searchBtn.textContent = originalBtnText;
                
                // Show results notification
                const hero = document.querySelector('.hero');
                const resultsNote = document.createElement('div');
                resultsNote.className = 'search-results-notification fade-in';
                resultsNote.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>We found 24 ${serviceInput.value} professionals in ${locationInput.value}</p>
                    <a href="#" class="btn btn-sm">View Results</a>
                `;
                
                hero.appendChild(resultsNote);
                
                // Remove notification after user interaction or timeout
                const closeBtn = document.createElement('span');
                closeBtn.className = 'close-notification';
                closeBtn.innerHTML = '&times;';
                resultsNote.prepend(closeBtn);
                
                closeBtn.addEventListener('click', function() {
                    resultsNote.classList.add('fade-out');
                    setTimeout(() => resultsNote.remove(), 300);
                });
                
                // Auto-remove after 8 seconds
                setTimeout(() => {
                    if (document.contains(resultsNote)) {
                        resultsNote.classList.add('fade-out');
                        setTimeout(() => resultsNote.remove(), 300);
                    }
                }, 8000);
            }, 1500);
        });
    }
    
    // Enhanced testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    
    // Add navigation dots for testimonials
    if (totalTestimonials > 1) {
        // Create testimonial navigation
        const testimonialSection = document.querySelector('.testimonials .container');
        if (testimonialSection) {
            const navDots = document.createElement('div');
            navDots.className = 'testimonial-nav';
            
            for (let i = 0; i < totalTestimonials; i++) {
                const dot = document.createElement('span');
                dot.className = i === 0 ? 'dot active' : 'dot';
                dot.dataset.index = i;
                navDots.appendChild(dot);
            }
            
            testimonialSection.appendChild(navDots);
            
            // Add click event to dots
            navDots.addEventListener('click', function(e) {
                if (e.target.classList.contains('dot')) {
                    currentTestimonial = parseInt(e.target.dataset.index);
                    updateTestimonialSlider();
                    updateDots();
                }
            });
            
            // Function to update active dot
            function updateDots() {
                document.querySelectorAll('.testimonial-nav .dot').forEach((dot, index) => {
                    if (index === currentTestimonial) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Auto slide testimonials every 5 seconds
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                updateTestimonialSlider();
                updateDots();
            }, 5000);
            
            function updateTestimonialSlider() {
                const slider = document.querySelector('.testimonial-slider');
                if (slider) {
                    const scrollPosition = testimonials[currentTestimonial].offsetLeft;
                    slider.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
    
    // Enhanced animations on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .step, .about-image, .about-text, .testimonial');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Add enhanced CSS for scroll animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .feature, .step, .about-image, .about-text, .testimonial {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .service-card.visible, .feature.visible, .step.visible, .about-image.visible, .about-text.visible, .testimonial.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-15px);}
            60% {transform: translateY(-7px);}
        }
        
        .service-card i:hover, .feature i:hover, .step-icon:hover {
            animation: bounce 1s;
        }
        
        .form-error, .search-error {
            color: #f44336;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            background-color: rgba(244, 67, 54, 0.1);
        }
        
        input.error, textarea.error {
            border-color: #f44336 !important;
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
        }
        
        .search-results-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 100;
        }
        
        .search-results-notification i {
            color: #28a745;
            font-size: 1.5rem;
        }
        
        .close-notification {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
            font-size: 1.2rem;
            color: #999;
        }
        
        .testimonial-nav {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        
        .testimonial-nav .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ddd;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .testimonial-nav .dot.active {
            background-color: var(--primary-color);
            transform: scale(1.2);
        }
        
        .success-message {
            text-align: center;
            padding: 20px;
        }
        
        .success-icon {
            font-size: 3rem;
            color: #28a745;
            margin-bottom: 15px;
        }
        
        .fade-in {
            animation: fadeIn 0.5s forwards;
        }
        
        .fade-out {
            animation: fadeOut 0.3s forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Initial check and scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on initial load
    
    // Enhanced user type selection handling
    const clientBtn = document.querySelector('.btn-client');
    const tradesmanBtn = document.querySelector('.btn-tradesman');
    
    if (clientBtn) {
        clientBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Modern UI feedback
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            
            setTimeout(() => {
                alert('Taking you to client registration...');
                this.innerHTML = 'I Need a Service';
            }, 1000);
        });
    }
    
    if (tradesmanBtn) {
        tradesmanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Modern UI feedback
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            
            setTimeout(() => {
                alert('Taking you to tradesman registration...');
                this.innerHTML = 'I\'m a Tradesman';
            }, 1000);
        });
    }
    
    // Enhanced login and register buttons
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal login form
            const modal = document.createElement('div');
            modal.className = 'modal fade-in';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Login to TradeConnect</h2>
                    <form class="login-form">
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <div class="form-group remember-me">
                            <input type="checkbox" id="remember-me">
                            <label for="remember-me">Remember me</label>
                        </div>
                        <button type="submit" class="btn">Login</button>
                        <p class="text-center">Don't have an account? <a href="#" class="register-link">Register</a></p>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Close modal on X click
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            // Close modal on outside click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.add('fade-out');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
            
            // Switch to register form on link click
            modal.querySelector('.register-link').addEventListener('click', function(e) {
                e.preventDefault();
                modal.remove();
                document.body.style.overflow = 'auto';
                // Trigger register button click
                registerBtn.click();
            });
            
            // Handle login form submission
            modal.querySelector('.login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                submitBtn.disabled = true;
                
                // Simulate login delay
                setTimeout(() => {
                    console.log('Login attempt:', { email, password });
                    alert('Login functionality will be implemented in the full version.');
                    
                    // Close modal
                    modal.classList.add('fade-out');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }, 1500);
            });
            
            // Add modal styles
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 400px;
                    position: relative;
                }
                
                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                }
                
                .login-form {
                    margin-top: 20px;
                }
                
                .remember-me {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .remember-me input {
                    margin-right: 10px;
                    width: auto;
                }
                
                .remember-me label {
                    margin-bottom: 0;
                }
            `;
            document.head.appendChild(modalStyle);
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal register form
            const modal = document.createElement('div');
            modal.className = 'modal fade-in';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Register with TradeConnect</h2>
                    <form class="register-form">
                        <div class="form-group">
                            <label for="reg-name">Full Name</label>
                            <input type="text" id="reg-name" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-email">Email</label>
                            <input type="email" id="reg-email" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-password">Password</label>
                            <input type="password" id="reg-password" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-confirm">Confirm Password</label>
                            <input type="password" id="reg-confirm" required>
                        </div>
                        <div class="form-group">
                            <label>I am a:</label>
                            <div class="radio-group">
                                <input type="radio" id="client-type" name="user-type" value="client" checked>
                                <label for="client-type">Client</label>
                                
                                <input type="radio" id="tradesman-type" name="user-type" value="tradesman">
                                <label for="tradesman-type">Tradesman</label>
                            </div>
                        </div>
                        <div class="form-group terms">
                            <input type="checkbox" id="terms" required>
                            <label for="terms">I agree to the <a href="#">Terms & Conditions</a></label>
                        </div>
                        <button type="submit" class="btn">Register</button>
                        <p class="text-center">Already have an account? <a href="#" class="login-link">Login</a></p>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Close modal on X click
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            // Close modal on outside click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.add('fade-out');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
            
            // Switch to login form on link click
            modal.querySelector('.login-link').addEventListener('click', function(e) {
                e.preventDefault();
                modal.remove();
                document.body.style.overflow = 'auto';
                // Trigger login button click
                loginBtn.click();
            });
            
            // Handle register form submission
            modal.querySelector('.register-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Form validation
                const password = document.getElementById('reg-password').value;
                const confirm = document.getElementById('reg-confirm').value;
                
                if (password !== confirm) {
                    alert('Passwords do not match!');
                    return;
                }
                
                const name = document.getElementById('reg-name').value;
                const email = document.getElementById('reg-email').value;
                const userType = document.querySelector('input[name="user-type"]:checked').value;
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                submitBtn.disabled = true;
                
                // Simulate registration delay
                setTimeout(() => {
                    console.log('Registration attempt:', { name, email, password, userType });
                    alert('Registration functionality will be implemented in the full version.');
                    
                    // Close modal
                    modal.classList.add('fade-out');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }, 1500);
            });
            
            // Add additional modal styles
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .radio-group {
                    display: flex;
                    gap: 20px;
                    margin-top: 5px;
                }
                
                .radio-group input {
                    margin-right: 5px;
                    width: auto;
                }
                
                .terms {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .terms input {
                    margin-right: 10px;
                    width: auto;
                }
                
                .terms label {
                    margin-bottom: 0;
                }
            `;
            document.head.appendChild(modalStyle);
        });
    }
});
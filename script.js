// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a navigation item
document.querySelectorAll('.nav-menu a').forEach(navItem => {
    navItem.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation item based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Class Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter classes
        classCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Schedule Tab Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const daySchedules = document.querySelectorAll('.day-schedule');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        daySchedules.forEach(schedule => schedule.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding schedule
        const day = button.getAttribute('data-day');
        document.getElementById(day).classList.add('active');
    });
});





// Meditation Timer
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('timer-start');
const resetButton = document.getElementById('timer-reset');
const increaseButton = document.getElementById('timer-increase');
const decreaseButton = document.getElementById('timer-decrease');
const timerMessage = document.querySelector('.timer-message p');

let timer;
let minutes = 5;
let seconds = 0;
let isRunning = false;

// Format time to display leading zeros
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Update timer display
function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
}

// Start timer
startButton.addEventListener('click', () => {
    if (!isRunning) {
        // Start the timer
        isRunning = true;
        startButton.textContent = 'Pause';
        timerMessage.textContent = 'Breathe deeply and find your center';
        
        timer = setInterval(() => {
            // Decrease seconds
            if (seconds > 0) {
                seconds--;
            } else {
                // Decrease minutes
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    // Timer finished
                    clearInterval(timer);
                    isRunning = false;
                    startButton.textContent = 'Start';
                    timerMessage.textContent = 'Your meditation is complete';
                    
                    // Play sound (if desired)
                    // const sound = new Audio('path/to/sound.mp3');
                    // sound.play();
                    
                    return;
                }
            }
            
            updateDisplay();
        }, 1000);
    } else {
        // Pause the timer
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = 'Resume';
        timerMessage.textContent = 'Meditation paused';
    }
});

// Reset timer
resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    minutes = 5;
    seconds = 0;
    updateDisplay();
    startButton.textContent = 'Start';
    timerMessage.textContent = 'Set your meditation time and begin your practice';
});

// Increase timer
increaseButton.addEventListener('click', () => {
    if (!isRunning) {
        if (minutes < 60) {
            minutes++;
            updateDisplay();
        }
    }
});

// Decrease timer
decreaseButton.addEventListener('click', () => {
    if (!isRunning) {
        if (minutes > 1) {
            minutes--;
            updateDisplay();
        }
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long';
    } else {
        nameError.textContent = '';
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
    } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

subjectInput.addEventListener('change', () => {
    if (subjectInput.value === '') {
        subjectError.textContent = 'Please select a subject';
    } else {
        subjectError.textContent = '';
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long';
    } else {
        messageError.textContent = '';
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Validate subject
    if (subjectInput.value === '') {
        subjectError.textContent = 'Please select a subject';
        isValid = false;
    } else {
        subjectError.textContent = '';
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long';
        isValid = false;
    } else {
        messageError.textContent = '';
    }
    
    // If all validations pass
    if (isValid) {
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
});

// Animate on scroll
window.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animations
    const elements = document.querySelectorAll('.class-card, .instructor-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
    });
    
    // Function to animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.class-card, .instructor-card');
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
});
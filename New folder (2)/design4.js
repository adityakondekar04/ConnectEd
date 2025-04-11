// Particle.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#64FFDA'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64FFDA',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Modal Functions
const showLoginModal = () => {
    document.getElementById('loginModal').style.display = 'flex';
};

const closeLoginModal = () => {
    document.getElementById('loginModal').style.display = 'none';
};

const showRegistrationModal = (type) => {
    if (type === 'student') {
        window.location.href = 'student-registration.html';
    } else if (type === 'mentor') {
        window.location.href = 'mentor-registration.html';
    } else {
        // Scroll to registration options section
        const registerOptionsSection = document.getElementById('register-options');
        if (registerOptionsSection) {
            registerOptionsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

const closeRegistrationModal = () => {
    document.getElementById('registration-modal').style.display = 'none';
};

// Close modals when clicking outside
window.onclick = (event) => {
    const loginModal = document.getElementById('loginModal');
    const registrationModal = document.getElementById('registration-modal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    
    if (event.target === registrationModal) {
        closeRegistrationModal();
    }
};

// Form submission handlers
document.getElementById('student-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add student login functionality here
    console.log('Student login submitted');
});

document.getElementById('mentor-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add mentor login functionality here
    console.log('Mentor login submitted');
});

// Google login handler
document.querySelector('.google-login').addEventListener('click', () => {
    // Add Google login functionality here
    console.log('Google login clicked');
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// DOM Elements
const searchInput = document.querySelector('.search-bar input');
const notifications = document.querySelector('.notifications');
const userProfile = document.querySelector('.user-profile');
const navLinks = document.querySelectorAll('.nav-links a');
const logoutBtn = document.querySelector('.logout-btn');
const sessionCards = document.querySelectorAll('.session-card');
const sections = document.querySelectorAll('section');

// Hide all sections except overview initially
sections.forEach(section => {
    if (!section.classList.contains('overview-section')) {
        section.style.display = 'none';
    }
});

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Add search functionality here
    console.log('Searching for:', searchTerm);
});

// Notifications Click Handler
notifications.addEventListener('click', () => {
    // Add notifications panel functionality here
    console.log('Notifications clicked');
});

// User Profile Click Handler
userProfile.addEventListener('click', () => {
    // Add user profile dropdown functionality here
    console.log('User profile clicked');
});

// Navigation Links Click Handler
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('href').substring(1);
        
        // Remove active class from all links
        navLinks.forEach(l => l.parentElement.classList.remove('active'));
        
        // Add active class to clicked link
        link.parentElement.classList.add('active');
        
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show target section
        const targetElement = document.querySelector(`.${targetSection}-section`);
        if (targetElement) {
            targetElement.style.display = 'block';
            
            // Smooth scroll to section
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Add fade-in animation
            targetElement.style.opacity = '0';
            setTimeout(() => {
                targetElement.style.opacity = '1';
            }, 100);
        }
    });
});

// Logout Handler
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Add logout functionality here
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'design4.html';
    }
});

// Session Join Button Handler
document.querySelectorAll('.session-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        // Add session join functionality here
        console.log('Join session clicked');
    });
});

// Mentor Action Buttons Handler
document.querySelectorAll('.mentor-actions button').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        // Add mentor action functionality here
        console.log(`${action} clicked`);
    });
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');
progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
        bar.style.width = width;
    }, 500);
});

// Responsive Sidebar Toggle
const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 1024) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }
};

// Window Resize Handler
window.addEventListener('resize', toggleSidebar);

// Add transition styles to sections
sections.forEach(section => {
    section.style.transition = 'opacity 0.3s ease-in-out';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active section
    const overviewSection = document.querySelector('.overview-section');
    if (overviewSection) {
        overviewSection.style.display = 'block';
        overviewSection.style.opacity = '1';
    }
    
    // Add click handlers for mobile menu
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.top-bar').prepend(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('show');
    });
    
    // Add click handlers for registration buttons
    const studentRegisterBtn = document.querySelector('.student-register-btn');
    const mentorRegisterBtn = document.querySelector('.mentor-register-btn');
    
    if (studentRegisterBtn) {
        studentRegisterBtn.addEventListener('click', () => {
            showRegistrationModal('student');
        });
    }
    
    if (mentorRegisterBtn) {
        mentorRegisterBtn.addEventListener('click', () => {
            showRegistrationModal('mentor');
        });
    }
    
    console.log('Student Dashboard initialized');
});

// Login button click handler
document.querySelector('.login-btn').addEventListener('click', () => {
    showLoginModal();
});

// Student Registration Form Handler
document.getElementById('studentRegistrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show completion popup
    const popup = document.createElement('div');
    popup.className = 'completion-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-check-circle"></i>
            <h3>Registration Completed!</h3>
            <p>Your account has been successfully created.</p>
            <p>Redirecting to dashboard...</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Redirect to student dashboard after 2 seconds
    setTimeout(() => {
        window.location.href = 'studentdash.html';
    }, 2000);
}); 
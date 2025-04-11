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
    
    console.log('Student Dashboard initialized');
}); 
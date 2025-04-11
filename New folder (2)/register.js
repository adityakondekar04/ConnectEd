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
        }
    },
    retina_detect: true
});

// Modal Functions
function showStudentForm() {
    document.getElementById('studentModal').style.display = 'flex';
}

function closeStudentModal() {
    document.getElementById('studentModal').style.display = 'none';
}

function showMentorForm() {
    document.getElementById('mentorModal').style.display = 'flex';
}

function closeMentorModal() {
    document.getElementById('mentorModal').style.display = 'none';
}

// Handle student registration form submission
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        password: document.getElementById('studentPassword').value,
        university: document.getElementById('university').value,
        major: document.getElementById('major').value,
        year: document.getElementById('year').value
    };
    
    // Here you would typically make an API call to your backend
    console.log('Student registration:', formData);
    
    // For demo purposes, simulate successful registration
    alert('Student registration successful!');
    closeStudentModal();
    window.location.href = 'design4.html';
});

// Handle mentor registration form submission
document.getElementById('mentorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('mentorName').value,
        email: document.getElementById('mentorEmail').value,
        password: document.getElementById('mentorPassword').value,
        expertise: document.getElementById('expertise').value,
        experience: document.getElementById('experience').value,
        company: document.getElementById('company').value
    };
    
    // Here you would typically make an API call to your backend
    console.log('Mentor registration:', formData);
    
    // For demo purposes, simulate successful registration
    alert('Mentor registration successful!');
    closeMentorModal();
    window.location.href = 'design4.html';
});

// Close modals when clicking outside
window.onclick = function(event) {
    const studentModal = document.getElementById('studentModal');
    const mentorModal = document.getElementById('mentorModal');
    
    if (event.target == studentModal) {
        closeStudentModal();
    }
    if (event.target == mentorModal) {
        closeMentorModal();
    }
} 
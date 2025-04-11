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

// Form navigation
const form = document.getElementById('studentRegistrationForm');
const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-bar .step');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');

let currentStep = 1;

// Update form steps
function updateFormSteps() {
    steps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update progress bar
    progressSteps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    // Update buttons
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (currentStep === steps.length) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Validate current step
function validateStep(step) {
    const currentStepElement = steps[step - 1];
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // Special validation for checkboxes in interests
    if (step === 3) {
        const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
        const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
        if (checkedBoxes.length === 0) {
            isValid = false;
            checkboxes.forEach(cb => cb.classList.add('error'));
        }
    }

    return isValid;
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        currentStep++;
        updateFormSteps();
    }
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    updateFormSteps();
});

// Submit button click handler
document.getElementById('submitBtn').addEventListener('click', function(e) {
    console.log('Submit button clicked');
    if (validateStep(currentStep)) {
        form.dispatchEvent(new Event('submit'));
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    if (validateStep(currentStep)) {
        // Collect all form data
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            if (key === 'interests') {
                if (!data[key]) {
                    data[key] = [];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        // Here you would typically send the data to your backend
        console.log('Form submitted:', data);
        
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
    }
});

// Initialize form
updateFormSteps(); 
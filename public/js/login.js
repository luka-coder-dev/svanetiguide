// Open Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.querySelector(`#${modalId} .modal-content`).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.querySelector(`#${modalId} .modal-content`).classList.remove('show');
}

// Toggle Guide Fields
const guideCheckbox = document.getElementById('signup-guide-checkbox');
const guideFields = document.getElementById('guide-fields');

guideCheckbox.addEventListener('change', function() {
    if (this.checked) {
        guideFields.classList.add('show'); // Show the fields
    } else {
        guideFields.classList.remove('show'); // Hide the fields
    }
});

// Example form submission logic for Sign Up (including Guide info)
document.getElementById('signup-submit').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent form submission
    
    // Basic form validation
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Additional fields if signing up as Guide
    let guideInfo = {};
    if (guideCheckbox.checked) {
        guideInfo.name = document.getElementById('guide-name').value;
        guideInfo.lastname = document.getElementById('guide-lastname').value;
        guideInfo.number = document.getElementById('guide-number').value;
        guideInfo.address = document.getElementById('guide-address').value;
    }

    // Validate the input
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    if (!email || !password || (guideCheckbox.checked && (!guideInfo.name || !guideInfo.lastname || !guideInfo.number || !guideInfo.address))) {
        alert("Please fill in all fields.");
        return;
    }

    // Proceed with the signup process (send data to server or handle it here)
    console.log("Sign up data:", {
        email,
        password,
        guideInfo,
    });

    // Close the modal after submitting
    closeModal('signupModal');
});

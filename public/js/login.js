// Function to show a modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error(`Modal with ID "${modalId}" not found.`);
    }
}

// Function to hide a modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error(`Modal with ID "${modalId}" not found.`);
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Open and close modals via links
    document.getElementById('signup-link')?.addEventListener('click', function () {
        hideModal('loginModal'); // Hide login modal
        showModal('signupModal'); // Show signup modal
    });

    document.getElementById('login-link')?.addEventListener('click', function () {
        hideModal('signupModal'); // Hide signup modal
        showModal('loginModal'); // Show login modal
    });

    // Close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = "none";
        });
    });

    // Toggle guide fields visibility
    const guideCheckbox = document.getElementById('signup-guide-checkbox');
    const guideFields = document.querySelector('.guide-fields');
    if (guideCheckbox && guideFields) {
        guideCheckbox.addEventListener('change', function () {
            if (this.checked) {
                guideFields.classList.add('show');
            } else {
                guideFields.classList.remove('show');
            }
        });
    }
});

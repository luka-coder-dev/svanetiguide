
// Function to replace the class based on screen size
function updateAppearClass() {
    const elements = document.querySelectorAll('.appearFromRight'); // Target elements with 'appearFromRight'
    const isMobile = window.innerWidth <= 768; // Check if the screen width is 768px or less (adjust as needed)

    elements.forEach((element) => {
        if (isMobile) {
            // If on mobile, replace 'appearFromRight' with 'appearIfMobile'
            element.classList.remove('appearFromRight');
            element.classList.add('appearIfMobile');
        } else {
            // If not on mobile, ensure 'appearFromRight' class is applied
            element.classList.remove('appearIfMobile');
            element.classList.add('appearFromRight');
        }
    });
}

// Run the function on page load and when the window is resized
window.addEventListener('load', updateAppearClass);
window.addEventListener('resize', updateAppearClass);

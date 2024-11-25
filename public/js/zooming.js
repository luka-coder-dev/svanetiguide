const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');

    // Show the full-screen image smoothly
    document.querySelectorAll('.seasons').forEach((season) => {
        season.addEventListener('click', () => {
            const bgImage = getComputedStyle(season).backgroundImage;
            const imageUrl = bgImage.slice(5, -2); // Extract URL
            fullscreenImage.src = imageUrl; // Set the image source
            fullscreenContainer.style.display = 'flex'; // Make visible
            setTimeout(() => fullscreenContainer.classList.add('visible'), 10); // Add visible class for fade-in
        });
    });

    // Hide the full-screen image smoothly
    fullscreenContainer.addEventListener('click', () => {
        fullscreenContainer.classList.remove('visible'); // Remove visible class for fade-out
        setTimeout(() => {
            fullscreenContainer.style.display = 'none'; // Hide after fade-out completes
            fullscreenImage.src = ''; // Clear image source
        }, 500); // Match the CSS transition duration
    });
let currentIndex2 = 0; // Track the index for the second slider
const slider2 = document.getElementById('location-slider'); // The container of the cards
const locations2 = document.querySelectorAll('.location-card'); // The individual cards inside the slider
const totalLocations2 = locations2.length; // The total number of cards
const containerWidth = document.getElementById('locations-container').offsetWidth; // The width of the slider container
const cardWidth = locations2[0].offsetWidth; // The width of a single location card
const visibleCardsCount = Math.floor(containerWidth / cardWidth); // Number of visible cards in the container

const extraSpace = 300; // The extra space (in pixels) before the first and after the last card

let intervalId = null; // Variable to hold the interval ID for continuous scrolling

// Function to move the slider
function moveSlider(direction) {
    const maxSlides = totalLocations2 - visibleCardsCount; // Max slides without extra space

    // Adjust the current index when moving left or right
    if (direction === 'prev') {
        if (currentIndex2 > 0) {
            currentIndex2--;
        } else {
            // Allow extra space before the first card
            currentIndex2 = Math.max(currentIndex2 - 1, -Math.floor(extraSpace / (cardWidth + 16))); // Move beyond first card by extra space
        }
    } else if (direction === 'next') {
        if (currentIndex2 < maxSlides) {
            currentIndex2++;
        } else {
            // Allow extra space after the last card
            currentIndex2 = Math.min(currentIndex2 + 1, maxSlides + Math.floor(extraSpace / (cardWidth + 16))); // Move beyond last card by extra space
        }
    }

    // Move the slider by updating the transform property, including the extra space before the first card
    slider2.style.transform = `translateX(-${(currentIndex2 * (cardWidth + 16)) + extraSpace}px)`; // Adjust based on card width and margin
}

// Initialize the slider to start at the middle card
function initializeSlider() {
    // Calculate the middle index
    const middleIndex = Math.floor(totalLocations2 / 2) - Math.floor(visibleCardsCount / 2);

    // Set the initial currentIndex to the middle card
    currentIndex2 = middleIndex;

    // Move the slider to the middle position
    slider2.style.transform = `translateX(-${(currentIndex2 * (cardWidth + 16)) + extraSpace}px)`;
}

// Initialize the slider when the page loads
initializeSlider();

// 'Prev' button logic for the second slider with continuous movement
document.getElementById('prev-btn-2').addEventListener('mousedown', () => {
    intervalId = setInterval(() => {
        moveSlider('prev');
    }, 100); // Adjust speed
});

document.getElementById('prev-btn-2').addEventListener('mouseup', () => {
    clearInterval(intervalId); // Stop moving when the button is released
});

document.getElementById('prev-btn-2').addEventListener('mouseleave', () => {
    clearInterval(intervalId); // Stop moving if the mouse leaves the button
});

// Single click behavior for the 'prev' button
document.getElementById('prev-btn-2').addEventListener('click', () => {
    moveSlider('prev');
});

// 'Next' button logic for the second slider with continuous movement
document.getElementById('next-btn-2').addEventListener('mousedown', () => {
    intervalId = setInterval(() => {
        moveSlider('next');
    }, 100); // Adjust speed
});

document.getElementById('next-btn-2').addEventListener('mouseup', () => {
    clearInterval(intervalId); // Stop moving when the button is released
});

document.getElementById('next-btn-2').addEventListener('mouseleave', () => {
    clearInterval(intervalId); // Stop moving if the mouse leaves the button
});

// Single click behavior for the 'next' button
document.getElementById('next-btn-2').addEventListener('click', () => {
    moveSlider('next');
});

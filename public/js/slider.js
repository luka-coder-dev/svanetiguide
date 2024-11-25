
let currentIndex = 0;
const slider = document.getElementById('location-slider');
const locations = document.querySelectorAll('.location-card');
const totalLocations = locations.length;

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalLocations - 1; // Loop back to the last item
    }
    slider.style.transform = `translateX(-${currentIndex * (locations[0].offsetWidth + 16)}px)`; // Adjust this value based on the card width and margin
});

document.getElementById('next').addEventListener('click', () => {
    if (currentIndex < totalLocations - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first item
    }
    slider.style.transform = `translateX(-${currentIndex * (locations[0].offsetWidth + 16)}px)`; // Adjust this value based on the card width and margin
});


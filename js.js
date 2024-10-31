document.addEventListener('DOMContentLoaded', function () {
    let previousElement = null;
    let slideIndex = 0;
    let autoSlideInterval;
    let userInteraction = false;

    // Function to set the active link based on the current page URL
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
        document.querySelectorAll('.clickable a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.parentElement.classList.add('active'); // Set 'active' class on the matching link's parent
                previousElement = link.parentElement; // Store the reference of the active element
            } else {
                link.parentElement.classList.remove('active'); // Remove 'active' class from other links
            }
        });
    }

    // Function to handle active class switching on click
    function handleClickableClick(element) {
        if (previousElement) {
            previousElement.classList.remove('active'); // Remove 'active' class from previously active element
        }
        element.classList.add('active'); // Add 'active' class to the clicked element
        previousElement = element; // Update the reference to the current active element
    }

    // Initialize the active link setting on page load
    setActiveLink();

    // Add click event listeners to each clickable item
    document.querySelectorAll('.clickable').forEach(element => {
        element.addEventListener('click', () => handleClickableClick(element));
    });

    // Add click event listeners to "More Information" buttons
    document.querySelectorAll('.more-info-btn').forEach(button => {
        button.addEventListener('click', function () {
            const seasonDiv = this.parentElement;

            if (seasonDiv.classList.contains('oregairu')) {
                seasonDiv.classList.remove('oregairu');
            } else {
                document.querySelectorAll('.seasons').forEach(div => div.classList.remove('oregairu'));
                seasonDiv.classList.add('oregairu');
            }
        });
    });
    const searchIcon = document.querySelector('#searchcontainer img');
    const searchBar = document.getElementById('searchbar');
    
    // Add 'expanded' class when image is clicked
    searchIcon.addEventListener('click', () => {
        searchBar.classList.add('expanded');
        searchBar.focus(); // Set focus to the input field
    });
    
    // Remove 'expanded' class when input loses focus
    searchBar.addEventListener('blur', () => {
        searchBar.classList.remove('expanded');
    });
    
    
    document.querySelectorAll('.more-info-btn').forEach(button => {
        button.addEventListener('click', function () {
            const seasonDiv = this.parentElement;

            if (seasonDiv.classList.contains('oregairu')) {
                seasonDiv.classList.remove('oregairu');
            } else {
                document.querySelectorAll('.seasons').forEach(div => div.classList.remove('oregairu'));
                seasonDiv.classList.add('oregairu');
            }
        });
    });

    // Modal functionality
    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");
    const loginBtn = document.getElementById("login-btn");
    const closeBtns = document.getElementsByClassName("close");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");

    loginBtn.onclick = () => loginModal.style.display = "block";

    [...closeBtns].forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        };
    });

    signupLink.onclick = () => {
        loginModal.style.display = "none";
        signupModal.style.display = "block";
    };

    loginLink.onclick = () => {
        signupModal.style.display = "none";
        loginModal.style.display = "block";
    };

    window.onclick = function (event) {
        if (event.target == loginModal) loginModal.style.display = "none";
        if (event.target == signupModal) signupModal.style.display = "none";
    };

    // Image Slider Functionality
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    function showSlides(n) {
        slideIndex += n;
        if (slideIndex >= totalSlides) slideIndex = 0;
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        slides.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!userInteraction) {
                showSlides(1);
            }
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for next and previous buttons
    document.querySelector('.prev').addEventListener('click', () => {
        showSlides(-1);
        stopAutoSlide(); // Stop auto slide when user interacts
        userInteraction = true;
    });

    document.querySelector('.next').addEventListener('click', () => {
        showSlides(1);
        stopAutoSlide(); // Stop auto slide when user interacts
        userInteraction = true;
    });

    // Start the automatic slide on page load
    startAutoSlide();

    // Change header background on scroll
    function handleScroll() {
        const header = document.querySelector('#header'); // Select the header by correct ID
        if (header) { // Check if header exists
            if (window.scrollY > 0) {
                header.style.backgroundColor = 'rgba(28, 27, 42, 0.792)'; // Solid color when scrolling
            } else {
                header.style.backgroundColor = 'rgba(76, 0, 227, 0)'; // Transparent when at the top
            }
        } else {
            console.error('Header element not found.');
        }
    }

    window.addEventListener('scroll', handleScroll);
});

// Get elements
const sideNav = document.getElementById('sideNav');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const overlay = document.getElementById('overlay');

// Function to open the sidebar
function openNav() {
    sideNav.classList.add('active');
    overlay.classList.add('active');
}

// Function to close the sidebar
function closeNav() {
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
}

// Event listener to toggle sidebar on hamburger icon click
hamburgerIcon.addEventListener('click', () => {
    if (sideNav.classList.contains('active')) {
        closeNav();
    } else {
        openNav();
    }
});

// Event listener to close sidebar if clicking on overlay
overlay.addEventListener('click', closeNav);

console.log('works');
                                
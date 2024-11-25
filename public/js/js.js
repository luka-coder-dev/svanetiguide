document.addEventListener('DOMContentLoaded', function () {
    let previousElement = null;
    let slideIndex = 0;
    let autoSlideInterval;
    let userInteraction = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Set the active link based on the current page URL
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.clickable a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.parentElement.classList.add('active');
                previousElement = link.parentElement;
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    }

    // Handle clickable active class switching
    function handleClickableClick(element) {
        if (previousElement) {
            previousElement.classList.remove('active');
        }
        element.classList.add('active');
        previousElement = element;
    }

    setActiveLink();

    document.querySelectorAll('.clickable').forEach(element => {
        element.addEventListener('click', () => handleClickableClick(element));
    });

    // Expand/collapse search bar
    const searchIcon = document.querySelector('#searchcontainer img');
    const searchBar = document.getElementById('searchbar');
    searchIcon.addEventListener('click', () => {
        searchBar.classList.add('expanded');
        searchBar.focus();
    });
    searchBar.addEventListener('blur', () => {
        searchBar.classList.remove('expanded');
    });

    // More Information button toggle
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
        if (event.target === loginModal) loginModal.style.display = "none";
        if (event.target === signupModal) signupModal.style.display = "none";
    };

    // Image Slider Functionality
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    function updateHeaderBackground() {
        const header = document.querySelector('#header');
        if (!header) return;

        const specificSlideIndex = 1; // Replace with your desired slide index
        if (slideIndex === specificSlideIndex) {
            header.style.backgroundColor = 'rgba(28, 27, 42, 0.792)'; // Color for specific slide
        } else if (window.scrollY > 0) {
            header.style.backgroundColor = 'rgba(28, 27, 42, 0.792)'; // Solid color on scroll
        } else {
            header.style.backgroundColor = 'rgba(76, 0, 227, 0)'; // Transparent at top
        }
    }

    function showSlides(n) {
        slideIndex += n;
        if (slideIndex >= totalSlides) slideIndex = 0;
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        slides.style.transform = `translateX(${-slideIndex * 100}%)`;

        updateHeaderBackground();
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

    // Detect touch swipe for mobile
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            showSlides(1); // Swipe left (next slide)
        }
        if (touchEndX - touchStartX > 50) {
            showSlides(-1); // Swipe right (previous slide)
        }
    }

    // Add touch event listeners
    document.querySelector('.slides').addEventListener('touchstart', handleTouchStart);
    document.querySelector('.slides').addEventListener('touchend', handleTouchEnd);

    // Add event listeners for the next and previous buttons (desktop only)
    document.querySelector('.prev').addEventListener('click', () => {
        showSlides(-1);
        stopAutoSlide();
        userInteraction = true;
    });

    document.querySelector('.next').addEventListener('click', () => {
        showSlides(1);
        stopAutoSlide();
        userInteraction = true;
    });

    startAutoSlide();

    // Change header background on scroll
    function handleScroll() {
        updateHeaderBackground();
    }

    window.addEventListener('scroll', handleScroll);

    // Sidebar functionality
    const sideNav = document.getElementById('sideNav');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const overlay = document.getElementById('overlay');

    function openNav() {
        sideNav.classList.add('active');
        overlay.classList.add('active');
    }

    function closeNav() {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');
    }

    hamburgerIcon.addEventListener('click', () => {
        if (sideNav.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    });

    overlay.addEventListener('click', closeNav);


    document.getElementById('searchbar').addEventListener('input', function (e) {
        const filter = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.location-card');
        cards.forEach(card => {
          const title = card.querySelector('.location-title').textContent.toLowerCase();
          card.style.display = title.includes(filter) ? 'block' : 'none';
        });
      });
});


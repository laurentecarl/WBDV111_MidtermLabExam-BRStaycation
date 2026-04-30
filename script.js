// ================= MENU TOGGLE =================
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// ================= WHEN PAGE LOADS =================
window.onload = function() {

    // ================= IMAGE SLIDER =================
    let currentSlide = 0;
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (slidesWrapper && totalSlides > 0) {
        function updateSlider() {
            slidesWrapper.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if(index === currentSlide){
                    dot.classList.add('active');
                }
            });
        }

        window.changeSlide = function(direction) {
            currentSlide = currentSlide + direction;
            if(currentSlide >= totalSlides){ currentSlide = 0; }
            if(currentSlide < 0){ currentSlide = totalSlides - 1; }
            updateSlider();
        }

        window.goToSlide = function(index) {
            currentSlide = index;
            updateSlider();
        }
    }


    // ================= BOOKING FORM FUNCTIONS =================
    const form = document.getElementById('reservationForm');
    const popup = document.getElementById('successPopup');
    const closeBtn = document.getElementById('closePopup');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show the custom popup
            popup.style.display = "flex";
            
            // Reset the form
            form.reset();
            
            // Reset guest counter
            if(typeof updateDisplay === 'function') {
                counts = { adults: 1, children: 0, infants: 0 };
                updateDisplay();
            }
        });
    }

    // Close popup when clicking button
    if(closeBtn) {
        closeBtn.addEventListener('click', function() {
            popup.style.display = "none";
        });
    }

    // Close popup when clicking outside
    if(popup) {
        popup.addEventListener('click', function(e) {
            if(e.target === popup) {
                popup.style.display = "none";
            }
        });
    }


    // --- DISABLE PAST DATES IN CALENDAR ---
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if(checkinInput) { checkinInput.setAttribute('min', today); }
    if(checkoutInput) { checkoutInput.setAttribute('min', today); }


    // --- INPUT VALIDATION ---

    // NAME: Allow only letters and spaces
    const nameInput = document.querySelector('input[type="text"]');
    if(nameInput) {
        nameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }

    // CONTACT NUMBER: Allow only numbers
    const numberInput = document.querySelector('input[type="tel"]');
    if(numberInput) {
        numberInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

        updateDisplay(); // Initialize

 /* ==============================
   FEEDBACK FORM SCRIPT
   ============================== */

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('successMessage').style.display = 'block';
    this.reset();

    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

}

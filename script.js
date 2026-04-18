// ================= MENU TOGGLE =================
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// ================= IMAGE SLIDER =================
window.onload = function() {

    let currentSlide = 0;
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // IF SLIDER EXISTS ON THIS PAGE
    if (slidesWrapper && totalSlides > 0) {

        function updateSlider() {
            // MOVE THE WRAPPER LEFT
            slidesWrapper.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
            
            // UPDATE DOTS
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if(index === currentSlide){
                    dot.classList.add('active');
                }
            });
        }

        // THESE FUNCTIONS MUST BE INSIDE window.onload TO WORK
        window.changeSlide = function(direction) {
            currentSlide = currentSlide + direction;
            
            if(currentSlide >= totalSlides){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = totalSlides - 1;
            }
            updateSlider();
        }

        window.goToSlide = function(index) {
            currentSlide = index;
            updateSlider();
        }
    }
}
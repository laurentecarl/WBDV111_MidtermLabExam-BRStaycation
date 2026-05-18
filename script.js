// ================= MENU TOGGLE =================
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// ================= WHEN PAGE LOADS =================
window.addEventListener('DOMContentLoaded', function() {

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
    const bookingStorageKey = 'brStaycationBookings';

    function getSavedBookings() {
        try {
            return JSON.parse(localStorage.getItem(bookingStorageKey) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveBookings(bookings) {
        localStorage.setItem(bookingStorageKey, JSON.stringify(bookings));
    }

    function addBooking(booking) {
        const bookings = getSavedBookings();
        bookings.unshift(booking);
        if (bookings.length > 5) bookings.length = 5;
        saveBookings(bookings);
    }

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const roomSelect = document.getElementById('roomSelect');
            const hourSelect = document.getElementById('hourSelect');
            const guestSelect = document.getElementById('guestSelect');
            const guestName = document.getElementById('guestName');
            const guestEmail = document.getElementById('guestEmail');
            const checkinInput = document.getElementById('checkin');
            const checkoutInput = document.getElementById('checkout');
            const bookingPhone = document.getElementById('bookingPhone');

            const room = roomSelect?.value || '';
            const hours = hourSelect?.value || '';
            const guests = guestSelect?.value || '';
            const name = guestName?.value || '';
            const email = guestEmail?.value || '';
            const phone = bookingPhone?.value || '';
            const checkin = checkinInput?.value || '';
            const checkout = checkoutInput?.value || '';

            if (popup) {
                const popupMsg = popup.querySelector('.popup-content p');
                if (popupMsg) {
                    const details = [room, hours].filter(Boolean).join(' - ');
                    popupMsg.textContent = details
                        ? `Thank you for your reservation for ${details}. We'll contact you soon with confirmation details.`
                        : "Thank you for your reservation. We'll contact you soon with confirmation details.";
                }
                popup.classList.add('visible');
            }

            if (room) {
                addBooking({ room, hours, guests, name, phone, email, checkin, checkout, created: new Date().toISOString() });
            }

            form.reset();
        });
    }

    // Close popup when clicking outside
    if(popup) {
        popup.addEventListener('click', function(e) {
            if(e.target === popup) {
                popup.classList.remove('visible');
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

    // --- GALLERY MODAL VIEWER ---
    const galleryImgElements = document.querySelectorAll('.gallery-card img');
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImg = document.getElementById('galleryModalImg');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    const galleryMoreTile = document.getElementById('galleryMoreTile');

    // initial images shown on the page (kept as-is)
    const initialGallery = Array.from(galleryImgElements).map(img => ({ src: img.src, alt: img.alt }));

    // 10 extra images that will only appear inside the modal when "Show all photos" is clicked
    const extraGallery = [
        { src: 'gal2.JPG', alt: 'Room 3' },
        { src: 'brstay5.jpg', alt: 'Room 4' }, 
        { src: 'brstay6.jpg', alt: 'Room 5' },
        { src: 'brstay7.jpg', alt: 'Room 6' },
        { src: 'brstay8.jpg', alt: 'Room 7' },
        { src: 'brstaycation2.jpg', alt: 'Room 8' },
        { src: 'gal3.JPG', alt: 'Room 9' },
        { src: 'gal6.JPG', alt: 'Room 10' },
        { src: 'roominc.jpg', alt: 'Room 11' },
        { src: 'gal8.JPG', alt: 'Room 12' }
    ];

    let includeExtra = false;
    let currentGalleryIndex = 0;

    function getGalleryList() {
        return includeExtra ? initialGallery.concat(extraGallery) : initialGallery;
    }

    function showGalleryImage(index) {
        const list = getGalleryList();
        if (!list.length) return;
        currentGalleryIndex = (index + list.length) % list.length;
        const img = list[currentGalleryIndex];
        if (galleryModalImg) {
            // fade-out current image, set new src, then fade-in on load
            try {
                galleryModalImg.style.opacity = 0;
            } catch (e) {}
            galleryModalImg.onload = function() {
                try { galleryModalImg.style.opacity = 1; } catch(e) {}
            };
            galleryModalImg.src = img.src;
        }
        if (galleryModal) galleryModal.style.display = 'block';
    }

    galleryImgElements.forEach((img, i) => {
        img.addEventListener('click', function() {
            includeExtra = false; // clicking page images shows only initial set
            const index = Number(this.dataset.index ?? i);
            showGalleryImage(index);
        });
    });

    if (galleryMoreTile) {
        galleryMoreTile.addEventListener('click', function() {
            includeExtra = true; // include extra images in modal
            showGalleryImage(0);
        });
    }

    if (galleryPrev) {
        galleryPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showGalleryImage(currentGalleryIndex - 1);
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showGalleryImage(currentGalleryIndex + 1);
        });
    }

    if (galleryClose) {
        galleryClose.addEventListener('click', function() {
            if (galleryModal) galleryModal.style.display = 'none';
        });
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });
    }

    // reveal page after load (restores intended fade-in)
    setTimeout(function() {
        document.body.classList.add('page-visible');
    }, 50);


    /* ==============================
       FEEDBACK FORM SCRIPT
       ============================== */

    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackSuccess = document.getElementById('successMessage');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (feedbackSuccess) {
                feedbackSuccess.style.display = 'block';
            }
            this.reset();

            setTimeout(() => {
                if (feedbackSuccess) {
                    feedbackSuccess.style.display = 'none';
                }
            }, 5000);
        });
    }

});

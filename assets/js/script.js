'use strict';

/**
 * Navbar toggle
 */
const navbarOverlay = document.querySelector("[data-overlay]"); // Renamed for clarity
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  navbarOverlay.classList.toggle("active");
};

navToggleBtn.addEventListener("click", navToggleFunc);
navbarOverlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}

/**
 * Header active on scroll
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/**
 * Payment modal functionality
 */
const bookNowButtons = document.querySelectorAll('.book-now-btn'); // All "Book Now" buttons
const paymentModal = document.getElementById('payment-modal'); // Modal
const paymentOverlay = document.getElementById('overlay'); // Payment overlay (renamed for clarity)
const closeModalBtn = document.getElementById('close-modal-btn'); // Close button
const payNowBtn = document.getElementById('pay-now-btn'); // "Pay Now" button
const qrcodeContainer = document.getElementById('qrcode'); // QR code container

// Function to generate a QR Code
function generateQRCode(data) {
  qrcodeContainer.innerHTML = ''; // Clear any existing QR code
  QRCode.toCanvas(qrcodeContainer, data, { width: 200 }, function (error) {
    if (error) console.error(error);
  });
}

// Function to open the modal
function openModal(paymentLink) {
  generateQRCode(paymentLink); // Generate QR code
  paymentModal.style.display = 'block'; // Show modal
  paymentOverlay.style.display = 'block'; // Show overlay
}

// Close modal function
function closeModal() {
  paymentModal.style.display = 'none'; // Hide modal
  paymentOverlay.style.display = 'none'; // Hide overlay
}

// Add click event to all "Book Now" buttons
bookNowButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Define payment links for each car
    const paymentLinks = [
      'upi://pay?pa=7411340375@ybl&pn=Toyota%20Innova&am=1&cu=INR',
      'upi://pay?pa=example2@upi&pn=Honda%20City&am=1200&cu=INR',
      'upi://pay?pa=example3@upi&pn=Swift%20Dzire&am=1000&cu=INR'
    ];

    // Open modal with corresponding payment link
    openModal(paymentLinks[index]);
  });
});

// Event for "Pay Now" button
payNowBtn.addEventListener('click', () => {
  // Retrieve the UPI payment link directly
  const paymentLinks = [
    'upi://pay?pa=7411340375@ybl&pn=Greeshma V&am=1&cu=INR',
    'upi://pay?pa=example2@upi&pn=Honda%20City&am=1200&cu=INR',
    'upi://pay?pa=example3@upi&pn=Swift%20Dzire&am=1000&cu=INR'
  ];
  const activeIndex = Array.from(bookNowButtons).findIndex((btn) =>
    btn.classList.contains('active')
  );
  const paymentLink = paymentLinks[activeIndex];
  if (paymentLink) {
    window.location.href = paymentLink; // Redirect to payment link
  } else {
    alert('Payment successful');
  }
});

// Event for close modal button and overlay
closeModalBtn.addEventListener('click', closeModal);
paymentOverlay.addEventListener('click', closeModal);

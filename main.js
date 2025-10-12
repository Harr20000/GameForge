// Function to handle the mobile menu toggle
function setupMobileMenuToggle() {
    const toggleButton = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('navMenu');

    if (!toggleButton || !navMenu) {
        console.error("Missing menu elements (button or nav) in the HTML.");
        return;
    }

    toggleButton.addEventListener('click', () => {
        // Toggle the 'open' class on the menu
        navMenu.classList.toggle('open');
        
        // Update the ARIA attribute for accessibility (tells screen readers the state)
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !isExpanded);
    });

    // Optional: Close the menu if a link is clicked (good for single-page apps)
    navMenu.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
             // Only close if it's currently open (on mobile)
             if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                toggleButton.setAttribute('aria-expanded', 'false');
             }
        });
    });
}

// Run the setup function once the page is fully loaded
document.addEventListener('DOMContentLoaded', setupMobileMenuToggle);
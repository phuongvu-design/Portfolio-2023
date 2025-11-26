document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('hidden', window.scrollY < 300);
  };
  
  if (backToTop) {
    window.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    toggleBackToTop();
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeLightbox = document.querySelector('[data-lightbox-close]');
  
  if (lightbox && lightboxImage) {
    // Open lightbox for elements with data-lightbox attribute
    document.querySelectorAll('[data-lightbox]').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
      });
    });

    // Close handlers
    const hideLightbox = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      lightboxImage.src = '';
    };

    if (closeLightbox) {
      closeLightbox.addEventListener('click', hideLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        hideLightbox();
      }
    });
  }
});

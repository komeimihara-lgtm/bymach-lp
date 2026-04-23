/* ============================================
   BYMACH PRO SWIPE LP - JavaScript
   ============================================ */

// ===== Swiper Initialization =====
const lpSwiper = new Swiper('.lp-swiper', {
  direction: 'vertical',
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 600,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 1,
    releaseOnEdges: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  touchReleaseOnEdges: true,
  resistance: true,
  resistanceRatio: 0.85,
  on: {
    slideChange: function () {
      const activeIndex = this.activeIndex;
      const totalSlides = this.slides.length;
      const fixedBar = document.getElementById('fixedCtaBar');

      // Hide fixed CTA bar on the final CTA slide
      if (activeIndex === totalSlides - 1) {
        fixedBar.classList.add('hidden');
      } else {
        fixedBar.classList.remove('hidden');
      }
    },
  },
});

// ===== Demo Modal =====
const demoModal = document.getElementById('demoModal');
const modalClose = document.getElementById('modalClose');

// Open modal when any link with href="#demo-form" is clicked
document.querySelectorAll('a[href="#demo-form"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openDemoModal();
  });
});

function openDemoModal() {
  demoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
  demoModal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeDemoModal);

// Close on overlay click (not modal content)
demoModal.addEventListener('click', (e) => {
  if (e.target === demoModal) {
    closeDemoModal();
  }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && demoModal.classList.contains('active')) {
    closeDemoModal();
  }
});

// ===== Prevent body scroll on touch =====
document.addEventListener('touchmove', (e) => {
  if (!demoModal.classList.contains('active')) {
    // Swiper handles its own touch events
    if (e.target.closest('.lp-swiper')) return;
    e.preventDefault();
  }
}, { passive: false });

// ===== Viewport height fix for mobile =====
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100);
});

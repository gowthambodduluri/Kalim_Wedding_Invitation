/**
 * KALIM & ROSHNI - WEDDING INVITATION JAVASCRIPT
 * Features:
 * - Particle & Golden Petal Ambient Animation
 * - Royal Envelope Unseal Experience
 * - Live Wedding Countdown Timer (Sept 27, 2026, 11:30 AM IST)
 * - Smooth Window Slide Navigation & "Next" Button Transitions
 * - Real-Time Active Navbar Underline (IntersectionObserver & ScrollSpy)
 * - Add to Calendar (.ics & Google Calendar)
 * - Directions & Address Copy helper
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initUnsealCover();
  initCountdown();
  initNavigation();
  initSmoothScrollLinks();
  initScrollAnimations();
});

/* ==========================================================================
   1. PARTICLE & GOLDEN PETAL CANVAS
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      isPetal: Math.random() > 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55,' : 'rgba(240, 200, 140,'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isPetal) {
        ctx.fillStyle = `rgba(180, 45, 70, ${p.opacity * 0.7})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 2.2, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#d4af37';
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. ROYAL ENVELOPE UNSEAL EXPERIENCE
   ========================================================================== */
function initUnsealCover() {
  const cover = document.getElementById('invitationCover');
  const btnUnseal = document.getElementById('btnUnseal');
  if (!cover || !btnUnseal) return;

  btnUnseal.addEventListener('click', () => {
    cover.classList.add('opened');
    setTimeout(() => {
      cover.style.display = 'none';
    }, 800);
  });
}

/* ==========================================================================
   3. WEDDING COUNTDOWN TIMER (Sept 27, 2026, 11:30 AM IST)
   ========================================================================== */
function initCountdown() {
  const weddingDate = new Date('2026-09-27T11:30:00+05:30').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   4. NAVIGATION & REAL-TIME ACTIVE UNDERLINE
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');
  const navItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.window-slide');

  // Real-Time Active Underline based on IntersectionObserver
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.35
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveNav(id);
      }
    });
  }, navObserverOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  function updateActiveNav(activeId) {
    navItems.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  // Backup fallback on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + window.innerHeight / 2.5;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      updateActiveNav(currentSectionId);
    }
  });

  // Mobile Menu Drawer
  function openNav() {
    navLinks.classList.add('active');
    navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navLinks.classList.remove('active');
    navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openNav);
  if (mobileClose) mobileClose.addEventListener('click', closeNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeNav);

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });
}

/* ==========================================================================
   5. SMOOTH SCROLL FOR "NEXT", "SCROLL", AND ANCHOR LINKS
   ========================================================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   6. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

/* ==========================================================================
   7. UTILITIES: ADDRESS COPY & CALENDAR EXPORT
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastAlert');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastAlert';
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function copyAddress() {
  const addressText = 'PVR Function Hall, Near RTC Bus Stand, New Balaji Nagar, East Gudur Rural, Andhra Pradesh - 524101';
  navigator.clipboard.writeText(addressText).then(
    () => showToast('Venue Address copied to clipboard!'),
    () => showToast('PVR Function Hall, Gudur (524101)')
  );
}

function openGoogleCalendar() {
  const title = encodeURIComponent('Shaik Mannur Kaleem & Shaik Roshni - Wedding Ceremony');
  const details = encodeURIComponent('Wedding Ceremony (Nikah & Muhurtham) of Shaik Mannur Kaleem & Shaik Roshni at PVR Function Hall, Gudur.');
  const location = encodeURIComponent('PVR Function Hall, Near RTC Bus Stand, New Balaji Nagar, East Gudur Rural, Andhra Pradesh 524101');
  const dates = '20260927T060000Z/20260927T090000Z';

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  window.open(googleUrl, '_blank');
}

function downloadICS() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kalim and Roshni Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wedding-kaleem-roshni-2026@dreamhouse',
    'DTSTAMP:20260820T120000Z',
    'DTSTART:20260927T060000Z',
    'DTEND:20260927T090000Z',
    'SUMMARY:Shaik Mannur Kaleem & Shaik Roshni Wedding Ceremony',
    'DESCRIPTION:Wedding Ceremony (Nikah & Muhurtham) of Kaleem & Roshni at PVR Function Hall, Gudur.',
    'LOCATION:PVR Function Hall, Near RTC Bus Stand, New Balaji Nagar, East Gudur Rural, Andhra Pradesh 524101',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Kaleem_Roshni_Wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  showToast('Calendar event downloaded (.ics)!');
}

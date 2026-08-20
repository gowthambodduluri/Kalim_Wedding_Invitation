/**
 * KALIM & ROSHNI - WEDDING INVITATION JAVASCRIPT
 * Features:
 * - Particle & Golden Petal Ambient Animation
 * - Royal Envelope Unseal Experience
 * - Live Wedding Countdown Timer (Sept 27, 2026, 11:30 AM IST)
 * - 100% Mobile & Desktop Navigation + Drawer Controller
 * - Smooth Window Slide Navigation & "Next" Button Transitions
 * - Real-Time Active Underline Tracking
 * - Add to Calendar (.ics & Google Calendar)
 * - Directions & Address Copy helper
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initUnsealCover();
  initCountdown();
  initWeddingMusic();
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
  const particleCount = window.innerWidth < 768 ? 30 : 65;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.7 + 0.3,
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

// Ensure browser starts at the top and doesn't auto-jump to cached scroll or hashes
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/* ==========================================================================
   2. ROYAL ENVELOPE UNSEAL EXPERIENCE
   ========================================================================== */
function initUnsealCover() {
  const cover = document.getElementById('invitationCover');
  const btnUnseal = document.getElementById('btnUnseal');
  if (!cover || !btnUnseal) return;

  // Ensure scroll is at 0 initially
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  btnUnseal.addEventListener('click', () => {
    cover.classList.add('opened');
    
    // Clear any hash if present in URL
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
    
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    setTimeout(() => {
      cover.style.display = 'none';
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (hero) {
        hero.scrollIntoView({ behavior: 'instant', block: 'start' });
      }

      // Explicitly highlight Home
      const allNavLinks = document.querySelectorAll('#desktopNavLinks a, .drawer-links a');
      allNavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#hero') {
          link.classList.add('active');
        }
      });

      // Start celebration melody
      startWeddingMelody();
    }, 600);
  });
}

/* ==========================================================================
   3. TRADITIONAL WEDDING SHEHNAI & TANPURA MELODY (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let shehnaiSequenceTimer = null;
let droneNodes = [];

function initWeddingMusic() {
  const toggleBtn = document.getElementById('musicToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
      stopWeddingMelody();
    } else {
      startWeddingMelody();
    }
  });
}

function startWeddingMelody() {
  const toggleBtn = document.getElementById('musicToggle');
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isMusicPlaying = true;
    if (toggleBtn) {
      toggleBtn.classList.add('playing');
      toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      toggleBtn.title = 'Mute Wedding Music';
    }

    // Start Tanpura Drone
    startTanpuraDrone();

    // Traditional Auspicious Wedding Shehnai Raga Phrases
    const weddingPhrases = [
      [ { f: 277.18, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 369.99, d: 0.6 }, { f: 329.63, d: 0.4 }, { f: 293.66, d: 0.9 } ],
      [ { f: 369.99, d: 0.35 }, { f: 415.30, d: 0.35 }, { f: 493.88, d: 0.5 }, { f: 440.00, d: 0.4 }, { f: 369.99, d: 0.35 }, { f: 329.63, d: 0.35 }, { f: 293.66, d: 0.9 } ],
      [ { f: 440.00, d: 0.4 }, { f: 493.88, d: 0.4 }, { f: 554.37, d: 0.5 }, { f: 587.33, d: 0.8 }, { f: 554.37, d: 0.4 }, { f: 493.88, d: 0.4 }, { f: 440.00, d: 0.8 } ],
      [ { f: 369.99, d: 0.3 }, { f: 440.00, d: 0.3 }, { f: 493.88, d: 0.4 }, { f: 554.37, d: 0.4 }, { f: 493.88, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 369.99, d: 0.35 }, { f: 329.63, d: 0.35 }, { f: 293.66, d: 1.1 } ]
    ];

    let currentPhraseIdx = 0;
    let noteIdx = 0;

    function playNextWeddingNote() {
      if (!isMusicPlaying || !audioCtx) return;

      const phrase = weddingPhrases[currentPhraseIdx];
      const note = phrase[noteIdx];

      playShehnaiNote(note.f, note.d);

      noteIdx++;
      if (noteIdx >= phrase.length) {
        noteIdx = 0;
        currentPhraseIdx = (currentPhraseIdx + 1) % weddingPhrases.length;
        shehnaiSequenceTimer = setTimeout(playNextWeddingNote, (note.d * 1000) + 600);
      } else {
        shehnaiSequenceTimer = setTimeout(playNextWeddingNote, (note.d * 1000) + 60);
      }
    }

    playNextWeddingNote();

  } catch (e) {
    console.log('Audio autoplay policy:', e);
  }
}

function stopWeddingMelody() {
  isMusicPlaying = false;
  if (shehnaiSequenceTimer) clearTimeout(shehnaiSequenceTimer);

  stopTanpuraDrone();

  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
  }
  const toggleBtn = document.getElementById('musicToggle');
  if (toggleBtn) {
    toggleBtn.classList.remove('playing');
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    toggleBtn.title = 'Play Wedding Music';
  }
}

function startTanpuraDrone() {
  if (!audioCtx) return;
  stopTanpuraDrone();

  const droneFreqs = [146.83, 220.00, 293.66];

  droneFreqs.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = idx === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.012 / (idx + 1), audioCtx.currentTime);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    droneNodes.push({ osc, gain });
  });
}

function stopTanpuraDrone() {
  droneNodes.forEach(({ osc, gain }) => {
    try {
      gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  });
  droneNodes = [];
}

function playShehnaiNote(freq, duration) {
  if (!audioCtx || audioCtx.state !== 'running') return;

  const now = audioCtx.currentTime;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const vibrato = audioCtx.createOscillator();
  const vibratoGain = audioCtx.createGain();

  const mainGain = audioCtx.createGain();
  const biquadFilter = audioCtx.createBiquadFilter();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  osc1.frequency.setValueAtTime(freq, now);
  osc2.frequency.setValueAtTime(freq * 1.002, now);

  vibrato.frequency.setValueAtTime(5.5, now);
  vibratoGain.gain.setValueAtTime(freq * 0.015, now);

  vibrato.connect(osc1.frequency);
  vibrato.connect(osc2.frequency);

  biquadFilter.type = 'bandpass';
  biquadFilter.frequency.setValueAtTime(freq * 2.2, now);
  biquadFilter.Q.setValueAtTime(2.5, now);

  mainGain.gain.setValueAtTime(0.0001, now);
  mainGain.gain.linearRampToValueAtTime(0.045, now + 0.08);
  mainGain.gain.setValueAtTime(0.045, now + duration - 0.1);
  mainGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.15);

  osc1.connect(biquadFilter);
  osc2.connect(biquadFilter);
  biquadFilter.connect(mainGain);
  mainGain.connect(audioCtx.destination);

  vibrato.start(now);
  osc1.start(now);
  osc2.start(now);

  vibrato.stop(now + duration + 0.2);
  osc1.stop(now + duration + 0.2);
  osc2.stop(now + duration + 0.2);
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
   4. NAVIGATION & REAL-TIME ACTIVE TRACKER (DESKTOP & MOBILE)
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  
  const allNavLinks = document.querySelectorAll('#desktopNavLinks a, .drawer-links a');
  const sections = document.querySelectorAll('.window-slide');

  function updateActiveNav(activeId) {
    if (!activeId) activeId = 'hero';
    allNavLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  // Force default to Home on load
  updateActiveNav('hero');

  function determineActiveSection() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // If near the top, always make Home active
    if (window.scrollY < 150) {
      updateActiveNav('hero');
      return;
    }

    let currentSectionId = 'hero';
    const scrollMiddle = window.scrollY + (window.innerHeight / 2);

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollMiddle >= top && scrollMiddle < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    updateActiveNav(currentSectionId);
  }

  window.addEventListener('scroll', determineActiveSection, { passive: true });
  window.addEventListener('resize', determineActiveSection, { passive: true });

  // Mobile Menu Drawer Handlers
  function openMobileDrawer(e) {
    if (e) e.preventDefault();
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer(e) {
    if (e) e.preventDefault();
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileDrawer);
    mobileToggle.addEventListener('touchstart', openMobileDrawer, { passive: false });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileDrawer);
    mobileClose.addEventListener('touchstart', closeMobileDrawer, { passive: false });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileDrawer);
    navBackdrop.addEventListener('touchstart', closeMobileDrawer, { passive: false });
  }

  // Close drawer on clicking any drawer link
  document.querySelectorAll('.drawer-links a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
      const targetId = link.getAttribute('href').replace('#', '');
      updateActiveNav(targetId);
    });
  });
}

/* ==========================================================================
   5. SMOOTH SCROLL FOR ALL ANCHOR LINKS ("NEXT", "SCROLL", NAV)
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

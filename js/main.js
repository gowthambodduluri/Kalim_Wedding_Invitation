/**
 * KALEEM & ROSHNI — WEDDING INVITATION
 * Balanced Desktop & Mobile Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Prevent browser jumping on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  initAmbientParticles();
  initUnsealCover();
  initNavigation();
  initCountdownTimer();
  initWeddingAudio();
});

/* ==========================================================================
   1. AMBIENT PARTICLES (GPU Optimized Canvas)
   ========================================================================== */
function initAmbientParticles() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = window.innerWidth < 768 ? 25 : 55;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55,' : 'rgba(250, 226, 156,'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;

      ctx.save();
      ctx.fillStyle = `${p.color} ${p.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#d4af37';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. ROYAL ENVELOPE UNSEAL OVERLAY
   ========================================================================== */
function initUnsealCover() {
  const cover = document.getElementById('invitationCover');
  const btn = document.getElementById('btnUnseal');
  if (!cover || !btn) return;

  btn.addEventListener('click', () => {
    cover.classList.add('opened');
    
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initialize audio synchronously on direct user gesture
    playWeddingMusic();

    setTimeout(() => {
      cover.style.display = 'none';
    }, 650);
  });
}

/* ==========================================================================
   3. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('#navMenu a, .drawer-links a');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (navBackdrop) navBackdrop.addEventListener('click', closeDrawer);

  // Smooth scroll and active state tracking with navbar offset
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        closeDrawer();
        const navbarHeight = document.querySelector('.main-navbar')?.offsetHeight || 75;
        const targetPosition = targetEl.offsetTop - navbarHeight;
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    });
  });

  // ScrollSpy for Desktop Navbar
  const sections = document.querySelectorAll('section.section-block');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. COUNTDOWN TIMER (Sept 27, 2026, 11:30 AM IST)
   ========================================================================== */
function initCountdownTimer() {
  const targetDate = new Date('2026-09-27T11:30:00+05:30').getTime();

  const daysEl = document.getElementById('t-days');
  const hoursEl = document.getElementById('t-hours');
  const minsEl = document.getElementById('t-mins');
  const secsEl = document.getElementById('t-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = mins < 10 ? '0' + mins : mins;
    secsEl.textContent = secs < 10 ? '0' + secs : secs;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   5. WEDDING MUSIC: JASHN-E-BAHAARAA (Jodhaa Akbar Melody)
   ========================================================================== */
let isAudioPlaying = false;
let audioCtx = null;
let melodyTimer = null;
let droneOscs = [];

function setMusicUIState(playing) {
  isAudioPlaying = playing;
  const toggleBtn = document.getElementById('audioToggle');
  if (!toggleBtn) return;
  if (playing) {
    toggleBtn.classList.add('playing');
    toggleBtn.title = 'Mute Jashn-E-Bahaaraa';
    toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    toggleBtn.classList.remove('playing');
    toggleBtn.title = 'Play Jashn-E-Bahaaraa';
    toggleBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
  }
}

function initWeddingAudio() {
  const toggleBtn = document.getElementById('audioToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAudioPlaying) {
      pauseWeddingMusic();
    } else {
      playWeddingMusic();
    }
  });
}

function playWeddingMusic() {
  // Send postMessage to YouTube IFrame
  const ytIframe = document.getElementById('ytIframe');
  if (ytIframe && ytIframe.contentWindow) {
    try {
      ytIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    } catch (e) {}
  }

  startSynthesizedJashnEBahaaraa();
}

function pauseWeddingMusic() {
  const ytIframe = document.getElementById('ytIframe');
  if (ytIframe && ytIframe.contentWindow) {
    try {
      ytIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } catch (e) {}
  }

  stopSynthesizedMelody();
  setMusicUIState(false);
}

/* Authentic Jashn-E-Bahaaraa Royal Melody Synthesis */
function startSynthesizedJashnEBahaaraa() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    setMusicUIState(true);
    startDrone();

    // The iconic melody phrases of Jashn-E-Bahaaraa (A.R. Rahman)
    const jashnPhrases = [
      // "Kehne Ko Jashn-E-Bahaaraa Hai..."
      [ { f: 440.00, d: 0.55 }, { f: 369.99, d: 0.38 }, { f: 329.63, d: 0.38 }, { f: 293.66, d: 0.45 }, { f: 329.63, d: 0.38 }, { f: 369.99, d: 0.55 }, { f: 293.66, d: 0.85 } ],
      // "Ishq Yeh Dekhke Hairaan Hai..."
      [ { f: 440.00, d: 0.38 }, { f: 493.88, d: 0.38 }, { f: 587.33, d: 0.55 }, { f: 554.37, d: 0.38 }, { f: 493.88, d: 0.38 }, { f: 440.00, d: 0.45 }, { f: 369.99, d: 0.85 } ],
      // "Phool Se Khushboo Khafaa Khafaa..."
      [ { f: 440.00, d: 0.55 }, { f: 369.99, d: 0.38 }, { f: 329.63, d: 0.38 }, { f: 293.66, d: 0.45 }, { f: 329.63, d: 0.38 }, { f: 369.99, d: 0.55 }, { f: 293.66, d: 0.85 } ],
      // "Baagh Mein Jaise Sabaa Sabaa..."
      [ { f: 329.63, d: 0.35 }, { f: 369.99, d: 0.35 }, { f: 392.00, d: 0.48 }, { f: 369.99, d: 0.35 }, { f: 329.63, d: 0.38 }, { f: 293.66, d: 0.35 }, { f: 277.18, d: 0.38 }, { f: 293.66, d: 1.0 } ],
      // Royal Instrumental Flute & Sitar Interlude
      [ { f: 587.33, d: 0.35 }, { f: 659.25, d: 0.35 }, { f: 739.99, d: 0.55 }, { f: 659.25, d: 0.35 }, { f: 587.33, d: 0.38 }, { f: 554.37, d: 0.35 }, { f: 493.88, d: 0.35 }, { f: 440.00, d: 0.48 }, { f: 493.88, d: 0.38 }, { f: 554.37, d: 0.38 }, { f: 587.33, d: 0.95 } ]
    ];

    let pIdx = 0;
    let nIdx = 0;

    function playNote() {
      if (!isAudioPlaying || !audioCtx) return;
      const p = jashnPhrases[pIdx];
      const note = p[nIdx];
      playAcousticInstrument(note.f, note.d);

      nIdx++;
      if (nIdx >= p.length) {
        nIdx = 0;
        pIdx = (pIdx + 1) % jashnPhrases.length;
        melodyTimer = setTimeout(playNote, (note.d * 1000) + 500);
      } else {
        melodyTimer = setTimeout(playNote, (note.d * 1000) + 50);
      }
    }

    playNote();
  } catch (e) {
    console.log(e);
  }
}

function stopSynthesizedMelody() {
  if (melodyTimer) clearTimeout(melodyTimer);
  stopDrone();

  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
  }
}

function startDrone() {
  if (!audioCtx) return;
  stopDrone();
  [146.83, 220.00, 293.66].forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = idx === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.012 / (idx + 1), audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    droneOscs.push({ osc, gain });
  });
}

function stopDrone() {
  droneOscs.forEach(({ osc, gain }) => {
    try {
      gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  });
  droneOscs = [];
}

function playAcousticInstrument(freq, duration) {
  if (!audioCtx || audioCtx.state !== 'running') return;
  const now = audioCtx.currentTime;

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const vib = audioCtx.createOscillator();
  const vibGain = audioCtx.createGain();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc1.type = 'sawtooth';
  osc2.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);
  osc2.frequency.setValueAtTime(freq * 1.002, now);

  vib.frequency.setValueAtTime(5.2, now);
  vibGain.gain.setValueAtTime(freq * 0.012, now);
  vib.connect(osc1.frequency);
  vib.connect(osc2.frequency);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(freq * 3.2, now);
  filter.Q.setValueAtTime(2.2, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.048, now + 0.07);
  gain.gain.setValueAtTime(0.048, now + duration - 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.12);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  vib.start(now);
  osc1.start(now);
  osc2.start(now);

  vib.stop(now + duration + 0.18);
  osc1.stop(now + duration + 0.18);
  osc2.stop(now + duration + 0.18);
}

function startDrone() {
  if (!audioCtx) return;
  stopDrone();
  [146.83, 220.00, 293.66].forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = idx === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.012 / (idx + 1), audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    droneOscs.push({ osc, gain });
  });
}

function stopDrone() {
  droneOscs.forEach(({ osc, gain }) => {
    try {
      gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  });
  droneOscs = [];
}

function playShehnaiSound(freq, duration) {
  if (!audioCtx || audioCtx.state !== 'running') return;
  const now = audioCtx.currentTime;

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const vib = audioCtx.createOscillator();
  const vibGain = audioCtx.createGain();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, now);
  osc2.frequency.setValueAtTime(freq * 1.002, now);

  vib.frequency.setValueAtTime(5.5, now);
  vibGain.gain.setValueAtTime(freq * 0.015, now);
  vib.connect(osc1.frequency);
  vib.connect(osc2.frequency);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(freq * 2.2, now);
  filter.Q.setValueAtTime(2.5, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.045, now + 0.08);
  gain.gain.setValueAtTime(0.045, now + duration - 0.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.15);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  vib.start(now);
  osc1.start(now);
  osc2.start(now);

  vib.stop(now + duration + 0.2);
  osc1.stop(now + duration + 0.2);
  osc2.stop(now + duration + 0.2);
}

/* ==========================================================================
   6. UTILITIES: TOAST, SHARE, COPY & CALENDAR
   ========================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toastAlert');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #d4af37;"></i> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function shareInvitation() {
  const title = 'Wedding Invitation: Kaleem & Roshni';
  const text = 'You are cordially invited to celebrate the wedding union of Shaik Mannur Kaleem & Shaik Roshni on September 26 & 27, 2026 at PVR Function Hall, Gudur.\n\nView Invitation: ';
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
  } else {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + url)}`, '_blank');
  }
}

function copyAddress() {
  const address = 'PVR Function Hall, Near RTC Bus Stand, New Balaji Nagar, East Gudur Rural, Andhra Pradesh – 524101';
  navigator.clipboard.writeText(address).then(
    () => showToast('Address copied to clipboard!'),
    () => showToast('PVR Function Hall, Gudur')
  );
}

function openGoogleCalendar() {
  const title = encodeURIComponent('Shaik Mannur Kaleem & Shaik Roshni Wedding');
  const details = encodeURIComponent('Wedding Ceremony (Nikah) of Kaleem & Roshni at PVR Function Hall, Gudur.');
  const location = encodeURIComponent('PVR Function Hall, Near RTC Bus Stand, New Balaji Nagar, East Gudur Rural, Andhra Pradesh 524101');
  const dates = '20260927T060000Z/20260927T090000Z';
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`, '_blank');
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
    'DESCRIPTION:Wedding Ceremony (Nikah) of Kaleem & Roshni at PVR Function Hall, Gudur.',
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
  showToast('Calendar event downloaded (.ics)');
}

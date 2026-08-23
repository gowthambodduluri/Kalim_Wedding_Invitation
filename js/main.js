/**
 * THE CELESTIAL STORY OF KALEEM & ROSHNI — JAVASCRIPT ENGINE
 * 3D Cosmic Canvas, Story Spine Tracker, Audio Engine & Wish Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  initThemeSwitcher();
  initStoryCosmicCanvas();
  initEntryPortalExperience();
  initStorySpineTracker();
  initCountdownTimer();
  initFloatingAudio();
  init3DParallax();
  initCursorAura();
});

/* ==========================================================================
   1. 3D COSMIC CANVAS & VELVET ROSE PETALS
   ========================================================================== */
function initStoryCosmicCanvas() {
  const canvas = document.getElementById('storyCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  const particles = [];
  const count = window.innerWidth < 768 ? 40 : 80;

  for (let i = 0; i < count; i++) {
    const isPetal = i % 5 === 0;
    particles.push({
      isPetal,
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.6,
      size: isPetal ? Math.random() * 5 + 4 : Math.random() * 2.2 + 0.8,
      speedX: isPetal ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 0.3,
      speedY: isPetal ? Math.random() * 0.8 + 0.4 : Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.6 + 0.3,
      hue: Math.random() > 0.4 ? '212, 175, 55' : '250, 226, 156',
      pulse: Math.random() * Math.PI
    });
  }

  // Sparkles on click
  const sparkles = [];
  window.triggerSparkleBurst = function (x, y) {
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.2,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        color: Math.random() > 0.5 ? '#d4af37' : '#fae29c'
      });
    }
  };

  window.addEventListener('click', (e) => {
    window.triggerSparkleBurst(e.clientX, e.clientY);
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.pulse += 0.025;
      const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
        }
      }

      p.x += p.speedX * p.z;
      p.y += p.speedY * p.z;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      const isWhiteTheme = document.documentElement.getAttribute('data-theme') === 'whitenavy';
      if (p.isPetal) {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = isWhiteTheme
          ? `rgba(168, 121, 28, ${Math.max(0.15, currentOpacity * 0.75)})`
          : `rgba(122, 27, 50, ${Math.max(0.1, currentOpacity * 0.85)})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.2, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isWhiteTheme ? `rgba(10, 27, 63, 0.3)` : `rgba(212, 175, 55, 0.4)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else {
        ctx.fillStyle = isWhiteTheme
          ? `rgba(168, 121, 28, ${Math.max(0.2, currentOpacity * 0.9)})`
          : `rgba(${p.hue}, ${Math.max(0.1, currentOpacity)})`;
        ctx.shadowBlur = isWhiteTheme ? 4 : 10 * p.z;
        ctx.shadowColor = isWhiteTheme ? '#a8791c' : '#d4af37';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.12;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparkles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. ACT 0: REALISTIC 3D ENVELOPE OPENING CEREMONY (10-SEC HOLD -> FULL OPEN)
   ========================================================================== */
let isEnvelopeUnsealed = false;
let isEnvelopeFullyOpened = false;
let envelopeTimerInterval = null;
let royalAudioCtx = null;

function initEntryPortalExperience() {
  const overlay = document.getElementById('envelopeOverlay');
  const openBtn = document.getElementById('openEnvelopeBtn');
  const letterCard = document.getElementById('envelopeLetter');
  const captionBtn = document.getElementById('openSealPillBtn');
  const pillText = document.getElementById('pillActionText');
  if (!overlay) return;

  function unsealEnvelope(e) {
    if (isEnvelopeUnsealed) {
      // If already unsealed, clicking again proceeds immediately!
      fullyOpenStory();
      return;
    }
    isEnvelopeUnsealed = true;

    // Haptic feedback
    if (navigator.vibrate) {
      try { navigator.vibrate([25, 40, 25]); } catch (err) { }
    }

    // 1. Play Royal Harp Chord progression
    playRoyalChimeSequence();

    // 2. Start Wedding Music (assets/Audio/Background_music.mp3)
    playWeddingMusic();

    // 3. Trigger celebratory confetti shower
    setTimeout(() => {
      triggerCelebrationConfetti();
    }, 600);

    // 4. Unseal animation: Flap lifts up in 3D (240ms), Letter card slides up (800ms)
    overlay.classList.add('unsealed');

    showToast('✨ Welcome to Kaleem & Roshni’s Wedding Story');

    // 5. Hold enlarged card open for 3 seconds before zooming into the storybook
    let secondsLeft = 2;
    if (pillText) {
      pillText.innerHTML = `✨ Opening full invitation in <strong>${secondsLeft}s</strong> (or Tap to Enter Now) ✨`;
    }

    envelopeTimerInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft > 0) {
        if (pillText) {
          pillText.innerHTML = `✨ Opening full invitation in <strong>${secondsLeft}s</strong> (or Tap to Enter Now) ✨`;
        }
      } else {
        clearInterval(envelopeTimerInterval);
        fullyOpenStory();
      }
    }, 1000);
  }

  function fullyOpenStory() {
    if (isEnvelopeFullyOpened || !overlay) return;
    isEnvelopeFullyOpened = true;
    if (envelopeTimerInterval) clearInterval(envelopeTimerInterval);

    overlay.classList.add('opened');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1400);
  }

  if (openBtn) openBtn.addEventListener('click', unsealEnvelope);
  if (captionBtn) captionBtn.addEventListener('click', unsealEnvelope);
  if (letterCard) letterCard.addEventListener('click', (e) => {
    e.stopPropagation();
    fullyOpenStory();
  });

  initEnvelope3DTilt();
}

/* 3D Cursor / Device Tilt on Envelope */
function initEnvelope3DTilt() {
  const assembly = document.querySelector('.envelope-3d-assembly');
  if (!assembly) return;

  document.addEventListener('mousemove', (e) => {
    if (isEnvelopeUnsealed || isEnvelopeFullyOpened) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * -14;
    assembly.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });

  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', (e) => {
      if (isEnvelopeUnsealed || isEnvelopeFullyOpened || !e.gamma || !e.beta) return;
      const gamma = Math.max(-20, Math.min(20, e.gamma)) * 0.4;
      const beta = Math.max(-20, Math.min(20, e.beta - 45)) * -0.4;
      assembly.style.transform = `perspective(1000px) rotateX(${beta}deg) rotateY(${gamma}deg) translateY(-6px)`;
    });
  }
}

function playRoyalChime(freq, duration = 1.0) {
  try {
    if (!royalAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      royalAudioCtx = new AudioContext();
    }
    if (royalAudioCtx.state === 'suspended') {
      royalAudioCtx.resume();
    }

    const osc = royalAudioCtx.createOscillator();
    const gain = royalAudioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, royalAudioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, royalAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.35, royalAudioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, royalAudioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(royalAudioCtx.destination);

    osc.start();
    osc.stop(royalAudioCtx.currentTime + duration);
  } catch (e) {
    console.log('Chime error:', e);
  }
}

function playRoyalChimeSequence() {
  try {
    setTimeout(() => playRoyalChime(392.00, 1.2), 100);  // G4
    setTimeout(() => playRoyalChime(523.25, 1.3), 350);  // C5
    setTimeout(() => playRoyalChime(659.25, 1.4), 650);  // E5
    setTimeout(() => playRoyalChime(783.99, 1.8), 950);  // G5
  } catch (e) {
    console.log('Audio chord exception:', e);
  }
}

/* Multi-angle Celebration Confetti Shower */
function triggerCelebrationConfetti() {
  if (typeof confetti !== 'function') return;

  confetti({
    particleCount: 65,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#fae084', '#d4af37', '#ffffff', '#ffd1dc', '#93c5fd']
  });

  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: ['#fae084', '#d4af37', '#ffffff']
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: ['#fae084', '#d4af37', '#ffffff']
    });
  }, 250);
}

/* ==========================================================================
   3. STORY PROGRESS SPINE TRACKER & SMOOTH TRANSITIONS
   ========================================================================== */
function initStorySpineTracker() {
  const dots = document.querySelectorAll('.spine-dot, .story-actions-row a');
  const acts = document.querySelectorAll('.story-act-frame');

  dots.forEach((dot) => {
    dot.addEventListener('click', function (e) {
      const targetHref = this.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        e.preventDefault();
        const targetId = targetHref.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          window.scrollTo({
            top: targetEl.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + window.innerHeight / 2;

    acts.forEach((act) => {
      const top = act.offsetTop;
      const height = act.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = act.getAttribute('id');
      }
    });

    document.querySelectorAll('.spine-dot').forEach((dot) => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-act') === currentId) {
        dot.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. COUNTDOWN (Sept 27, 2026, 11:30 AM IST)
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
   5. FLOATING MUSIC ENGINE: JASHN-E-BAHAARAA
   ========================================================================== */
let isMusicPlaying = false;
let wasPlayingBeforeTabHidden = false;

function setMusicUI(playing) {
  isMusicPlaying = playing;
  const orb = document.getElementById('musicOrb');
  if (!orb) return;
  if (playing) {
    orb.classList.add('playing');
    orb.title = 'Mute Wedding Music';
  } else {
    orb.classList.remove('playing');
    orb.title = 'Play Wedding Music';
  }
}

function initFloatingAudio() {
  const orb = document.getElementById('musicOrb');
  if (orb) {
    orb.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMusicPlaying) {
        pauseWeddingMusic();
      } else {
        playWeddingMusic();
      }
    });
  }

  // Auto-pause when tab/window is hidden or minimized, resume when focused
  document.addEventListener('visibilitychange', () => {
    const bgAudio = document.getElementById('bgAudio');
    if (!bgAudio) return;

    if (document.hidden) {
      if (isMusicPlaying) {
        wasPlayingBeforeTabHidden = true;
        bgAudio.pause();
        setMusicUI(false);
      }
    } else {
      if (wasPlayingBeforeTabHidden) {
        wasPlayingBeforeTabHidden = false;
        playWeddingMusic();
      }
    }
  });

  window.addEventListener('pagehide', () => {
    const bgAudio = document.getElementById('bgAudio');
    if (bgAudio && isMusicPlaying) {
      bgAudio.pause();
    }
  });
}

function playWeddingMusic() {
  const bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    bgAudio.play().then(() => {
      setMusicUI(true);
    }).catch((e) => {
      console.log('Autoplay waiting for user gesture:', e);
    });
  }
}

function pauseWeddingMusic() {
  const bgAudio = document.getElementById('bgAudio');
  if (bgAudio) {
    bgAudio.pause();
    setMusicUI(false);
  }
}

/* ==========================================================================
   6. 3D INTERACTIVE TILT & PARALLAX
   ========================================================================== */
function init3DParallax() {
  const tiltCards = document.querySelectorAll(
    '.portal-card-3d, .story-parchment-card, .soul-narrative-box, .story-event-capsule, .story-compliment-stone, .mughal-jharokha-art-frame'
  );

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   7. CURSOR AURA
   ========================================================================== */
function initCursorAura() {
  const aura = document.getElementById('cursorAura');
  if (!aura) return;

  window.addEventListener('mousemove', (e) => {
    aura.style.left = e.clientX + 'px';
    aura.style.top = e.clientY + 'px';
  }, { passive: true });
}

/* ==========================================================================
   8. WISH GENERATOR & GUEST UTILITIES
   ========================================================================== */
window.sendCustomWish = function (msg) {
  const phone = '919014360108';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

function showToast(msg) {
  const toast = document.getElementById('toastAlert');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid fa-crown" style="color: #d4af37;"></i> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function shareInvitation() {
  const title = '👑 Royal Wedding Story: Kaleem & Roshni';
  const text = 'You are cordially invited to celebrate the royal wedding of Shaik Mannur Kaleem & Shaik Roshni on September 26 & 27, 2026 at PVR Function Hall, Gudur.\n\nExperience Our Wedding Story: ';
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => { });
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

/* ==========================================================================
   9. ROYAL THEME SWITCHER CONTROLLER
   ========================================================================== */
function initThemeSwitcher() {
  const switcher = document.getElementById('themeSwitcher');
  const toggleBtn = document.getElementById('themeToggleBtn');
  const chips = document.querySelectorAll('.theme-chip-btn');
  if (!switcher || !toggleBtn) return;

  const savedTheme = sessionStorage.getItem('royalTheme') || 'whitegold';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', function () {
      const theme = this.getAttribute('data-theme');
      applyTheme(theme);
      sessionStorage.setItem('royalTheme', theme);
      switcher.classList.remove('open');
      showToast(`Palette switched to ${theme.toUpperCase()}!`);
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    chips.forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-theme') === theme);
    });
  }
}

/* ==========================================================================
   10. HD COUPLE PHOTO LIGHTBOX CONTROLLER
   ========================================================================== */
function openPhotoLightbox() {
  const modal = document.getElementById('photoLightboxModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (navigator.vibrate) navigator.vibrate(20);
}

function closePhotoLightbox() {
  const modal = document.getElementById('photoLightboxModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function handleLightboxBackdropClick(e) {
  if (e.target.id === 'photoLightboxModal') {
    closePhotoLightbox();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePhotoLightbox();
  }
});

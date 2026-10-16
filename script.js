/**
 * Assamese Royal Wedding Interactive Experience
 * Bride: Nandita | Groom: Rakesh
 * Events:
 *   - Jurun (জোৰোণ): 25 November, 2026
 *   - Wedding (বিয়া) - Main Event: 26 November, 2026
 *   - Reception (অভ্যৰ্থনা) - Invitation Day: 28 November, 2026
 * Design References: ShaadiOra, SaveOurDate, DreamsInvite
 */

(function () {
  'use strict';

  // State Management
  const state = {
    lang: 'as', // 'as' | 'en'
    musicPlaying: false,
    petalsActive: true,
    isScratched: false,
    lampsLit: true
  };

  const assameseDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  function toAssameseNumber(num) {
    return String(num).replace(/[0-9]/g, d => assameseDigits[+d]);
  }

  // =========================================================================
  // Multi-Language Content Dictionary
  // =========================================================================
  const i18n = {
    as: {
      auspiciousTag: '॥ শ্ৰী শ্ৰী প্ৰজাপতয়ে নমঃ ॥',
      heroSub: 'নিমন্ত্ৰণী শৰাই',
      heroTitle: 'ৰাকেশ আৰু নন্দিতা',
      heroGroom: 'Rakesh',
      heroBride: 'Nandita',
      cardGroom: 'ৰাকেশ',
      cardBride: 'নন্দিতা',
      cardCoupleSub: 'দৰা: ৰাকেশ • কইনা: নন্দিতা',
      heroDatePill: '২৬ নৱেম্বৰ, ২০২৬',
      announcementLead: 'ভাল খবৰ এটা আছে,',
      announcementLine1: 'এইবাৰ সোণগুটি চপোৱাৰ সময়তে',
      announcementLine2: 'মোৰ গাটো মাহ হালধিৰে ধুৱাই দিয়াৰ কথা চিন্তা কৰিছে।',
      announcementHighlight: 'ঘৰৰ মানুহে নন্দিতাক বোৱাৰী কৰি অনাৰ যো-জা চলাইছে।',
      cdHeader: '⏳ শুভ বিবাহলৈ বাকী সময়',
      days: 'দিন',
      hours: 'ঘণ্টা',
      mins: 'মিনিট',
      secs: 'ছেকেণ্ড',
      invitationIntro: 'অগ্নী-সাক্ষী কৰি সাটো জনমৰ দোলেৰে বান্ধ খাই সমাজৰ আগত মোৰ সেই বিশেষ গৰাকীক অৰ্ধাঙ্গিনি ৰূপে পৰিচয় কৰাই দিবলৈ আগবাঢ়িছো অহা<span class="card-date-highlight">৯ আঘোণ, (২৬ নৱেম্বৰ, ২০২৬) বৃহস্পতিবাৰে।</span>',
      cardReception: 'সেই উপলক্ষে আমাৰ এই মধুময় ক্ষণটিত ৰাইজ আৰু আত্মীয়ৰ একাঁজলী আশাৰ্বাদ বিচাৰি অহা<span class="card-date-highlight">১১ আঘোণ (ইংৰাজী ২৮ নৱেম্বৰ) শনিবাৰে</span>এভাগি অভ্যৰ্থনাৰ আয়োজন কৰিছো।',
      timelineEyebrow: 'শুভ দিনপঞ্জী',
      timelineTitle: 'অনুষ্ঠানসমূহ',
      badgeJurun: 'জোৰোণ পৰ্ব',
      badgeWedding: 'মূল অনুষ্ঠান',
      badgeReception: 'নিমন্ত্ৰণ দিৱস',
      jurunTitle: 'জোৰোণ (Jurun)',
      jurunDate: '২৫ নৱেম্বৰ, ২০২৬ (বুধবাৰ)',
      jurunDesc: 'কইনাঘৰলৈ পবিত্ৰ জোৰোণ আৰু মাংগলিক উপহাৰৰ শুভ যাত্ৰা।',
      weddingTitle: 'শুভ বিবাহ (Wedding)',
      weddingDate: '২৬ নৱেম্বৰ, ২০২৬ (বৃহস্পতিবাৰ)',
      weddingDesc: 'অগ্নি আৰু পুৰোহিতৰ উপস্থিতিত হোম-যজ্ঞ আৰু সাতপাকৰ পবিত্ৰ মিলন।',
      receptionTitle: 'অভ্যৰ্থনা (Reception)',
      receptionDate: '২৮ নৱেম্বৰ, ২০২৬ (শনিবাৰ)',
      receptionDesc: 'নৱদম্পতীক আশীৰ্বাদ আৰু প্ৰীতিভোজৰ আনন্দময় অভ্যৰ্থনা অনুষ্ঠান।',
      scratchHint: '',
      scratchCoverText: 'Scratch to Reveal the Date',
      scratchCoverSub: '',
      scratchReset: '',
      revealedBadge: 'উন্মোচিত!',
      addToCal: 'কেলেণ্ডাৰত যোগ কৰক',
      galleryEyebrow: 'প্ৰেমৰ মধুৰ ক্ষণ',
      galleryTitle: 'আমাৰ <em>চিত্ৰমালা</em>',
      blessingInvitationText: 'আমাৰ জীৱনৰ এই গুৰুত্বপূৰ্ণঁ দিনটোত আপুনি সপৰিয়ালে উপস্থিত হৈ আমাক দিহাই বুদ্ধিয়ে, বিয়ানাম এফাঁকি আৰু এজোলোকা উৰুলিৰে আশীৰ্বাদ দিবহি বুলি ৰভাৰ তলত বৰ আশাৰে বাট চাই থাকিম।',
      blessingInvitationReminder: '🗓️ কেলেণ্ডাৰত তাৰিখটো দাগ এটা দি থ’বচোন।',
      shagunEyebrow: 'শ্ৰদ্ধাঞ্জলি আৰু শুভাশীষ',
      shagunTitle: 'ডিজিটেল <em>আশীৰ্বাদ</em> (Shagun)',
      shagunDesc: 'আপোনালোকৰ আন্তৰিক আশীৰ্বাদেই আমাৰ শ্ৰেষ্ঠ উপহাৰ। ডিজিটেল মাধ্যমেৰে আশীৰ্বাদ পঠিয়াব বিচাৰিলে তলৰ তথ্য ব্যৱহাৰ কৰিব পাৰে।',
      wishesEyebrow: 'আপোনাৰ মৰম',
      wishesTitle: 'শুভেচ্ছা <em>বাৰ্তা</em> (Guest Wishes)',
      wishesDesc: 'নৱদম্পতীৰ বাবে আপোনাৰ মৰম আৰু শুভকামনাৰ দুআষাৰ লিখি পঠিয়াওক।',
      wishPlaceholderName: 'আপোনাৰ নাম...',
      wishPlaceholderMsg: 'নৱদম্পতীক আপোনাৰ শুভেচ্ছা জনাওক...',
      submitWishBtn: '💌 শুভেচ্ছা পঠিয়াওক',
      venueIti: 'ইতি',
      venueCouple: 'ৰাকেশ (দৰা) আৰু নন্দিতা (কইনা)',
      venueFamily: 'আৰু পৰিয়ালবৰ্গ।',
      venueLabelBaahor: 'বিবাহ বাহৰঃ',
      venueValBaahor: 'আমাৰ আপোন ঘৰখন',
      venueLabelAddress: 'ঠিকনাঃ',
      venueValAddress: 'চাৰিঙিয়া গাঁও, যোৰহাট',
      venueQrCaption: 'Scan the QR for Location',
      footerBlessing: '॥ মংগলময় দাম্পত্য জীৱনৰ শুভ কামনাৰে ॥',
      footerSub: 'ৰাকেশ আৰু নন্দিতাৰ শুভ বিবাহ নিমন্ত্ৰণ',
      whatsappShareText: '📲 হোৱাটছএপত নিমন্ত্ৰণ শ্বেয়াৰ কৰক'
    },
    en: {
      auspiciousTag: '॥ শ্ৰী শ্ৰী প্ৰজাপতয়ে নমঃ ॥',
      heroSub: 'Nimontroni Xorai (Wedding Invitation)',
      heroTitle: 'Rakesh & Nandita',
      heroGroom: 'Rakesh',
      heroBride: 'Nandita',
      cardGroom: 'Rakesh',
      cardBride: 'Nandita',
      cardCoupleSub: 'Groom: Rakesh • Bride: Nandita',
      heroDatePill: '26th November, 2026',
      announcementLead: 'We have wonderful news!',
      announcementLine1: 'This season, around the harvest of the golden paddy,',
      announcementLine2: 'My family has planned the sacred Mah-Halodhi bath for me.',
      announcementHighlight: 'And preparations are underway to welcome Nandita home as our bride!',
      cdHeader: '⏳ Countdown to The Wedding',
      days: 'Days',
      hours: 'Hours',
      mins: 'Mins',
      secs: 'Secs',
      invitationIntro: 'Taking the sacred fire as our eternal witness and bound in bonds of seven lifetimes, I step forward to introduce that special one as my lawfully wedded wife before society on<span class="card-date-highlight">9 Aghon, (26th November, 2026) Thursday.</span>',
      cardReception: 'On this auspicious occasion, seeking a handful of heartfelt blessings from our elders and loved ones in this precious moment, we have organized a reception on<span class="card-date-highlight">11 Aghon (28th November) Saturday.</span>',
      timelineEyebrow: 'Wedding Itinerary',
      timelineTitle: 'Events',
      badgeJurun: 'Jurun Ceremony',
      badgeWedding: 'Main Event',
      badgeReception: 'Invitation Day',
      jurunTitle: 'Jurun (জোৰোণ)',
      jurunDate: '25th November, 2026 (Wednesday)',
      jurunDesc: 'The traditional Assamese pre-wedding ceremony where bridal adornments and blessings arrive.',
      weddingTitle: 'Wedding (বিয়া)',
      weddingDate: '26th November, 2026 (Thursday)',
      weddingDesc: 'The sacred nuptials and traditional Vedic vows around the sacred fire (Hom).',
      receptionTitle: 'Reception (অভ্যৰ্থনা)',
      receptionDate: '28th November, 2026 (Saturday)',
      receptionDesc: 'A grand celebration with family and friends to welcome the newly married couple.',
      scratchHint: '',
      scratchCoverText: 'Scratch to Reveal the Date',
      scratchCoverSub: '',
      scratchReset: '',
      revealedBadge: 'Revealed!',
      addToCal: 'Add to Calendar',
      galleryEyebrow: 'Moments of Love',
      galleryTitle: 'Our <em>Gallery</em>',
      blessingInvitationText: 'On this momentous day of our lives, we eagerly await under the wedding canopy with great hope for you and your family to grace the occasion, guide us with your wisdom, and bless us with traditional wedding songs and joyful ululations.',
      blessingInvitationReminder: '🗓️ Please mark the date on your calendar!',
      shagunEyebrow: 'Love & Blessings',
      shagunTitle: 'Digital <em>Shagun</em> & Gifts',
      shagunDesc: 'Your presence and blessings are our greatest gift. If you wish to send a token of love digitally, details are below.',
      wishesEyebrow: 'Guestbook',
      wishesTitle: 'Leave a <em>Wish</em> for the Couple',
      wishesDesc: 'Pen your sweet wishes, blessings, and thoughts for Rakesh & Nandita.',
      wishPlaceholderName: 'Your Name...',
      wishPlaceholderMsg: 'Write your blessings or wishes here...',
      submitWishBtn: '💌 Send Your Wish',
      venueIti: 'Cordially Invited By,',
      venueCouple: 'Rakesh (Groom) & Nandita (Bride)',
      venueFamily: '& Families.',
      venueLabelBaahor: 'Wedding Venue:',
      venueValBaahor: 'Our Sweet Home',
      venueLabelAddress: 'Address:',
      venueValAddress: 'Charingia Gaon, Jorhat',
      venueQrCaption: 'Scan the QR for Location',
      footerBlessing: '|| Wishing Rakesh & Nandita a Lifetime of Bliss ||',
      footerSub: 'Rakesh & Nandita Wedding Celebration',
      whatsappShareText: '📲 Share Invitation on WhatsApp'
    }
  };

  // =========================================================================
  // Countdown Timer Implementation (Target: 26 November, 2026 00:00:00 IST)
  // =========================================================================
  const weddingDateTimestamp = new Date('2026-11-26T00:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDateTimestamp - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (distance <= 0) {
      daysEl.textContent = '০';
      hoursEl.textContent = '০';
      minsEl.textContent = '০';
      secsEl.textContent = '০';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (state.lang === 'as') {
      daysEl.textContent = toAssameseNumber(d);
      hoursEl.textContent = toAssameseNumber(String(h).padStart(2, '0'));
      minsEl.textContent = toAssameseNumber(String(m).padStart(2, '0'));
      secsEl.textContent = toAssameseNumber(String(s).padStart(2, '0'));
    } else {
      daysEl.textContent = String(d);
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }
  }

  // =========================================================================
  // Web Audio Synthesizer: Authentic Shehnai / Assamese Flute Melodies
  // Zero external MP3 files needed; instantaneous offline performance
  // =========================================================================
  let audioCtx = null;
  let melodyInterval = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Raag Bhupali & Assamese Wedding Flute Notes (D, E, F#, A, B, D5)
  const assameseNotes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25];
  const melodicPhrase = [0, 1, 2, 4, 3, 2, 1, 0, 2, 4, 5, 4, 2, 1, 2, 4, 5, 6, 5, 4, 2, 0];
  let noteCursor = 0;

  function playFluteNote(freq) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm bamboo flute vibrato (5.2Hz)
    vibrato.frequency.setValueAtTime(5.2, ctx.currentTime);
    vibratoGain.gain.setValueAtTime(4.5, ctx.currentTime);
    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.95);

    osc.connect(gain);
    gain.connect(ctx.destination);

    vibrato.start(ctx.currentTime);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.0);
    vibrato.stop(ctx.currentTime + 1.0);
  }

  function toggleMusic() {
    const waves = document.getElementById('music-waves');
    const ctx = getAudioContext();
    if (!ctx) return;

    if (state.musicPlaying) {
      if (melodyInterval) clearInterval(melodyInterval);
      state.musicPlaying = false;
      if (waves) waves.classList.add('paused');
    } else {
      state.musicPlaying = true;
      if (waves) waves.classList.remove('paused');
      noteCursor = 0;
      melodyInterval = setInterval(() => {
        if (!state.musicPlaying) return;
        const note = assameseNotes[melodicPhrase[noteCursor % melodicPhrase.length]];
        noteCursor++;
        playFluteNote(note);
      }, 720);
    }
  }

  // Sound effect: Coin scratch noise
  function playScratchSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800 + Math.random() * 600;
    filter.Q.value = 2.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  }

  // Sound effect: Auspicious celebration chime
  function playAuspiciousChime() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.09);
      osc.stop(ctx.currentTime + idx * 0.09 + 0.65);
    });
  }

  // =========================================================================
  // Interactive Auspicious Lamp Ceremony (Lighting the Mangal Saki)
  // =========================================================================
  function toggleLamps() {
    state.lampsLit = !state.lampsLit;
    const lampUnits = document.querySelectorAll('.saki-lamp-unit');
    const sakiBtn = document.getElementById('light-saki-btn');

    lampUnits.forEach(unit => {
      if (state.lampsLit) {
        unit.classList.remove('unlit');
        unit.classList.add('lit');
      } else {
        unit.classList.remove('lit');
        unit.classList.add('unlit');
      }
    });

    if (state.lampsLit) {
      playAuspiciousChime();
      triggerCelebrationPetals();
      if (sakiBtn) sakiBtn.textContent = i18n[state.lang].sakiBtnLit;
    } else {
      if (sakiBtn) sakiBtn.textContent = i18n[state.lang].sakiBtnUnlit;
    }
  }

  // =========================================================================
  // Scratch Card Canvas (Wedding / Biya Date: 26 November, 2026)
  // =========================================================================
  let scratchCanvas = null;
  let scratchCtx = null;
  let isScratching = false;
  let lastScratchPt = null;
  let scratchCheckThrottle = null;

  function initScratchCard() {
    scratchCanvas = document.getElementById('scratch-canvas');
    if (!scratchCanvas) return;
    scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });

    resizeScratchCanvas();
    drawScratchCover();
    attachScratchListeners();
  }

  function resizeScratchCanvas() {
    if (!scratchCanvas || !scratchCtx) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;
    scratchCtx.scale(dpr, dpr);
  }

  function drawScratchCover() {
    if (!scratchCanvas || !scratchCtx) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    scratchCtx.globalCompositeOperation = 'source-over';

    // Rich Assamese Muga-Gold Foil Gradient
    const goldGrad = scratchCtx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, '#c59b27');
    goldGrad.addColorStop(0.3, '#f59e0b');
    goldGrad.addColorStop(0.5, '#fef08a');
    goldGrad.addColorStop(0.7, '#d97706');
    goldGrad.addColorStop(1, '#8c6214');

    scratchCtx.fillStyle = goldGrad;
    scratchCtx.fillRect(0, 0, w, h);

    // Decorative Kingkhap Diamond Watermark Pattern
    scratchCtx.strokeStyle = 'rgba(120, 53, 15, 0.22)';
    scratchCtx.lineWidth = 1.2;
    for (let x = 15; x < w; x += 32) {
      for (let y = 15; y < h; y += 32) {
        scratchCtx.beginPath();
        scratchCtx.moveTo(x, y - 10);
        scratchCtx.lineTo(x + 10, y);
        scratchCtx.lineTo(x, y + 10);
        scratchCtx.lineTo(x - 10, y);
        scratchCtx.closePath();
        scratchCtx.stroke();
      }
    }

    // Border Frame
    scratchCtx.strokeStyle = '#78350f';
    scratchCtx.lineWidth = 3;
    scratchCtx.strokeRect(3, 3, w - 6, h - 6);

    // Text on Cover
    scratchCtx.textAlign = 'center';
    scratchCtx.textBaseline = 'middle';

    const mainTxt = i18n[state.lang].scratchCoverText || 'Scratch to Reveal the Date';
    const subTxt = i18n[state.lang].scratchCoverSub || '';

    scratchCtx.fillStyle = '#4a0d17';
    if (subTxt) {
      scratchCtx.font = 'bold 16px "Tiro Bangla", Georgia, serif';
      scratchCtx.fillText(mainTxt, w / 2, h / 2 - 10);

      scratchCtx.fillStyle = '#7f1d1d';
      scratchCtx.font = '600 12px "Tiro Bangla", Georgia, serif';
      scratchCtx.fillText(subTxt, w / 2, h / 2 + 13);

      scratchCtx.font = '14px serif';
      scratchCtx.fillText('✨', w / 2 - 75, h / 2);
      scratchCtx.fillText('✨', w / 2 + 75, h / 2);
    } else {
      scratchCtx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Georgia, serif';
      scratchCtx.fillText(mainTxt, w / 2, h / 2);

      // Decorative sparkles dynamically offset
      const textMetrics = scratchCtx.measureText(mainTxt);
      const halfWidth = textMetrics.width / 2;
      scratchCtx.font = '13px serif';
      scratchCtx.fillText('✨', Math.max(14, (w / 2) - halfWidth - 16), h / 2);
      scratchCtx.fillText('✨', Math.min(w - 14, (w / 2) + halfWidth + 16), h / 2);
    }

    state.isScratched = false;
    scratchCanvas.style.opacity = '1';
    scratchCanvas.style.pointerEvents = 'auto';

    const badge = document.getElementById('revealed-badge');
    if (badge) badge.style.display = 'none';
  }

  function getScratchCoords(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    let cx, cy;
    if (e.touches && e.touches.length > 0) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    } else {
      cx = e.clientX;
      cy = e.clientY;
    }
    return {
      x: cx - rect.left,
      y: cy - rect.top
    };
  }

  function performScratch(x, y) {
    if (!scratchCtx || state.isScratched) return;

    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 22, 0, Math.PI * 2);
    scratchCtx.fill();

    if (lastScratchPt) {
      scratchCtx.lineWidth = 44;
      scratchCtx.lineCap = 'round';
      scratchCtx.lineJoin = 'round';
      scratchCtx.beginPath();
      scratchCtx.moveTo(lastScratchPt.x, lastScratchPt.y);
      scratchCtx.lineTo(x, y);
      scratchCtx.stroke();
    }
    lastScratchPt = { x, y };

    playScratchSound();

    if (!scratchCheckThrottle) {
      scratchCheckThrottle = setTimeout(() => {
        checkPercentage();
        scratchCheckThrottle = null;
      }, 180);
    }
  }

  function checkPercentage() {
    if (state.isScratched || !scratchCanvas || !scratchCtx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = scratchCanvas.width;
    const h = scratchCanvas.height;
    const imgData = scratchCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let transparentPixels = 0;
    const step = 16 * Math.round(dpr);
    let totalSamples = 0;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const alpha = data[((y * w) + x) * 4 + 3];
        if (alpha < 64) transparentPixels++;
        totalSamples++;
      }
    }

    const ratio = transparentPixels / totalSamples;
    if (ratio > 0.40) {
      revealDatePermanently();
    }
  }

  function revealDatePermanently() {
    state.isScratched = true;
    scratchCanvas.style.transition = 'opacity 0.6s ease';
    scratchCanvas.style.opacity = '0';
    scratchCanvas.style.pointerEvents = 'none';

    const badge = document.getElementById('revealed-badge');
    if (badge) badge.style.display = 'inline-block';

    playAuspiciousChime();
    triggerCelebrationPetals();
  }

  function attachScratchListeners() {
    scratchCanvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      const pt = getScratchCoords(e);
      lastScratchPt = pt;
      performScratch(pt.x, pt.y);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isScratching) return;
      const pt = getScratchCoords(e);
      performScratch(pt.x, pt.y);
    });

    window.addEventListener('mouseup', () => {
      isScratching = false;
      lastScratchPt = null;
    });

    scratchCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isScratching = true;
      const pt = getScratchCoords(e);
      lastScratchPt = pt;
      performScratch(pt.x, pt.y);
    }, { passive: false });

    scratchCanvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isScratching) return;
      const pt = getScratchCoords(e);
      performScratch(pt.x, pt.y);
    }, { passive: false });

    scratchCanvas.addEventListener('touchend', () => {
      isScratching = false;
      lastScratchPt = null;
    });
  }



  // =========================================================================
  // Guest Wishes Wall (Local Storage Persistence)
  // =========================================================================
  const defaultWishes = [];

  function loadWishes() {
    const feed = document.getElementById('wishes-feed');
    if (!feed) return;

    // Purge old default reviews if present in localStorage
    try {
      localStorage.removeItem('rakesh_nandita_wishes');
    } catch (e) {}

    let saved = null;
    try {
      saved = localStorage.getItem('rakesh_nandita_guest_wishes');
    } catch (e) {}

    let list = [];
    if (saved) {
      try { list = JSON.parse(saved); } catch (e) { list = []; }
    }

    feed.innerHTML = '';
    if (!list || list.length === 0) {
      return;
    }

    list.slice().reverse().forEach(w => {
      const bubble = document.createElement('div');
      bubble.className = 'single-wish-bubble';
      bubble.innerHTML = `<div class="wish-sender-name">${escapeHtml(w.name)}</div><div class="wish-message-body">“${escapeHtml(w.msg)}”</div>`;
      feed.appendChild(bubble);
    });
  }

  function addWish(name, msg) {
    if (!name.trim() || !msg.trim()) return;

    let saved = null;
    try {
      saved = localStorage.getItem('rakesh_nandita_guest_wishes');
    } catch (e) {}

    let list = [];
    if (saved) {
      try { list = JSON.parse(saved); } catch (e) { list = []; }
    }

    list.push({ name: name.trim(), msg: msg.trim() });
    try {
      localStorage.setItem('rakesh_nandita_guest_wishes', JSON.stringify(list));
    } catch (e) {}
    loadWishes();
    triggerCelebrationPetals();
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }

  // =========================================================================
  // Digital Shagun 1-Click Copy
  // =========================================================================
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            const original = btn.textContent;
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.textContent = original; }, 1800);
          });
        }
      });
    });
  }

  // =========================================================================
  // Multi-Language Switcher
  // =========================================================================
  function setLanguage(lang) {
    state.lang = lang;
    const dict = i18n[lang];

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Translate dynamic text nodes
    const map = {
      'hero-auspice-tag': dict.auspiciousTag,
      'hero-title-text': dict.heroTitle,
      'hero-sub-text': dict.heroSub,
      'hero-bride-display': dict.heroBride,
      'hero-groom-display': dict.heroGroom,
      'hero-date-pill': dict.heroDatePill,
      'card-bride-name': dict.cardBride,
      'card-groom-name': dict.cardGroom,
      'card-couple-sub': dict.cardCoupleSub,
      'announcement-lead': dict.announcementLead,
      'announcement-line1': dict.announcementLine1,
      'announcement-line2': dict.announcementLine2,
      'announcement-highlight': dict.announcementHighlight,
      'cd-header-text': dict.cdHeader,
      'label-days': dict.days,
      'label-hours': dict.hours,
      'label-mins': dict.mins,
      'label-secs': dict.secs,
      'card-intro': dict.invitationIntro,
      'card-reception': dict.cardReception,
      'timeline-eyebrow': dict.timelineEyebrow,
      'timeline-title': dict.timelineTitle,
      'badge-jurun': dict.badgeJurun,
      'badge-wedding': dict.badgeWedding,
      'badge-reception': dict.badgeReception,
      'jurun-title': dict.jurunTitle,
      'jurun-date': dict.jurunDate,
      'jurun-desc': dict.jurunDesc,
      'wedding-title': dict.weddingTitle,
      'wedding-date': dict.weddingDate,
      'wedding-desc': dict.weddingDesc,
      'reception-title': dict.receptionTitle,
      'reception-date': dict.receptionDate,
      'reception-desc': dict.receptionDesc,
      'scratch-hint-text': dict.scratchHint,
      'scratch-reset-btn': dict.scratchReset,
      'revealed-badge': dict.revealedBadge,
      'gallery-eyebrow': dict.galleryEyebrow,
      'gallery-title': dict.galleryTitle,
      'blessing-invitation-text': dict.blessingInvitationText,
      'blessing-invitation-reminder': dict.blessingInvitationReminder,
      'wishes-eyebrow': dict.wishesEyebrow,
      'wishes-title': dict.wishesTitle,
      'wishes-desc': dict.wishesDesc,
      'submit-wish-btn': dict.submitWishBtn,
      'footer-blessing': dict.footerBlessing,
      'footer-sub': dict.footerSub,
      'venue-iti': dict.venueIti,
      'venue-couple': dict.venueCouple,
      'venue-family': dict.venueFamily,
      'venue-label-baahor': dict.venueLabelBaahor,
      'venue-val-baahor': dict.venueValBaahor,
      'venue-label-address': dict.venueLabelAddress,
      'venue-val-address': dict.venueValAddress,
      'venue-qr-caption': dict.venueQrCaption,
      'whatsapp-share-text': dict.whatsappShareText
    };

    for (const [id, val] of Object.entries(map)) {
      const el = document.getElementById(id);
      if (el) {
        if ((id.includes('title') && val.includes('<em>')) || val.includes('<') || val.includes('&')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    }

    const nameInput = document.getElementById('wish-sender');
    if (nameInput) nameInput.placeholder = dict.wishPlaceholderName;
    const msgInput = document.getElementById('wish-message');
    if (msgInput) msgInput.placeholder = dict.wishPlaceholderMsg;

    document.querySelectorAll('.cal-link-btn span').forEach(el => {
      el.textContent = dict.addToCal;
    });

    if (!state.isScratched) {
      drawScratchCover();
    }
    updateCountdown();
  }

  // =========================================================================
  // Floating Kopou Orchid & Golden Petals Animation
  // =========================================================================
  let petalCanvas, petalCtx, petals = [];
  const petalColors = ['#f472b6', '#ec4899', '#fde047', '#f59e0b', '#fee2e2'];

  function initPetals() {
    petalCanvas = document.getElementById('petals-canvas');
    if (!petalCanvas) return;
    petalCtx = petalCanvas.getContext('2d');

    resizePetalCanvas();
    window.addEventListener('resize', resizePetalCanvas);

    petals = [];
    for (let i = 0; i < 26; i++) {
      petals.push(createPetal());
    }
    requestAnimationFrame(renderPetals);
  }

  function resizePetalCanvas() {
    if (!petalCanvas) return;
    petalCanvas.width = window.innerWidth;
    petalCanvas.height = window.innerHeight;
  }

  function createPetal(customY) {
    return {
      x: Math.random() * window.innerWidth,
      y: customY !== undefined ? customY : Math.random() * window.innerHeight,
      r: 4 + Math.random() * 6,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      speedY: 0.8 + Math.random() * 1.4,
      speedX: (Math.random() - 0.5) * 1.1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2.2,
      tilt: Math.random() * Math.PI,
    };
  }

  function triggerCelebrationPetals() {
    for (let i = 0; i < 45; i++) {
      const p = createPetal(Math.random() * (window.innerHeight * 0.35));
      p.speedY = 2.2 + Math.random() * 3.5;
      petals.push(p);
    }
  }

  function renderPetals() {
    if (!petalCtx || !state.petalsActive) {
      if (petalCtx) petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
      requestAnimationFrame(renderPetals);
      return;
    }

    petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.tilt) * 1.1 + p.speedX;
      p.rotation += p.rotSpeed;
      p.tilt += 0.03;

      if (p.y > petalCanvas.height + 20) {
        petals[i] = createPetal(-20);
      }

      petalCtx.save();
      petalCtx.translate(p.x, p.y);
      petalCtx.rotate((p.rotation * Math.PI) / 180);
      petalCtx.fillStyle = p.color;
      petalCtx.beginPath();
      petalCtx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
      petalCtx.fill();
      petalCtx.restore();
    }

    requestAnimationFrame(renderPetals);
  }

  // =========================================================================
  // Initialize Application
  // =========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    // Language Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Lamp Ceremony
    const lightSakiBtn = document.getElementById('light-saki-btn');
    if (lightSakiBtn) lightSakiBtn.addEventListener('click', toggleLamps);
    document.querySelectorAll('.saki-lamp-unit').forEach(u => {
      u.addEventListener('click', toggleLamps);
    });

    // Music Player
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

    // Petal Toggle
    const petalBtn = document.getElementById('petal-toggle-btn');
    if (petalBtn) {
      petalBtn.addEventListener('click', () => {
        state.petalsActive = !state.petalsActive;
        petalBtn.style.opacity = state.petalsActive ? '1' : '0.5';
      });
    }

    // Scratch Card
    initScratchCard();
    const resetScratchBtn = document.getElementById('scratch-reset-btn');
    if (resetScratchBtn) resetScratchBtn.addEventListener('click', drawScratchCover);
    const scratchBoxWrapper = document.querySelector('.scratch-box-wrapper');
    if (scratchBoxWrapper) {
      scratchBoxWrapper.addEventListener('click', () => {
        if (state.isScratched) drawScratchCover();
      });
    }



    // Wishes Form
    loadWishes();
    const wishForm = document.getElementById('wish-form');
    if (wishForm) {
      wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sender = document.getElementById('wish-sender').value;
        const msg = document.getElementById('wish-message').value;
        addWish(sender, msg);
        wishForm.reset();
      });
    }

    // Digital Shagun copy buttons
    initCopyButtons();

    // Petals particle system
    initPetals();

    // Countdown loop
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize default language
    setLanguage('as');

    // Dynamically update WhatsApp share link
    const waBtn = document.getElementById('whatsapp-share-link');
    if (waBtn) {
      const shareUrl = encodeURIComponent(window.location.href);
      const shareText = encodeURIComponent("🌸 Rakesh & Nandita's Assamese Wedding Invitation 🌸\nWe invite you to celebrate our wedding on 26th November, 2026! Tap to view our invitation:\n");
      waBtn.href = `https://api.whatsapp.com/send?text=${shareText}${shareUrl}`;
    }
  });

  window.addEventListener('resize', () => {
    if (!state.isScratched) {
      resizeScratchCanvas();
      drawScratchCover();
    }
  });

})();

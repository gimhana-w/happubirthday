// Configuration - You can easily edit these details!
const CONFIG = {
  girlfriendName: "My Love", // Replace with her actual name if you like!
};

// DOM Elements
const giftOverlay = document.getElementById("giftOverlay");
const openSurpriseBtn = document.getElementById("openSurpriseBtn");
const mainContainer = document.getElementById("mainContainer");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const discIcon = document.getElementById("discIcon");
const musicStatusText = document.getElementById("musicStatusText");
const birthdayAudio = document.getElementById("birthdayAudio");
const blowCandleBtn = document.getElementById("blowCandleBtn");
const flame = document.getElementById("flame");
const wishMessage = document.getElementById("wishMessage");
const extraConfettiBtn = document.getElementById("extraConfettiBtn");
const userPhotoInput = document.getElementById("userPhotoInput");
const polaroidGrid = document.getElementById("polaroidGrid");
const heartsContainer = document.getElementById("heartsContainer");

let isPlaying = false;
let audioContext = null;
let synthInterval = null;

// Initialize Floating Hearts
function createFloatingHearts() {
  const heartSymbols = ["💖", "💕", "✨", "🌸", "❤️", "🥰"];
  setInterval(() => {
    if (document.hidden) return;
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.fontSize = Math.random() * 14 + 16 + "px";
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 450);
}
createFloatingHearts();

// Confetti Blast Effect
function triggerConfetti(duration = 3000) {
  if (typeof confetti !== "function") return;
  const end = Date.now() + duration;
  const colors = ["#ff5e7e", "#ffb703", "#ff8aa9", "#a82348", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Built-in Synthesizer for "Happy Birthday" Tune (Ensures music always plays even before adding mp3)
function playSynthesizedBirthdaySong() {
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Notes and frequencies for Happy Birthday
  const notes = [
    { freq: 261.63, dur: 0.4 }, // Happy (C4)
    { freq: 261.63, dur: 0.4 }, // Birth- (C4)
    { freq: 293.66, dur: 0.8 }, // day (D4)
    { freq: 261.63, dur: 0.8 }, // to (C4)
    { freq: 349.23, dur: 0.8 }, // you (F4)
    { freq: 329.63, dur: 1.2 }, // (E4)

    { freq: 261.63, dur: 0.4 }, // Happy (C4)
    { freq: 261.63, dur: 0.4 }, // Birth- (C4)
    { freq: 293.66, dur: 0.8 }, // day (D4)
    { freq: 261.63, dur: 0.8 }, // to (C4)
    { freq: 392.00, dur: 0.8 }, // you (G4)
    { freq: 349.23, dur: 1.2 }, // (F4)

    { freq: 261.63, dur: 0.4 }, // Happy (C4)
    { freq: 261.63, dur: 0.4 }, // Birth- (C4)
    { freq: 523.25, dur: 0.8 }, // day (C5)
    { freq: 440.00, dur: 0.8 }, // dear (A4)
    { freq: 349.23, dur: 0.8 }, // (F4)
    { freq: 329.63, dur: 0.8 }, // (E4)
    { freq: 293.66, dur: 1.2 }, // (D4)

    { freq: 466.16, dur: 0.4 }, // Hap- (Bb4)
    { freq: 466.16, dur: 0.4 }, // py (Bb4)
    { freq: 440.00, dur: 0.8 }, // birth- (A4)
    { freq: 349.23, dur: 0.8 }, // day (F4)
    { freq: 392.00, dur: 0.8 }, // to (G4)
    { freq: 349.23, dur: 1.5 }, // you (F4)
  ];

  let currentNote = 0;

  function playNextNote() {
    if (!isPlaying) return;
    if (currentNote >= notes.length) {
      currentNote = 0; // Loop song
    }

    const item = notes[currentNote];
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(item.freq, audioContext.currentTime);

    gain.gain.setValueAtTime(0.18, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + item.dur);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + item.dur);

    currentNote++;
    synthInterval = setTimeout(playNextNote, item.dur * 1000 + 40);
  }

  playNextNote();
}

function stopSynthesizedMusic() {
  if (synthInterval) clearTimeout(synthInterval);
}

// Play / Pause Music Handler
function playMusic() {
  isPlaying = true;
  discIcon.classList.add("playing");
  musicStatusText.textContent = "Playing 🎵";

  // Check if mp3 file exists and can play
  birthdayAudio
    .play()
    .then(() => {
      // Native audio is playing
    })
    .catch(() => {
      // Fallback to cute built-in synth music!
      playSynthesizedBirthdaySong();
    });
}

function pauseMusic() {
  isPlaying = false;
  discIcon.classList.remove("playing");
  musicStatusText.textContent = "Play Music";
  birthdayAudio.pause();
  stopSynthesizedMusic();
}

musicToggleBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// Open Birthday Surprise Button
openSurpriseBtn.addEventListener("click", () => {
  giftOverlay.classList.add("hidden");
  mainContainer.classList.remove("hidden");

  // Trigger celebration effects
  triggerConfetti(4000);
  playMusic();
});

// Make a Wish & Blow Candle
blowCandleBtn.addEventListener("click", () => {
  flame.classList.add("blown-out");
  blowCandleBtn.style.display = "none";
  wishMessage.classList.remove("hidden");

  triggerConfetti(5000);
});

// Extra Confetti Button
extraConfettiBtn.addEventListener("click", () => {
  triggerConfetti(3000);
});

// User Photo Upload Functionality (Add on the fly)
userPhotoInput.addEventListener("change", (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const card = document.createElement("div");
      card.className = "polaroid-card";
      card.innerHTML = `
        <div class="pin">📌</div>
        <div class="photo-box">
          <img src="${event.target.result}" alt="Uploaded Memory ${index + 1}" />
        </div>
        <div class="caption">
          <h3>Unforgettable Moment ❤️</h3>
          <p>Another beautiful memory with you.</p>
        </div>
      `;
      polaroidGrid.appendChild(card);
      triggerConfetti(1000);
    };
    reader.readAsDataURL(file);
  });
});

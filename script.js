// ============================================
// Lock screen validation
// ============================================
const CORRECT_DOB = '2009-07-05'; // YYYY-MM-DD, matches <input type="date">
const CORRECT_NAME = 'minahil';

const lockScreen = document.getElementById('lockScreen');
const lockCard = document.querySelector('.lock-card');
const lockForm = document.getElementById('lockForm');
const dobInput = document.getElementById('dobInput');
const nameInput = document.getElementById('nameInput');
const errorMsg = document.getElementById('errorMsg');
const letter = document.getElementById('letter');

document.body.style.overflow = 'hidden';

lockForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const dobOk = dobInput.value === CORRECT_DOB;
  const nameOk = nameInput.value.trim().toLowerCase() === CORRECT_NAME;

  if (dobOk && nameOk) {
    unlock();
  } else {
    errorMsg.classList.add('show');
    lockCard.classList.remove('shake');
    // restart animation
    void lockCard.offsetWidth;
    lockCard.classList.add('shake');
  }
});

function unlock() {
  lockScreen.classList.add('opened');
  document.body.style.overflow = 'auto';
  spawnBalloons();
  setTimeout(() => {
    letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 400);
}

// ============================================
// Balloons
// ============================================
const balloonsContainer = document.getElementById('balloons');
const balloonColors = ['#c9a24b', '#e3b8b0', '#e3c98a', '#8fae94', '#d68a7a'];

function spawnBalloons() {
  const count = 14;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'balloon';
      const left = Math.random() * 92;
      const duration = 6 + Math.random() * 4;
      const drift = (Math.random() * 80 - 40) + 'px';
      const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      b.style.left = left + 'vw';
      b.style.background = color;
      b.style.setProperty('--drift', drift);
      b.style.animationDuration = duration + 's';
      balloonsContainer.appendChild(b);
      setTimeout(() => b.remove(), duration * 1000 + 500);
    }, i * 180);
  }
}

// ============================================
// Scroll-triggered reveal animations
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach((el) => observer.observe(el));

// ============================================
// Cake candles — click to blow out
// ============================================
const candles = document.querySelectorAll('[data-candle]');
const cakeCaption = document.getElementById('cakeCaption');

candles.forEach((candle) => {
  candle.addEventListener('click', () => {
    if (candle.classList.contains('out')) return;
    candle.classList.add('out');
    checkAllOut();
  });
});

function checkAllOut() {
  const allOut = Array.from(candles).every((c) => c.classList.contains('out'));
  if (allOut) {
    cakeCaption.textContent = 'Every candle out — your wish is on its way ✦';
  }
}

// ============================================
// Wish generator — 10 x 10 x 11 = 1,100 unique combinations
// ============================================
const starters = [
  'Wishing you', 'May this year bring you', 'Sending you',
  "Here's to", 'On this special day, wishing you', 'May your year be filled with',
  "Hoping you're showered with", 'Cheers to a year of', 'May you always have',
  'Wishing you a lifetime of'
];

const middles = [
  'endless laughter', 'quiet, joyful mornings', 'dreams that come true',
  'love that keeps multiplying', 'adventures worth remembering', 'the courage to bloom',
  'peace within the chaos', 'success beyond measure', 'friends who feel like home',
  'moments that take your breath away'
];

const closers = [
  'today and always.', 'starting today.', 'just like you deserve.',
  'because you shine so bright.', '— happy birthday!', 'on this beautiful day.',
  'now and in the years ahead.', 'as you turn a page anew.', 'with all my heart.',
  'and every day after.', 'more than words can say.'
];

const TOTAL_WISHES = starters.length * middles.length * closers.length; // 1,100

const wishText = document.getElementById('wishText');
const wishBtn = document.getElementById('wishBtn');
const wishCounter = document.getElementById('wishCounter');

let wishesGiven = 0;

wishBtn.addEventListener('click', () => {
  const s = starters[Math.floor(Math.random() * starters.length)];
  const m = middles[Math.floor(Math.random() * middles.length)];
  const c = closers[Math.floor(Math.random() * closers.length)];
  const sentence = `${s} ${m}, ${c}`;

  wishText.classList.add('fade');
  setTimeout(() => {
    wishText.textContent = sentence;
    wishText.classList.remove('fade');
  }, 350);

  wishesGiven++;
  wishCounter.textContent = `wish ${wishesGiven} of ${TOTAL_WISHES.toLocaleString()} possible wishes`;
});
    

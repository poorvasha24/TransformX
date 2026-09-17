/**
 * TRANSFORMX Web Audio Procedural Synthesizer
 * Generates robotic servo whirs, metallic clangs, laser blade slashes,
 * transformation effects, and tactical HUD beeps using the browser's Web Audio API.
 */

let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

let bgContextTime = 0;
let bgGain: GainNode | null = null;
let bgSequenceTimer: number | null = null;
let nextNoteTime = 0;
let current16thNote = 0;

// High-Energy Cinematic Background Track
const tempo = 125;
const secondsPerBeat = 60.0 / tempo;
const lookahead = 25.0; // ms
const scheduleAheadTime = 0.1; // s

// Cyberpunk Bassline & Drum Pattern
function scheduleNote(beatNumber: number, time: number, ctx: AudioContext) {
  // 1. Kick Drum (on beats 0, 4, 8, 12 - quarter notes)
  if (beatNumber % 4 === 0) {
    const kickOsc = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kickOsc.type = 'sine';
    kickOsc.frequency.setValueAtTime(120, time);
    kickOsc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    kickGain.gain.setValueAtTime(0.7, time);
    kickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    kickOsc.connect(kickGain);
    kickGain.connect(bgGain!);
    kickOsc.start(time);
    kickOsc.stop(time + 0.5);
  }

  // 2. Snare / Clap (on beats 4, 12 - backbeat)
  if (beatNumber % 8 === 4) {
    const snareBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
    const data = snareBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const snareNoise = ctx.createBufferSource();
    snareNoise.buffer = snareBuffer;
    const snareFilter = ctx.createBiquadFilter();
    snareFilter.type = 'bandpass';
    snareFilter.frequency.value = 1000;
    const snareGain = ctx.createGain();
    snareGain.gain.setValueAtTime(0.3, time);
    snareGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    snareNoise.connect(snareFilter);
    snareFilter.connect(snareGain);
    snareGain.connect(bgGain!);
    snareNoise.start(time);
  }

  // 3. Hi-Hats (every 16th note, slightly accented on offbeats)
  const hatBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
  const data = hatBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const hatNoise = ctx.createBufferSource();
  hatNoise.buffer = hatBuffer;
  const hatFilter = ctx.createBiquadFilter();
  hatFilter.type = 'highpass';
  hatFilter.frequency.value = 5000;
  const hatGain = ctx.createGain();
  hatGain.gain.setValueAtTime(beatNumber % 2 === 0 ? 0.05 : 0.1, time);
  hatGain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
  hatNoise.connect(hatFilter);
  hatFilter.connect(hatGain);
  hatGain.connect(bgGain!);
  hatNoise.start(time);

  // 4. Driving Bassline (Syncopated)
  const bassSequence = [41, 0, 41, 0, 41, 41, 0, 48, 41, 0, 53, 0, 41, 41, 0, 36];
  const bassFreq = bassSequence[beatNumber];
  if (bassFreq > 0) {
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    const bassFilter = ctx.createBiquadFilter();
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.value = bassFreq;
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(100, time);
    bassFilter.frequency.exponentialRampToValueAtTime(800, time + 0.05);
    bassFilter.frequency.exponentialRampToValueAtTime(100, time + 0.2);
    bassFilter.Q.value = 3;
    bassGain.gain.setValueAtTime(0.15, time);
    bassGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(bgGain!);
    bassOsc.start(time);
    bassOsc.stop(time + 0.2);
  }
}

function nextNote() {
  const secondsPerStep = secondsPerBeat / 4;
  nextNoteTime += secondsPerStep;
  current16thNote++;
  if (current16thNote === 16) {
    current16thNote = 0;
  }
}

function scheduler(ctx: AudioContext) {
  while (nextNoteTime < ctx.currentTime + scheduleAheadTime) {
    scheduleNote(current16thNote, nextNoteTime, ctx);
    nextNote();
  }
  bgSequenceTimer = window.setTimeout(() => scheduler(ctx), lookahead);
}

export function setSoundEnabled(enabled: boolean, startBgMusic = true) {
  isSoundEnabled = enabled;
  if (enabled) {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    if (startBgMusic && ctx && bgSequenceTimer === null) {
      startBackgroundMusic();
    }
  } else {
    if (bgGain) {
      // Fade out smoothly
      bgGain.gain.setTargetAtTime(0, audioCtx!.currentTime, 0.5);

      setTimeout(() => {
        if (bgSequenceTimer !== null && !isSoundEnabled) {
          window.clearTimeout(bgSequenceTimer);
          bgSequenceTimer = null;
        }
      }, 2000);
    }
  }
}

export function startBackgroundMusic() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (ctx && bgSequenceTimer === null) {
    bgGain = ctx.createGain();
    bgGain.gain.value = 0; // Start at 0 for fade in
    bgGain.connect(ctx.destination);

    // Fade in smoothly over 2 seconds
    bgGain.gain.setTargetAtTime(0.25, ctx.currentTime, 0.5);

    nextNoteTime = ctx.currentTime + 0.1;
    current16thNote = 0;
    scheduler(ctx);
  }
}

export function getSoundEnabled(): boolean {
  return isSoundEnabled;
}

/**
 * INTRO: 1. Initial Sword Swoosh + Rising Energy Anticipation
 */
export function playIntroSwoosh() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // High-speed air swoosh
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(200, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(3000, now + 0.8);
  noiseFilter.frequency.exponentialRampToValueAtTime(100, now + 1.2);
  noiseFilter.Q.value = 1.5;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.01, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.4, now + 0.8);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);

  // Rising energy tone
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(55, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 1.0);
  oscGain.gain.setValueAtTime(0.01, now);
  oscGain.gain.linearRampToValueAtTime(0.1, now + 0.8);
  oscGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 1.1);
}

/**
 * INTRO: 2. Cinematic Impact + Plasma Laser + Metallic Resonance
 */
export function playIntroImpact() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Cinematic Sub Boom
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(150, now);
  subOsc.frequency.exponentialRampToValueAtTime(20, now + 1.0);
  subGain.gain.setValueAtTime(0.8, now);
  subGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + 1.2);

  // Plasma Laser Streak
  const plasmaOsc = ctx.createOscillator();
  const plasmaGain = ctx.createGain();
  plasmaOsc.type = 'square';
  plasmaOsc.frequency.setValueAtTime(1200, now);
  plasmaOsc.frequency.exponentialRampToValueAtTime(100, now + 0.4);
  plasmaGain.gain.setValueAtTime(0.15, now);
  plasmaGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
  plasmaOsc.connect(plasmaGain);
  plasmaGain.connect(ctx.destination);
  plasmaOsc.start(now);
  plasmaOsc.stop(now + 0.5);

  // Metallic Clang
  const clangOsc = ctx.createOscillator();
  const clangGain = ctx.createGain();
  clangOsc.type = 'triangle';
  clangOsc.frequency.setValueAtTime(800, now);
  clangOsc.frequency.exponentialRampToValueAtTime(300, now + 0.8);
  clangGain.gain.setValueAtTime(0.3, now);
  clangGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
  clangOsc.connect(clangGain);
  clangGain.connect(ctx.destination);
  clangOsc.start(now);
  clangOsc.stop(now + 0.9);
}

/**
 * INTRO: 2.5 Cinematic Procedural Thunder Crash
 */
export function playIntroThunder() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 4.0;

  // 1. White Noise Generator for the Crash
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Generate pink-ish noise (weighted towards lower frequencies)
    data[i] = (Math.random() * 2 - 1) * 0.8 + (Math.random() * 2 - 1) * 0.2;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // 2. Lowpass Filter to muffle it into a rumble
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  // Start with a crack (high frequency), then quickly drop to a rumble (low frequency)
  filter.frequency.setValueAtTime(1500, now);
  filter.frequency.exponentialRampToValueAtTime(100, now + 0.5);
  filter.frequency.linearRampToValueAtTime(40, now + duration);

  // 3. Amplitude Envelope (Sharp attack, long decay)
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(2.0, now + 0.1); // Massive initial crack
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);

  // 4. Add a deep sub-bass boom
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(80, now);
  subOsc.frequency.exponentialRampToValueAtTime(20, now + duration);

  subGain.gain.setValueAtTime(0, now);
  subGain.gain.linearRampToValueAtTime(1.0, now + 0.1);
  subGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);

  subOsc.start(now);
  subOsc.stop(now + duration);
}

/**
 * INTRO: 3. Hydraulic Panel Movement
 */
export function playIntroPanels() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(60, now);
  osc.frequency.linearRampToValueAtTime(40, now + 0.8);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(100, now);
  filter.Q.value = 2.0;

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 1.0);
}

/**
 * INTRO: 4. Epic Reveal Chord
 */
export function playIntroReveal() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chord = [220, 277.18, 329.63, 440]; // A Major chord

  chord.forEach(freq => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.2);
  });
}

function duckBackgroundMusic(duration: number) {
  if (!isSoundEnabled || !bgGain || !audioCtx) return;
  const now = audioCtx.currentTime;
  // Smoothly reduce volume to 30% of its normal max
  bgGain.gain.cancelScheduledValues(now);
  bgGain.gain.setTargetAtTime(0.05, now, 0.1);
  // Restore volume after the sound duration
  bgGain.gain.setTargetAtTime(0.25, now + duration, 0.5);
}

/**
 * Futuristic UI beep for navigation or targeting
 */
export function playUiBeep(freq = 980) {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(0.2);

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

/**
 * Micro hover blip
 */
export function playHover() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.linearRampToValueAtTime(450, now + 0.1);

  gain.gain.setValueAtTime(0.015, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

/**
 * Tactical click switch
 */
export function playClick() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(0.15);

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

/**
 * Navigation target acquired
 */
export function playNavSelect() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(0.4);

  const now = ctx.currentTime;

  // High ping
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.35);

  // Data transmission chirp
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sawtooth';
  osc2.frequency.setValueAtTime(2000, now + 0.05);
  osc2.frequency.exponentialRampToValueAtTime(3000, now + 0.15);
  gain2.gain.setValueAtTime(0.02, now + 0.05);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.05);
  osc2.stop(now + 0.25);
}

/**
 * Theme/Domain Selection (Energetic scan)
 */
export function playThemeSelect() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(0.6);

  const now = ctx.currentTime;

  // Power up
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.6);

  // Digital confirmation ping
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1500, now + 0.2);
  gain2.gain.setValueAtTime(0.08, now + 0.2);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.2);
  osc2.stop(now + 0.5);
}

/**
 * Subtle mechanical panel opening
 */
export function playPanelOpen() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(0.4);

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(150, now);
  filter.frequency.exponentialRampToValueAtTime(800, now + 0.3);
  filter.Q.value = 5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
}

/**
 * Roadmap phase activation
 */
export function playRoadmapActivate() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(0.3);

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.setValueAtTime(600, now + 0.05);
  osc.frequency.setValueAtTime(800, now + 0.1);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.setValueAtTime(0.04, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
}

/**
 * Massive register button click
 */
export function playRegisterClick() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  duckBackgroundMusic(1.0);

  const now = ctx.currentTime;

  // Low end punch
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(120, now);
  subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
  subGain.gain.setValueAtTime(0.15, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + 0.5);

  // Energy charge
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(1500, now + 0.5);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.7);

  // Confirmation ring
  const oscRing = ctx.createOscillator();
  const gainRing = ctx.createGain();
  oscRing.type = 'sine';
  oscRing.frequency.setValueAtTime(1800, now + 0.3);
  gainRing.gain.setValueAtTime(0.1, now + 0.3);
  gainRing.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  oscRing.connect(gainRing);
  gainRing.connect(ctx.destination);
  oscRing.start(now + 0.3);
  oscRing.stop(now + 0.9);
}

/**
 * Carousel subtle mechanical slide
 */
export function playCarouselMove() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.linearRampToValueAtTime(250, now + 0.1);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

/**
 * Robotic Commander dialog voice chirp (Removed per request)
 */
export function playCommanderVoice() {
  return;
}

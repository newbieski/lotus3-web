// Web Audio Manager: Barry Leitch Soundtracks & Synthesized Lotus Twin-Cam Engine Sound
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgm = null;
    this.currentTrack = null;

    // Engine synth nodes
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineGain = null;
    this.distortion = null;

    // Screech synth
    this.screechGain = null;
    this.screechNoise = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.setupEngineSynth();
    this.setupScreechSynth();
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setupEngineSynth() {
    if (!this.ctx) return;

    // Low rumble / twin-cam engine synth
    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc2 = this.ctx.createOscillator();
    this.engineGain = this.ctx.createGain();

    this.engineOsc1.type = 'sawtooth';
    this.engineOsc2.type = 'triangle';

    this.engineOsc1.frequency.setValueAtTime(45, this.ctx.currentTime);
    this.engineOsc2.frequency.setValueAtTime(90, this.ctx.currentTime);

    // Distortion shaper for throaty growl
    this.distortion = this.ctx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(18);

    // Master engine gain
    this.engineGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.engineOsc1.connect(this.distortion);
    this.engineOsc2.connect(this.distortion);
    this.distortion.connect(this.engineGain);
    this.engineGain.connect(this.ctx.destination);

    this.engineOsc1.start();
    this.engineOsc2.start();
  }

  setupScreechSynth() {
    if (!this.ctx) return;

    // White noise generator for tire squeal
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Bandpass filter for screeching rubber
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    this.screechGain = this.ctx.createGain();
    this.screechGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(this.screechGain);
    this.screechGain.connect(this.ctx.destination);

    noiseSource.start();
  }

  makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      let x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Update engine audio according to speed and RPM
  updateEngine(speedRatio, isAccelerating, isBraking, isScreeching) {
    if (!this.ctx || !this.engineGain) return;

    const baseFreq = 40 + speedRatio * 180; // 40 Hz to 220 Hz
    const harmonicFreq = baseFreq * 1.5;

    const now = this.ctx.currentTime;
    this.engineOsc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.engineOsc2.frequency.setTargetAtTime(harmonicFreq, now, 0.05);

    // Dynamic volume
    let vol = 0.05;
    if (isAccelerating) vol += 0.08;
    if (speedRatio > 0.05) vol += speedRatio * 0.06;

    this.engineGain.gain.setTargetAtTime(this.isMuted ? 0 : vol, now, 0.05);

    // Tire squeal gain
    if (this.screechGain) {
      const screechVol = isScreeching ? 0.12 : (isBraking && speedRatio > 0.3 ? 0.08 : 0.0);
      this.screechGain.gain.setTargetAtTime(this.isMuted ? 0 : screechVol, now, 0.04);
    }
  }

  playBGM(trackName = 'forest') {
    if (this.currentTrack === trackName && this.bgm && !this.bgm.paused) return;

    if (this.bgm) {
      this.bgm.pause();
    }

    const audioPath = `assets/audio/${trackName}.mp3`;
    this.bgm = new Audio(audioPath);
    this.bgm.loop = true;
    this.bgm.volume = 0.65;
    this.currentTrack = trackName;

    this.bgm.play().catch(e => {
      console.log('Audio autoplay prevented; waiting for user gesture.');
    });
  }

  playCheckpointChime() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);       // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
    osc.frequency.setValueAtTime(1046.5, now + 0.3); // C6

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgm) {
      this.bgm.muted = this.isMuted;
    }
    return this.isMuted;
  }
}

// Main Entry Point for Lotus 3 Web Engine
import { CONFIG } from './config.js';
import { GameLoop } from './core/loop.js';
import { InputManager } from './core/input.js';
import { AudioManager } from './core/audio.js';
import { SpriteManager } from './engine/sprites.js';
import { Camera } from './engine/camera.js';
import { RoadManager } from './engine/road.js';
import { Renderer } from './engine/renderer.js';
import { Player } from './entities/player.js';
import { RivalManager } from './entities/rivals.js';
import { buildRoadworksTrack } from './tracks/roadworks.js';
import { buildForestTrack } from './tracks/forest.js';
import { buildSnowTrack } from './tracks/snow.js';
import { buildDesertTrack } from './tracks/desert.js';
import { buildNightTrack } from './tracks/night.js';
import { buildStormTrack } from './tracks/storm.js';

class LotusGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = CONFIG.SCREEN_WIDTH;
    this.canvas.height = CONFIG.SCREEN_HEIGHT;

    this.input = new InputManager();
    this.audio = new AudioManager();
    this.sprites = new SpriteManager();
    this.camera = new Camera();
    this.road = new RoadManager();
    this.player = new Player();
    this.rivals = new RivalManager();
    this.renderer = new Renderer(this.canvas);

    this.currentCourseKey = 'roadworks'; // FIRST DEMO STARTS ON ROADWORKS (공사장)!
    this.gameState = 'SPLASH'; // SPLASH, PLAYING, GAMEOVER, FINISHED
    this.loop = new GameLoop(this.update.bind(this), this.render.bind(this));

    this.initListeners();
    this.loop.start();
    this.init();
  }

  startRace() {
    console.log('[Lotus3] startRace called! gameState:', this.gameState);
    if (this.gameState === 'SPLASH') {
      try {
        this.audio.init();
        this.audio.resume();
        this.audio.playBGM('lotus3_radio_mix');
      } catch (e) {
        console.warn('Audio start error:', e);
      }
      this.gameState = 'PLAYING';
      const splashEl = document.getElementById('splashScreen');
      if (splashEl) splashEl.style.display = 'none';
      this.renderer.showBanner(`STAGE: ${this.road.currentCourseName} - GO!`, 2.5, '#00ff66');
    }
  }

  initListeners() {
    window.startGameNow = () => this.startRace();

    const splashEl = document.getElementById('splashScreen');
    if (splashEl) {
      splashEl.addEventListener('click', () => this.startRace());
    }
    this.canvas.addEventListener('click', () => this.startRace());

    window.addEventListener('keydown', (e) => {
      if (this.gameState === 'SPLASH' && (e.code === 'Space' || e.key === ' ' || e.code === 'Enter' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W')) {
        e.preventDefault();
        this.startRace();
      }
    });
  }

  async init() {
    // Build Default Course: ROADWORKS (공사장)
    this.loadTrack(this.currentCourseKey);

    console.log('Loading Lotus 3 assets...');
    await this.sprites.loadAll();
    console.log('Lotus 3 assets loaded successfully.');

    if (window.pendingStart) {
      window.pendingStart = false;
      this.startRace();
    }

    // Mute button
    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        muteBtn.textContent = isMuted ? '🔇 MUTED' : '🔊 SOUND';
      });
    }

    // Radio Tuner button
    const radioBtn = document.getElementById('radioBtn');
    if (radioBtn) {
      radioBtn.addEventListener('click', () => {
        this.tuneNextRadio();
      });
    }

    // Course Selector
    const courseSelect = document.getElementById('courseSelect');
    if (courseSelect) {
      courseSelect.addEventListener('change', (e) => {
        this.loadTrack(e.target.value);
        if (this.gameState === 'PLAYING') {
          this.renderer.showBanner(`STAGE CHANGED: ${this.road.currentCourseName}`, 2.2, '#33ccff');
        }
      });
    }

    // Car Selector
    const carSelect = document.getElementById('carSelect');
    if (carSelect) {
      carSelect.addEventListener('change', (e) => {
        this.player.setCar(e.target.value);
        const name = this.player.carSpecs[e.target.value]?.name || 'LOTUS';
        this.renderer.showBanner(`VEHICLE: ${name}`, 2.0, '#ffaa00');
      });
    }

    // Setup player event callbacks
    this.player.gearShiftCallback = (gear) => {
      this.audio.playGearShift();
      this.renderer.showBanner(`GEAR: ${gear}`, 0.7, '#00ff66');
    };
    this.player.onLandingCallback = () => {
      this.audio.playLandingThud();
      this.renderer.spawnDust(this.canvas.width / 2 + (this.player.steer * 32), this.canvas.height - 25);
    };

    // Touch controls for mobile / tablet
    this.setupTouchControls();
  }

  loadTrack(courseKey) {
    this.currentCourseKey = courseKey;
    this.player.reset();
    this.road.reset();

    if (courseKey === 'roadworks') {
      this.road.currentCourseName = 'ROADWORKS (공사장)';
      buildRoadworksTrack(this.road);
    } else if (courseKey === 'forest') {
      this.road.currentCourseName = 'FOREST (자연풍경 / 숲)';
      buildForestTrack(this.road);
    } else if (courseKey === 'snow') {
      this.road.currentCourseName = 'SNOW BLIZZARD (설원)';
      buildSnowTrack(this.road);
    } else if (courseKey === 'desert') {
      this.road.currentCourseName = 'DESERT CANYON (사막 협곡)';
      buildDesertTrack(this.road);
    } else if (courseKey === 'night') {
      this.road.currentCourseName = 'NIGHT HIGHWAY (야간 고속도로)';
      buildNightTrack(this.road);
    } else if (courseKey === 'storm') {
      this.road.currentCourseName = 'STORM & THUNDER (폭풍우)';
      buildStormTrack(this.road);
    } else {
      this.road.currentCourseName = 'ROADWORKS (공사장)';
      buildRoadworksTrack(this.road);
    }

    this.rivals.init(this.road.segments);
  }

  tuneNextRadio() {
    this.audio.init();
    this.audio.resume();
    const stationName = this.audio.nextStation();
    const radioBtn = document.getElementById('radioBtn');
    if (radioBtn) radioBtn.textContent = `📻 ${stationName}`;
    this.renderer.showBanner(`📻 RADIO: ${stationName}`, 2.2, '#00e676');
  }

  setupTouchControls() {
    const bindBtn = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      const activate = (e) => {
        e.preventDefault();
        this.input.keys[key] = true;
        if (this.gameState === 'SPLASH') {
          this.audio.init();
          this.audio.resume();
          this.audio.playBGM('lotus3_radio_mix');
          this.gameState = 'PLAYING';
          const splashEl = document.getElementById('splashScreen');
          if (splashEl) splashEl.style.display = 'none';
        }
      };
      const deactivate = (e) => {
        e.preventDefault();
        this.input.keys[key] = false;
      };
      el.addEventListener('touchstart', activate, { passive: false });
      el.addEventListener('touchend', deactivate, { passive: false });
      el.addEventListener('mousedown', activate);
      el.addEventListener('mouseup', deactivate);
      el.addEventListener('mouseleave', deactivate);
    };

    bindBtn('btnGas', 'up');
    bindBtn('btnBrake', 'brake');
    bindBtn('btnLeft', 'left');
    bindBtn('btnRight', 'right');
  }

  restart() {
    this.player.reset();
    this.loadTrack(this.currentCourseKey);
    this.gameState = 'PLAYING';
    this.renderer.showBanner(`STAGE: ${this.road.currentCourseName} - GO!`, 2.0, '#00ff66');
  }

  update(dt) {
    this.input.pollGamepad();

    // In-game radio change on key 'R'
    if (this.input.keys.radio) {
      this.input.keys.radio = false;
      this.tuneNextRadio();
    }

    // Transmission mode toggle on key 'G'
    if (this.input.keys.toggleTrans) {
      this.input.keys.toggleTrans = false;
      const mode = this.player.toggleTransmission();
      this.renderer.showBanner(`TRANSMISSION: ${mode}`, 1.2, '#33ccff');
    }

    if (this.gameState === 'FINISHED') {
      // Smoothly coast vehicle down to a stop after finish line
      this.player.speed = Math.max(0, this.player.speed - 3200 * dt);
      this.player.z += this.player.speed * dt;
      this.player.x *= 0.98;
      this.rivals.update(dt, this.road, this.player);
      if (this.input.keys.brake || this.input.keys.up) {
        this.restart();
      }
      return;
    }

    if (this.gameState === 'GAMEOVER') {
      if (this.input.keys.brake || this.input.keys.up) {
        this.restart();
      }
      return;
    }

    if (this.gameState !== 'PLAYING') return;

    // Check game over
    if (this.player.isGameOver) {
      this.gameState = 'GAMEOVER';
      return;
    }

    const currentSegment = this.road.findSegment(this.player.z);

    // Update Player physics
    this.player.update(dt, this.input, currentSegment);

    // Update Rivals
    this.rivals.update(dt, this.road, this.player);

    // Checkpoint & Finish detection
    if (currentSegment.isCheckpoint && this.player.currentCheckpointIndex !== currentSegment.index) {
      this.player.currentCheckpointIndex = currentSegment.index;

      if (currentSegment.timeBonus > 0) {
        this.player.timeRemaining += currentSegment.timeBonus;
        this.audio.playCheckpointChime();
        this.renderer.showBanner(`CHECKPOINT! +${currentSegment.timeBonus} SECONDS`, 2.5, '#ffff00');
      } else {
        this.player.isFinished = true;
        this.gameState = 'FINISHED';
        this.renderer.showBanner('STAGE CLEARED!', 4.0, '#00ff66');
      }
    }

    // Roadside & Track Obstacle Collision (Cones, Barricades, Drums, Oil Slicks, Jump Ramps, Excavators)
    for (let spr of currentSegment.sprites) {
      const segDist = Math.abs((currentSegment.index * CONFIG.SEGMENT_LENGTH) - this.player.z);
      if (segDist < CONFIG.SEGMENT_LENGTH * 0.8) {
        const latDist = Math.abs(this.player.x - spr.offset);
        if (latDist < 0.42) {
          if (spr.key === 'obstacle_cone') {
            if (!spr.hit) {
              spr.hit = true;
              this.player.hitMinorObstacle();
              this.audio.playConeHit();
              this.renderer.spawnDebris(this.canvas.width / 2 + (this.player.steer * 32), this.canvas.height - 70, 'cone');
              this.renderer.showBanner('🚧 CONE HIT!', 0.6, '#ff9900');
            }
          } else if (spr.key === 'obstacle_oil') {
            if (this.player.y < 12 && !this.player.isSpinning) {
              this.player.triggerOilSkid();
              this.audio.playOilSkid();
              this.renderer.showBanner('⚠️ OIL SLICK! SPIN OUT!', 1.2, '#ff33ff');
            }
          } else if (spr.key === 'obstacle_ramp') {
            if (this.player.y < 20) {
              this.player.jump(780);
              this.audio.playJumpWhoosh();
              this.renderer.showBanner('🚀 JUMP RAMP!', 0.9, '#00ffcc');
            }
          } else if (spr.key === 'obstacle_steel_plate') {
            if (this.player.y < 10) {
              this.player.speed *= 0.985;
              this.audio.playConeHit();
            }
          } else if (spr.key === 'obstacle_barricade' || spr.key === 'obstacle_drum' || 
                     spr.key === 'obstacle_excavator' || spr.key === 'obstacle_log' || 
                     spr.key === 'obstacle_rock' || spr.key === 'obstacle_cactus' || 
                     spr.key === 'obstacle_desert_rock' || spr.key === 'lamp_post') {
            if (this.player.y < 25) { // If car jumped high enough, fly over!
              this.player.triggerSpin();
              this.renderer.showBanner('💥 CRASH!', 1.2, '#ff3333');
            }
          }
        }
      }
    }

    // Audio Engine Update
    const speedRatio = this.player.speed / CONFIG.MAX_SPEED;
    const isScreeching = (Math.abs(this.player.steer) > 1.2 && speedRatio > 0.45);
    this.audio.updateEngine(speedRatio, this.input.keys.up, this.player.isBraking, isScreeching);
  }

  render(interp) {
    if (this.gameState === 'SPLASH') {
      this.renderSplash();
      return;
    }

    this.renderer.render(
      this.road,
      this.player,
      this.camera,
      this.sprites,
      this.rivals,
      CONFIG.STEP,
      this.audio
    );
  }

  renderSplash() {
    const ctx = this.canvas.getContext('2d');
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Retro Arcade title screen
    ctx.fillStyle = '#080d16';
    ctx.fillRect(0, 0, w, h);

    // Industrial grid effect
    ctx.strokeStyle = '#162438';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let x = 0; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Lotus III Logo & Title
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 38px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LOTUS III', w / 2, h * 0.28);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText('THE ULTIMATE CHALLENGE', w / 2, h * 0.38);

    // Featured Car: Lotus M200 Speedster preview in center
    const m200Img = this.sprites.get('player_m200_straight');
    if (m200Img) {
      ctx.drawImage(m200Img, (w / 2) - 100, h * 0.44, 200, 100);
    }

    ctx.fillStyle = '#00e676';
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillText('FEATURED: LOTUS M200 SPEEDSTER & ROADWORKS STAGE', w / 2, h * 0.72);

    // Blinking prompt
    if (Math.floor(performance.now() / 400) % 2 === 0) {
      ctx.fillStyle = '#ffdd00';
      ctx.font = 'bold 18px "Courier New", monospace';
      ctx.fillText('PRESS SPACE OR CLICK TO START RACE', w / 2, h * 0.83);
    }

    ctx.fillStyle = '#88a0b8';
    ctx.font = '12px "Courier New", monospace';
    ctx.fillText('Music: Patrick Phelan & Barry Leitch | MS-DOS Authentic Recreation', w / 2, h * 0.94);
    ctx.textAlign = 'start';
  }
}

// Robust bootloader: supports already loaded DOM state in ES modules
function bootLotusGame() {
  if (!window.lotusGame) {
    console.log('[Lotus3] Instantiating LotusGame...');
    window.lotusGame = new LotusGame();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootLotusGame);
} else {
  bootLotusGame();
}

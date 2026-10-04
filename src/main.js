// Main Entry Point for Lotus 2 Web Engine
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
import { buildForestTrack } from './tracks/forest.js';

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

    this.gameState = 'SPLASH'; // SPLASH, PLAYING, GAMEOVER, FINISHED
    this.loop = new GameLoop(this.update.bind(this), this.render.bind(this));

    this.init();
  }

  async init() {
    console.log('Loading Lotus 2 sprites and assets...');
    await this.sprites.loadAll();
    console.log('Sprites loaded successfully.');

    // Build Forest Stage
    buildForestTrack(this.road);
    this.rivals.init(this.road.segments);

    // Setup Start Overlay click / keypress listener
    const splashEl = document.getElementById('splashScreen');
    const startAction = () => {
      if (this.gameState === 'SPLASH') {
        this.audio.init();
        this.audio.resume();
        this.audio.playBGM('forest');
        this.gameState = 'PLAYING';
        if (splashEl) splashEl.style.display = 'none';
        this.renderer.showBanner('STAGE 1: FOREST - GO!', 2.5, '#00ff66');
      }
    };

    if (splashEl) {
      splashEl.addEventListener('click', startAction);
    }
    window.addEventListener('keydown', (e) => {
      if (this.gameState === 'SPLASH' && (e.code === 'Space' || e.code === 'Enter')) {
        startAction();
      }
    });

    // Mute button
    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        muteBtn.textContent = isMuted ? '🔇 MUTED' : '🔊 SOUND';
      });
    }

    // Touch controls for mobile / tablet
    this.setupTouchControls();

    this.loop.start();
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
          this.audio.playBGM('forest');
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
    this.road.reset();
    buildForestTrack(this.road);
    this.rivals.init(this.road.segments);
    this.gameState = 'PLAYING';
    this.renderer.showBanner('STAGE 1: FOREST - GO!', 2.0, '#00ff66');
  }

  update(dt) {
    this.input.pollGamepad();

    if (this.gameState === 'GAMEOVER' || this.gameState === 'FINISHED') {
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
        // Checkpoint reached
        this.player.timeRemaining += currentSegment.timeBonus;
        this.audio.playCheckpointChime();
        this.renderer.showBanner(`CHECKPOINT! +${currentSegment.timeBonus} SECONDS`, 2.5, '#ffff00');
      } else {
        // Finish Line reached!
        this.player.isFinished = true;
        this.gameState = 'FINISHED';
        this.renderer.showBanner('STAGE CLEARED!', 4.0, '#00ff66');
      }
    }

    // Roadside Obstacle Collision (Logs, Rocks)
    for (let spr of currentSegment.sprites) {
      if (spr.key === 'obstacle_log' || spr.key === 'obstacle_rock') {
        const segDist = Math.abs((currentSegment.index * CONFIG.SEGMENT_LENGTH) - this.player.z);
        if (segDist < CONFIG.SEGMENT_LENGTH * 0.8) {
          const latDist = Math.abs(this.player.x - spr.offset);
          if (latDist < 0.35) {
            // Hit obstacle!
            this.player.triggerSpin();
            this.renderer.showBanner('CRASH!', 1.2, '#ff3333');
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
      CONFIG.STEP
    );
  }

  renderSplash() {
    const ctx = this.canvas.getContext('2d');
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Retro Arcade title screen
    ctx.fillStyle = '#0a101f';
    ctx.fillRect(0, 0, w, h);

    // Grid effect
    ctx.strokeStyle = '#183050';
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

    // Lotus Logo & Title
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 36px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LOTUS 2', w / 2, h * 0.32);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText('TURBO CHALLENGE', w / 2, h * 0.42);

    // Car sprite preview in center
    const carImg = this.sprites.get('player_straight');
    if (carImg) {
      ctx.drawImage(carImg, (w / 2) - 100, h * 0.48, 200, 100);
    }

    // Blinking "PRESS SPACE OR CLICK TO START"
    if (Math.floor(performance.now() / 400) % 2 === 0) {
      ctx.fillStyle = '#00ff88';
      ctx.font = 'bold 18px "Courier New", monospace';
      ctx.fillText('PRESS SPACE OR CLICK TO RACE', w / 2, h * 0.82);
    }

    ctx.fillStyle = '#88a0b8';
    ctx.font = '13px "Courier New", monospace';
    ctx.fillText('Original Music: Barry Leitch | Web Port Engine v1.0', w / 2, h * 0.94);
    ctx.textAlign = 'start';
  }
}

// Boot game on window load
window.addEventListener('DOMContentLoaded', () => {
  window.lotusGame = new LotusGame();
});

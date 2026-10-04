// Player Entity: Lotus Elan SE Physics & State
import { CONFIG } from '../config.js';

export class Player {
  constructor() {
    this.selectedCar = 'm200'; // Default Lotus 3 hero car: M200 Speedster
    this.carSpecs = {
      m200:   { name: 'LOTUS M200',   topSpeedMph: 152, accelMult: 1.15, steerMult: 1.1 },
      esprit: { name: 'LOTUS ESPRIT', topSpeedMph: 156, accelMult: 1.25, steerMult: 0.95 },
      elan:   { name: 'LOTUS ELAN',   topSpeedMph: 142, accelMult: 1.0,  steerMult: 1.15 }
    };
    this.reset();
  }

  setCar(carKey) {
    if (this.carSpecs[carKey]) {
      this.selectedCar = carKey;
    }
  }

  reset() {
    this.x = 0;          // -1 (left shoulder) to +1 (right shoulder)
    this.y = 0;          // Height above ground
    this.z = 0;          // Distance along track
    this.speed = 0;      // Current speed (0 - CONFIG.MAX_SPEED)
    this.steer = 0;      // Current steering angle
    this.isBraking = false;
    this.isOffroad = false;
    this.isSpinning = false;
    this.spinTimer = 0;
    this.lapTime = 0;
    this.timeRemaining = 60; // Initial race countdown
    this.isGameOver = false;
    this.isFinished = false;
    this.currentCheckpointIndex = -1;
  }

  update(dt, input, currentSegment) {
    if (this.isGameOver) return;

    this.lapTime += dt;
    this.timeRemaining -= dt;
    if (this.timeRemaining <= 0) {
      this.timeRemaining = 0;
      this.isGameOver = true;
    }

    // Spin recovery
    if (this.isSpinning) {
      this.spinTimer -= dt;
      this.speed = Math.max(0, this.speed - CONFIG.DECEL_OFFROAD * 2 * dt);
      if (this.spinTimer <= 0) {
        this.isSpinning = false;
      }
      this.z += this.speed * dt;
      return;
    }

    // Off-road check
    this.isOffroad = (this.x < -1.0 || this.x > 1.0);

    // Acceleration & Braking
    this.isBraking = input.keys.down || input.keys.brake;

    if (input.keys.up) {
      if (this.speed < CONFIG.MAX_SPEED) {
        this.speed += CONFIG.ACCEL * dt;
      }
    } else if (this.isBraking) {
      this.speed += CONFIG.BREAKING * dt;
    } else {
      // Natural rolling deceleration
      this.speed += CONFIG.DECEL_NATURAL * dt;
    }

    // Off-road penalty
    if (this.isOffroad) {
      this.speed += CONFIG.DECEL_OFFROAD * dt;
      // Cap offroad top speed
      if (this.speed > CONFIG.MAX_SPEED * 0.35) {
        this.speed = Math.max(CONFIG.MAX_SPEED * 0.35, this.speed + CONFIG.DECEL_OFFROAD * dt);
      }
    }

    // Clamp speed
    this.speed = Math.max(0, Math.min(this.speed, CONFIG.MAX_SPEED));

    // Steering
    const speedRatio = this.speed / CONFIG.MAX_SPEED;
    let steerDelta = 0;

    if (input.keys.left) {
      steerDelta = -CONFIG.STEER_SPEED * dt * (0.3 + 0.7 * speedRatio);
      this.steer = Math.max(-2, this.steer - 6 * dt);
    } else if (input.keys.right) {
      steerDelta = CONFIG.STEER_SPEED * dt * (0.3 + 0.7 * speedRatio);
      this.steer = Math.min(2, this.steer + 6 * dt);
    } else {
      // Return steering to center
      if (this.steer > 0) this.steer = Math.max(0, this.steer - 8 * dt);
      else if (this.steer < 0) this.steer = Math.min(0, this.steer + 8 * dt);
    }

    this.x += steerDelta;

    // Centrifugal force from road curve
    if (currentSegment && currentSegment.curve) {
      const centrifugalForce = (speedRatio * speedRatio) * currentSegment.curve * CONFIG.CENTRIFUGAL * dt;
      this.x -= centrifugalForce;
    }

    // Update forward position
    this.z += this.speed * dt;

    // Boundary limit
    this.x = Math.max(-2.4, Math.min(2.4, this.x));
  }

  triggerSpin() {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.spinTimer = 1.0;
      this.speed *= 0.3;
    }
  }

  hitMinorObstacle() {
    // Traffic cone knocked over
    this.speed *= 0.92;
    this.steer += (Math.random() > 0.5 ? 0.3 : -0.3);
  }

  getSpeedMph() {
    const spec = this.carSpecs[this.selectedCar] || this.carSpecs.m200;
    return Math.round((this.speed / CONFIG.MAX_SPEED) * spec.topSpeedMph);
  }

  getRPM() {
    const ratio = this.speed / CONFIG.MAX_SPEED;
    return Math.round(1200 + ratio * 6800); // 1200 - 8000 RPM
  }

  // Get active sprite key based on steering angle, slope, braking, and selectedCar
  getSpriteKey(isUphill = false) {
    let steerSuffix = 'straight';
    if (this.steer < -1.2) steerSuffix = 'hard_left';
    else if (this.steer < -0.3) steerSuffix = 'left';
    else if (this.steer > 1.2) steerSuffix = 'hard_right';
    else if (this.steer > 0.3) steerSuffix = 'right';

    const mod = this.isBraking ? '_brake' : (isUphill ? '_up' : '');
    
    if (this.selectedCar === 'elan') {
      return `player_${steerSuffix}${mod}`;
    } else {
      return `player_${this.selectedCar}_${steerSuffix}${mod}`;
    }
  }
}

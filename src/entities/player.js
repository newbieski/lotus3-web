// Player Entity: Lotus Elan SE Physics & State
import { CONFIG } from '../config.js';

export class Player {
  constructor() {
    this.reset();
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

  getSpeedMph() {
    return Math.round((this.speed / CONFIG.MAX_SPEED) * 142); // 142 MPH top speed
  }

  getRPM() {
    const ratio = this.speed / CONFIG.MAX_SPEED;
    return Math.round(1200 + ratio * 6800); // 1200 - 8000 RPM
  }

  // Get active sprite key based on steering angle, slope, braking
  getSpriteKey(isUphill = false) {
    let steerSuffix = 'straight';
    if (this.steer < -1.2) steerSuffix = 'hard_left';
    else if (this.steer < -0.3) steerSuffix = 'left';
    else if (this.steer > 1.2) steerSuffix = 'hard_right';
    else if (this.steer > 0.3) steerSuffix = 'right';

    if (this.isBraking) {
      return `player_${steerSuffix}_brake`;
    }
    if (isUphill) {
      return `player_${steerSuffix}_up`;
    }
    return `player_${steerSuffix}`;
  }
}

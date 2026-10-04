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
    this.y = 0;          // Height above ground (Jump offset)
    this.vy = 0;         // Vertical velocity
    this.isJumping = false;
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
    this.topSpeedReached = 0;
    this.checkpointsCleared = 0;
    this.bonusTimeAccumulated = 0;

    // Transmission & Gear system (Lotus authentic Low/High)
    this.transmissionMode = 'AUTO'; // 'AUTO' or 'MANUAL'
    this.gear = 'LOW';              // 'LOW' or 'HIGH'
    this.gearShiftCallback = null;
    this.onLandingCallback = null;
    this.prevGearKeyPressed = false;
  }

  toggleTransmission() {
    this.transmissionMode = (this.transmissionMode === 'AUTO') ? 'MANUAL' : 'AUTO';
    return this.transmissionMode;
  }

  shiftGear(newGear) {
    if (this.gear !== newGear) {
      this.gear = newGear;
      if (this.gearShiftCallback) this.gearShiftCallback(this.gear);
    }
  }

  jump(power = 750) {
    if (!this.isJumping) {
      this.isJumping = true;
      this.vy = power;
    }
  }

  triggerOilSkid() {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.spinTimer = 1.1;
      this.steer = (Math.random() > 0.5 ? 2.6 : -2.6);
      this.speed *= 0.65;
    }
  }

  update(dt, input, currentSegment) {
    if (this.isGameOver) return;

    this.lapTime += dt;
    this.timeRemaining -= dt;
    if (this.timeRemaining <= 0) {
      this.timeRemaining = 0;
      this.isGameOver = true;
    }

    // 1. Jump Physics
    if (this.isJumping) {
      this.y += this.vy * dt;
      this.vy -= 1600 * dt; // Gravity
      if (this.y <= 0) {
        this.y = 0;
        this.vy = 0;
        this.isJumping = false;
        if (this.onLandingCallback) this.onLandingCallback();
      }
    }

    // 2. Manual Gear shift input
    if (input.keys.gear && !this.prevGearKeyPressed) {
      this.shiftGear(this.gear === 'LOW' ? 'HIGH' : 'LOW');
      this.transmissionMode = 'MANUAL';
    }
    this.prevGearKeyPressed = !!input.keys.gear;

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

    // Automatic transmission logic
    const currentSpeedRatio = this.speed / CONFIG.MAX_SPEED;
    if (this.transmissionMode === 'AUTO') {
      if (this.gear === 'LOW' && currentSpeedRatio > 0.44) {
        this.shiftGear('HIGH');
      } else if (this.gear === 'HIGH' && currentSpeedRatio < 0.36) {
        this.shiftGear('LOW');
      }
    }

    // Acceleration & Braking with Gear ratio dynamics
    const spec = this.carSpecs[this.selectedCar] || this.carSpecs.m200;
    this.isBraking = input.keys.down || input.keys.brake;

    if (input.keys.up) {
      let gearAccel = 1.0;
      let gearMaxSpeed = CONFIG.MAX_SPEED * (spec.topSpeedMph / 152);

      if (this.gear === 'LOW') {
        gearAccel = 1.45 * spec.accelMult;
        gearMaxSpeed = CONFIG.MAX_SPEED * 0.48; // Max ~125 km/h in Low
        if (this.speed >= gearMaxSpeed) {
          // Rev limiter bounce
          this.speed = gearMaxSpeed + (Math.random() * 20 - 10);
        } else {
          this.speed += CONFIG.ACCEL * gearAccel * dt;
        }
      } else {
        // High gear: sluggish at standstill, powerful at mid-high speed
        const lowEndPenalty = currentSpeedRatio < 0.35 ? 0.65 : 1.05;
        gearAccel = lowEndPenalty * spec.accelMult;
        if (this.speed < gearMaxSpeed) {
          this.speed += CONFIG.ACCEL * gearAccel * dt;
        }
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
      if (this.speed > CONFIG.MAX_SPEED * 0.35) {
        this.speed = Math.max(CONFIG.MAX_SPEED * 0.35, this.speed + CONFIG.DECEL_OFFROAD * dt);
      }
    }

    // Clamp speed
    this.speed = Math.max(0, Math.min(this.speed, CONFIG.MAX_SPEED * 1.1));
    if (this.speed > this.topSpeedReached) {
      this.topSpeedReached = this.speed;
    }

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
    if (this.gear === 'LOW') {
      const lowRatio = Math.min(1.0, ratio / 0.45);
      return Math.round(1200 + lowRatio * 6600);
    } else {
      const highRatio = Math.max(0, (ratio - 0.35) / 0.65);
      return Math.round(3400 + Math.min(1.0, highRatio) * 4400);
    }
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

// Rival AI Cars: Other racers on the track
import { CONFIG } from '../config.js';

export class RivalManager {
  constructor() {
    this.cars = [];
  }

  init(roadSegments) {
    this.cars = [];
    const colors = ['red', 'yellow', 'blue', 'white'];
    const totalSegments = roadSegments.length;

    // Distribute rival cars along track
    const spawnDistances = [80, 160, 260, 420, 600, 750, 950, 1100, 1300];

    spawnDistances.forEach((segIndex, i) => {
      const color = colors[i % colors.length];
      const laneOffset = (i % 2 === 0 ? -0.5 : 0.5) + (Math.random() * 0.2 - 0.1);
      const speed = CONFIG.MAX_SPEED * (0.65 + Math.random() * 0.22);

      this.cars.push({
        id: i,
        color: color,
        offset: laneOffset,
        z: segIndex * CONFIG.SEGMENT_LENGTH,
        speed: speed,
        percent: 0,
        steer: 0
      });
    });
  }

  update(dt, road, player) {
    const trackLength = road.trackLength;

    for (let car of this.cars) {
      const oldSegment = road.findSegment(car.z);
      car.z += car.speed * dt;
      if (car.z >= trackLength) {
        car.z -= trackLength;
      }
      const newSegment = road.findSegment(car.z);

      // AI slight lane wander & curve reaction
      if (newSegment.curve !== 0) {
        car.steer = newSegment.curve > 0 ? 1 : -1;
      } else {
        car.steer = 0;
      }

      // Remove car from old segment and add to new
      if (oldSegment !== newSegment) {
        const idx = oldSegment.cars.indexOf(car);
        if (idx !== -1) oldSegment.cars.splice(idx, 1);
        newSegment.cars.push(car);
      }

      // Check collision with player
      const distZ = Math.abs(car.z - player.z);
      if (distZ < CONFIG.SEGMENT_LENGTH * 1.5) {
        const diffX = Math.abs(car.offset - player.x);
        if (diffX < 0.45) {
          // Bump collision!
          if (player.speed > car.speed) {
            player.speed = car.speed * 0.85;
          }
          // Push player sideways
          player.x += (player.x > car.offset ? 0.2 : -0.2);
        }
      }
    }
  }

  getSpriteKey(car) {
    let s = 'straight';
    if (car.steer < 0) s = 'left';
    else if (car.steer > 0) s = 'right';
    return `rival_${car.color}_${s}`;
  }
}

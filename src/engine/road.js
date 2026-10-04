// Road Track Architecture & Segment Builder
import { CONFIG } from '../config.js';

export class RoadManager {
  constructor() {
    this.segments = [];
    this.trackLength = 0;
    this.checkpoints = [];
  }

  reset() {
    this.segments = [];
    this.checkpoints = [];
    this.trackLength = 0;
    this.theme = null;
  }

  addSegment(curve, y) {
    const n = this.segments.length;
    const isDark = Math.floor(n / CONFIG.RUMBLE_LENGTH) % 2 === 0;

    const theme = this.theme || {};
    const roadDark = theme.roadDark || CONFIG.COLORS.ROAD_DARK;
    const roadLight = theme.roadLight || CONFIG.COLORS.ROAD_LIGHT;
    const rumbleDark = theme.rumbleDark || CONFIG.COLORS.RUMBLE_DARK;
    const rumbleLight = theme.rumbleLight || CONFIG.COLORS.RUMBLE_LIGHT;
    const grassDark = theme.grassDark || CONFIG.COLORS.GRASS_DARK;
    const grassLight = theme.grassLight || CONFIG.COLORS.GRASS_LIGHT;
    const laneCol = theme.lane !== undefined ? theme.lane : CONFIG.COLORS.LANE_LINE;

    this.segments.push({
      index: n,
      p1: {
        world: { x: 0, y: this.lastY(), z: n * CONFIG.SEGMENT_LENGTH },
        camera: {},
        screen: {}
      },
      p2: {
        world: { x: 0, y: y, z: (n + 1) * CONFIG.SEGMENT_LENGTH },
        camera: {},
        screen: {}
      },
      curve: curve,
      sprites: [],
      cars: [],
      color: {
        road: isDark ? roadDark : roadLight,
        rumble: isDark ? rumbleDark : rumbleLight,
        grass: isDark ? grassDark : grassLight,
        lane: isDark ? laneCol : null
      },
      fog: 0,
      clip: 0
    });
  }

  lastY() {
    return (this.segments.length === 0) ? 0 : this.segments[this.segments.length - 1].p2.world.y;
  }

  addRoad(enter, hold, leave, curve, y) {
    const startY = this.lastY();
    const endY = startY + (Math.floor(y) * CONFIG.SEGMENT_LENGTH);
    const total = enter + hold + leave;

    for (let n = 0; n < enter; n++) {
      this.addSegment(
        this.easeIn(0, curve, n / enter),
        this.easeInOut(startY, endY, n / total)
      );
    }
    for (let n = 0; n < hold; n++) {
      this.addSegment(
        curve,
        this.easeInOut(startY, endY, (enter + n) / total)
      );
    }
    for (let n = 0; n < leave; n++) {
      this.addSegment(
        this.easeInOut(curve, 0, n / leave),
        this.easeInOut(startY, endY, (enter + hold + n) / total)
      );
    }
  }

  // Smooth easing helpers
  easeIn(a, b, percent) {
    return a + (b - a) * Math.pow(percent, 2);
  }

  easeOut(a, b, percent) {
    return a + (b - a) * (1 - Math.pow(1 - percent, 2));
  }

  easeInOut(a, b, percent) {
    return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
  }

  // Track builders
  addStraight(num = 50) {
    this.addRoad(num, num, num, 0, 0);
  }

  addCurve(num = 50, curve = 2, y = 0) {
    this.addRoad(num, num, num, curve, y);
  }

  addHill(num = 50, y = 30) {
    this.addRoad(num, num, num, 0, y);
  }

  addSprite(n, spriteKey, offset) {
    if (this.segments[n]) {
      this.segments[n].sprites.push({ key: spriteKey, offset: offset });
    }
  }

  addCheckpoint(n, timeBonus = 45) {
    if (this.segments[n]) {
      this.segments[n].isCheckpoint = true;
      this.segments[n].timeBonus = timeBonus;
      // Authentic Lotus 3: Checkpoint markers on the road shoulders (never blocking the driving lanes!)
      this.addSprite(n, 'sign_chevron_left', -1.35);
      this.addSprite(n, 'sign_chevron_right', 1.35);
      if (timeBonus === 0) {
        // Mark finish line checkered grid across 4 segments
        for (let i = Math.max(0, n - 3); i <= n; i++) {
          this.segments[i].isFinishLine = true;
        }
      }
      this.checkpoints.push({ index: n, z: n * CONFIG.SEGMENT_LENGTH, timeBonus });
    }
  }

  markCheckpoint(timeBonus = 45) {
    const idx = this.segments.length - 1;
    if (idx >= 0) {
      this.addCheckpoint(idx, timeBonus);
    }
  }

  markFinish() {
    const idx = this.segments.length - 1;
    if (idx >= 0) {
      this.addCheckpoint(idx, 0);
    }
  }

  finishBuilding() {
    this.trackLength = this.segments.length * CONFIG.SEGMENT_LENGTH;
    const lastIdx = this.segments.length - 1;
    if (lastIdx > 0 && !this.checkpoints.some(c => c.timeBonus === 0)) {
      this.addCheckpoint(lastIdx, 0);
    }
  }

  findSegment(z) {
    return this.segments[Math.floor(z / CONFIG.SEGMENT_LENGTH) % this.segments.length];
  }
}

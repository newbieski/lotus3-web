// Track: Roadworks Course (도로 공사장 맵 - Lotus 3 Authentic Stage)
import { CONFIG } from '../config.js';

export function buildRoadworksTrack(road) {
  road.reset();

  // Set Roadworks specific theme colors
  road.theme = {
    sky: 'bg_roadworks_sky',
    skyline: 'bg_roadworks_skyline',
    grassDark: '#3e342c',    // Dusty dirt/gravel
    grassLight: '#4d4238',
    roadDark: '#36383c',
    roadLight: '#404248',
    rumbleDark: '#111111',   // Hazard black
    rumbleLight: '#ffcc00'   // Hazard construction yellow
  };

  // 1. Starting straight through construction perimeter
  road.addStraight(35);
  road.addSprite(5, 'gantry_start', 0); // Start Banner overhead

  // Initial warning signs and construction drums along roadside
  for (let n = 10; n < 35; n += 5) {
    road.addSprite(n, 'obstacle_drum', -1.5);
    road.addSprite(n, 'obstacle_drum', 1.5);
    if (n === 20) road.addSprite(n, 'sign_roadworks', 1.6);
  }

  // 2. FIRST CONSTRUCTION ZONE: Road narrows on Right! (차선 축소 구간)
  // Warning signs before roadworks zone
  road.addSprite(32, 'sign_roadworks', 1.3);
  road.addSprite(34, 'sign_chevron_left', 1.3);

  // Gentle left curve with right lane blocked by construction barricades and cones
  road.addCurve(40, -1.8, 0);
  for (let n = 35; n < 75; n += 2) {
    // Row of orange traffic cones tapering inwards from right edge to center
    const coneOffset = 1.0 - (Math.min(n - 35, 10) / 10) * 0.7; // narrows into right lane (x=0.3)
    road.addSprite(n, 'obstacle_cone', coneOffset);

    if (n % 6 === 0) {
      road.addSprite(n, 'obstacle_barricade', coneOffset + 0.35);
      road.addSprite(n, 'obstacle_drum', 1.6);
    }
  }

  // 3. High-speed section between excavation sites
  road.addStraight(40);
  for (let n = 75; n < 115; n += 5) {
    if (n % 10 === 0) road.addSprite(n, 'obstacle_cone', (n % 20 === 0 ? -0.5 : 0.5));
    road.addSprite(n, 'obstacle_drum', (n % 2 === 0 ? 1.5 : -1.5));
  }

  // 4. CHECKPOINT 1
  road.addCheckpoint(130, 45); // Checkpoint 1

  // 5. SECOND CONSTRUCTION ZONE: S-Curves with Left Lane Closed!
  road.addSprite(138, 'sign_roadworks', -1.3);
  road.addSprite(142, 'sign_chevron_right', -1.3);

  // Sharp S-curves with hills
  road.addCurve(45, 3.2, 30);  // Uphill right
  road.addCurve(45, -3.2, -30); // Downhill left

  // Block left lane with barricades & cones
  for (let n = 145; n < 235; n += 3) {
    const coneOffset = -1.0 + (Math.min(n - 145, 12) / 12) * 0.7; // narrows from -1.0 to -0.3
    road.addSprite(n, 'obstacle_cone', coneOffset);
    if (n % 6 === 0) {
      road.addSprite(n, 'obstacle_barricade', coneOffset - 0.35);
    }
    road.addSprite(n, 'obstacle_drum', 1.5 + (Math.random() * 0.3));
  }

  // 6. High Elevation Overpass Bridge
  road.addHill(35, 50);
  road.addStraight(30);
  road.addHill(35, -50);

  for (let n = 235; n < 335; n += 6) {
    if (n === 270) road.addSprite(n, 'obstacle_cone', 0.0); // Center pylon
    if (n === 300) road.addSprite(n, 'obstacle_cone', -0.4);
    road.addSprite(n, 'obstacle_drum', -1.5);
    road.addSprite(n, 'obstacle_drum', 1.5);
  }

  // 7. CHECKPOINT 2
  road.addCheckpoint(360, 40); // Checkpoint 2

  // 8. FINAL SPRINT: Slalom through slalom cones towards Finish Line!
  road.addCurve(40, -2.2, 10);
  road.addCurve(40, 2.2, -10);
  road.addStraight(40);

  for (let n = 370; n < 480; n += 5) {
    // Alternating cones for thrilling slalom racing
    if (n % 10 === 0) {
      road.addSprite(n, 'obstacle_cone', (n % 20 === 0 ? 0.35 : -0.35));
    }
    road.addSprite(n, 'obstacle_drum', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // Finish Line Gantry
  road.addCheckpoint(500, 0); // FINISH LINE
  road.addSprite(500, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Roadworks track built: ${road.segments.length} segments (${road.trackLength} units)`);
}

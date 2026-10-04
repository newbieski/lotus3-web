// Track: Desert Canyon Course (사막 협곡 - Authentic Lotus 3 Desert Stage)
import { CONFIG } from '../config.js';

export function buildDesertTrack(road) {
  road.reset();

  // Authentic Lotus 3 Desert Theme: Scorching sunset, Red Canyon Mesas, Golden Sand
  road.theme = {
    sky: 'bg_desert_sky',
    skyline: 'bg_desert_mountains',
    grassDark: '#9e622b',    // Scorched red-gold sand
    grassLight: '#b87635',   // Sunlit desert dunes
    roadDark: '#46423d',     // Sun-baked cracked asphalt
    roadLight: '#524e48',
    rumbleDark: '#2a1a0c',   // Dark sandstone
    rumbleLight: '#e0a830',  // Ochre Yellow
    lane: '#f0e0b0'
  };

  // 1. Starting straight across flat salt flat desert
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner

  for (let n = 10; n < 40; n += 5) {
    road.addSprite(n, 'obstacle_cactus', -1.7 - Math.random() * 1.5);
    road.addSprite(n, 'obstacle_cactus', 1.7 + Math.random() * 1.5);
    if (n === 25) road.addSprite(n, 'obstacle_desert_rock', -1.4);
  }

  // 2. High-speed sweep through canyon gorge
  road.addCurve(45, 2.5, 10);
  for (let n = 40; n < 140; n += 6) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6) + Math.random());
    if (n === 75) road.addSprite(n, 'obstacle_desert_rock', 0.65);
    if (n === 110) road.addSprite(n, 'obstacle_desert_rock', -0.65);
  }

  // 3. Canyon Gully Jump Ramp! (Stunt across canyon gap)
  road.addHill(30, 45);
  road.addSprite(150, 'obstacle_ramp', 0.0); // Center ramp
  road.addHill(30, -45);

  // 4. CHECKPOINT 1 (+45 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(180, 45);

  // 5. Mesa S-Curves with red sandstone rock obstacles
  road.addCurve(45, -3.5, 25);
  road.addCurve(45, 3.5, -25);

  for (let n = 185; n < 310; n += 7) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.7 : -1.7));
    if (n === 220) road.addSprite(n, 'obstacle_desert_rock', -0.6);
    if (n === 270) road.addSprite(n, 'obstacle_desert_rock', 0.6);
  }

  // 6. Fast Desert Straightaway & Stunt Ramp
  road.addStraight(50);
  road.addSprite(330, 'obstacle_ramp', -0.3);
  road.addSprite(340, 'obstacle_desert_rock', -0.3); // Jump right over the rock!

  // 7. CHECKPOINT 2 (+40 SECONDS)
  road.addCheckpoint(370, 40);

  // 8. Final Sprint across the red desert to Finish
  road.addCurve(50, -2.5, 0);
  road.addStraight(50);

  for (let n = 375; n < 480; n += 8) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 410) road.addSprite(n, 'obstacle_desert_rock', 0.65);
    if (n === 440) road.addSprite(n, 'obstacle_ramp', 0.0);
  }

  // Finish Line
  road.addCheckpoint(490, 0);
  road.addSprite(490, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Desert track built: ${road.segments.length} segments`);
}

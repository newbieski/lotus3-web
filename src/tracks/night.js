// Track: Night Highway Course (야간 고속도로 - Authentic Lotus 3 Night Stage)
import { CONFIG } from '../config.js';

export function buildNightTrack(road) {
  road.reset();

  // Authentic Lotus 3 Night Theme: Midnight Starfield, Glowing City Skyline, Highway Streetlamps
  road.theme = {
    sky: 'bg_night_sky',
    skyline: 'bg_night_skyline',
    grassDark: '#080d18',    // Deep midnight surrounding
    grassLight: '#0f1726',
    roadDark: '#1c1f28',     // Dark night asphalt
    roadLight: '#262a36',
    rumbleDark: '#0a2244',   // Neon blue curbs
    rumbleLight: '#00d4ff',  // Electric Cyan
    lane: '#ffff66',         // Glowing yellow dashed lines
    isNight: true
  };

  // 1. Starting grid under city highway overpass
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner

  // Streetlamps lining the highway
  for (let n = 10; n < 40; n += 6) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // 2. High-speed elevated expressway curve
  road.addCurve(50, -2.8, 15);
  for (let n = 40; n < 150; n += 6) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
    if (n === 80) road.addSprite(n, 'obstacle_cone', 0.5);
    if (n === 120) road.addSprite(n, 'obstacle_cone', -0.5);
  }

  // 3. CHECKPOINT 1 (+45 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(160, 45);

  // 4. Metropolitan Bridge Section (Jump ramp over highway gap!)
  road.addHill(35, 40);
  road.addSprite(180, 'obstacle_ramp', 0.0);
  road.addHill(35, -40);

  for (let n = 165; n < 280; n += 8) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
    if (n === 220) road.addSprite(n, 'obstacle_oil', 0.3);
    if (n === 250) road.addSprite(n, 'obstacle_oil', -0.3);
  }

  // 5. CHECKPOINT 2 (+40 SECONDS)
  road.addCheckpoint(300, 40);

  // 6. Final Winding Neon Highway Sprint
  road.addCurve(45, 3.2, 0);
  road.addCurve(45, -3.2, 0);
  road.addStraight(50);

  for (let n = 305; n < 430; n += 7) {
    road.addSprite(n, 'lamp_post', (n % 2 === 0 ? 1.5 : -1.5));
    if (n === 360) road.addSprite(n, 'obstacle_cone', 0.35);
    if (n === 390) road.addSprite(n, 'obstacle_ramp', -0.2);
  }

  // Finish Line
  road.addCheckpoint(440, 0);
  road.addSprite(440, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Night track built: ${road.segments.length} segments`);
}

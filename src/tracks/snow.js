// Track: Snow Blizzard Course (설원 / 알프스 빙하 - Authentic Lotus 3 Winter Stage)
import { CONFIG } from '../config.js';

export function buildSnowTrack(road) {
  road.reset();

  road.theme = {
    sky: 'bg_snow_sky',
    skyline: 'bg_snow_mountains',
    grassDark: '#c8dce8',    // Frozen snowbanks
    grassLight: '#e4f0fa',   // Powder snow
    roadDark: '#566270',     // Frosted cold asphalt
    roadLight: '#667484',
    rumbleDark: '#1d558c',   // Glacier Ice Blue
    rumbleLight: '#ffffff',  // Snow White
    lane: '#e0f0ff',
    weather: 'snow'          // Triggers falling snow blizzard
  };

  // 1. Starting straight across alpine plateau
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner

  for (let n = 10; n < 40; n += 5) {
    road.addSprite(n, 'tree_snow', -1.6 - Math.random() * 1.2);
    road.addSprite(n, 'tree_snow', 1.6 + Math.random() * 1.2);
  }

  // 2. Winding icy mountain pass with black ice patches
  road.addCurve(45, -3.2, 35);
  road.addCurve(45, 3.2, -35);

  for (let n = 40; n < 130; n += 6) {
    road.addSprite(n, 'tree_snow', (n % 2 === 0 ? 1.5 : -1.5) + (Math.random() * 0.8));
    if (n === 85) road.addSprite(n, 'obstacle_oil', 0.2); // Black Ice patch!
    if (n === 105) road.addSprite(n, 'obstacle_rock', -0.6);
  }

  // 3. CHECKPOINT 1 (+45 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(140, 45);

  // 4. Rollercoaster snowy hills & Crevasse Jump Ramp!
  road.addHill(40, 60);  // High climb
  road.addHill(35, -60); // Steep dip
  road.addCurve(45, -2.8, 10);

  // Stunt Jump Ramp on snow hill!
  road.addSprite(185, 'obstacle_ramp', 0.0);
  road.addSprite(195, 'obstacle_oil', -0.3); // Black ice hazards beneath
  road.addSprite(195, 'obstacle_oil', 0.3);

  for (let n = 150; n < 270; n += 6) {
    road.addSprite(n, 'tree_snow', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 230) road.addSprite(n, 'obstacle_rock', 0.65);
  }

  // 5. CHECKPOINT 2 (+40 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(290, 40);

  // 6. Fast slalom sprint to the Finish Line
  road.addCurve(50, 3.2, 10);
  road.addCurve(50, -3.2, -10);
  road.addStraight(50);

  for (let n = 300; n < 430; n += 8) {
    road.addSprite(n, 'tree_snow', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 340) road.addSprite(n, 'obstacle_ramp', 0.3);
    if (n === 380) road.addSprite(n, 'obstacle_oil', -0.4);
  }

  // Finish Line
  road.addCheckpoint(440, 0);
  road.addSprite(440, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Snow track built: ${road.segments.length} segments`);
}

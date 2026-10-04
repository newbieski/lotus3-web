// Track: Storm & Thunder Course (폭풍우와 번개 - Authentic Lotus 3 Storm Stage)
import { CONFIG } from '../config.js';

export function buildStormTrack(road) {
  road.reset();

  // Authentic Lotus 3 Storm Theme: Dark Purple/Charcoal Tempest, Rain, Thunder Lightning Flashes
  road.theme = {
    sky: 'bg_storm_sky',
    skyline: 'bg_storm_skyline',
    grassDark: '#1a241c',    // Dark drenched marshland
    grassLight: '#243328',
    roadDark: '#22252a',     // Wet slick dark tarmac
    roadLight: '#2c3138',
    rumbleDark: '#441111',   // Dark crimson hazard
    rumbleLight: '#c0c8d4',  // Wet silver
    lane: '#ffffff',
    weather: 'lightning'     // Triggers torrential rain and periodic lightning flashes!
  };

  // 1. Starting grid in torrential gale
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner

  for (let n = 10; n < 40; n += 5) {
    road.addSprite(n, 'tree_pine', -1.6 - Math.random() * 1.5);
    road.addSprite(n, 'tree_pine', 1.6 + Math.random() * 1.5);
    if (n === 25) road.addSprite(n, 'obstacle_rock', 1.4);
  }

  // 2. Dangerous wet curved pass with deep water/oil puddles
  road.addCurve(45, -3.0, 20);
  for (let n = 40; n < 150; n += 6) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 70) road.addSprite(n, 'obstacle_oil', 0.3); // Slippery storm puddle
    if (n === 110) road.addSprite(n, 'obstacle_oil', -0.3);
  }

  // 3. CHECKPOINT 1 (+45 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(160, 45);

  // 4. Stormy Mountain Plunge with Jump Ramp
  road.addHill(35, 55);
  road.addSprite(185, 'obstacle_ramp', 0.0);
  road.addHill(35, -55);
  road.addCurve(40, 2.8, -10);

  for (let n = 165; n < 280; n += 7) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.7 : -1.7));
    if (n === 225) road.addSprite(n, 'obstacle_rock', -0.65);
    if (n === 260) road.addSprite(n, 'obstacle_log', 0.6);
  }

  // 5. CHECKPOINT 2 (+40 SECONDS)
  road.addCheckpoint(300, 40);

  // 6. Final Thunderstorm Slalom Sprint
  road.addCurve(45, -3.2, 0);
  road.addCurve(45, 3.2, 0);
  road.addStraight(50);

  for (let n = 305; n < 420; n += 7) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 350) road.addSprite(n, 'obstacle_oil', 0.0); // Center puddle
    if (n === 380) road.addSprite(n, 'obstacle_ramp', 0.25);
  }

  // Finish Line
  road.addCheckpoint(430, 0);
  road.addSprite(430, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Storm track built: ${road.segments.length} segments`);
}

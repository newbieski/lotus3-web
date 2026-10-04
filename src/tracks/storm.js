// Track: Storm & Thunder Course (폭풍우와 번개 - Authentic Lotus 3 5,400-Segment Championship Stage)
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

  // =========================================================================
  // SECTOR 1 (Segments 0 ~ 1,350): Tempest Wetlands & Hydroplane Puddles
  // =========================================================================
  // 1-1. Starting straight in howling gale
  road.addStraight(50); // 0 - 150
  for (let n = 15; n < 140; n += 10) {
    road.addSprite(n, 'tree_pine', -1.6 - Math.random() * 1.5);
    road.addSprite(n, 'tree_pine', 1.6 + Math.random() * 1.5);
  }

  // 1-2. Sweeping left curve with storm puddles
  road.addCurve(50, -2.4, 0); // 150 - 300
  road.addSprite(170, 'sign_chevron_left', 1.35);
  road.addSprite(230, 'obstacle_oil', 0.25); // Slippery storm puddle
  for (let n = 160; n < 290; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 270) road.addSprite(n, 'obstacle_rock', -1.25);
  }

  // 1-3. High-speed torrential straight
  road.addStraight(50); // 300 - 450
  road.addSprite(360, 'obstacle_oil', -0.3);
  for (let n = 310; n < 440; n += 10) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.7 : -1.7));
  }

  // 1-4. Winding marshland curve
  road.addCurve(50, 2.8, 15); // 450 - 600
  road.addSprite(470, 'sign_chevron_right', -1.35);
  road.addSprite(530, 'obstacle_rock', -0.65);
  road.addSprite(560, 'obstacle_oil', 0.2);

  // 1-5. First hill climbs through thunderclouds
  road.addHill(50, 45);  // 600 - 750
  road.addHill(50, -45); // 750 - 900
  road.addSprite(680, 'obstacle_rock', 0.65);
  road.addSprite(820, 'obstacle_oil', -0.25);

  // 1-6. Fast reverse S-curves
  road.addCurve(50, -3.0, 0); // 900 - 1050
  road.addCurve(50, 3.0, 0);  // 1050 - 1200
  road.addSprite(920, 'sign_chevron_left', 1.35);
  road.addSprite(1070, 'sign_chevron_right', -1.35);
  road.addSprite(990, 'obstacle_oil', 0.35);
  road.addSprite(1130, 'obstacle_log', -0.6);

  // 1-7. Straight into Checkpoint 1
  road.addStraight(50); // 1200 - 1350
  for (let n = 1220; n < 1340; n += 12) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // CHECKPOINT 1 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~1,349

  // =========================================================================
  // SECTOR 2 (Segments 1,350 ~ 2,700): Mountain Tempest & Flood Gully Jumps
  // =========================================================================
  // 2-1. Steep storm crest climb
  road.addHill(50, 60); // 1350 - 1500
  for (let n = 1360; n < 1480; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.7 : -1.7));
  }

  // 2-2. Flood Gully Jump Ramp launching over torrent!
  road.addHill(50, -60); // 1500 - 1650
  road.addSprite(1510, 'obstacle_ramp', 0.0);   // Center jump ramp
  road.addSprite(1526, 'obstacle_oil', -0.35);  // Deep water puddle in landing zone
  road.addSprite(1526, 'obstacle_oil', 0.35);

  // 2-3. High-speed sweeping curve
  road.addCurve(50, 3.2, 0); // 1650 - 1800
  road.addSprite(1670, 'sign_chevron_right', -1.35);
  road.addSprite(1730, 'obstacle_rock', 0.65);

  // 2-4. Undulating marshland humps
  road.addHill(50, 45);  // 1800 - 1950
  road.addHill(50, -45); // 1950 - 2100
  road.addSprite(1860, 'obstacle_ramp', -0.25);
  road.addSprite(1876, 'obstacle_oil', -0.25);
  road.addSprite(2020, 'obstacle_log', -0.65);

  // 2-5. Fast winding mountain descent
  road.addCurve(50, -2.8, -20); // 2100 - 2250
  road.addCurve(50, 2.8, 20);   // 2250 - 2400
  road.addSprite(2120, 'sign_chevron_left', 1.35);
  road.addSprite(2270, 'sign_chevron_right', -1.35);
  road.addSprite(2190, 'obstacle_oil', 0.3);

  // 2-6. Drenched canyon straight
  road.addStraight(50); // 2400 - 2550
  road.addSprite(2460, 'obstacle_oil', -0.35);
  road.addSprite(2500, 'obstacle_rock', 0.65);

  // 2-7. High-speed approach into Checkpoint 2
  road.addStraight(50); // 2550 - 2700
  for (let n = 2570; n < 2690; n += 12) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // CHECKPOINT 2 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~2,699

  // =========================================================================
  // SECTOR 3 (Segments 2,700 ~ 4,050): Lightning Ridge & Torrential Chicanes
  // =========================================================================
  // 3-1. Sharp chicane entry under thunder
  road.addCurve(50, -3.5, 0); // 2700 - 2850
  road.addSprite(2720, 'sign_chevron_left', 1.35);
  road.addSprite(2790, 'obstacle_oil', 0.3);

  // 3-2. Counter right hook
  road.addCurve(50, 3.5, 0);  // 2850 - 3000
  road.addSprite(2870, 'sign_chevron_right', -1.35);
  road.addSprite(2930, 'obstacle_rock', -0.65);

  // 3-3. Rollercoaster plunge through downpour
  road.addHill(50, 50);  // 3000 - 3150
  road.addHill(50, -50); // 3150 - 3300
  road.addSprite(3080, 'obstacle_ramp', 0.25);
  road.addSprite(3096, 'obstacle_oil', 0.25);
  road.addSprite(3230, 'obstacle_log', 0.6);

  // 3-4. Long sweeping wet curve
  road.addCurve(50, -2.6, 15); // 3300 - 3450
  road.addSprite(3320, 'sign_chevron_left', 1.35);
  road.addSprite(3390, 'obstacle_oil', -0.3);

  // 3-5. Stormy valley straight
  road.addStraight(50); // 3450 - 3600
  road.addSprite(3490, 'obstacle_rock', -0.65);
  road.addSprite(3550, 'obstacle_oil', 0.35);

  // 3-6. Fast uphill right turn
  road.addCurve(50, 3.0, 30); // 3600 - 3750
  road.addSprite(3620, 'sign_chevron_right', -1.35);

  // 3-7. Mountain crest descent straight
  road.addHill(50, -30); // 3750 - 3900
  road.addStraight(50);  // 3900 - 4050
  road.addSprite(3820, 'obstacle_ramp', -0.2);
  road.addSprite(3950, 'obstacle_oil', 0.25);

  // CHECKPOINT 3 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~4,049

  // =========================================================================
  // SECTOR 4 (Segments 4,050 ~ 5,400): Electrifying Dash to Finish Line
  // =========================================================================
  // 4-1. High-speed tempest dash
  road.addStraight(50); // 4050 - 4200
  for (let n = 4070; n < 4180; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // 4-2. Hard left sweeper
  road.addCurve(50, -3.2, 0); // 4200 - 4350
  road.addSprite(4220, 'sign_chevron_left', 1.35);
  road.addSprite(4280, 'obstacle_oil', -0.3);

  // 4-3. Hard right counter sweeper
  road.addCurve(50, 3.2, 0);  // 4350 - 4500
  road.addSprite(4370, 'sign_chevron_right', -1.35);
  road.addSprite(4430, 'obstacle_rock', 0.65);

  // 4-4. Final mountain crest and dip with jump ramp
  road.addHill(50, 45);  // 4500 - 4650
  road.addHill(50, -45); // 4650 - 4800
  road.addSprite(4540, 'obstacle_ramp', 0.0);
  road.addSprite(4556, 'obstacle_oil', -0.35);
  road.addSprite(4556, 'obstacle_oil', 0.35);

  // 4-5. The Grand Wet Slalom
  road.addStraight(50); // 4800 - 4950
  for (let n = 4820; n < 4930; n += 16) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n % 32 === 0) road.addSprite(n, 'obstacle_log', -0.6);
    if (n % 32 === 16) road.addSprite(n, 'obstacle_oil', 0.35);
  }

  // 4-6. Final sweeping curve out of the storm
  road.addCurve(50, -2.5, 0); // 4950 - 5100
  road.addSprite(4980, 'sign_chevron_left', 1.35);

  // 4-7. Broad open straightaway under lightning
  road.addStraight(50); // 5100 - 5250
  road.addSprite(5140, 'obstacle_ramp', 0.0); // Final triumph stunt ramp!

  // 4-8. Final Sprint across the wet tarmac to Finish Line
  road.addStraight(50); // 5250 - 5400
  road.markFinish();    // Segment ~5,399 Checkered Tarmac + Stage Cleared

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Storm track built: ${road.segments.length} segments`);
}

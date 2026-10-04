// Track: Forest Course (자연풍경 / 울창한 침엽수 숲 - Authentic Lotus 3 5,400-Segment Championship Stage)
import { CONFIG } from '../config.js';

export function buildForestTrack(road) {
  road.reset();

  // Authentic Lotus 3 Forest Theme: Crisp Blue Sky, Alpine Peaks, Green Hills, Red/White Curbs (No Cranes!)
  road.theme = {
    sky: 'bg_forest_sky',
    skyline: 'bg_forest_mountains',
    horizon: 'bg_forest_hills',
    grassDark: '#125425',    // Lush deep alpine green
    grassLight: '#187032',   // Vibrant emerald green
    roadDark: '#44474e',     // Smooth clean tarmac
    roadLight: '#4e525a',
    rumbleDark: '#c81e1e',   // Classic European Racing Red
    rumbleLight: '#f5f5f5',  // Clean White
    lane: '#ffffff'
  };

  // =========================================================================
  // SECTOR 1 (Segments 0 ~ 1,350): Alpine Meadows & Lakeside Pine Canopy
  // =========================================================================
  // 1-1. Starting straight through lush meadows
  road.addStraight(50); // 0 - 150
  for (let n = 15; n < 140; n += 8) {
    road.addSprite(n, 'tree_pine', -1.6 - Math.random() * 1.5);
    road.addSprite(n, 'tree_deciduous', 1.6 + Math.random() * 1.5);
  }

  // 1-2. Sweeping gentle left curve through dense pines
  road.addCurve(50, -2.2, 0); // 150 - 300
  road.addSprite(170, 'sign_chevron_left', 1.35);
  for (let n = 160; n < 290; n += 10) {
    road.addSprite(n, 'tree_pine', -1.5 - Math.random() * 1.8);
    road.addSprite(n, 'tree_pine', 1.5 + Math.random() * 1.8);
    if (n === 230) road.addSprite(n, 'obstacle_rock', -1.25);
  }

  // 1-3. Scenic lakeside high-speed straight
  road.addStraight(50); // 300 - 450
  for (let n = 310; n < 440; n += 9) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6) * (1.0 + Math.random()));
    if (n === 380) road.addSprite(n, 'obstacle_log', 0.55); // Fallen log hazard!
  }

  // 1-4. Mountain foothills right curve
  road.addCurve(50, 2.8, 15); // 450 - 600
  road.addSprite(470, 'sign_chevron_right', -1.35);
  for (let n = 460; n < 590; n += 9) {
    road.addSprite(n, 'tree_pine', 1.5 + Math.random() * 1.6);
    road.addSprite(n, 'tree_pine', -1.5 - Math.random() * 1.6);
    if (n === 530) road.addSprite(n, 'obstacle_rock', -0.65);
  }

  // 1-5. First undulating foothills
  road.addHill(50, 40);  // 600 - 750
  road.addHill(50, -40); // 750 - 900
  for (let n = 620; n < 880; n += 12) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.7 : -1.7));
    if (n === 710) road.addSprite(n, 'obstacle_log', -0.55);
  }

  // 1-6. Fast reverse curves
  road.addCurve(50, -3.0, 0); // 900 - 1050
  road.addCurve(50, 3.0, 0);  // 1050 - 1200
  road.addSprite(920, 'sign_chevron_left', 1.35);
  road.addSprite(1070, 'sign_chevron_right', -1.35);
  for (let n = 920; n < 1180; n += 10) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 1010) road.addSprite(n, 'obstacle_rock', 0.65);
  }

  // 1-7. Straight approach into Checkpoint 1
  road.addStraight(50); // 1200 - 1350
  for (let n = 1210; n < 1340; n += 12) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // CHECKPOINT 1 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~1,349

  // =========================================================================
  // SECTOR 2 (Segments 1,350 ~ 2,700): Mountain Climb & Rollercoaster Hills
  // =========================================================================
  // 2-1. Steep alpine ridge climb
  road.addHill(50, 60); // 1350 - 1500
  for (let n = 1360; n < 1480; n += 10) {
    road.addSprite(n, 'tree_pine', -1.7 - Math.random());
    road.addSprite(n, 'tree_pine', 1.7 + Math.random());
    if (n === 1420) road.addSprite(n, 'obstacle_rock', 0.6);
  }

  // 2-2. Crest and steep plunge into valley!
  road.addHill(50, -60); // 1500 - 1650
  for (let n = 1520; n < 1640; n += 10) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 1570) road.addSprite(n, 'obstacle_log', -0.6);
  }

  // 2-3. High-speed sweeping curve across canyon
  road.addCurve(50, 3.2, 0); // 1650 - 1800
  road.addSprite(1670, 'sign_chevron_right', -1.35);
  for (let n = 1660; n < 1790; n += 9) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 1730) road.addSprite(n, 'obstacle_rock', -0.65);
  }

  // 2-4. High-altitude undulating humps
  road.addHill(50, 45);  // 1800 - 1950
  road.addHill(50, -45); // 1950 - 2100
  for (let n = 1820; n < 2080; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.7 : -1.7));
    if (n === 1920) road.addSprite(n, 'obstacle_log', 0.6);
    if (n === 2030) road.addSprite(n, 'obstacle_rock', -0.6);
  }

  // 2-5. Fast winding mountain descent
  road.addCurve(50, -2.8, -20); // 2100 - 2250
  road.addCurve(50, 2.8, 20);   // 2250 - 2400
  road.addSprite(2120, 'sign_chevron_left', 1.35);
  road.addSprite(2270, 'sign_chevron_right', -1.35);
  for (let n = 2120; n < 2380; n += 10) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // 2-6. Broad plateau straight
  road.addStraight(50); // 2400 - 2550
  for (let n = 2420; n < 2540; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 2480) road.addSprite(n, 'obstacle_log', -0.5);
  }

  // 2-7. High-speed approach into Checkpoint 2
  road.addStraight(50); // 2550 - 2700
  for (let n = 2570; n < 2690; n += 12) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // CHECKPOINT 2 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~2,699

  // =========================================================================
  // SECTOR 3 (Segments 2,700 ~ 4,050): Redwood Canyon & Technical S-Curves
  // =========================================================================
  // 3-1. Sharp chicane entry into redwood grove
  road.addCurve(50, -3.5, 0); // 2700 - 2850
  road.addSprite(2720, 'sign_chevron_left', 1.35);
  for (let n = 2710; n < 2840; n += 8) {
    road.addSprite(n, 'tree_pine', -1.5 - Math.random());
    road.addSprite(n, 'tree_pine', 1.5 + Math.random());
    if (n === 2780) road.addSprite(n, 'obstacle_rock', 0.65);
  }

  // 3-2. Counter right hook
  road.addCurve(50, 3.5, 0);  // 2850 - 3000
  road.addSprite(2870, 'sign_chevron_right', -1.35);
  for (let n = 2860; n < 2990; n += 8) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 2920) road.addSprite(n, 'obstacle_log', -0.6);
  }

  // 3-3. Rollercoaster canyon plunge
  road.addHill(50, 50);  // 3000 - 3150
  road.addHill(50, -50); // 3150 - 3300
  for (let n = 3020; n < 3280; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 3120) road.addSprite(n, 'obstacle_rock', -0.65);
    if (n === 3220) road.addSprite(n, 'obstacle_log', 0.6);
  }

  // 3-4. Dense forest sweeping curve
  road.addCurve(50, -2.6, 15); // 3300 - 3450
  road.addSprite(3320, 'sign_chevron_left', 1.35);
  for (let n = 3310; n < 3440; n += 9) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // 3-5. Alpine meadow straight with rock/log slalom
  road.addStraight(50); // 3450 - 3600
  for (let n = 3470; n < 3580; n += 16) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 3500) road.addSprite(n, 'obstacle_rock', 0.6);
    if (n === 3540) road.addSprite(n, 'obstacle_log', -0.6);
  }

  // 3-6. Fast uphill curve
  road.addCurve(50, 3.0, 30); // 3600 - 3750
  road.addSprite(3620, 'sign_chevron_right', -1.35);
  for (let n = 3610; n < 3740; n += 9) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // 3-7. Mountain ridge descent straight
  road.addHill(50, -30); // 3750 - 3900
  road.addStraight(50);  // 3900 - 4050
  for (let n = 3770; n < 4030; n += 10) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 3880) road.addSprite(n, 'obstacle_log', 0.55);
  }

  // CHECKPOINT 3 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~4,049

  // =========================================================================
  // SECTOR 4 (Segments 4,050 ~ 5,400): High-Speed Forest Dash to Finish
  // =========================================================================
  // 4-1. High-speed valley straightaway
  road.addStraight(50); // 4050 - 4200
  for (let n = 4070; n < 4180; n += 10) {
    road.addSprite(n, 'tree_pine', -1.6 - Math.random());
    road.addSprite(n, 'tree_pine', 1.6 + Math.random());
  }

  // 4-2. Hard left sweeper
  road.addCurve(50, -3.2, 0); // 4200 - 4350
  road.addSprite(4220, 'sign_chevron_left', 1.35);
  for (let n = 4220; n < 4340; n += 9) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 4280) road.addSprite(n, 'obstacle_rock', -0.65);
  }

  // 4-3. Hard right counter sweeper
  road.addCurve(50, 3.2, 0);  // 4350 - 4500
  road.addSprite(4370, 'sign_chevron_right', -1.35);
  for (let n = 4360; n < 4490; n += 9) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 4420) road.addSprite(n, 'obstacle_log', 0.6);
  }

  // 4-4. Final mountain crest and dip
  road.addHill(50, 45);  // 4500 - 4650
  road.addHill(50, -45); // 4650 - 4800
  for (let n = 4520; n < 4780; n += 10) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 4610) road.addSprite(n, 'obstacle_rock', 0.65);
    if (n === 4720) road.addSprite(n, 'obstacle_log', -0.65);
  }

  // 4-5. The Grand Slalom Gauntlet
  road.addStraight(50); // 4800 - 4950
  for (let n = 4820; n < 4930; n += 12) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 4850) road.addSprite(n, 'obstacle_rock', -0.6);
    if (n === 4900) road.addSprite(n, 'obstacle_log', 0.6);
  }

  // 4-6. Final sweeping curve out of the forest
  road.addCurve(50, -2.5, 0); // 4950 - 5100
  road.addSprite(4980, 'sign_chevron_left', 1.35);
  for (let n = 4970; n < 5090; n += 9) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // 4-7. Broad open meadow straightaway
  road.addStraight(50); // 5100 - 5250
  for (let n = 5120; n < 5240; n += 10) {
    road.addSprite(n, 'tree_deciduous', (n % 2 === 0 ? 1.7 : -1.7));
  }

  // 4-8. Final Full-Throttle Sprint to Finish Line
  road.addStraight(50); // 5250 - 5400
  road.markFinish();    // Segment ~5,399 Checkered Tarmac + Stage Cleared

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Forest track built: ${road.segments.length} segments`);
}

// Track: Night Highway Course (야간 고속도로 - Authentic Lotus 3 5,400-Segment Championship Stage)
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

  // =========================================================================
  // SECTOR 1 (Segments 0 ~ 1,350): Metropolitan Expressway & Streetlamp Run
  // =========================================================================
  // 1-1. Starting grid under city highway lamps
  road.addStraight(50); // 0 - 150
  for (let n = 15; n < 140; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // 1-2. High-speed elevated expressway curve
  road.addCurve(50, -2.5, 0); // 150 - 300
  road.addSprite(170, 'sign_chevron_left', 1.35);
  road.addSprite(230, 'obstacle_cone', 0.45);
  for (let n = 160; n < 290; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // 1-3. Neon skyline straight
  road.addStraight(50); // 300 - 450
  road.addSprite(360, 'obstacle_oil', -0.3);
  for (let n = 310; n < 440; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // 1-4. Highway overpass bridge climb & dip
  road.addHill(50, 40);  // 450 - 600
  road.addHill(50, -40); // 600 - 750
  road.addSprite(510, 'obstacle_ramp', 0.0); // Center ramp
  road.addSprite(530, 'obstacle_oil', -0.3);
  road.addSprite(530, 'obstacle_oil', 0.3);

  // 1-5. High-speed right sweep overlooking skyline
  road.addCurve(50, 2.8, 15); // 750 - 900
  road.addSprite(770, 'sign_chevron_right', -1.35);
  for (let n = 760; n < 890; n += 12) {
    road.addSprite(n, 'lamp_post', (n % 24 === 0 ? 1.5 : -1.5));
  }

  // 1-6. Fast reverse S-curves
  road.addCurve(50, -3.0, 0); // 900 - 1050
  road.addCurve(50, 3.0, 0);  // 1050 - 1200
  road.addSprite(920, 'sign_chevron_left', 1.35);
  road.addSprite(1070, 'sign_chevron_right', -1.35);
  road.addSprite(990, 'obstacle_cone', -0.45);
  road.addSprite(1130, 'obstacle_cone', 0.45);

  // 1-7. Straight into Checkpoint 1
  road.addStraight(50); // 1200 - 1350
  for (let n = 1220; n < 1340; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // CHECKPOINT 1 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~1,349

  // =========================================================================
  // SECTOR 2 (Segments 1,350 ~ 2,700): Metropolitan Bridge & Skyway Jumps
  // =========================================================================
  // 2-1. Elevated bridge climb
  road.addHill(50, 55); // 1350 - 1500
  for (let n = 1360; n < 1480; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // 2-2. Skyway Jump Ramp across bridge gap!
  road.addHill(50, -55); // 1500 - 1650
  road.addSprite(1510, 'obstacle_ramp', 0.0);
  road.addSprite(1530, 'obstacle_oil', -0.35);
  road.addSprite(1530, 'obstacle_oil', 0.35);

  // 2-3. High-speed sweeping curve
  road.addCurve(50, 3.2, 0); // 1650 - 1800
  road.addSprite(1670, 'sign_chevron_right', -1.35);
  road.addSprite(1730, 'obstacle_cone', -0.45);

  // 2-4. Undulating expressway waves
  road.addHill(50, 40);  // 1800 - 1950
  road.addHill(50, -40); // 1950 - 2100
  road.addSprite(1860, 'obstacle_ramp', -0.25);
  road.addSprite(1876, 'obstacle_oil', -0.25);

  // 2-5. Fast winding expressway descent
  road.addCurve(50, -2.8, -20); // 2100 - 2250
  road.addCurve(50, 2.8, 20);   // 2250 - 2400
  road.addSprite(2120, 'sign_chevron_left', 1.35);
  road.addSprite(2270, 'sign_chevron_right', -1.35);

  // 2-6. Neon tunnel approach straight
  road.addStraight(50); // 2400 - 2550
  road.addSprite(2460, 'obstacle_cone', 0.45);
  road.addSprite(2500, 'obstacle_cone', -0.45);

  // 2-7. High-speed approach into Checkpoint 2
  road.addStraight(50); // 2550 - 2700
  for (let n = 2570; n < 2690; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // CHECKPOINT 2 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~2,699

  // =========================================================================
  // SECTOR 3 (Segments 2,700 ~ 4,050): Downtown Boulevard & Chicane Gauntlet
  // =========================================================================
  // 3-1. Sharp downtown chicane entry
  road.addCurve(50, -3.5, 0); // 2700 - 2850
  road.addSprite(2720, 'sign_chevron_left', 1.35);
  road.addSprite(2780, 'obstacle_cone', 0.4);

  // 3-2. Counter right hook
  road.addCurve(50, 3.5, 0);  // 2850 - 3000
  road.addSprite(2870, 'sign_chevron_right', -1.35);
  road.addSprite(2930, 'obstacle_oil', -0.3);

  // 3-3. Rollercoaster highway plunge with jump ramp
  road.addHill(50, 50);  // 3000 - 3150
  road.addHill(50, -50); // 3150 - 3300
  road.addSprite(3080, 'obstacle_ramp', 0.25);
  road.addSprite(3230, 'obstacle_cone', -0.45);

  // 3-4. Long sweeping expressway curve
  road.addCurve(50, -2.6, 15); // 3300 - 3450
  road.addSprite(3320, 'sign_chevron_left', 1.35);

  // 3-5. Downtown straightaway with cone slalom
  road.addStraight(50); // 3450 - 3600
  for (let n = 3470; n < 3580; n += 16) {
    road.addSprite(n, 'obstacle_cone', (n % 32 === 0 ? 0.45 : -0.45));
  }

  // 3-6. Fast uphill curve
  road.addCurve(50, 3.0, 30); // 3600 - 3750
  road.addSprite(3620, 'sign_chevron_right', -1.35);

  // 3-7. Highway crest descent straight
  road.addHill(50, -30); // 3750 - 3900
  road.addStraight(50);  // 3900 - 4050
  road.addSprite(3820, 'obstacle_ramp', -0.2);
  road.addSprite(3950, 'obstacle_oil', 0.3);

  // CHECKPOINT 3 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~4,049

  // =========================================================================
  // SECTOR 4 (Segments 4,050 ~ 5,400): Midnight Grand Prix Sprint to Finish
  // =========================================================================
  // 4-1. High-speed expressway dash
  road.addStraight(50); // 4050 - 4200
  for (let n = 4070; n < 4180; n += 12) {
    road.addSprite(n, 'lamp_post', -1.5);
    road.addSprite(n, 'lamp_post', 1.5);
  }

  // 4-2. Hard left sweeper
  road.addCurve(50, -3.2, 0); // 4200 - 4350
  road.addSprite(4220, 'sign_chevron_left', 1.35);
  road.addSprite(4280, 'obstacle_oil', -0.3);

  // 4-3. Hard right counter sweeper
  road.addCurve(50, 3.2, 0);  // 4350 - 4500
  road.addSprite(4370, 'sign_chevron_right', -1.35);
  road.addSprite(4430, 'obstacle_cone', 0.45);

  // 4-4. Final overpass crest and dip with jump ramp
  road.addHill(50, 45);  // 4500 - 4650
  road.addHill(50, -45); // 4650 - 4800
  road.addSprite(4540, 'obstacle_ramp', 0.0);
  road.addSprite(4556, 'obstacle_oil', -0.35);
  road.addSprite(4556, 'obstacle_oil', 0.35);

  // 4-5. The Grand Highway Slalom
  road.addStraight(50); // 4800 - 4950
  for (let n = 4820; n < 4930; n += 16) {
    road.addSprite(n, 'lamp_post', (n % 32 === 0 ? 1.5 : -1.5));
    if (n % 32 === 0) road.addSprite(n, 'obstacle_cone', -0.4);
    if (n % 32 === 16) road.addSprite(n, 'obstacle_oil', 0.35);
  }

  // 4-6. Final sweeping curve under city skyline
  road.addCurve(50, -2.5, 0); // 4950 - 5100
  road.addSprite(4980, 'sign_chevron_left', 1.35);

  // 4-7. Broad open highway straightaway
  road.addStraight(50); // 5100 - 5250
  road.addSprite(5140, 'obstacle_ramp', 0.0); // Stunt launch ramp!

  // 4-8. Final Sprint under the neon streetlamps to Finish Line
  road.addStraight(50); // 5250 - 5400
  road.markFinish();    // Segment ~5,399 Checkered Tarmac + Stage Cleared

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Night track built: ${road.segments.length} segments`);
}

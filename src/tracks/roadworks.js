// Track: Roadworks Course (도로 공사장 맵 - Authentic Lotus 3 5,400-Segment Championship Stage)
import { CONFIG } from '../config.js';

export function buildRoadworksTrack(road) {
  road.reset();

  // Authentic Lotus 3 Roadworks Theme: Reddish-brown clay dirt + hazard yellow/black rumble
  road.theme = {
    sky: 'bg_roadworks_sky',
    skyline: 'bg_roadworks_skyline',
    grassDark: '#50331e',    // Rich reddish-brown clay / construction earth
    grassLight: '#634027',   // Lighter clay / dry earth
    roadDark: '#323438',     // Patched heavy industrial asphalt
    roadLight: '#3d4046',    // Worn asphalt
    rumbleDark: '#111111',   // Hazard black
    rumbleLight: '#f5b800',  // Hazard construction bright yellow
    lane: '#ffd700'
  };

  // =========================================================================
  // SECTOR 1 (Segments 0 ~ 1,350): Industrial Perimeter & Jump/Oil Gauntlet
  // =========================================================================
  // 1-1. Starting straight through construction compound
  road.addStraight(50); // 0 - 150
  for (let n = 15; n < 140; n += 15) {
    road.addSprite(n, 'sign_roadworks', (n % 30 === 0 ? 1.6 : -1.6));
    if (n % 45 === 0) road.addSprite(n, 'obstacle_excavator', 1.85);
    if (n % 30 === 15) road.addSprite(n, 'obstacle_drum', -1.5);
  }

  // 1-2. Sweeping left curve with narrowing steel plates
  road.addCurve(50, -2.4, 0); // 150 - 300
  road.addSprite(180, 'sign_chevron_left', 1.4);
  road.addSprite(220, 'obstacle_steel_plate', 0.0);
  road.addSprite(260, 'obstacle_steel_plate', -0.2);

  // 1-3. Tapering cone lane closure
  road.addStraight(50); // 300 - 450
  for (let n = 320; n < 430; n += 6) {
    const coneOffset = 1.0 - (Math.min(n - 320, 30) / 30) * 0.7;
    road.addSprite(n, 'obstacle_cone', coneOffset);
    if (n % 18 === 0) road.addSprite(n, 'obstacle_barricade', coneOffset + 0.35);
  }

  // 1-4. Jump Ramp & Oil Slick stunt section!
  road.addStraight(50); // 450 - 600
  road.addSprite(480, 'sign_roadworks', 1.4);
  road.addSprite(510, 'obstacle_ramp', 0.0);   // Center jump ramp
  road.addSprite(525, 'obstacle_oil', -0.35);  // Oil patches behind ramp!
  road.addSprite(527, 'obstacle_oil', 0.35);
  road.addSprite(532, 'obstacle_oil', 0.0);

  // 1-5. High-speed right curve
  road.addCurve(50, 2.8, 15); // 600 - 750
  road.addSprite(620, 'sign_chevron_right', -1.4);
  road.addSprite(670, 'obstacle_excavator', -1.9);
  road.addSprite(710, 'obstacle_drum', 1.6);

  // 1-6. Overpass hill climb & descent
  road.addHill(50, 45);  // 750 - 900
  road.addHill(50, -45); // 900 - 1050
  road.addSprite(820, 'obstacle_steel_plate', 0.2);
  road.addSprite(980, 'obstacle_drum', -1.5);

  // 1-7. Technical S-curve into Checkpoint 1
  road.addCurve(50, -3.0, 0); // 1050 - 1200
  road.addStraight(50);       // 1200 - 1350
  road.addSprite(1080, 'sign_chevron_left', 1.4);
  road.addSprite(1140, 'obstacle_oil', 0.3);
  road.addSprite(1240, 'sign_roadworks', -1.4);

  // CHECKPOINT 1 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~1,349

  // =========================================================================
  // SECTOR 2 (Segments 1,350 ~ 2,700): Rollercoaster Hills & Double Jump Stunts
  // =========================================================================
  // 2-1. Steep earthworks hill climb
  road.addHill(50, 55); // 1350 - 1500
  road.addSprite(1380, 'sign_roadworks', 1.4);
  road.addSprite(1440, 'obstacle_excavator', 1.85);

  // 2-2. Crest Jump Ramp into plunging drop!
  road.addHill(50, -55); // 1500 - 1650
  road.addSprite(1510, 'obstacle_ramp', -0.2);
  road.addSprite(1526, 'obstacle_oil', -0.2);
  road.addSprite(1580, 'obstacle_steel_plate', 0.0);

  // 2-3. High-speed right sweep
  road.addCurve(50, 3.2, 0); // 1650 - 1800
  road.addSprite(1670, 'sign_chevron_right', -1.4);
  road.addSprite(1720, 'obstacle_drum', 1.6);
  road.addSprite(1760, 'obstacle_excavator', -1.9);

  // 2-4. Trench narrow funnel with cones & barricades
  road.addStraight(50); // 1800 - 1950
  for (let n = 1820; n < 1930; n += 6) {
    const coneOffset = -1.0 + (Math.min(n - 1820, 25) / 25) * 0.65;
    road.addSprite(n, 'obstacle_cone', coneOffset);
    if (n % 18 === 0) road.addSprite(n, 'obstacle_barricade', coneOffset - 0.35);
  }

  // 2-5. Rollercoaster undulating humps
  road.addHill(50, 40);  // 1950 - 2100
  road.addHill(50, -40); // 2100 - 2250
  road.addSprite(2020, 'obstacle_ramp', 0.25);
  road.addSprite(2036, 'obstacle_oil', 0.25);
  road.addSprite(2180, 'obstacle_drum', -1.5);

  // 2-6. Fast reverse S-curves
  road.addCurve(50, -2.8, -15); // 2250 - 2400
  road.addCurve(50, 2.8, 15);   // 2400 - 2550
  road.addSprite(2280, 'sign_chevron_left', 1.4);
  road.addSprite(2430, 'sign_chevron_right', -1.4);

  // 2-7. High-speed approach to Checkpoint 2
  road.addStraight(50); // 2550 - 2700
  road.addSprite(2590, 'sign_roadworks', 1.4);
  road.addSprite(2640, 'obstacle_steel_plate', 0.0);

  // CHECKPOINT 2 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~2,699

  // =========================================================================
  // SECTOR 3 (Segments 2,700 ~ 4,050): Technical Slalom & Heavy Excavation Zone
  // =========================================================================
  // 3-1. Sharp chicane entry
  road.addCurve(50, -3.5, 0); // 2700 - 2850
  road.addSprite(2720, 'sign_chevron_left', 1.4);
  road.addSprite(2780, 'obstacle_excavator', 1.85);

  // 3-2. Counter right hook
  road.addCurve(50, 3.5, 0);  // 2850 - 3000
  road.addSprite(2870, 'sign_chevron_right', -1.4);
  road.addSprite(2930, 'obstacle_drum', -1.6);

  // 3-3. Double-sided cone gauntlet
  road.addStraight(50); // 3000 - 3150
  for (let n = 3020; n < 3130; n += 8) {
    road.addSprite(n, 'obstacle_cone', (n % 16 === 0 ? 0.4 : -0.4));
    if (n % 24 === 0) road.addSprite(n, 'obstacle_steel_plate', 0.0);
  }

  // 3-4. Ridge overpass climb
  road.addHill(50, 50); // 3150 - 3300
  road.addSprite(3210, 'sign_roadworks', -1.4);
  road.addSprite(3260, 'obstacle_excavator', -1.9);

  // 3-5. Steep plunge with airborne jump ramp!
  road.addHill(50, -50); // 3300 - 3450
  road.addSprite(3320, 'obstacle_ramp', 0.0);
  road.addSprite(3336, 'obstacle_oil', -0.4);
  road.addSprite(3336, 'obstacle_oil', 0.4);

  // 3-6. Wide high-speed sweeper
  road.addCurve(50, -2.6, 20); // 3450 - 3600
  road.addSprite(3480, 'sign_chevron_left', 1.4);
  road.addSprite(3550, 'obstacle_drum', 1.6);

  // 3-7. Winding valley straight
  road.addStraight(50); // 3600 - 3750
  road.addSprite(3640, 'obstacle_steel_plate', -0.2);
  road.addSprite(3690, 'obstacle_oil', 0.3);

  // 3-8. Fast uphill right curve
  road.addCurve(50, 3.0, 30); // 3750 - 3900
  road.addSprite(3780, 'sign_chevron_right', -1.4);
  road.addSprite(3840, 'obstacle_excavator', 1.85);

  // 3-9. Downhill straight into Checkpoint 3
  road.addHill(50, -30); // 3900 - 4050
  road.addSprite(3960, 'sign_roadworks', 1.4);

  // CHECKPOINT 3 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~4,049

  // =========================================================================
  // SECTOR 4 (Segments 4,050 ~ 5,400): High-Stakes Final Sprint to the Finish
  // =========================================================================
  // 4-1. High-speed straightaway with excavator corridor
  road.addStraight(50); // 4050 - 4200
  road.addSprite(4090, 'obstacle_excavator', -1.9);
  road.addSprite(4140, 'obstacle_excavator', 1.9);

  // 4-2. Hard left sweeper
  road.addCurve(50, -3.2, 0); // 4200 - 4350
  road.addSprite(4220, 'sign_chevron_left', 1.4);
  road.addSprite(4280, 'obstacle_oil', -0.3);

  // 4-3. Hard right counter
  road.addCurve(50, 3.2, 0);  // 4350 - 4500
  road.addSprite(4370, 'sign_chevron_right', -1.4);
  road.addSprite(4430, 'obstacle_drum', 1.6);

  // 4-4. The Great Stunt Jump: Double Ramp setup!
  road.addHill(50, 45); // 4500 - 4650
  road.addSprite(4530, 'obstacle_ramp', -0.35); // Left lane ramp
  road.addSprite(4530, 'obstacle_ramp', 0.35);  // Right lane ramp
  road.addSprite(4548, 'obstacle_oil', 0.0);    // Oil in middle

  // 4-5. High-speed drop
  road.addHill(50, -45); // 4650 - 4800
  road.addSprite(4710, 'obstacle_steel_plate', 0.0);
  road.addSprite(4760, 'obstacle_drum', -1.6);

  // 4-6. Final Slalom Obstacle Gauntlet
  road.addStraight(50); // 4800 - 4950
  for (let n = 4820; n < 4930; n += 8) {
    road.addSprite(n, 'obstacle_cone', (n % 16 === 0 ? 0.35 : -0.35));
    if (n % 24 === 0) road.addSprite(n, 'obstacle_drum', (n % 48 === 0 ? 1.6 : -1.6));
  }

  // 4-7. Pre-finish sweeping curve
  road.addCurve(50, -2.5, 0); // 4950 - 5100
  road.addSprite(4980, 'sign_chevron_left', 1.4);
  road.addSprite(5040, 'obstacle_oil', 0.3);

  // 4-8. Final launch ramp before checkered line
  road.addStraight(50); // 5100 - 5250
  road.addSprite(5140, 'obstacle_ramp', 0.0); // Glory jump!
  road.addSprite(5190, 'sign_roadworks', 1.4);
  road.addSprite(5190, 'sign_roadworks', -1.4);

  // 4-9. Final Full-Throttle Sprint to Finish Line
  road.addStraight(50); // 5250 - 5400
  road.markFinish();    // Segment ~5,399 Checkered Tarmac + Stage Cleared

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Roadworks track built: ${road.segments.length} segments`);
}

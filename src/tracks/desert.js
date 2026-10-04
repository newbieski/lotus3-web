// Track: Desert Canyon Course (사막 협곡 - Authentic Lotus 3 5,400-Segment Championship Stage)
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

  // =========================================================================
  // SECTOR 1 (Segments 0 ~ 1,350): Mojave Salt Flats & Saguaro Canyons
  // =========================================================================
  // 1-1. Starting straight across flat desert
  road.addStraight(50); // 0 - 150
  for (let n = 15; n < 140; n += 10) {
    road.addSprite(n, 'obstacle_cactus', -1.7 - Math.random() * 1.4);
    road.addSprite(n, 'obstacle_cactus', 1.7 + Math.random() * 1.4);
  }

  // 1-2. Sweeping right curve into canyon gorge
  road.addCurve(50, 2.5, 0); // 150 - 300
  road.addSprite(170, 'sign_chevron_right', -1.35);
  for (let n = 160; n < 290; n += 10) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 230) road.addSprite(n, 'obstacle_desert_rock', 0.65);
  }

  // 1-3. Canyon high-speed straight
  road.addStraight(50); // 300 - 450
  road.addSprite(340, 'obstacle_desert_rock', -0.6);
  for (let n = 310; n < 440; n += 10) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.65 : -1.65));
  }

  // 1-4. Canyon Gully Jump Ramp! (Stunt across canyon gap)
  road.addHill(50, 45);  // 450 - 600
  road.addHill(50, -45); // 600 - 750
  road.addSprite(510, 'obstacle_ramp', 0.0); // Center ramp
  road.addSprite(530, 'obstacle_desert_rock', -0.6);
  road.addSprite(530, 'obstacle_desert_rock', 0.6);

  // 1-5. High-speed left curve through sandstone mesas
  road.addCurve(50, -2.8, 15); // 750 - 900
  road.addSprite(770, 'sign_chevron_left', 1.35);
  road.addSprite(830, 'obstacle_desert_rock', -0.65);

  // 1-6. Fast reverse S-curves
  road.addCurve(50, 3.0, 0);  // 900 - 1050
  road.addCurve(50, -3.0, 0); // 1050 - 1200
  road.addSprite(920, 'sign_chevron_right', -1.35);
  road.addSprite(1070, 'sign_chevron_left', 1.35);
  road.addSprite(1010, 'obstacle_desert_rock', 0.65);

  // 1-7. Straight into Checkpoint 1
  road.addStraight(50); // 1200 - 1350
  for (let n = 1220; n < 1340; n += 12) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // CHECKPOINT 1 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~1,349

  // =========================================================================
  // SECTOR 2 (Segments 1,350 ~ 2,700): Mesa Plateau & Canyon Jumps
  // =========================================================================
  // 2-1. Steep red sandstone mesa climb
  road.addHill(50, 60); // 1350 - 1500
  for (let n = 1360; n < 1480; n += 10) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.7 : -1.7));
  }

  // 2-2. Crest Jump Ramp across canyon gap!
  road.addHill(50, -60); // 1500 - 1650
  road.addSprite(1510, 'obstacle_ramp', -0.25);
  road.addSprite(1530, 'obstacle_desert_rock', -0.25); // Fly over rock!
  road.addSprite(1580, 'obstacle_desert_rock', 0.65);

  // 2-3. High-speed sweeping curve
  road.addCurve(50, -3.2, 0); // 1650 - 1800
  road.addSprite(1670, 'sign_chevron_left', 1.35);
  road.addSprite(1730, 'obstacle_desert_rock', -0.65);

  // 2-4. Undulating dunes
  road.addHill(50, 45);  // 1800 - 1950
  road.addHill(50, -45); // 1950 - 2100
  road.addSprite(1860, 'obstacle_ramp', 0.25);
  road.addSprite(2020, 'obstacle_desert_rock', -0.65);

  // 2-5. Fast winding canyon descent
  road.addCurve(50, 2.8, -20); // 2100 - 2250
  road.addCurve(50, -2.8, 20); // 2250 - 2400
  road.addSprite(2120, 'sign_chevron_right', -1.35);
  road.addSprite(2270, 'sign_chevron_left', 1.35);

  // 2-6. Red canyon straight
  road.addStraight(50); // 2400 - 2550
  road.addSprite(2460, 'obstacle_desert_rock', 0.65);
  road.addSprite(2500, 'obstacle_desert_rock', -0.65);

  // 2-7. High-speed approach into Checkpoint 2
  road.addStraight(50); // 2550 - 2700
  for (let n = 2570; n < 2690; n += 12) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // CHECKPOINT 2 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~2,699

  // =========================================================================
  // SECTOR 3 (Segments 2,700 ~ 4,050): Sandstone Buttes & S-Curve Chicanes
  // =========================================================================
  // 3-1. Sharp chicane entry
  road.addCurve(50, -3.5, 0); // 2700 - 2850
  road.addSprite(2720, 'sign_chevron_left', 1.35);
  road.addSprite(2790, 'obstacle_desert_rock', -0.6);

  // 3-2. Counter right hook
  road.addCurve(50, 3.5, 0);  // 2850 - 3000
  road.addSprite(2870, 'sign_chevron_right', -1.35);
  road.addSprite(2930, 'obstacle_desert_rock', 0.65);

  // 3-3. Rollercoaster canyon plunge with jump ramp
  road.addHill(50, 50);  // 3000 - 3150
  road.addHill(50, -50); // 3150 - 3300
  road.addSprite(3080, 'obstacle_ramp', 0.0);
  road.addSprite(3230, 'obstacle_desert_rock', -0.65);

  // 3-4. Long sweeping desert curve
  road.addCurve(50, 2.6, 15); // 3300 - 3450
  road.addSprite(3320, 'sign_chevron_right', -1.35);

  // 3-5. Saguaro field straight
  road.addStraight(50); // 3450 - 3600
  road.addSprite(3490, 'obstacle_desert_rock', 0.65);
  road.addSprite(3550, 'obstacle_desert_rock', -0.65);

  // 3-6. Fast uphill curve
  road.addCurve(50, -3.0, 30); // 3600 - 3750
  road.addSprite(3620, 'sign_chevron_left', 1.35);

  // 3-7. Mountain ridge descent straight
  road.addHill(50, -30); // 3750 - 3900
  road.addStraight(50);  // 3900 - 4050
  road.addSprite(3820, 'obstacle_ramp', 0.25);
  road.addSprite(3950, 'obstacle_desert_rock', -0.6);

  // CHECKPOINT 3 (+40 SECONDS)
  road.markCheckpoint(40); // At segment ~4,049

  // =========================================================================
  // SECTOR 4 (Segments 4,050 ~ 5,400): Sunset Sprint to Finish
  // =========================================================================
  // 4-1. High-speed canyon dash
  road.addStraight(50); // 4050 - 4200
  for (let n = 4070; n < 4180; n += 10) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6));
  }

  // 4-2. Hard left sweeper
  road.addCurve(50, -3.2, 0); // 4200 - 4350
  road.addSprite(4220, 'sign_chevron_left', 1.35);
  road.addSprite(4280, 'obstacle_desert_rock', -0.65);

  // 4-3. Hard right counter sweeper
  road.addCurve(50, 3.2, 0);  // 4350 - 4500
  road.addSprite(4370, 'sign_chevron_right', -1.35);
  road.addSprite(4430, 'obstacle_desert_rock', 0.65);

  // 4-4. Final mesa crest and dip with jump ramp
  road.addHill(50, 45);  // 4500 - 4650
  road.addHill(50, -45); // 4650 - 4800
  road.addSprite(4540, 'obstacle_ramp', 0.0);
  road.addSprite(4600, 'obstacle_desert_rock', -0.65);

  // 4-5. Cactus & Rock Slalom
  road.addStraight(50); // 4800 - 4950
  for (let n = 4820; n < 4930; n += 16) {
    road.addSprite(n, 'obstacle_cactus', (n % 2 === 0 ? 1.6 : -1.6));
    if (n % 32 === 0) road.addSprite(n, 'obstacle_desert_rock', -0.6);
    if (n % 32 === 16) road.addSprite(n, 'obstacle_desert_rock', 0.6);
  }

  // 4-6. Final sweeping curve out of canyon
  road.addCurve(50, -2.5, 0); // 4950 - 5100
  road.addSprite(4980, 'sign_chevron_left', 1.35);

  // 4-7. Broad open desert straightaway
  road.addStraight(50); // 5100 - 5250
  road.addSprite(5140, 'obstacle_ramp', 0.0); // Stunt jump towards finish line!

  // 4-8. Final Sprint across the sunset desert to Finish Line
  road.addStraight(50); // 5250 - 5400
  road.markFinish();    // Segment ~5,399 Checkered Tarmac + Stage Cleared

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Desert track built: ${road.segments.length} segments`);
}

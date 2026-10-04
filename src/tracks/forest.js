// Track: Forest Course (자연풍경 / 울창한 침엽수 숲 - Authentic Lotus 3 Nature Stage)
import { CONFIG } from '../config.js';

export function buildForestTrack(road) {
  road.reset();

  // Authentic Lotus 3 Forest Theme: Crisp Blue Sky, Lush Alpine Grass, Red/White Curbs (No Cranes!)
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

  // 1. Starting grid & straightaway through lush meadows
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner overhead

  for (let n = 10; n < 40; n += 5) {
    road.addSprite(n, 'tree_pine', -1.6 - Math.random() * 1.5);
    road.addSprite(n, 'tree_deciduous', 1.6 + Math.random() * 1.5);
  }

  // 2. Gentle sweeping left curve through dense pine canopy
  road.addCurve(45, -2.2, 0);
  for (let n = 40; n < 160; n += 5) {
    road.addSprite(n, 'tree_pine', -1.5 - Math.random() * 1.8);
    road.addSprite(n, 'tree_pine', 1.5 + Math.random() * 1.8);
    if (n % 20 === 0) {
      road.addSprite(n, 'obstacle_rock', -1.25);
    }
  }

  // Warning chevron signs before mountain climb
  road.addSprite(165, 'sign_chevron_right', -1.3);
  road.addSprite(168, 'sign_chevron_right', -1.3);

  // 3. Medium right curve + hill climb
  road.addCurve(50, 3.0, 30);
  for (let n = 170; n < 310; n += 6) {
    road.addSprite(n, 'tree_deciduous', -1.5 - Math.random() * 1.5);
    road.addSprite(n, 'tree_pine', 1.5 + Math.random() * 1.8);
    if (n === 220) road.addSprite(n, 'obstacle_log', 0.6); // Fallen log hazard!
    if (n === 260) road.addSprite(n, 'obstacle_rock', -0.6);
  }

  // 4. CHECKPOINT 1 (+45 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(350, 45);

  // 5. Undulating Rollercoaster Hills (Classic Lotus 3 Nature Hills)
  road.addHill(40, 45);   // Steep climb
  road.addHill(35, -45);  // Steep dip
  road.addHill(40, 55);   // Crest
  road.addHill(45, -55);  // Plunge

  for (let n = 370; n < 530; n += 6) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1 : -1) * (1.6 + Math.random() * 2.0));
    if (n === 440) road.addSprite(n, 'obstacle_log', -0.65);
    if (n === 490) road.addSprite(n, 'obstacle_rock', 0.65);
  }

  // 6. Fast S-curves with Warning Signs
  road.addSprite(540, 'sign_chevron_left', 1.3);
  road.addCurve(45, -3.5, 0); // Hard left
  road.addSprite(640, 'sign_chevron_right', -1.3);
  road.addCurve(45, 3.5, -10); // Hard right

  for (let n = 540; n < 780; n += 6) {
    road.addSprite(n, 'tree_pine', -1.8 - Math.random() * 1.5);
    road.addSprite(n, 'tree_deciduous', 1.8 + Math.random() * 1.5);
  }

  // 7. CHECKPOINT 2 (+40 SECONDS)
  road.addStraight(30);
  road.addCheckpoint(810, 40);

  // 8. Long high-speed lakeside forest straight with obstacles
  road.addCurve(55, 1.8, 15);
  road.addCurve(55, -1.8, -15);
  road.addStraight(60);

  for (let n = 830; n < 1150; n += 8) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.6 : -1.6) - Math.random());
    if (n === 930) road.addSprite(n, 'obstacle_log', -0.7);
    if (n === 1020) road.addSprite(n, 'obstacle_rock', 0.7);
    if (n === 1090) road.addSprite(n, 'obstacle_log', 0.5);
  }

  // 9. Final sprint towards Finish Line Gantry
  road.addCurve(40, -1.8, 15);
  road.addHill(40, -15);
  road.addStraight(50);
  road.addCheckpoint(1300, 0); // FINISH LINE
  road.addSprite(1300, 'gantry_start', 0); // Finish Banner

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Forest track built: ${road.segments.length} segments`);
}

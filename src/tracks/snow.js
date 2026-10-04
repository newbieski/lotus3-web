// Track: Snow / Blizzard Course (Lotus 3 Authentic Winter Stage)
import { CONFIG } from '../config.js';

export function buildSnowTrack(road) {
  road.reset();

  road.theme = {
    sky: 'bg_sky',
    skyline: 'bg_mountains',
    grassDark: '#d4e6f4',    // Snowbanks
    grassLight: '#eaf4fc',
    roadDark: '#607282',     // Frozen dark asphalt
    roadLight: '#728494',
    rumbleDark: '#3388cc',   // Ice blue
    rumbleLight: '#ffffff',
    isSnow: true             // Triggers falling snow effect
  };

  road.addStraight(35);
  road.addSprite(5, 'gantry_start', 0);

  for (let n = 0; n < 35; n += 5) {
    road.addSprite(n, 'tree_snow', -1.6 - Math.random());
    road.addSprite(n, 'tree_snow', 1.6 + Math.random());
  }

  // Winding mountain pass
  road.addCurve(45, -3.0, 30);
  road.addCurve(45, 3.0, -30);
  for (let n = 35; n < 125; n += 6) {
    road.addSprite(n, 'tree_snow', (n % 2 === 0 ? 1.5 : -1.5) + (Math.random() * 0.8));
    if (n === 80) road.addSprite(n, 'obstacle_rock', -0.5);
  }

  road.addCheckpoint(140, 45); // Checkpoint 1

  // Rollercoaster snowy hills
  road.addHill(35, 55);
  road.addHill(35, -55);
  road.addCurve(40, -2.5, 0);

  for (let n = 145; n < 255; n += 6) {
    road.addSprite(n, 'tree_snow', (n % 2 === 0 ? 1.6 : -1.6));
    if (n === 190) road.addSprite(n, 'obstacle_rock', 0.6);
  }

  road.addCheckpoint(280, 40); // Checkpoint 2

  road.addCurve(50, 3.5, 10);
  road.addStraight(40);
  road.addCheckpoint(370, 0); // FINISH LINE
  road.addSprite(370, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Snow track built: ${road.segments.length} segments`);
}

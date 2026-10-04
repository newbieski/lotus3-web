// Track 1: Forest Course (Authentic Lotus 2 Forest Track Layout)
export function buildForestTrack(road) {
  road.reset();

  // 1. Starting grid & straightaway
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner overhead

  // Scenery around start
  for (let n = 0; n < 40; n += 4) {
    road.addSprite(n, 'tree_pine', -1.6 - Math.random() * 1.5);
    road.addSprite(n, 'tree_deciduous', 1.6 + Math.random() * 1.5);
  }

  // 2. First gentle left curve through deep woods
  road.addCurve(45, -2.5, 10);
  for (let n = 40; n < 175; n += 5) {
    road.addSprite(n, 'tree_pine', -1.4 - Math.random() * 2.0);
    road.addSprite(n, 'tree_pine', 1.4 + Math.random() * 2.0);
    if (n % 20 === 0) {
      road.addSprite(n, 'obstacle_rock', -1.25);
    }
  }

  // Warning for upcoming right turn
  road.addSprite(170, 'sign_chevron_right', -1.3);
  road.addSprite(173, 'sign_chevron_right', -1.3);

  // 3. Medium right curve + slight hill
  road.addCurve(50, 3.2, 25);
  for (let n = 175; n < 325; n += 6) {
    road.addSprite(n, 'tree_deciduous', -1.5 - Math.random() * 1.5);
    road.addSprite(n, 'tree_pine', 1.5 + Math.random() * 1.8);
    // Lotus 2 Forest wood log obstacle on road edge!
    if (n === 230) road.addSprite(n, 'obstacle_log', 0.6);
  }

  // 4. CHECKPOINT 1
  road.addStraight(30);
  road.addCheckpoint(380, 45); // Checkpoint 1

  // 5. Rollercoaster hills (Lotus 2 famous undulation)
  road.addHill(40, 45);   // Steep climb
  road.addHill(35, -45);  // Steep dip
  road.addHill(40, 55);   // Crest
  road.addHill(45, -55);  // Downhill plunge

  for (let n = 415; n < 575; n += 5) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1 : -1) * (1.6 + Math.random() * 2.0));
    if (n === 480) road.addSprite(n, 'obstacle_rock', 0.7);
    if (n === 520) road.addSprite(n, 'obstacle_log', -0.5);
  }

  // 6. S-curves with Warning Signs
  road.addSprite(570, 'sign_chevron_left', 1.3);
  road.addCurve(45, -3.8, 0); // Hard left
  road.addSprite(695, 'sign_chevron_right', -1.3);
  road.addCurve(45, 3.8, -10); // Hard right

  for (let n = 575; n < 845; n += 6) {
    road.addSprite(n, 'tree_pine', -1.8 - Math.random() * 1.5);
    road.addSprite(n, 'tree_deciduous', 1.8 + Math.random() * 1.5);
  }

  // 7. CHECKPOINT 2
  road.addStraight(30);
  road.addCheckpoint(890, 40); // Checkpoint 2

  // 8. Long high-speed sweeping section with log hazards
  road.addCurve(60, 2.0, 15);
  road.addCurve(60, -2.0, -15);
  road.addStraight(60);

  for (let n = 920; n < 1280; n += 8) {
    road.addSprite(n, 'tree_pine', (n % 2 === 0 ? 1.5 : -1.5) - Math.random());
    if (n === 1040) road.addSprite(n, 'obstacle_log', -0.7);
    if (n === 1160) road.addSprite(n, 'obstacle_log', 0.65);
    if (n === 1210) road.addSprite(n, 'obstacle_rock', -0.6);
  }

  // 9. Final sprint towards Finish Line
  road.addCurve(40, -1.8, 20);
  road.addHill(40, -20);
  road.addStraight(50);
  road.addCheckpoint(1480, 0); // FINISH LINE
  road.addSprite(1480, 'gantry_start', 0); // Finish Banner

  road.finishBuilding();
  console.log(`Forest track built: ${road.segments.length} segments (${road.trackLength} units)`);
}

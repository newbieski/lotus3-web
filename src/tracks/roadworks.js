// Track: Roadworks Course (도로 공사장 맵 - Lotus 3 Authentic Stage)
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
    rumbleLight: '#f5b800'   // Hazard construction bright yellow
  };

  // -------------------------------------------------------------
  // 1. STARTING PERIMETER: Industrial compound & Excavators
  // -------------------------------------------------------------
  road.addStraight(40);
  road.addSprite(5, 'gantry_start', 0); // Start Banner overhead

  // Roadside warning signs, excavators, and construction drums
  road.addSprite(12, 'obstacle_excavator', 1.8);
  road.addSprite(18, 'sign_roadworks', 1.5);
  road.addSprite(25, 'obstacle_drum', -1.5);
  road.addSprite(30, 'obstacle_drum', 1.5);
  road.addSprite(36, 'sign_chevron_left', 1.4);

  // -------------------------------------------------------------
  // 2. TRENCH ZONE: Road Narrows with Steel Plates & Barricades
  // -------------------------------------------------------------
  road.addCurve(45, -1.8, 0); // Left curve

  // Steel trench plates on the asphalt
  road.addSprite(45, 'obstacle_steel_plate', 0.0);
  road.addSprite(55, 'obstacle_steel_plate', -0.2);

  for (let n = 42; n < 85; n += 2) {
    // Tapering orange traffic cones closing right lane
    const coneOffset = 1.0 - (Math.min(n - 42, 10) / 10) * 0.7;
    road.addSprite(n, 'obstacle_cone', coneOffset);

    if (n % 6 === 0) {
      road.addSprite(n, 'obstacle_barricade', coneOffset + 0.35);
      road.addSprite(n, 'obstacle_drum', 1.7);
    }
  }

  road.addSprite(70, 'obstacle_excavator', -1.9);

  // -------------------------------------------------------------
  // 3. JUMP RAMP & OIL SLICK COMBO! (Classic Lotus 3 Stunt Section)
  // -------------------------------------------------------------
  road.addStraight(45);
  road.addSprite(88, 'sign_roadworks', 1.4);

  // Jump Ramp in center of lane!
  road.addSprite(102, 'obstacle_ramp', 0.0);

  // Right behind the ramp: Oil slicks across the asphalt!
  // (Jumping over the ramp clears the oil, staying on road requires swerving!)
  road.addSprite(110, 'obstacle_oil', -0.4);
  road.addSprite(112, 'obstacle_oil', 0.4);
  road.addSprite(116, 'obstacle_oil', 0.0);

  road.addSprite(120, 'obstacle_drum', -1.5);
  road.addSprite(120, 'obstacle_drum', 1.5);

  // -------------------------------------------------------------
  // 4. CHECKPOINT 1 (+45 SECONDS)
  // -------------------------------------------------------------
  road.addCheckpoint(135, 45);

  // -------------------------------------------------------------
  // 5. EARTHWORKS S-CURVES: Left Lane Closed, Steep Hill, Heavy Digger
  // -------------------------------------------------------------
  road.addSprite(142, 'sign_roadworks', -1.4);
  road.addSprite(145, 'sign_chevron_right', -1.4);

  road.addCurve(45, 3.2, 35);  // Uphill right
  road.addCurve(45, -3.2, -35); // Downhill left

  road.addSprite(160, 'obstacle_excavator', 1.8);

  // Left lane blocked with cones and barricades
  for (let n = 148; n < 225; n += 3) {
    const coneOffset = -1.0 + (Math.min(n - 148, 12) / 12) * 0.7;
    road.addSprite(n, 'obstacle_cone', coneOffset);
    if (n % 6 === 0) {
      road.addSprite(n, 'obstacle_barricade', coneOffset - 0.35);
    }
    if (n % 12 === 0) {
      road.addSprite(n, 'obstacle_drum', 1.6);
    }
  }

  // Second Jump Ramp placed on hill crest
  road.addSprite(190, 'obstacle_ramp', 0.2);
  road.addSprite(196, 'obstacle_oil', 0.2);
  road.addSprite(205, 'obstacle_steel_plate', -0.1);

  // -------------------------------------------------------------
  // 6. HIGH-SPEED OVERPASS & OIL EVASION GAUNTLET
  // -------------------------------------------------------------
  road.addHill(30, 45);
  road.addStraight(40);
  road.addHill(30, -45);

  road.addSprite(235, 'sign_roadworks', 1.5);
  road.addSprite(250, 'obstacle_steel_plate', 0.0);
  road.addSprite(265, 'obstacle_oil', -0.5);
  road.addSprite(280, 'obstacle_oil', 0.4);
  road.addSprite(295, 'obstacle_ramp', -0.3); // Off-center jump ramp
  road.addSprite(303, 'obstacle_oil', -0.3);
  road.addSprite(315, 'obstacle_drum', -1.5);
  road.addSprite(315, 'obstacle_drum', 1.5);
  road.addSprite(330, 'obstacle_excavator', -1.9);

  // -------------------------------------------------------------
  // 7. CHECKPOINT 2 (+40 SECONDS)
  // -------------------------------------------------------------
  road.addCheckpoint(355, 40);

  // -------------------------------------------------------------
  // 8. FINAL SPRINT: Slalom Obstacle Gauntlet to the Finish Line
  // -------------------------------------------------------------
  road.addCurve(45, -2.5, 15);
  road.addCurve(45, 2.5, -15);
  road.addStraight(55);

  road.addSprite(365, 'sign_roadworks', 1.4);

  // Alternating cones, oil patches, and final jump ramp before finish
  for (let n = 375; n < 485; n += 6) {
    if (n === 410) {
      road.addSprite(n, 'obstacle_ramp', 0.0); // Center ramp
    } else if (n === 418) {
      road.addSprite(n, 'obstacle_oil', -0.35);
      road.addSprite(n, 'obstacle_oil', 0.35);
    } else if (n % 12 === 0) {
      road.addSprite(n, 'obstacle_cone', (n % 24 === 0 ? 0.35 : -0.35));
      road.addSprite(n, 'obstacle_steel_plate', 0.0);
    }
    road.addSprite(n, 'obstacle_drum', (n % 2 === 0 ? 1.6 : -1.6));
  }

  road.addSprite(470, 'obstacle_excavator', 1.8);

  // Finish Line Gantry
  road.addCheckpoint(500, 0); // FINISH LINE
  road.addSprite(500, 'gantry_start', 0);

  road.finishBuilding();
  console.log(`Authentic Lotus 3 Roadworks track built: ${road.segments.length} segments`);
}

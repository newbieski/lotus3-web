// Game Constants & Configuration for Lotus 3 (Lotus III: The Ultimate Challenge) Web Engine
export const CONFIG = {
  // Display
  SCREEN_WIDTH: 640,
  SCREEN_HEIGHT: 400, // Authentic 16:10 retro resolution (scaled up via CSS)
  FPS: 60,
  STEP: 1 / 60,

  // Road Geometry
  ROAD_WIDTH: 2000,
  SEGMENT_LENGTH: 200,
  RUMBLE_LENGTH: 3,     // Segments per rumble color toggle
  LANES: 2,
  DRAW_DISTANCE: 260,   // Segments to draw ahead

  // Camera
  CAMERA_HEIGHT: 1000,  // Z-height of camera above road
  CAMERA_DEPTH: 0.84,   // Field of view parameter (d = 1 / tan(fov/2))
  FOV: 100,

  // Physics
  MAX_SPEED: 12000,     // Top speed (scaled ~145 mph for Lotus Elan SE)
  ACCEL: 12000 / 4.8,   // 0-60 mph in ~6.5s
  BREAKING: -15000,
  DECEL_NATURAL: -2400, // Engine braking / rolling resistance
  DECEL_OFFROAD: -7000, // Heavy resistance on grass/dirt
  CENTRIFUGAL: 0.32,    // Centrifugal force multiplier on curves
  STEER_SPEED: 2.8,

  // Colors
  COLORS: {
    SKY: '#1d4a8e',
    ROAD_LIGHT: '#444850',
    ROAD_DARK: '#3c4048',
    RUMBLE_LIGHT: '#ffffff',
    RUMBLE_DARK: '#d62222',
    GRASS_LIGHT: '#1b5a26',
    GRASS_DARK: '#14461d',
    LANE_LINE: '#ffd700',
    FOG: '#14461d'
  }
};

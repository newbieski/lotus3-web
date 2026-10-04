// Sprite Manager: Preloads and manages all arcade 2D sprites
export class SpriteManager {
  constructor() {
    this.images = new Map();
    this.isLoaded = false;
  }

  async loadAll() {
    const spriteList = [
      // Backgrounds
      { key: 'bg_sky', path: 'assets/sprites/bg_sky.png' },
      { key: 'bg_mountains', path: 'assets/sprites/bg_mountains.png' },
      { key: 'bg_forest_hills', path: 'assets/sprites/bg_forest_hills.png' },

      // Player Lotus Elan SE
      { key: 'player_straight', path: 'assets/sprites/player_elan_straight.png' },
      { key: 'player_straight_brake', path: 'assets/sprites/player_elan_straight_brake.png' },
      { key: 'player_straight_up', path: 'assets/sprites/player_elan_straight_up.png' },
      { key: 'player_left', path: 'assets/sprites/player_elan_left.png' },
      { key: 'player_left_brake', path: 'assets/sprites/player_elan_left_brake.png' },
      { key: 'player_left_up', path: 'assets/sprites/player_elan_left_up.png' },
      { key: 'player_hard_left', path: 'assets/sprites/player_elan_hard_left.png' },
      { key: 'player_hard_left_brake', path: 'assets/sprites/player_elan_hard_left_brake.png' },
      { key: 'player_hard_left_up', path: 'assets/sprites/player_elan_hard_left_up.png' },
      { key: 'player_right', path: 'assets/sprites/player_elan_right.png' },
      { key: 'player_right_brake', path: 'assets/sprites/player_elan_right_brake.png' },
      { key: 'player_right_up', path: 'assets/sprites/player_elan_right_up.png' },
      { key: 'player_hard_right', path: 'assets/sprites/player_elan_hard_right.png' },
      { key: 'player_hard_right_brake', path: 'assets/sprites/player_elan_hard_right_brake.png' },
      { key: 'player_hard_right_up', path: 'assets/sprites/player_elan_hard_right_up.png' },

      // Rivals
      { key: 'rival_red_straight', path: 'assets/sprites/rival_red_straight.png' },
      { key: 'rival_red_left', path: 'assets/sprites/rival_red_left.png' },
      { key: 'rival_red_right', path: 'assets/sprites/rival_red_right.png' },
      { key: 'rival_yellow_straight', path: 'assets/sprites/rival_yellow_straight.png' },
      { key: 'rival_yellow_left', path: 'assets/sprites/rival_yellow_left.png' },
      { key: 'rival_yellow_right', path: 'assets/sprites/rival_yellow_right.png' },
      { key: 'rival_blue_straight', path: 'assets/sprites/rival_blue_straight.png' },
      { key: 'rival_blue_left', path: 'assets/sprites/rival_blue_left.png' },
      { key: 'rival_blue_right', path: 'assets/sprites/rival_blue_right.png' },
      { key: 'rival_white_straight', path: 'assets/sprites/rival_white_straight.png' },
      { key: 'rival_white_left', path: 'assets/sprites/rival_white_left.png' },
      { key: 'rival_white_right', path: 'assets/sprites/rival_white_right.png' },

      // Environment & Roadside (Nature)
      { key: 'tree_pine', path: 'assets/sprites/tree_pine.png' },
      { key: 'tree_deciduous', path: 'assets/sprites/tree_deciduous.png' },
      { key: 'obstacle_log', path: 'assets/sprites/obstacle_log.png' },
      { key: 'obstacle_rock', path: 'assets/sprites/obstacle_rock.png' },
      { key: 'sign_chevron_left', path: 'assets/sprites/sign_chevron_left.png' },
      { key: 'sign_chevron_right', path: 'assets/sprites/sign_chevron_right.png' },
      { key: 'gantry_start', path: 'assets/sprites/gantry_start.png' },
      { key: 'gantry_checkpoint', path: 'assets/sprites/gantry_checkpoint.png' },

      // Lotus 3: Roadworks (공사장) Assets
      { key: 'bg_roadworks_sky', path: 'assets/sprites/bg_roadworks_sky.png' },
      { key: 'bg_roadworks_skyline', path: 'assets/sprites/bg_roadworks_skyline.png' },
      { key: 'obstacle_cone', path: 'assets/sprites/obstacle_cone.png' },
      { key: 'obstacle_barricade', path: 'assets/sprites/obstacle_barricade.png' },
      { key: 'obstacle_drum', path: 'assets/sprites/obstacle_drum.png' },
      { key: 'obstacle_oil', path: 'assets/sprites/obstacle_oil.png' },
      { key: 'obstacle_ramp', path: 'assets/sprites/obstacle_ramp.png' },
      { key: 'obstacle_excavator', path: 'assets/sprites/obstacle_excavator.png' },
      { key: 'obstacle_steel_plate', path: 'assets/sprites/obstacle_steel_plate.png' },
      { key: 'sign_roadworks', path: 'assets/sprites/sign_roadworks.png' },

      // Lotus 3: Snow (설원) Assets
      { key: 'tree_snow', path: 'assets/sprites/tree_snow.png' },

      // Lotus 3: Player Car - Lotus M200 Speedster (Silver Concept)
      { key: 'player_m200_straight', path: 'assets/sprites/player_m200_straight.png' },
      { key: 'player_m200_straight_brake', path: 'assets/sprites/player_m200_straight_brake.png' },
      { key: 'player_m200_straight_up', path: 'assets/sprites/player_m200_straight_up.png' },
      { key: 'player_m200_left', path: 'assets/sprites/player_m200_left.png' },
      { key: 'player_m200_left_brake', path: 'assets/sprites/player_m200_left_brake.png' },
      { key: 'player_m200_left_up', path: 'assets/sprites/player_m200_left_up.png' },
      { key: 'player_m200_hard_left', path: 'assets/sprites/player_m200_hard_left.png' },
      { key: 'player_m200_hard_left_brake', path: 'assets/sprites/player_m200_hard_left_brake.png' },
      { key: 'player_m200_hard_left_up', path: 'assets/sprites/player_m200_hard_left_up.png' },
      { key: 'player_m200_right', path: 'assets/sprites/player_m200_right.png' },
      { key: 'player_m200_right_brake', path: 'assets/sprites/player_m200_right_brake.png' },
      { key: 'player_m200_right_up', path: 'assets/sprites/player_m200_right_up.png' },
      { key: 'player_m200_hard_right', path: 'assets/sprites/player_m200_hard_right.png' },
      { key: 'player_m200_hard_right_brake', path: 'assets/sprites/player_m200_hard_right_brake.png' },
      { key: 'player_m200_hard_right_up', path: 'assets/sprites/player_m200_hard_right_up.png' },

      // Lotus 3: Player Car - Lotus Esprit Turbo (Red)
      { key: 'player_esprit_straight', path: 'assets/sprites/player_esprit_straight.png' },
      { key: 'player_esprit_straight_brake', path: 'assets/sprites/player_esprit_straight_brake.png' },
      { key: 'player_esprit_straight_up', path: 'assets/sprites/player_esprit_straight_up.png' },
      { key: 'player_esprit_left', path: 'assets/sprites/player_esprit_left.png' },
      { key: 'player_esprit_left_brake', path: 'assets/sprites/player_esprit_left_brake.png' },
      { key: 'player_esprit_left_up', path: 'assets/sprites/player_esprit_left_up.png' },
      { key: 'player_esprit_hard_left', path: 'assets/sprites/player_esprit_hard_left.png' },
      { key: 'player_esprit_hard_left_brake', path: 'assets/sprites/player_esprit_hard_left_brake.png' },
      { key: 'player_esprit_hard_left_up', path: 'assets/sprites/player_esprit_hard_left_up.png' },
      { key: 'player_esprit_right', path: 'assets/sprites/player_esprit_right.png' },
      { key: 'player_esprit_right_brake', path: 'assets/sprites/player_esprit_right_brake.png' },
      { key: 'player_esprit_right_up', path: 'assets/sprites/player_esprit_right_up.png' },
      { key: 'player_esprit_hard_right', path: 'assets/sprites/player_esprit_hard_right.png' },
      { key: 'player_esprit_hard_right_brake', path: 'assets/sprites/player_esprit_hard_right_brake.png' },
      { key: 'player_esprit_hard_right_up', path: 'assets/sprites/player_esprit_hard_right_up.png' }
    ];

    const promises = spriteList.map(item => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.images.set(item.key, img);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load sprite: ${item.path}`);
          resolve();
        };
        img.src = item.path;
      });
    });

    await Promise.all(promises);
    this.isLoaded = true;
  }

  get(key) {
    return this.images.get(key) || null;
  }
}

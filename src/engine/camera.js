// 3D Perspective Projection and Camera System
import { CONFIG } from '../config.js';

export class Camera {
  constructor() {
    this.x = 0;
    this.y = CONFIG.CAMERA_HEIGHT;
    this.z = 0;
    this.depth = CONFIG.CAMERA_DEPTH;
  }

  // 3D World to 2D Screen projection
  project(p, cameraX, cameraY, cameraZ, width, height, roadWidth) {
    p.camera.x = (p.world.x || 0) - cameraX;
    p.camera.y = (p.world.y || 0) - cameraY;
    p.camera.z = (p.world.z || 0) - cameraZ;

    // Prevent divide by zero or objects behind camera
    if (p.camera.z <= 0) {
      p.screen.scale = 0;
      p.screen.x = 0;
      p.screen.y = 0;
      p.screen.w = 0;
      return;
    }

    p.screen.scale = this.depth / p.camera.z;
    p.screen.x = Math.round((width / 2) + (p.screen.scale * p.camera.x * width / 2));
    p.screen.y = Math.round((height / 2) - (p.screen.scale * p.camera.y * height / 2));
    p.screen.w = Math.round(p.screen.scale * roadWidth * width / 2);
  }
}

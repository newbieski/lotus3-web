// Pseudo-3D Raster Road Renderer & Arcade HUD
import { CONFIG } from '../config.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.width = canvas.width;
    this.height = canvas.height;

    // Parallax background offsets
    this.skyOffset = 0;
    this.hillOffset = 0;
    this.treeOffset = 0;

    // Notification banners
    this.bannerText = '';
    this.bannerTimer = 0;
    this.bannerColor = '#ffff00';
  }

  showBanner(text, duration = 2.5, color = '#ffff00') {
    this.bannerText = text;
    this.bannerTimer = duration;
    this.bannerColor = color;
  }

  render(road, player, camera, spriteManager, rivalManager, dt) {
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;

    if (this.bannerTimer > 0) {
      this.bannerTimer -= dt;
    }

    // 1. Clear & Render Parallax Background
    this.renderBackground(ctx, road, player, spriteManager);

    // 2. Render Road Segments (Front-to-Back for Scanline Clipping)
    const baseSegment = road.findSegment(player.z);
    const basePercent = (player.z % CONFIG.SEGMENT_LENGTH) / CONFIG.SEGMENT_LENGTH;
    const playerSegment = road.findSegment(player.z + (CONFIG.CAMERA_HEIGHT * camera.depth));
    const playerPercent = ((player.z + (CONFIG.CAMERA_HEIGHT * camera.depth)) % CONFIG.SEGMENT_LENGTH) / CONFIG.SEGMENT_LENGTH;
    
    // Smooth camera elevation
    player.y = playerSegment.p1.world.y + (playerSegment.p2.world.y - playerSegment.p1.world.y) * playerPercent;
    
    let cameraX = player.x * CONFIG.ROAD_WIDTH;
    let cameraY = CONFIG.CAMERA_HEIGHT + player.y;
    let cameraZ = player.z - (CONFIG.CAMERA_HEIGHT * camera.depth * 0.25);

    let dx = -(baseSegment.curve * basePercent);
    let x = 0;
    let maxY = height; // Scanline occlusion limit

    // Project and render road segments
    for (let n = 0; n < CONFIG.DRAW_DISTANCE; n++) {
      const segment = road.segments[(baseSegment.index + n) % road.segments.length];
      const looped = segment.index < baseSegment.index;
      const segmentLoopedZ = looped ? road.trackLength : 0;

      // Project p1
      camera.project(
        segment.p1,
        cameraX - x,
        cameraY,
        cameraZ - segmentLoopedZ,
        width,
        height,
        CONFIG.ROAD_WIDTH
      );

      // Project p2
      camera.project(
        segment.p2,
        cameraX - x - dx,
        cameraY,
        cameraZ - segmentLoopedZ,
        width,
        height,
        CONFIG.ROAD_WIDTH
      );

      x += dx;
      dx += segment.curve;

      // Scanline culling: if segment is behind camera or completely below current horizon maxY
      if (segment.p1.camera.z <= camera.depth || 
          segment.p2.screen.y >= maxY || 
          segment.p2.screen.y >= segment.p1.screen.y) {
        segment.clip = maxY;
        continue;
      }

      // Draw road slice
      this.renderSegment(ctx, width, segment, maxY);

      // Save clipping line for sprites anchored to this segment
      segment.clip = maxY;
      maxY = segment.p2.screen.y;
    }

    // 3. Render Sprites and Vehicles (Back-to-Front)
    for (let n = CONFIG.DRAW_DISTANCE - 1; n >= 0; n--) {
      const segment = road.segments[(baseSegment.index + n) % road.segments.length];

      // Draw roadside scenery
      for (let sprite of segment.sprites) {
        const img = spriteManager.get(sprite.key);
        if (img) {
          const spriteScale = segment.p1.screen.scale;
          const spriteX = segment.p1.screen.x + (spriteScale * sprite.offset * CONFIG.ROAD_WIDTH * width / 2);
          const spriteY = segment.p1.screen.y;
          this.renderSprite(ctx, img, spriteX, spriteY, spriteScale, segment.clip, width, height);
        }
      }

      // Draw rival cars on this segment
      for (let car of segment.cars) {
        const carImg = spriteManager.get(rivalManager.getSpriteKey(car));
        if (carImg) {
          const carScale = segment.p1.screen.scale;
          const carX = segment.p1.screen.x + (carScale * car.offset * CONFIG.ROAD_WIDTH * width / 2);
          const carY = segment.p1.screen.y;
          this.renderSprite(ctx, carImg, carX, carY, carScale, segment.clip, width, height);
        }
      }
    }

    // 4. Render Player Lotus Elan SE
    this.renderPlayer(ctx, player, baseSegment, spriteManager, width, height);

    // 5. Render Lotus 2 Arcade HUD & Dashboard
    this.renderHUD(ctx, player, width, height);

    // 6. Notification Banners
    if (this.bannerTimer > 0) {
      this.renderBanner(ctx, width, height);
    }
  }

  renderBackground(ctx, road, player, spriteManager) {
    const width = this.width;
    const height = this.height;

    // Scroll parallax according to player speed and road curvature
    const speedRatio = player.speed / CONFIG.MAX_SPEED;
    const currentSegment = road.findSegment(player.z);
    const curve = currentSegment ? currentSegment.curve : 0;

    this.skyOffset = (this.skyOffset + curve * 0.15 * speedRatio + 0.1) % width;
    this.hillOffset = (this.hillOffset + curve * 0.45 * speedRatio) % width;
    this.treeOffset = (this.treeOffset + curve * 0.95 * speedRatio) % width;

    // 1. Sky
    const sky = spriteManager.get('bg_sky');
    if (sky) {
      this.drawParallaxLayer(ctx, sky, this.skyOffset, 0, width, height * 0.58);
    } else {
      ctx.fillStyle = CONFIG.COLORS.SKY;
      ctx.fillRect(0, 0, width, height * 0.58);
    }

    // 2. Mountains
    const mtn = spriteManager.get('bg_mountains');
    if (mtn) {
      this.drawParallaxLayer(ctx, mtn, this.hillOffset, height * 0.18, width, height * 0.38);
    }

    // 3. Forest Horizon
    const fst = spriteManager.get('bg_forest_hills');
    if (fst) {
      this.drawParallaxLayer(ctx, fst, this.treeOffset, height * 0.28, width, height * 0.30);
    }
  }

  drawParallaxLayer(ctx, img, offset, y, destW, destH) {
    const imgW = img.width;
    const normOffset = Math.floor(offset % imgW);
    const sourceX = normOffset < 0 ? normOffset + imgW : normOffset;

    // Draw primary slice
    const sliceW = imgW - sourceX;
    ctx.drawImage(img, sourceX, 0, sliceW, img.height, 0, y, (sliceW / imgW) * destW, destH);

    // Draw wrapping secondary slice
    if (sliceW < imgW) {
      ctx.drawImage(img, 0, 0, sourceX, img.height, (sliceW / imgW) * destW, y, (sourceX / imgW) * destW, destH);
    }
  }

  renderSegment(ctx, width, segment, maxY) {
    const p1 = segment.p1.screen;
    const p2 = segment.p2.screen;

    const r1 = p1.w / Math.max(6, 2 * CONFIG.LANES);
    const r2 = p2.w / Math.max(6, 2 * CONFIG.LANES);
    const l1 = p1.w / 32;
    const l2 = p2.w / 32;

    // Grass polygon (full horizontal span)
    ctx.fillStyle = segment.color.grass;
    ctx.fillRect(0, p2.y, width, p1.y - p2.y);

    // Rumble Strips (curbs)
    this.drawPolygon(ctx, 
      p1.x - p1.w - r1, p1.y,
      p1.x - p1.w,      p1.y,
      p2.x - p2.w,      p2.y,
      p2.x - p2.w - r2, p2.y,
      segment.color.rumble
    );
    this.drawPolygon(ctx, 
      p1.x + p1.w + r1, p1.y,
      p1.x + p1.w,      p1.y,
      p2.x + p2.w,      p2.y,
      p2.x + p2.w + r2, p2.y,
      segment.color.rumble
    );

    // Asphalt Road
    this.drawPolygon(ctx,
      p1.x - p1.w, p1.y,
      p1.x + p1.w, p1.y,
      p2.x + p2.w, p2.y,
      p2.x - p2.w, p2.y,
      segment.color.road
    );

    // Center Dashed White/Yellow Stripe
    if (segment.color.lane) {
      this.drawPolygon(ctx,
        p1.x - l1, p1.y,
        p1.x + l1, p1.y,
        p2.x + l2, p2.y,
        p2.x - l2, p2.y,
        segment.color.lane
      );
    }
  }

  drawPolygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }

  renderSprite(ctx, img, destX, destY, scale, clipY, width, height) {
    // Sprite dimensions scaled to road perspective
    const destW = (img.width * scale * width / 2) * (CONFIG.ROAD_WIDTH / 1000);
    const destH = (img.height * scale * width / 2) * (CONFIG.ROAD_WIDTH / 1000);

    const x = destX - destW / 2;
    const y = destY - destH;

    // Check if sprite is above scanline clipping (crest of hill)
    const clipH = clipY ? Math.max(0, (y + destH) - clipY) : 0;
    if (clipH >= destH) return; // Completely hidden behind hill

    if (clipH > 0) {
      // Draw partially clipped at hill crest
      const visibleH = destH - clipH;
      const sourceVisibleH = (visibleH / destH) * img.height;
      ctx.drawImage(img, 0, 0, img.width, sourceVisibleH, x, y, destW, visibleH);
    } else {
      ctx.drawImage(img, x, y, destW, destH);
    }
  }

  renderPlayer(ctx, player, currentSegment, spriteManager, width, height) {
    const isUphill = (currentSegment.p2.world.y - currentSegment.p1.world.y) > 20;
    const spriteKey = player.getSpriteKey(isUphill);
    const carImg = spriteManager.get(spriteKey);
    if (!carImg) return;

    // Engine/road bounce
    let bounce = 0;
    if (player.speed > 0) {
      const freq = player.isOffroad ? 28 : 14;
      const amp = player.isOffroad ? 4 : 1.5;
      bounce = Math.sin(performance.now() * 0.001 * freq) * amp;
    }

    const scale = 1.35;
    const carW = carImg.width * scale;
    const carH = carImg.height * scale;
    const carX = (width / 2) - (carW / 2) + (player.steer * 4);
    const carY = height - carH - 18 + bounce;

    // Exhaust smoke puffs when accelerating at speed
    if (player.speed > 1000 && !player.isBraking && Math.random() < 0.4) {
      ctx.fillStyle = 'rgba(230, 230, 230, 0.45)';
      ctx.beginPath();
      ctx.arc(carX + carW * 0.45, carY + carH - 4, 3 + Math.random() * 4, 0, Math.PI * 2);
      ctx.arc(carX + carW * 0.55, carY + carH - 4, 3 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.drawImage(carImg, carX, carY, carW, carH);
  }

  renderHUD(ctx, player, width, height) {
    // Lotus 2 Authentic Arcade HUD Bar at top
    ctx.fillStyle = 'rgba(10, 16, 26, 0.88)';
    ctx.fillRect(0, 0, width, 48);
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(0, 47, width, 2);

    ctx.font = 'bold 15px "Courier New", monospace';

    // 1. SPEED (MPH)
    const speed = player.getSpeedMph();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('SPEED', 20, 20);
    ctx.fillStyle = '#ffdd33';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText(`${speed.toString().padStart(3, ' ')} MPH`, 20, 40);

    // 2. RPM Bar
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('RPM', 130, 18);
    const rpmRatio = (player.getRPM() - 1200) / 6800;
    const barW = 100;
    ctx.fillStyle = '#222222';
    ctx.fillRect(130, 24, barW, 12);
    ctx.fillStyle = rpmRatio > 0.85 ? '#ff2222' : (rpmRatio > 0.6 ? '#ffaa00' : '#00dd44');
    ctx.fillRect(130, 24, barW * Math.min(1.0, Math.max(0, rpmRatio)), 12);
    ctx.strokeStyle = '#666666';
    ctx.strokeRect(130, 24, barW, 12);

    // 3. TIME REMAINING
    const timeSec = Math.ceil(player.timeRemaining);
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('TIME', 280, 20);
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillStyle = timeSec <= 10 ? (Math.floor(performance.now() / 250) % 2 === 0 ? '#ff1111' : '#ffffff') : '#00ff66';
    ctx.fillText(`${timeSec.toString().padStart(2, '0')}`, 280, 42);

    // 4. STAGE TITLE
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('COURSE', 380, 20);
    ctx.fillStyle = '#33ccff';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText('1 - FOREST', 380, 40);

    // 5. LAP / DISTANCE PROGRESS
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PROGRESS', 510, 20);
    const distM = Math.floor(player.z / 100);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText(`${distM}m`, 510, 40);

    // Game Over Overlay
    if (player.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#ff2222';
      ctx.font = 'bold 44px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TIME UP!', width / 2, height / 2 - 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px "Courier New", monospace';
      ctx.fillText('Press SPACE or UP to Restart Course', width / 2, height / 2 + 30);
      ctx.textAlign = 'start';
    }

    // Finish Overlay
    if (player.isFinished) {
      ctx.fillStyle = 'rgba(0, 40, 20, 0.8)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#ffff00';
      ctx.font = 'bold 42px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('STAGE CLEARED!', width / 2, height / 2 - 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px "Courier New", monospace';
      ctx.fillText(`Lap Time: ${player.lapTime.toFixed(2)}s`, width / 2, height / 2 + 25);
      ctx.fillText('Press SPACE for Next Stage', width / 2, height / 2 + 60);
      ctx.textAlign = 'start';
    }
  }

  renderBanner(ctx, width, height) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
    ctx.fillRect(width * 0.15, height * 0.38, width * 0.7, 50);
    ctx.strokeStyle = this.bannerColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(width * 0.15, height * 0.38, width * 0.7, 50);

    ctx.fillStyle = this.bannerColor;
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.bannerText, width / 2, height * 0.38 + 34);
    ctx.textAlign = 'start';
  }
}

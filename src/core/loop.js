// Fixed-timestep 60 FPS Game Loop
export class GameLoop {
  constructor(updateFn, renderFn, fps = 60) {
    this.updateFn = updateFn;
    this.renderFn = renderFn;
    this.step = 1 / fps;
    this.accumulator = 0;
    this.lastTime = 0;
    this.isRunning = false;
    this.rafId = null;
    this.actualFps = 60;
    this.frameCount = 0;
    this.fpsTimer = 0;

    this.frame = this.frame.bind(this);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.frame);
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  frame(now) {
    if (!this.isRunning) return;

    let delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // Guard against giant delta jumps when tabbing away (max 0.1s)
    if (delta > 0.1) delta = 0.1;

    this.accumulator += delta;
    while (this.accumulator >= this.step) {
      this.updateFn(this.step);
      this.accumulator -= this.step;
    }

    this.renderFn(this.accumulator / this.step);

    // FPS counter calculation
    this.frameCount++;
    this.fpsTimer += delta;
    if (this.fpsTimer >= 1.0) {
      this.actualFps = this.frameCount;
      this.frameCount = 0;
      this.fpsTimer = 0;
    }

    this.rafId = requestAnimationFrame(this.frame);
  }
}

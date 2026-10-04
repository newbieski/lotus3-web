// Input Manager supporting Keyboard, Gamepad and Touch controls
export class InputManager {
  constructor() {
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      brake: false,
      gear: false,
      music: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.keys.up = true;
        e.preventDefault();
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.down = true;
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = true;
        e.preventDefault();
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = true;
        e.preventDefault();
        break;
      case 'Space':
        this.keys.brake = true;
        e.preventDefault();
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'KeyX':
        this.keys.gear = true;
        e.preventDefault();
        break;
      case 'KeyG':
        this.keys.toggleTrans = true;
        break;
      case 'KeyM':
        this.keys.music = true;
        break;
      case 'KeyR':
        this.keys.radio = true;
        break;
      case 'KeyC':
        this.keys.garage = true;
        break;
    }
  }

  onKeyUp(e) {
    switch (e.code) {
      case 'KeyR':
        this.keys.radio = false;
        break;
      case 'ArrowUp':
      case 'KeyW':
        this.keys.up = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.down = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = false;
        break;
      case 'Space':
        this.keys.brake = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'KeyX':
        this.keys.gear = false;
        break;
      case 'KeyG':
        this.keys.toggleTrans = false;
        break;
      case 'KeyM':
        this.keys.music = false;
        break;
    }
  }

  // Polls Gamepad API if available
  pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0];
    if (!gp) return;

    // D-pad or Left stick
    const stickX = gp.axes[0];
    const stickY = gp.axes[1];

    if (stickX < -0.3 || gp.buttons[14]?.pressed) this.keys.left = true;
    else if (stickX > 0.3 || gp.buttons[15]?.pressed) this.keys.right = true;

    // A button (0) or RT (7) for Gas
    if (gp.buttons[0]?.pressed || gp.buttons[7]?.value > 0.1 || stickY < -0.4) {
      this.keys.up = true;
    }

    // B button (1) or LT (6) for Brake
    if (gp.buttons[1]?.pressed || gp.buttons[6]?.value > 0.1 || stickY > 0.4) {
      this.keys.down = true;
      this.keys.brake = true;
    }
  }
}

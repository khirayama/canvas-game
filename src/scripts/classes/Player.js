import { keyCode } from '../constants/constants';
import Attack from './Attack';
import SuperAttack from './SuperAttack';

export default class Player {
  constructor(stage, r = 20, color = 'red') {
    this.stage = stage;
    this.r = r;
    this.x = this.stage.width / 2;
    this.y = this.stage.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.power = 0;
    this.params = {
      SUPER: 85,
    };
    this.viewParams = {
      color: color,
    };
    this.flags = {
      isJumping: false,
      isPressing: false,
      isSuperPressing: false,
      isSuperAttacking: false,
    };
    this.setEventHandlers();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.power = Math.round(((this.stage.height - this.y) / this.stage.height) * 100);

    // natural
    if (!this.flags.isPressing && !this.flags.isSuperPressing && !this.flags.isSuperAttacking) {
      this.vy += 0.1;
      this.vx *= 0.98;
    }

    // max vy
    if (this.vy > 10) {
      if (!this.flags.isPressing && !this.flags.isSuperPressing) {
        this.vy = 10;
      }
    }

    // max vx
    if (this.vx > 10) {
      this.vx = 10;
    } else if (this.vx < -10) {
      this.vx = -10;
    }

    // jump
    if (this.vy > 1) {
      this.flags.isJumping = false;
    }

    // max or min y
    if (this.y > this.stage.height - this.r) {
      if (this.flags.isPressing) {
        this.jump(3);
        this.flags.isPressing = false;
      }
      if (this.flags.isSuperPressing) {
        this.jump();
        this.flags.isSuperPressing = false;
      }
      this.y = this.stage.height - this.r;
    } else if (this.y < this.r) {
      this.y = this.r;
      this.vy = 0;
    }

    // max or min x
    if (this.x < this.r) {
      this.x = this.r;
      this.vx = 0;
    }
    if (this.x > this.stage.width - this.r) {
      this.x = this.stage.width - this.r;
      this.vx = 0;
    }

    // superPress effect
    if (this.flags.isSuperPressing) {
      this.x = this.x + ((Math.random() * 20) - 10);
      this.y = this.y + ((Math.random() * 20) - 10);
    }

    // superAttack effect
    if (this.flags.isSuperAttacking) {
      this.x = this.x + ((Math.random() * 20) - 10);
      this.y = this.y + ((Math.random() * 20) - 10);
    }

    // view
    if (this.power > this.params.SUPER) {
      this.viewParams.color = 'orange';
    } else {
      this.viewParams.color = 'red';
    }
  }

  draw(context) {
    context.fillStyle = this.viewParams.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  setEventHandlers() {
    this.on('keydown', (event) => {
      const keyCode_ = event.keyCode;

      switch (keyCode_) {
      case keyCode.LEFT:
        this.moveLeft();
        break;
      case keyCode.UP:
        if (this.flags.isSuperPressing) {
          break;
        }
        this.jump();
        break;
      case keyCode.RIGHT:
        this.moveRight();
        break;
      case keyCode.DOWN:
        if (this.power <= 1) {
          this.jump();
        } else if (this.power > this.params.SUPER) {
          this.superPress();
        } else {
          this.press();
        }
        break;
      default:
        break;
      }
    });
    this.on('keyup', (event) => {
      const keyCode_ = event.keyCode;

      switch (keyCode_) {
      case keyCode.ENTER:
      case keyCode.SPACE:
        if (this.power > this.params.SUPER) {
          this.superAttack();
        } else {
          this.attack();
        }
        break;
      default:
        break;
      }
    });
  }

  attack() {
    this.jump(2);
    this.stage.add(new Attack(this.stage, this.x, this.y));
  }

  superAttack() {
    if (this.flags.isSuperAttacking) {
      return;
    }
    this.flags.isSuperAttacking = true;
    setTimeout(() => {
      this.flags.isSuperAttacking = false;
      this.jump(10);
      this.stage.add(new SuperAttack(this.stage, this.x, this.y));
    }, 3000);
  }

  press() {
    this.flags.isPressing = true;
    this.vy += this.power;
    this.vx = 0;
  }

  superPress() {
    this.flags.isSuperPressing = true;
    this.vx = 0;
    this.vy = 0;
    setTimeout(() => {
      this.vy = 100;
    }, 1000);
  }

  jump(v = 5) {
    if (this.flags.isJumping) {
      return;
    }
    this.flags.isJumping = true;
    this.vy = -v;
  }

  moveLeft() {
    this.vx -= 5;
  }

  moveRight() {
    this.vx += 5;
  }

  on(eventName, handler) {
    window.addEventListener(eventName, handler);
  }
}

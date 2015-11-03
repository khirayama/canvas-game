export default class Enemy {
  constructor(stage) {
    this.stage = stage;
    this.r = 20;
    this.x = Math.round((Math.random() * (this.stage.width - (this.r * 2))) + this.r);
    this.y = this.stage.height - 80;
    this.vx = Math.round(Math.random() * 3);
    this.vy = Math.round(Math.random() * 3);
    this.viewParams = {
      color: 'black',
    };
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;

    if (this.stage.height - this.y < this.r) {
      this.vy = 0;
      this.y = this.stage.height - this.r;
    }

    if (this.stage.count % 60 === 0) {
      this.vx = Math.round(Math.random() * 10) - 5;
      this.vy = Math.round(Math.random() * 10) - 5;
    }

    if (this.x < this.r) {
      this.vx = -this.vx;
    } else if (this.x > this.stage.width - this.r) {
      this.vx = -this.vx;
    }

    if (this.vy > 5) {
      this.vy = 5;
    } else if (this.vy < -5) {
      this.vy = -5;
    }
    if (this.vx > 5) {
      this.vx = 5;
    } else if (this.vx < -5) {
      this.vx = -5;
    }
  }

  draw(context) {
    context.fillStyle = this.viewParams.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  collision(target) {
    const className = target.constructor.name;

    switch (className) {
    case 'Enemy':
      // const xdiff = this.x - target.x;
      // const ydiff = this.y - target.y;
      //
      // const a = -xdiff / ydiff;
      // const b = (this.stage.height - this.y) - a * this.x;
      //
      // let ax = this.x - this.vx;
      // let ay = this.y - this.vy;
      // let pointax = 2 * (ax + a * (this.stage.height - ay) - a * b) / (a * a + 1) - ax || ax;
      // let pointay = this.stage.height - ((-1 / a) * pointax + (this.stage.height - ay) + (1 / a * ax)) || ay;
      //
      // let bx = target.x - target.vx;
      // let by = target.y - target.vy;
      // let pointbx = 2 * (bx + a * (this.stage.height - by) - a * b) / (a * a + 1) - bx || bx;
      // let pointby = this.stage.height - ((-1 / a) * pointbx + (this.stage.height - by) + (1 / a * bx)) || by;
      //
      // this.vx = -(this.x - pointax) * 0.5 + (target.x - pointbx) * 0.3;
      // this.vy = -(this.y - pointay) * 0.5 + (target.y - pointby) * 0.3;
      // this.x += 3 * this.vx;
      // this.y += 3 * this.vy;
      this.viewParams.color = 'yellow';
      break;
    case 'Attack':
    case 'SuperAttack':
      this.stage.remove(this);
      break;
    }
  }

  uncollision() {
    this.viewParams.color = 'black';
  }
}

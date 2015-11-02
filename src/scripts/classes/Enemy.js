export default class Enemy {
  constructor(stage, x, y) {
    this.stage = stage;
    this.r = 20;
    this.x = (Math.random() * this.stage.width - (this.r * 2)) + this.r;
    this.y = this.stage.height - 80;
    this.vx = 0;
    this.vy = 3;
    this.viewParams = {
      color: 'black',
    };
    this.count = 0;
  }

  update() {
    this.count += 1;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;

    if (this.stage.height - this.y < this.r) {
      this.vy = 0;
      this.y = this.stage.height - this.r;
    }

    if (this.count % 60 === 0) {
      this.vx = Math.round(Math.random() * 10) - 5;
      this.vy = Math.round(Math.random() * 10) - 5;
    }

    if (this.x < this.r) {
      this.vx = -this.vx;
    } else if (this.x > this.stage.width - this.r) {
      this.vx = -this.vx;
    }
  }

  draw(context) {
    context.fillStyle = this.viewParams.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
}

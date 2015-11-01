export default class Attack {
  constructor(stage, x, y) {
    this.stage = stage;
    this.r = 10;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 10;
    this.viewParams = {
      color: 'blue',
    };
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // max or min y
    if (this.y > this.stage.height - this.r) {
      this.remove();
    }
  }

  draw(context) {
    context.fillStyle = this.viewParams.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  remove() {
    this.stage.remove(this);
  }
}

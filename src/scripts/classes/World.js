import Player from './Player';
import Enemy from './Enemy';
import Engine from './Engine';

export default class World {
  constructor() {
    console.log(`Start world at ${new Date()}.`);
    this.canvas = null;
    this.context = null;
    this.objs = [];

    this.setCanvas();
    this.setup();
  }

  setCanvas() {
    this.canvas = document.getElementById('app');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 4;
    this.context = this.canvas.getContext('2d');

    // alias
    this.stage = this.canvas;
    this.stage.count = 0;
    this.stage.fps = 10;

    this.stage.add = (obj) => {
      this.objs.push(obj);
    };
    this.stage.remove = (obj) => {
      for (let i = 0; i < this.objs.length; i++) {
        if (obj === this.objs[i]) {
          this.objs.splice(i, 1);
        }
      }
    };
  }

  setup() {
    this.objs = [];
    const engine = new Engine(this.objs);
    // this.objs.push(new Camera(this.canvas, this.context));
    // this.objs.push(new Map(this.canvas, this.context));
    this.objs.push(new Player(this.stage));
    setInterval(() => {
      this.objs.push(new Enemy(this.stage));
    }, 3000);

    // TODO: Should use requestAnimationFrame.
    setInterval(() => {
      this.stage.count += 1;
      engine.collisionJudges();
      this.update();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.draw();
    }, 1000 / this.stage.fps);
  }

  update() {
    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].update();
    }
  }

  draw() {
    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].draw(this.context);
    }
  }
}


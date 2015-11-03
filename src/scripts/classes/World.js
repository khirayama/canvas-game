import Player from './Player';
import Enemy from './Enemy';
import Engine from './Engine';

export default class World {
  constructor() {
    console.log(`Start world at ${new Date()}.`);

    this.canvas = null;
    this.context = null;
    this.objs = [];
    this.fps = 60;
    this.count = 0;

    this.setCanvas();
    this.start();
  }

  setCanvas() {
    this.canvas = document.getElementById('app');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');

    // alias
    this.stage = {
      screen: this.canvas,
      width: this.canvas.width,
      height: this.canvas.height,
      context: this.context,
      objs: this.objs,
      fps: this.fps,
      count: this.count,
      add: this.add,
      remove: this.remove,
    };
  }

  start() {
    this.setup();
    // TODO: Should use requestAnimationFrame.
    setInterval(() => {
      this.engine.collisionJudges(this.objs);
      this.update();
      this.stage.context.clearRect(0, 0, this.stage.screen.width, this.stage.screen.height);
      this.draw();
    }, 1000 / this.stage.fps);
  }

  setup() {
    this.engine = new Engine(this);
    this.add(new Player(this.stage));
    // this.objs.push(new Camera(this.canvas, this.context));
    // this.objs.push(new Map(this.canvas, this.context));
  }

  update() {
    this.stage.count += 1;
    for (let index = 0; index < this.stage.objs.length; index++) {
      this.stage.objs[index].update();
    }
    if (this.stage.count % (this.stage.fps) === 0) {
      this.add(new Enemy(this.stage));
    }
  }

  draw() {
    for (let index = 0; index < this.stage.objs.length; index++) {
      this.stage.objs[index].draw(this.context);
    }
  }

  add(obj) {
    this.objs.push(obj);
  }

  remove(obj) {
    for (let index = 0; index < this.objs.length; index++) {
      if (obj === this.objs[index]) {
        this.objs.splice(index, 1);
      }
    }
  }
}

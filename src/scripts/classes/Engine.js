export default class Engine {
  constructor(world) {
    this.stage = world.stage;
    this.objs = this.stage.objs;
  }

  collisionJudges() {
    for (let i = 0; i < this.objs.length; i++) {
      const objA = this.objs[i];
      for (let j = 0; j < this.objs.length; j++) {
        if (i !== j) {
          const objB = this.objs[j];
          const distance = Engine.computeDistance(objA, objB);

          if (distance < objA.r + objB.r) {
            objA.collision(objB);
            break;
          } else {
            objA.uncollision(objB);
          }
        }
      }
    }
  }

  static computeDistance(point1, point2) {
    const xdiff = point1.x - point2.x;
    const ydiff = point1.y - point2.y;
    return Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
  }
}

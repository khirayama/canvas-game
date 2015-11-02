export default class Engine {
  constructor(objs) {
    this.objs = objs;
  }
  collisionJudges() {
    for (let i = 0; i < this.objs.length; i++) {
      for (let j = 0; j < this.objs.length; j++) {
        if (i !== j) {
          const objA = this.objs[i];
          const objB = this.objs[j];
        }
      }
    }
  }
}

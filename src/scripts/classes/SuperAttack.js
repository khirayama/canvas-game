import Attack from './Attack';

export default class SuperAttack extends Attack {
  constructor(stage, x, y) {
    super();
    this.stage = stage;
    this.r = 100;
    this.x = x;
    this.y = y;
    this.vy = 10;
    this.viewParams = {
      color: 'black',
    };
  }
}

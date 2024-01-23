import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width = 75, height = 10, color = '#0095DD') {
    super(x, y, width, height, color);
  }

  moveLeft() {
    this.x -= 7;
  }

  moveRight() {
    this.x += 7;
  }
}

export default Paddle;

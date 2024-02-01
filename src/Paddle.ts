import Sprite from './Sprite';

class Paddle extends Sprite {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(x: number, y: number, width = 75, height = 10, color = '#0095DD') {
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

import Brick from './Brick.js';
import createRandomColor from './RandomColor.js';

class Bricks {
  constructor(brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop) {
    this.bricks = this.createBricks(brickRowCount, brickColumnCount, brickWidth, brickHeight);
    this.brickRowCount = brickRowCount;
    this.brickColumnCount = brickColumnCount;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.brickPadding = brickPadding;
    this.brickOffsetLeft = brickOffsetLeft;
    this.brickOffsetTop = brickOffsetTop;
  }

  createBricks(rowCount, columnCount, width, height) {
    const bricks = [];
    for (let c = 0; c < columnCount; c += 1) {
      bricks[c] = [];
      for (let r = 0; r < rowCount; r += 1) {
        bricks[c][r] = new Brick(0, 0, width, height, createRandomColor());
      }
    }
    return bricks;
  }

  render(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const { status } = this.bricks[c][r];
        if (status === 1) {
          let brickX = r * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          if (c % 2 !== 0) {
            brickX += this.brickWidth / 2;
          }
          const brickY = c * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }
}

export default Bricks
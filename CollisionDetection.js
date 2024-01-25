class CollisionDetection {
  constructor(ball, bricks, brickRowCount, brickColumnCount, brickWidth, brickHeight, score) {
    this.ball = ball;
    this.bricks = bricks;
    this.brickRowCount = brickRowCount;
    this.brickColumnCount = brickColumnCount;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.score = score;
  }

  detectCollisions() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const { status, x: brickX, y: brickY } = this.bricks[c][r];
        if (status === 1) {
          const ballLeftEdge = this.ball.x - this.ball.radius;
          const ballRightEdge = this.ball.x + this.ball.radius;
          const ballTopEdge = this.ball.y - this.ball.radius;
          const ballBottomEdge = this.ball.y + this.ball.radius;

          if (
            ballRightEdge > brickX &&
            ballLeftEdge < brickX + this.brickWidth &&
            ballBottomEdge > brickY &&
            ballTopEdge < brickY + this.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            this.bricks[c][r].status = 0;
            this.score.score += 1;
            if (this.score.score === this.brickRowCount * this.brickColumnCount) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }
}

export default CollisionDetection


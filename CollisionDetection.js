class CollisionDetection {
  constructor(ball, bricks, score) {
    this.ball = ball;
    this.bricks = bricks;
    this.score = score;
  }

  detectCollisions() {
    for (let c = 0; c < this.bricks.brickColumnCount; c += 1) {
      for (let r = 0; r < this.bricks.brickRowCount; r += 1) {
        const { status, x: brickX, y: brickY } = this.bricks.bricks[c][r];
        if (status === 1) {
          const ballLeftEdge = this.ball.x - this.ball.radius;
          const ballRightEdge = this.ball.x + this.ball.radius;
          const ballTopEdge = this.ball.y - this.ball.radius;
          const ballBottomEdge = this.ball.y + this.ball.radius;

          if (
            ballRightEdge > brickX &&
            ballLeftEdge < brickX + this.bricks.brickWidth &&
            ballBottomEdge > brickY &&
            ballTopEdge < brickY + this.bricks.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            this.bricks.bricks[c][r].status = 0;
            this.score.score += 1;
            if (this.score.score === this.bricks.brickRowCount * this.bricks.brickColumnCount) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }
}

export default CollisionDetection;

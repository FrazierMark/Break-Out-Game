const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = canvas.width / 100;
const brickColumnCount = canvas.height / 70;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;
let lives = 3;

const createRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const rgb = [r, g, b];

  const hex = rgb.map((component) => {
    const hexComponent = component.toString(16);
    return hexComponent.length === 1 ? `0${hexComponent}` : hexComponent;
  }).join('');

  return `#${hex}`;
};

const ballColor = createRandomColor();
const paddleColor = createRandomColor();

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, createRandomColor());
gradient.addColorStop(1, createRandomColor());

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

const keyDownHandler = (e) => {
  const { key } = e;
  rightPressed = key === 'Right' || key === 'ArrowRight';
  leftPressed = key === 'Left' || key === 'ArrowLeft';
};

const keyUpHandler = (e) => {
  const { key } = e;
  rightPressed = key === 'Right' || key === 'ArrowRight' ? false : rightPressed;
  leftPressed = key === 'Left' || key === 'ArrowLeft' ? false : leftPressed;
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const { status, x: brickX, y: brickY } = bricks[c][r];
      if (status === 1) {
        const ballLeftEdge = x - ballRadius;
        const ballRightEdge = x + ballRadius;
        const ballTopEdge = y - ballRadius;
        const ballBottomEdge = y + ballRadius;

        if (
          ballRightEdge > brickX &&
          ballLeftEdge < brickX + brickWidth &&
          ballBottomEdge > brickY &&
          ballTopEdge < brickY + brickHeight
        ) {
          dy = -dy;
          bricks[c][r].status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
};

const createRandomColorForRow = (row) => {
  const baseColor = 120;
  const variation = row * 40;

  const r = (baseColor + variation) % 256;
  const g = (baseColor + variation + 60) % 256;
  const b = (baseColor + variation + 120) % 256;

  return `rgb(${r}, ${g}, ${b})`;
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight,
  );
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const { status } = bricks[c][r];
      if (status === 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        if (c % 2 !== 0) {
          brickX += brickWidth / 2;
        }
        const brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = createRandomColorForRow(r);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
};
const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
};

draw();

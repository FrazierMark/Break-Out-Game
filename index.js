// eslint-disable-next-line import/extensions
import Brick from './Brick.js';
// eslint-disable-next-line import/extensions
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Lives from './Lives.js';
import Score from './Score.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
const dx = 2;
const dy = -2;
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
let scoreCount = 0;
let livesCount = 3;

const createRandomColor = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const rgb = [r, g, b];
	const hex = rgb
		.map((component) => {
			const hexComponent = component.toString(16);
			return hexComponent.length === 1 ? `0${hexComponent}` : hexComponent;
		})
		.join('');

	return `#${hex}`;
};

const ball = new Ball(x, y, ballRadius, createRandomColor());

const paddle = new Paddle(
	(canvas.width - paddleWidth) / 2,
	canvas.height - paddleHeight,
	paddleWidth,
	paddleHeight,
	createRandomColor()
);

const score = new Score(scoreCount, 8, 20, createRandomColor());
const lives = new Lives(livesCount, canvas.width - 65, 20, createRandomColor());

const drawPaddle = () => {
	paddle.render(ctx);
};

const drawScore = () => {
	score.render(ctx);
};

const drawLives = () => {
	lives.render(ctx);
};

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, createRandomColor());
gradient.addColorStop(1, createRandomColor());

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r += 1) {
		bricks[c][r] = new Brick(0, 0, 75, 20, createRandomColor());
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
		paddle.x = relativeX - paddle.width / 2;
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
				const ballLeftEdge = ball.x - ball.radius;
				const ballRightEdge = ball.x + ball.radius;
				const ballTopEdge = ball.y - ball.radius;
				const ballBottomEdge = ball.y + ball.radius;

				if (
					ballRightEdge > brickX &&
					ballLeftEdge < brickX + brickWidth &&
					ballBottomEdge > brickY &&
					ballTopEdge < brickY + brickHeight
				) {
					ball.dy = -ball.dy; // Invert the y-direction to bounce off
					bricks[c][r].status = 0;
					score.score += 1;
					if (score.score === brickRowCount * brickColumnCount) {
						alert('YOU WIN, CONGRATS!');
						document.location.reload();
					}
				}
			}
		}
	}
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
				bricks[c][r].render(ctx);
			}
		}
	}
};

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ball.move();
	ball.render(ctx);
	drawBricks();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if (
		ball.x + ball.dx > canvas.width - ball.radius ||
		ball.x + ball.dx < ball.radius
	) {
		ball.dx = -ball.dx;
	}
	if (ball.y + ball.dy < ball.radius) {
		ball.dy = -ball.dy;
	} else if (ball.y + ball.dy > canvas.height - ball.radius) {
		if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
			ball.dy = -ball.dy;
		} else {
			lives.lives -= 1;
			if (!lives.lives) {
				alert('GAME OVER');
				document.location.reload();
			} else {
				ball.x = canvas.width / 2;
				ball.y = canvas.height - 30;
				ball.dx = 3;
				ball.dy = -3;
				paddle.x = (canvas.width - paddle.width) / 2;
			}
		}
	}

	if (rightPressed && paddle.x < canvas.width - paddle.width) {
		paddle.moveRight();
	} else if (leftPressed && paddle.x > 0) {
		paddle.moveLeft();
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
};

draw();

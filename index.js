import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Lives from './Lives.js';
import Score from './Score.js';
import createRandomColor from './RandomColor.js';
import Background from './Background.js';
import CollisionDetection from './CollisionDetection.js';
import Bricks from './Bricks.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
const dx = 2;
const dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
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
const background = new Background(
	0,
	0,
	canvas.width,
	canvas.height,
	createRandomColor(),
	createRandomColor(),
	ctx
);

const bricks = new Bricks(brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop);

const collisionDetection = new CollisionDetection(
	ball,
	bricks,
	score
);

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


const draw = () => {
	background.render(ctx);
	ball.move();
	ball.render(ctx);
  bricks.render(ctx);
	paddle.render(ctx);
	score.render(ctx);
	lives.render(ctx);
	collisionDetection.detectCollisions();

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

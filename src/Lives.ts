import Sprite from './Sprite';

class Lives extends Sprite {
	lives: number;
	width: number;
	height: number;
	color: string;

	constructor(lives: number, width: number, height = 20, color: string) {
    super()
		this.lives = lives;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.font = '16px Arial';
		ctx.fillStyle = this.color;
		ctx.fillText(`Lives: ${this.lives}`, this.width, this.height);
	}
}

export default Lives
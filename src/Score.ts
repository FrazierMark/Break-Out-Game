import Lives from './Lives';
import Sprite from './Sprite';

class Score extends Sprite {
	score: number;
	width: number;
	height: number;
	color: string;

	constructor(score: number, width = 8, height = 20, color: string) {
		super();
		this.score = score;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.font = '16px Arial';
		ctx.fillStyle = this.color;
		ctx.fillText(`Score ${this.score}`, this.width, this.height);
	}
}

export default Score;

import Sprite from './Sprite';

class Background extends Sprite {
	x0: number;
	y0: number;
	width: number;
	height: number;
	color1: string;
	color2: string;
	ctx: CanvasRenderingContext2D;
	gradient: CanvasGradient;

	constructor(x0 = 0, y0 = 0, width: number, height: number, color1: string, color2: string, ctx: CanvasRenderingContext2D) {
		super();

		this.x0 = x0;
		this.y0 = y0;
		this.width = width;
		this.height = height;
		this.color1 = color1;
		this.color2 = color2;
		this.ctx = ctx;
		this.gradient = this.createGradient();
	}

	createGradient() {
		const gradient = this.ctx.createLinearGradient(
			this.x0,
			this.y0,
			0,
			this.height
		);
		gradient.addColorStop(0, this.color1);
		gradient.addColorStop(1, this.color2);
		return gradient;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.fillStyle = this.gradient;
		ctx.fillRect(0, 0, this.width, this.height);
	}
}

export default Background;

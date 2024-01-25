import Sprite from './Sprite.js';

class Lives extends Sprite {
	constructor(lives, width, height = 20, color) {
    super()
		this.lives = lives;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	render(ctx) {
		ctx.font = '16px Arial';
		ctx.fillStyle = this.color;
		ctx.fillText(`Lives: ${this.lives}`, this.width, this.height);
	}
}

export default Lives
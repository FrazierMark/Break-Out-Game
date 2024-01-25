import Lives from './Lives.js';
import Sprite from './Sprite.js';

class Score extends Sprite {
  constructor(score, width = 8, height = 20, color){
    super()
    this.score = score
    this.width = width;
		this.height = height;
		this.color = color;
  }
  
  render(ctx) {
		ctx.font = '16px Arial';
		ctx.fillStyle = this.color;
		ctx.fillText(`Score ${this.score}`, this.width, this.height);
	}
}

export default Score;
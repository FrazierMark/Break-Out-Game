// eslint-disable-next-line import/extensions
import Sprite from './Sprite';

class Brick extends Sprite {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	status: number;

	constructor(x: number, y: number, width = 75, height = 20, color = '#0095DD') {
		super(x, y, width, height, color);
		this.status = 1;
	}
}

export default Brick;

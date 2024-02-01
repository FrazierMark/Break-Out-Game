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

export default createRandomColor

// const createRandomColor = () => {
// 	const hue = Math.random() * 360;
// 	return `hsl(${hue}, 100%, 50%)`
// }
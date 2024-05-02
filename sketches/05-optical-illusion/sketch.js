import { SvJs } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Create our pattern.
const pattern = svg.createPattern('illusion', 100, 200);

// Create a white rectangle within the pattern.
// pattern.create('rect').set({
// 	x: 5, y: 5, width: 90, height: 190, fill: '#eee'
// });

// Create 4 x white squares within the pattern.
for (let i = 0; i < 4; i += 1) {
	pattern.create('rect').set({
		x: (i === 3) ? 20: i * 20,
		y: i * 50,
		width: 50,
		height: 50,
		fill: '#eee'
	});
}

// Create 4 x thin grey rectangles to separate the squares.
for (let i = 0; i < 4; i += 1) {
	pattern.create('rect').set({
		x: 0,
		y: 45 + (i * 50),
		width: 100,
		height: 5,
		fill: '#666'
	});
}

// Apply our pattern to a rect the size of the viewBox.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: 'url(#illusion)'
});

// Create a circle and add it to a group.
// const circle = svg.create('circle');
// const group = svg.create('g');
// circle.addTo(group);

// Symbols don’t have quite the same appeal outside of a declarative context, so going forward we won’t be relying on them for our imperative-based creations. But there’s plenty more to unpack if you want to explore further on MDN.

// // Create a symbol consisting of a circle and square.
// const symbol = svg.create('symbol');
// symbol.set({ id: 'mySymbol', width: 100, height: 100 {);
// symbol.create('circle').set({ ... });
// symbol.create('rect').set({ ... });
// // Using the symbol three times but varying its co-ordinates.
// svg.create('use').set({ href: '#mySymbol', x: 0, y: 0 });
// svg.create('use').set({ href: '#mySymbol', x: 200, y: 200 });
// svg.create('use').set({ href: '#mySymbol', x: 400, y: 400 });

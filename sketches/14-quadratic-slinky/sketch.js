import { SvJs, Gen } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Style the slinky.
svg.create('style').content(`
  #slinky path {
    fill: none;
    stroke-width: 0.7;
    stroke-linecap: round;
  }`
);

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Choose a random starting hue.
let hue = Gen.random(0, 360);

// Set up the slinky path group.
let slinky = svg.create('g').set({ id: 'slinky' });

// Start the loop.
for (let i = 0; i < 500; i += 5) {

  // Create the control points.
  let cpx = Gen.random(200, 400, false);
  let cpy = i - 400;

  // Create the quadratic curve.
  slinky.create('path').set({
    stroke: `hsl(${hue} 90% 80% / 0.85)`,
    d: `M 0 ${i} q ${cpx} ${cpy} 600 0`
  });

  // Increment the hue.
  hue = (hue % 360) + 1.5;
}

slinky.moveTo(500, 500);


svg.create('path').set({
    d: 'M 50,150 Q 150,350 250,150 T 450,150 650,150 850,150 1050,150'
  });

  // Syntax for the A/a command.
  // The first two arguments and the last two arguments aren’t anything we haven’t encountered before: rx and ry refer to the radii of the x and y axes, and the final x and y arguments define the curve’s destination point. The rotation defines the angle of rotation along the x axis
// 'A [rx ry rotation large-arc-flag sweep-flag x y] ...'
// 'a [rx ry rotation large-arc-flag sweep-flag dx dy] ...'
// What’s really happening when we draw an elliptical arc curve is that two interlocking ellipses are used as guides behind the scenes to determine which of the many possible paths are actually drawn. With the large-arc-flag set to 1, a large arc will be chosen. And with the sweep-flag set to 1, the arc will be drawn in a clockwise direction. 
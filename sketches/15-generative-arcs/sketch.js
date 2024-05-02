import { SvJs, Gen } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Set up a container group for our arc curves.
let arcs = svg.create('g');

// Randomise some variables.
let rx = Gen.random(5, 350);
let ry = Gen.random(5, 350);
let hue = Gen.random(0, 360);

// Create two sets of elliptical arc curves on each iteration.
for (let i = 0; i < 360; i += 1) {

  // Randomise the rotation and large arc flag.
  let rotation = Gen.random(0, 180);
  let largeArc = Gen.chance() ? 1 : 0;

  // Create a first set of clockwise arc curves (sweep = 1).
  arcs.create('path').set({
    fill: 'none',
    stroke: `hsl(${hue} 75% 75% / 0.05)`,
    d: `M 275 500 A ${rx} ${ry} ${rotation} ${largeArc} 1 725 500`
  });

  // Create a second set of counter-clockwise arc curves (sweep = 0).
  arcs.create('path').set({
    fill: 'none',
    stroke: `hsl(${hue + 60} 75% 75% / 0.05)`,
    d: `M 275 500 A ${rx} ${ry} ${rotation} ${largeArc} 0 725 500`
  });

  // Increment the hue.
  hue = (hue % 360) + 0.5;
}

// Apply a random rotation.
arcs.rotate(Gen.random(0, 360));

svg.create('path').set({
  d: 'M 75,75 C 140,330 360,330 425,75'
});

// The S command automatically generates a symmetric control point that mirrors the control point of the preceding curve and as a result allows us to omit the first set of control point coordinates
// Extending a cubic bezier curve with the S command.
svg.create('path').set({
  d: 'M 50,150 C 100,250 200,50 250,150 S 400,50 450,150'
});

const FPS = 30;

const FRAGMENTS = 15;
const MIN_FRAGMENTS = 3;
const MAX_FRAGMENTS = 15;
const SCALE = 3;

var fragments = {};
var speeds = {};

function setup() {
  createCanvas(400, 400);

  for (var i = 0; i < 100; i++) {
    fragments[i] = floor(random(MIN_FRAGMENTS, MAX_FRAGMENTS));
    speeds[i] = random(-1, 1);
  }

  background(28);
}

function draw() {
  // if (frameCount / 1.5 % FPS == 0) {
  // background(220);
  // }

  translate(200, 200);

  stroke(255, 10);
  noFill();
  for (var r = 1; r < 10; r++) {
    let radius = r**2;

    // circle(0, 0, 2 * r**2 * SCALE);

    let offset = speeds[r] * (frameCount / FPS) / r;
    let numArcs = fragments[r];
    for (var a = 0; a < numArcs; a++) {
      let theta = a * TWO_PI / numArcs;
      let aDistance = map(noise(r, theta / 3, frameCount / FPS / 3), 0, 1, 0, TWO_PI / numArcs);

      // arc(0, 0, 2*radius * SCALE, 2*radius * SCALE, offset + theta - aDistance/2, offset + theta + aDistance/2);

      push();
      rotate(offset + theta);

      let fx = radius * SCALE, fy = 0;
      let length = SCALE * r;
      for (var z = 0; z < length; z++) {
        point(fx, fy);
        // circle(fx, fy, radius * 2);

        let offset = noise(r+a, frameCount/FPS, z/20) * PI - HALF_PI;
        fx += cos(offset);
        fy += sin(offset);

      }
      pop();
    }

  }

  // if (frameCount == 10) {
  //   noLoop();
  // }
}
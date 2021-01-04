const FPS = 30;

const CANVAS_WIDTH = 400,
    CANVAS_HEIGHT = 400;

const BACKGROUND_COLOR = 256 / 8,
    REDRAW_BACKGROUND = true;

const UNIT_PIXELS = 50;
const ROWS = Math.ceil(CANVAS_WIDTH / UNIT_PIXELS);
const COLS = Math.ceil(CANVAS_HEIGHT / UNIT_PIXELS);

const EXPORT_GIF = false,
    RECORD_FRAMES = FPS * 2;

let gif = new GIF({
  debug: true,
  quality: 0,
  workerScript: "./gif.worker.js",
  workers: 5
});

gif.on('finished', function (blob) {
  window.open(URL.createObjectURL(blob));
});

function setup() {
  frameRate(FPS);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  noLoop();
}

function draw() {
  if (REDRAW_BACKGROUND) {
    // background(BACKGROUND_COLOR);
    background(color("#b19cd9"));
  }

  // translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

  stroke(255);
  noFill();

  for (var x = 0; x <= COLS; x++) {
    for (var y = 0; y <= ROWS; y++) {
      push();
      strokeWeight(1);
      translate(x * UNIT_PIXELS, y * UNIT_PIXELS);
      translate(0, 1.5 * UNIT_PIXELS * sin(x * TWO_PI / 7));
      translate(random(UNIT_PIXELS/2) - UNIT_PIXELS/4, 0);
      // translate(UNIT_PIXELS * cos(y * TWO_PI / 7), 0);


      let fillColor = Math.floor(random(8)) * (256 / 8);
      let strokeColor = fillColor;
      // if (strokeColor === 0) {
      //   strokeColor = 255;
      // }
      let strokeStyle = Math.floor(random(6));

      // grayscale
      // fill(fillColor);
      // stroke(strokeColor);
      // colored
      fill(color(fillColor * .5, 0, fillColor));
      stroke(color(fillColor * .5, 0, strokeColor));

      // if (Math.floor(random([0, 1])) == 0) {
      //   fill(128);
      // } else {
      //   noFill();
      // }

      // let count = x % 2 + y % 2 + 2;
      let count = Math.floor(random(5) + 2);

      let style = Math.floor(random(0, 3));
      switch (style) {
        case 0:
          rotationalSymmetry(count, circles);
          break;
        case 1:
          rotationalSymmetry(count, squares);
          break;
        case 2:
          strokeWeight(Math.floor(random(5)) + 3);
          rotationalSymmetry(count, dots);
          break;
      }

      // rotationalSymmetry(x % 2 + y % 2 + 1, circles);
      pop();
    }
  }

  // rotationalSymmetry(3, () => line(0, 0, 100, 100));
  // rotationalSymmetry(3, () => circle(5, 5, 10));

  if (EXPORT_GIF) {
    if (frameCount <= RECORD_FRAMES) {
      gif.addFrame(canvas, {
        delay: 1000 / FPS,
        copy: true
      });
    }
    if (frameCount === RECORD_FRAMES) {
      gif.render();
    }
  }
}

function circles() {
  circle(5, 5, 10);
}

function squares() {
  square(5, 5, 10);
}

function dots() {
  point(5, 5);
}

function rotationalSymmetry(count, drawFn) {
  push();
  let randomInitial = random(1) * TWO_PI;
  rotate(randomInitial);
  for (var i = 0; i < count; i++) {
    drawFn();
    rotate(TWO_PI / count);
  }
  pop();
}
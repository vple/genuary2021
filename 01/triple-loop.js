const FPS = 30;

const UNIT_SCALE = 20;

const COLS = 47, ROWS = 43;

const CANVAS_WIDTH = COLS * UNIT_SCALE,
    CANVAS_HEIGHT = ROWS * UNIT_SCALE;

const BACKGROUND_COLOR = 28,
    REDRAW_BACKGROUND = true;

const TRAIL_LENGTH = 90;
const NOISE_SCALE = 2.5;
const ALPHA_MAX = 85;

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
}

function draw() {
  if (REDRAW_BACKGROUND) {
    background(BACKGROUND_COLOR);
  }

  stroke(255);

  strokeWeight(2);
  for (var x = 0; x < COLS; x++) {
    let scaleX = x * UNIT_SCALE + UNIT_SCALE / 2;
    let r = map(x, 0, COLS - 1, 128, 255);
    for (var y = 0; y < ROWS; y++) {
      let scaleY = y * UNIT_SCALE + UNIT_SCALE / 2;
      let b = map(y, 0, COLS - 1, 128, 255);

      var curX = scaleX;
      var curY = scaleY;
      var angle;
      let c = color(r, 0, b);
      for (var t = 0; t < TRAIL_LENGTH; t++) {
        c.setAlpha(ALPHA_MAX * (t) / TRAIL_LENGTH);
        stroke(c);
        point(curX, curY);
        angle = noise(x, y, (t / TRAIL_LENGTH) * NOISE_SCALE) * TWO_PI;

        curX += cos(angle);
        curY += sin(angle);
      }
    }
  }

  noLoop();

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
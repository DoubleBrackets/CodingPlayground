
let positionStd = 60;
let colorStd = 60;
let colorMean = 194;

function setup() {
  bg = color("#b8c2b9");
  fillColor = color("#382b26");

  createCanvas(600, 600);
  restart();

  createStandardDeviationSlider();

}

function draw() {
  // Gaussian distribution placement
  let dist = randomGaussian(0, positionStd);
  let angle = random(TWO_PI);
  let x = dist * cos(angle) + width / 2;
  let y = dist * sin(angle) + height / 2;
  noStroke();

  // Gaussian distrbution color hue
  colorMode(HSB);
  let h = randomGaussian(colorMean, colorStd);
  // wrap around
  h = (h + 360) % 360;
  let s = 76;
  let b = 100;
  let c = color(h, s, b, 0.03);
  fill(c);

  // Randomly rotate the square for a more natural look
  push();
  translate(x, y);
  rotate(random(TWO_PI));
  square(0, 0, 16);
  pop();

  // Text labels
  let labelX = 150;
  fill(0);
  rect(labelX, 0, 150, 75);

  fill(255);
  textAlign(LEFT, CENTER);
  text('Position Std: ' + positionStd, labelX, 15);
  text('Hue Std: ' + colorStd, labelX, 35);
  text('Hue Average: ' + colorMean, labelX, 55);
}

function restart() {
  clear();
  background(0);
}

function createStandardDeviationSlider() {
  let posStdSlider = createSlider(1, width / 2, width / 6);
  posStdSlider.position(15, 5);
  posStdSlider.input(() => {
    positionStd = posStdSlider.value();
  });

  let colorStdSlider = createSlider(1, 360, colorStd);
  colorStdSlider.position(15, 25);
  colorStdSlider.input(() => {
    colorStd = colorStdSlider.value();
  });

  let colorMeanSlider = createSlider(0, 360, colorMean);
  colorMeanSlider.position(15, 45);
  colorMeanSlider.input(() => {
    colorMean = colorMeanSlider.value();
  });


  let reset = createButton('Reset');
  reset.position(15, 70);
  reset.mousePressed(() => restart());
}

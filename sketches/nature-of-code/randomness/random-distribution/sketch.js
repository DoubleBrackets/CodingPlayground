let bg;
let fillColor;

// An array to keep track of how often random numbers are picked
let randomCounts = [];
// The total number of counts
let total = 30;

function setup() {
  createCanvas(600, 600);
  createCounter();
  createRandomSelector();
}

function createCounter() {
  for (let i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
}

let sampleFunction;

function draw() {
  bg = color("#b8c2b9");
  fillColor = color("#382b26");

  background(bg);
  // Sample random
  let index = floor(sampleFunction(randomCounts.length));
  randomCounts[index]++;

  // Draw results
  fill(fillColor);
  let w = width / randomCounts.length;
  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}

function createRandomSelector() {
  mySelect = createSelect();
  mySelect.position(15, 15);

  for (let i = 0; i < options.length; i++) {
    mySelect.option(options[i][0]);
  }

  sampleFunction = options[0][1];

  mySelect.changed(() => {
    let selected = mySelect.selected();
    let index = options.findIndex(option => option[0] === selected);
    sampleFunction = options[index][1];
    createCounter();
  });

  let reset = createButton('Reset');
  reset.position(15, 35);
  reset.mousePressed(() => createCounter());
}

let options = [
  ['Uniform', uniformSample],
  ['Gaussian', gaussianSample]
]

function uniformSample(n) {
  return random(n);
}

function gaussianSample(n) {
  // 3 standard deviations to either side
  // So ~99.7% of samples will be kept, the rest are out of bounds and resampled
  let sample = randomGaussian(n / 2, n / 6);
  if(sample < 0 || sample >= n) {
    return gaussianSample(n);
  }
  return sample;
}
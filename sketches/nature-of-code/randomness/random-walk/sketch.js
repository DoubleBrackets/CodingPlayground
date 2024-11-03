let bg; 
let fillColor;

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  display() { 
    stroke(fillColor);
    point(this.x, this.y);
  }

  step() {
    let move = this.walkFunction();
    this.x += move.x;
    this.y += move.y;

    // Wrap around canvas
    if (this.x < 0) {
      this.x = width;
    }
    if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
    if (this.y > height) {
      this.y = 0;
    }
  }

  restart() {
    this.x = width / 2;
    this.y = height / 2;
    clear();
    background(bg);
  }

  setWalkFunction(walkFunction) {
    this.walkFunction = walkFunction;
  }
}

let walker;

function setup() {
  bg = color("#b8c2b9");
  fillColor = color("#382b26");

  createCanvas(600, 600);
  background(bg);

  walker = new Walker();

  createRandomSelector();
}

function draw() {
  walker.step();
  walker.display();
}

// Create a selector to switch between different walk functions
function createRandomSelector() {
  mySelect = createSelect();
  mySelect.position(15, 15);

  for (let i = 0; i < options.length; i++) {
    mySelect.option(options[i][0]);
  }

  walker.setWalkFunction(options[0][1]);

  mySelect.changed(() => {
    let selected = mySelect.selected();
    let index = options.findIndex(option => option[0] === selected);
    walker.setWalkFunction(options[index][1]);
    walker.restart();
  });

  let reset = createButton('Reset');
  reset.position(15, 35);
  reset.mousePressed(() => walker.restart());
}

let options = [
  ['Uniform 4-Direction', unweighted4Directions],
  ['Uniform 8-Direction', unweighted8Directions],
  ['Right-Skewed 4-Direction', rightSkewed4Directions],
  ['Mouse-Skewed 8-Direction', mouseSkewed8Directions],
  ['Gaussian random walk', gaussianRandomWalk]
]

function unweighted4Directions() {
  let move = {x:0, y:0};
  let choice = floor(random(4));
  if (choice === 0) {
    move.x = 1;
  } else if (choice === 1) {
    move.x = -1;
  } else if (choice === 2) {
    move.y = 1;
  } else {
    move.y = -1;
  }
  return move;
}

function unweighted8Directions() {
  let move = {x:0, y:0};
  let stepx = random(-1, 1);
  let stepy = random(-1, 1);
  move.x = stepx;
  move.y = stepy;
  return move;
}

function rightSkewed4Directions() {
  let move = {x:0, y:0};
  let r = random(1);
  // 40% chance to move right
  // 20% chance to move left
  // 20% chance to move down
  // 20% chance to move up
  if (r < 0.4) {
    move.x = 1;
  } else if (r < 0.6) {
    move.x = -1;
  } else if (r < 0.8) {
    move.y = 1;
  } else {
    move.y = -1;
  }
  return move;
}

function mouseSkewed8Directions() {
  // 50% chance to move towards the mouse
  // 50% chance to use uniform random 8-direction
  let move = {x:0, y:0};
  let r = random(2);
  if(r < 1) {
    let dirX = mouseX - walker.x;
    let dirY = mouseY - walker.y;
    angleMode(DEGREES);
    let angle = atan2(dirY, dirX);
    // Raound to 45 degree increments
    angle = round(angle / 45) * 45;
    move.x = round(cos(angle));
    move.y = round(sin(angle));
  } else {
    return unweighted8Directions();
  }
  return move;
}

function gaussianRandomWalk() {
  let move = {x:0, y:0};
  let stepx = randomGaussian(0);
  let stepy = randomGaussian(0);
  move.x = stepx;
  move.y = stepy;
  return move;
}